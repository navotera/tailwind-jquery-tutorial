<?php
declare(strict_types=1);

// Keep the database outside Laragon's public www directory.
$databasePath = getenv('CODEFORGE_DB_PATH') ?: dirname(__DIR__, 3) . '/data/codeforge-' . substr(hash('sha256', dirname(__DIR__)), 0, 12) . '.sqlite';

function respond(array $payload, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    exit;
}

function keyValue(mixed $value): string {
    if (!is_string($value) || !preg_match('/^[a-z0-9][a-z0-9_-]{0,99}$/D', $value)) {
        respond(['error' => 'Identitas materi tidak valid.'], 400);
    }
    return $value;
}

function safeContentUrl(string $url, bool $image = false): bool {
    if (strlen($url) > 2048) return false;
    if ($image && preg_match('~^\./api/materials\.php\?image=[1-9][0-9]*$~D', $url)) return true;
    if (!$image && preg_match('~^#[a-z0-9/_-]+$~iD', $url)) return true;
    $parts = parse_url($url);
    return is_array($parts) && isset($parts['host']) && in_array(strtolower($parts['scheme'] ?? ''), ['http', 'https'], true) && filter_var($url, FILTER_VALIDATE_URL) !== false;
}

function safeColor(string $style): ?string {
    if (!preg_match('/^color\s*:\s*(#[a-f0-9]{6}|rgb\(\s*([0-9]{1,3}),\s*([0-9]{1,3}),\s*([0-9]{1,3})\s*\))\s*;?$/iD', trim($style), $match)) return null;
    if ($match[1][0] === '#') return strtolower($match[1]);
    if (max((int) $match[2], (int) $match[3], (int) $match[4]) > 255) return null;
    return sprintf('#%02x%02x%02x', (int) $match[2], (int) $match[3], (int) $match[4]);
}

function cleanHtml(string $html): string {
    $doc = new DOMDocument();
    $previous = libxml_use_internal_errors(true);
    $doc->loadHTML('<?xml encoding="UTF-8"><html><body>' . $html . '</body></html>', LIBXML_NONET | LIBXML_NOERROR | LIBXML_NOWARNING);
    libxml_clear_errors();
    libxml_use_internal_errors($previous);
    $allowed = ['p', 'div', 'span', 'label', 'input', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'hr', 'details', 'summary'];
    $walk = function (DOMNode $parent) use (&$walk, $allowed): void {
        foreach (iterator_to_array($parent->childNodes) as $node) {
            if (!$node instanceof DOMElement) {
                if (!$node instanceof DOMText) $parent->removeChild($node);
                continue;
            }
            $tag = strtolower($node->tagName);
            if (in_array($tag, ['script', 'style', 'iframe', 'object', 'embed', 'svg', 'math', 'form', 'button'], true) || ($tag === 'input' && $node->getAttribute('type') !== 'checkbox')) {
                $parent->removeChild($node);
                continue;
            }
            $walk($node);
            if (!in_array($tag, $allowed, true)) {
                while ($node->firstChild) $parent->insertBefore($node->firstChild, $node);
                $parent->removeChild($node);
                continue;
            }
            foreach (iterator_to_array($node->attributes) as $attribute) {
                $name = $attribute->name;
                $value = $attribute->value;
                $keep = ($tag === 'a' && $name === 'href' && safeContentUrl($value))
                    || ($tag === 'img' && $name === 'src' && safeContentUrl($value, true))
                    || ($tag === 'img' && $name === 'alt' && mb_strlen($value) <= 255)
                    || ($tag === 'code' && $name === 'data-language' && preg_match('/^[a-z0-9+#.-]{1,30}$/iD', $value))
                    || ($tag === 'code' && $name === 'class' && preg_match('/^language-[a-z0-9+#.-]{1,30}$/iD', $value))
                    || ($tag === 'ul' && $name === 'data-type' && $value === 'taskList')
                    || ($tag === 'li' && $name === 'data-type' && $value === 'taskItem')
                    || ($tag === 'li' && $name === 'data-checked' && in_array($value, ['true', 'false'], true))
                    || ($tag === 'input' && in_array($name, ['type', 'checked', 'disabled'], true))
                    || (in_array($tag, ['th', 'td'], true) && in_array($name, ['colspan', 'rowspan'], true) && ctype_digit($value) && (int) $value >= 1 && (int) $value <= 100)
                    || ($tag === 'ol' && $name === 'start' && preg_match('/^[1-9][0-9]{0,6}$/D', $value))
                    || ($tag === 'span' && $name === 'style' && safeColor($value) !== null);
                if (!$keep) $node->removeAttribute($name);
            }
            if ($tag === 'span' && $node->hasAttribute('style')) $node->setAttribute('style', 'color: ' . safeColor($node->getAttribute('style')));
            if ($tag === 'input') $node->setAttribute('disabled', '');
            if ($tag === 'img' && !$node->hasAttribute('src')) $parent->removeChild($node);
        }
    };
    $body = $doc->getElementsByTagName('body')->item(0);
    $walk($body);
    return implode('', array_map(fn ($node) => $doc->saveHTML($node), iterator_to_array($body->childNodes)));
}

try {
    if (!is_dir(dirname($databasePath)) && !mkdir(dirname($databasePath), 0700, true) && !is_dir(dirname($databasePath))) {
        throw new RuntimeException('Database directory unavailable');
    }
    $db = new PDO('sqlite:' . $databasePath, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    $db->exec('PRAGMA busy_timeout = 5000');
    $db->exec('CREATE TABLE IF NOT EXISTS materials (lesson_id TEXT NOT NULL, section_id TEXT NOT NULL, html TEXT NOT NULL, revision INTEGER NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY (lesson_id, section_id)); CREATE TABLE IF NOT EXISTS material_images (id INTEGER PRIMARY KEY AUTOINCREMENT, mime TEXT NOT NULL, bytes BLOB NOT NULL)');
    $db->exec('CREATE TABLE IF NOT EXISTS material_sections (lesson_id TEXT NOT NULL, section_id TEXT NOT NULL, title TEXT NOT NULL, position INTEGER NOT NULL, PRIMARY KEY (lesson_id, section_id))');
    $columns = $db->query('PRAGMA table_info(materials)')->fetchAll(PDO::FETCH_COLUMN, 1);
    if (!in_array('markdown', $columns, true)) {
        $db->exec('BEGIN IMMEDIATE');
        try {
            // Recheck after acquiring the lock: another request may have migrated first.
            if (!in_array('markdown', $db->query('PRAGMA table_info(materials)')->fetchAll(PDO::FETCH_COLUMN, 1), true)) $db->exec('ALTER TABLE materials ADD COLUMN markdown TEXT');
            $db->exec('COMMIT');
        } catch (Throwable $error) { $db->exec('ROLLBACK'); throw $error; }
    }
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method === 'GET' && isset($_GET['image'])) {
        $id = filter_var($_GET['image'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
        if (!$id) respond(['error' => 'Gambar tidak ditemukan.'], 404);
        $statement = $db->prepare('SELECT mime, bytes FROM material_images WHERE id = ?');
        $statement->execute([$id]);
        $image = $statement->fetch(PDO::FETCH_ASSOC);
        if (!$image) respond(['error' => 'Gambar tidak ditemukan.'], 404);
        header('Content-Type: ' . $image['mime']);
        header('X-Content-Type-Options: nosniff');
        header('Cache-Control: public, max-age=31536000, immutable');
        echo $image['bytes'];
        exit;
    }
    session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict']);
    $_SESSION['material_token'] ??= bin2hex(random_bytes(32));
    $token = $_SESSION['material_token'];
    session_write_close();
    if ($method === 'GET') {
        if (isset($_GET['sections'])) {
            respond(['sections' => $db->query('SELECT lesson_id, section_id, title, position FROM material_sections ORDER BY lesson_id, position, section_id')->fetchAll(PDO::FETCH_ASSOC), 'token' => $token]);
        }
        $lesson = keyValue($_GET['lesson'] ?? null);
        $statement = $db->prepare('SELECT section_id, html, markdown, revision, updated_at FROM materials WHERE lesson_id = ?');
        $statement->execute([$lesson]);
        respond(['materials' => $statement->fetchAll(PDO::FETCH_ASSOC), 'token' => $token]);
    }
    if ($method !== 'POST') {
        header('Allow: GET, POST');
        respond(['error' => 'Metode tidak didukung.'], 405);
    }
    if (!hash_equals($token, $_SERVER['HTTP_X_MATERIAL_TOKEN'] ?? '')) respond(['error' => 'Sesi berubah. Buka kembali editor lalu coba simpan.'], 403);
    if (isset($_GET['upload'])) {
        $file = $_FILES['image'] ?? null;
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) respond(['error' => 'Upload gagal. Pilih gambar maksimal 5 MB.'], 400);
        if ($file['size'] > 5 * 1024 * 1024) respond(['error' => 'Gambar maksimal 5 MB.'], 413);
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        $dimensions = @getimagesize($file['tmp_name']);
        if (!in_array($mime, ['image/png', 'image/jpeg', 'image/webp', 'image/gif'], true) || !$dimensions) respond(['error' => 'Gunakan gambar PNG, JPG, WebP, atau GIF.'], 415);
        if ($dimensions[0] * $dimensions[1] > 40_000_000 || max($dimensions[0], $dimensions[1]) > 16000) respond(['error' => 'Dimensi gambar terlalu besar (maksimal 40 megapixel dan 16.000 px per sisi).'], 413);
        $statement = $db->prepare('INSERT INTO material_images (mime, bytes) VALUES (?, ?)');
        $statement->bindValue(1, $mime);
        $statement->bindValue(2, file_get_contents($file['tmp_name']), PDO::PARAM_LOB);
        $statement->execute();
        respond(['url' => './api/materials.php?image=' . $db->lastInsertId()], 201);
    }
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 12 * 1024 * 1024) respond(['error' => 'Data materi terlalu besar.'], 413);
    $payload = json_decode(file_get_contents('php://input'), true, 32, JSON_THROW_ON_ERROR);
    $lesson = keyValue($payload['lesson'] ?? null);
    $section = keyValue($payload['section'] ?? null);
    $custom = ($payload['custom'] ?? false) === true;
    $title = null;
    if ($custom) {
        if (!str_starts_with($section, 'custom-') || !is_string($payload['title'] ?? null)) respond(['error' => 'Identitas atau judul section tidak valid.'], 400);
        $title = trim($payload['title']);
        if ($title === '' || mb_strlen($title) > 200) respond(['error' => 'Judul section wajib diisi, maksimal 200 karakter.'], 400);
    }
    if (!is_string($payload['html'] ?? null) || !is_int($payload['revision'] ?? null) || $payload['revision'] < 0) respond(['error' => 'Konten atau versi materi tidak valid.'], 400);
    $markdown = $payload['markdown'] ?? null;
    if ($markdown !== null && !is_string($markdown)) respond(['error' => 'Sumber Markdown tidak valid.'], 400);
    if (($markdown !== null && mb_strlen($markdown) > 1_000_000) || mb_strlen(strip_tags($payload['html'])) > 1_000_000 || strlen($payload['html']) > 8 * 1024 * 1024) respond(['error' => 'Materi maksimal 1.000.000 karakter.'], 413);
    $html = cleanHtml($payload['html']);
    $revision = $payload['revision'];
    $db->exec('BEGIN IMMEDIATE');
    $statement = $db->prepare('SELECT revision FROM materials WHERE lesson_id = ? AND section_id = ?');
    $statement->execute([$lesson, $section]);
    $existing = $statement->fetchColumn();
    if ((int) ($existing ?: 0) !== $revision) {
        $db->exec('ROLLBACK');
        respond(['error' => 'Materi telah diubah di tab lain. Salin draft Anda, lalu muat ulang halaman sebelum menyimpan.'], 409);
    }
    $metadata = null;
    if ($custom) {
        $statement = $db->prepare('SELECT position FROM material_sections WHERE lesson_id = ? AND section_id = ?');
        $statement->execute([$lesson, $section]);
        $position = $statement->fetchColumn();
        if ($position === false && $existing !== false) {
            $db->exec('ROLLBACK');
            respond(['error' => 'Identitas section sudah dipakai. Buat section baru lalu salin materi Anda.'], 409);
        }
        if ($position === false) {
            $statement = $db->prepare('SELECT COALESCE(MAX(position), 0) + 1 FROM material_sections WHERE lesson_id = ?');
            $statement->execute([$lesson]);
            $position = $statement->fetchColumn();
        }
        $statement = $db->prepare('INSERT INTO material_sections (lesson_id, section_id, title, position) VALUES (?, ?, ?, ?) ON CONFLICT (lesson_id, section_id) DO UPDATE SET title = excluded.title');
        $statement->execute([$lesson, $section, $title, $position]);
        $metadata = ['lesson_id' => $lesson, 'section_id' => $section, 'title' => $title, 'position' => (int) $position];
    }
    $updated = gmdate('c');
    $statement = $db->prepare('INSERT INTO materials (lesson_id, section_id, html, markdown, revision, updated_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (lesson_id, section_id) DO UPDATE SET html = excluded.html, markdown = excluded.markdown, revision = excluded.revision, updated_at = excluded.updated_at');
    $statement->execute([$lesson, $section, $html, $markdown, $revision + 1, $updated]);
    $db->exec('COMMIT');
    respond(['html' => $html, 'markdown' => $markdown, 'revision' => $revision + 1, 'updated_at' => $updated, 'section' => $metadata]);
} catch (JsonException $error) {
    respond(['error' => 'Format data tidak valid.'], 400);
} catch (Throwable $error) {
    error_log('Material storage: ' . $error->getMessage());
    respond(['error' => 'Penyimpanan belum tersedia. Pastikan PHP pdo_sqlite aktif dan folder database dapat ditulis.'], 500);
}
