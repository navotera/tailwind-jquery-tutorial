/* Editor materi instruktur. */
window.MaterialEditor = (() => {
  const engine = window.MaterialRichEditor || globalThis.MaterialRichEditor;
  const drafts = new Map(), records = new Map(), sessions = new Set();
  let token = '', mountedLesson = '';
  const key = (lesson, section) => `${lesson}/${section}`;
  const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const iconButton = (name, label, attributes) => `<button type="button" class="material-icon-button" ${attributes} title="${label}" aria-label="${label}">${engine.icon(name)}</button>`;
  async function loadSections(lessons) {
    try {
      const result = await request('./api/materials.php?sections=1'); token = result.token;
      result.sections.forEach((record) => {
        const lesson = lessons.find((item) => item.id === record.lesson_id);
        if (!lesson) return;
        lesson.sections ||= [];
        if (!lesson.sections.some((section) => section.id === record.section_id)) lesson.sections.push({ id: record.section_id, title: record.title, custom: true });
      });
    } catch (_) { /* Native lessons remain available; mount displays storage errors. */ }
  }
  function sectionMarkup(lesson, section, index) {
    return `<section id="property-section-${escape(section.id)}" class="property-section material-custom-section" aria-labelledby="property-title-${escape(section.id)}" tabindex="-1"><p class="section-label">BAGIAN ${index + 1} / ${lesson.sections.length}</p><h2 id="property-title-${escape(section.id)}">${escape(lesson.number)}.${index + 1} ${escape(section.title)}</h2><div class="material-section-body material-prose" data-material-body="${escape(section.id)}"><p></p></div></section>`;
  }
  function attachSection(lesson, section, node, notify, loading = true) {
    const body = node.querySelector('[data-material-body]'), heading = document.createElement('div'), title = node.querySelector('h2');
    heading.className = 'material-section-heading'; title.replaceWith(heading); heading.append(title);
    const bar = document.createElement('div'); bar.className = 'material-section-actions';
    bar.innerHTML = `<button type="button" ${loading ? 'disabled' : ''}>Edit materi</button><span class="material-section-status" role="status">${loading ? 'Memuat materi tersimpan…' : ''}</span>`;
    heading.append(bar); const button = bar.querySelector('button');
    button.addEventListener('click', () => openEditor(node, lesson, section, button, notify));
    return { body, node, section, button, status: bar.querySelector('span') };
  }
  function addSection(lesson, notify, container) {
    const id = [...crypto.getRandomValues(new Uint8Array(16))].map((byte) => byte.toString(16).padStart(2, '0')).join('');
    const section = { id: `custom-${id}`, title: 'Section baru', custom: true, isNew: true };
    lesson.sections ||= []; lesson.sections.push(section);
    container.insertAdjacentHTML('beforeend', sectionMarkup(lesson, section, lesson.sections.length - 1));
    const entry = attachSection(lesson, section, container.lastElementChild, notify, false);
    notify(lesson); openEditor(entry.node, lesson, section, entry.button, notify);
    entry.node.scrollIntoView({ block: 'start' });
  }
  const allowed = new Set('p div span label input br h1 h2 h3 h4 h5 h6 strong b em i u s del ul ol li blockquote pre code a img figure figcaption table thead tbody tr th td caption hr details summary'.split(' '));
  const dropped = new Set('script style iframe object embed svg math form button'.split(' '));
  function sanitize(html) {
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    function walk(parent) {
      for (const node of [...parent.childNodes]) {
        if (node.nodeType === 3) continue;
        if (node.nodeType !== 1) { node.remove(); continue; }
        const tag = node.localName;
        if (dropped.has(tag) || (tag === 'input' && node.getAttribute('type') !== 'checkbox')) { node.remove(); continue; }
        walk(node);
        if (!allowed.has(tag)) { node.replaceWith(...node.childNodes); continue; }
        for (const { name, value } of [...node.attributes]) {
          const keep = (tag === 'a' && name === 'href' && engine.safeUrl(value))
            || (tag === 'img' && name === 'src' && engine.safeUrl(value, true))
            || (tag === 'img' && name === 'alt' && value.length <= 255)
            || (tag === 'code' && name === 'data-language' && /^[a-z0-9+#.-]{1,30}$/i.test(value))
            || (tag === 'code' && name === 'class' && /^language-[a-z0-9+#.-]{1,30}$/i.test(value))
            || (tag === 'ul' && name === 'data-type' && value === 'taskList')
            || (tag === 'li' && name === 'data-type' && value === 'taskItem')
            || (tag === 'li' && name === 'data-checked' && /^(true|false)$/.test(value))
            || (tag === 'input' && /^(type|checked|disabled)$/.test(name))
            || (['th', 'td'].includes(tag) && /^(colspan|rowspan)$/.test(name) && /^\d{1,3}$/.test(value) && +value >= 1 && +value <= 100)
            || (tag === 'ol' && name === 'start' && /^[1-9]\d{0,6}$/.test(value))
            || (tag === 'span' && name === 'style' && /^color\s*:\s*[^;]+;?$/i.test(value) && engine.colorHex(node.style.color));
          if (!keep) node.removeAttribute(name);
        }
        if (tag === 'span' && node.hasAttribute('style')) node.setAttribute('style', `color: ${engine.colorHex(node.style.color)}`);
        if (tag === 'input') node.setAttribute('disabled', '');
        if (tag === 'img' && !node.hasAttribute('src')) node.remove();
      }
    }
    walk(parsed.body); return parsed.body.innerHTML;
  }
  function languageFor(source) { const name = engine.detectCodeLanguage(source); return name === 'xml' ? 'html' : name || 'text'; }
  function codeBlock(source, language = '') {
    const name = /^[a-z0-9+#.-]{1,30}$/i.test(language) ? language.toLowerCase() : languageFor(source);
    return `<pre><code class="language-${name}" data-language="${name}">${escape(source)}</code></pre>`;
  }
  function fromText(text) {
    const source = text.replace(/\r\n?/g, '\n');
    return !engine.looksLikeMarkdown(source) && languageFor(source) !== 'text' ? codeBlock(source) : engine.markdownToHtml(source) || '<p><br></p>';
  }
  function clipboardHtml(html, text) {
    if (engine.looksLikeMarkdown(text) && !engine.detectCodeLanguage(text)) return sanitize(fromText(text));
    const parsed = new DOMParser().parseFromString(html, 'text/html');
    parsed.querySelectorAll('pre').forEach((pre) => {
      const language = (pre.querySelector('code')?.className || pre.className).match(/language-([\w+#.-]+)/)?.[1];
      pre.outerHTML = codeBlock(pre.textContent, language || languageFor(pre.textContent));
    });
    return sanitize(parsed.body.innerHTML);
  }
  function readingHtml(html) {
    const wrapper = document.createElement('div'); wrapper.innerHTML = sanitize(html);
    wrapper.querySelectorAll('pre').forEach((pre) => {
      const code = pre.querySelector('code') || pre;
      const language = code.dataset.language || code.className.match(/language-([\w+#.-]+)/)?.[1] || languageFor(code.textContent);
      code.innerHTML = engine.highlight(code.textContent, language);
      const figure = document.createElement('figure'); figure.className = 'material-code';
      figure.innerHTML = `<figcaption><span>${escape(language === 'text' ? 'Kode' : language.toUpperCase())}</span>${iconButton('copy', 'Salin kode', 'data-material-copy')}</figcaption>`;
      pre.replaceWith(figure); figure.append(pre);
    });
    wrapper.querySelectorAll('img').forEach((image) => { image.loading = 'lazy'; image.referrerPolicy = 'no-referrer'; });
    return wrapper.innerHTML;
  }
  async function request(url, options = {}) {
    let response;
    try { response = await fetch(url, { credentials: 'same-origin', ...options }); }
    catch (_) { throw new Error('Server tidak terhubung. Pastikan Laragon berjalan, lalu coba lagi.'); }
    let result;
    try { result = await response.json(); } catch (_) { throw new Error('Penyimpanan perlu server PHP. Buka melalui Laragon atau php -S localhost:8000.'); }
    if (!response.ok) throw new Error(result.error || 'Penyimpanan gagal. Coba lagi.');
    return result;
  }
  function originalHtml(body) {
    const clone = body.cloneNode(true);
    clone.querySelectorAll('.line-numbers,.code-measure,.property-example-toolbar button,.guided-edit-button').forEach((node) => node.remove());
    clone.querySelectorAll('[data-code-preview]').forEach((root) => { root.outerHTML = codeBlock(root.querySelector('code').textContent.replace(/\n$/, ''), root.dataset.codeFile); });
    return sanitize(clone.innerHTML);
  }
  function showError(editor, error) { editor.status.textContent = error.message; editor.status.classList.add('is-error'); }
  function capture(editor) {
    clearTimeout(editor.timer); if (editor.rich.isDestroyed) return;
    editor.draft.html = editor.rich.getHTML();
    editor.draft.markdown = editor.mode === 'markdown' ? editor.source.value : editor.rich.getMarkdown();
    if (editor.titleInput) editor.draft.title = editor.titleInput.value;
    editor.draft.dirty = editor.isNew || (editor.titleInput && editor.draft.title !== editor.baselineTitle) || (editor.mode === 'markdown' ? editor.draft.markdown !== editor.baselineMarkdown : editor.draft.html !== editor.baselineHtml);
    const words = editor.draft.markdown.trim().split(/\s+/).filter(Boolean).length;
    editor.status.textContent = words > 50000 ? 'Materi melebihi 50.000 kata; editor dapat terasa lambat.' : editor.draft.dirty ? 'Perubahan belum disimpan.' : 'Belum ada perubahan.';
    editor.status.classList.remove('is-error');
  }
  function setBusy(editor, busy) {
    editor.busy = busy; editor.draft.busy = busy;
    editor.panel.querySelectorAll('button,input,select,textarea').forEach((control) => { control.disabled = busy; });
    editor.rich.setEditable(!busy);
    if (!busy) editor.refreshToolbar();
  }
  function insert(editor, html, position) {
    if (editor.rich.isDestroyed) return;
    const chain = editor.rich.chain().focus();
    if (position) chain.setTextSelection({ from: Math.min(position.from, editor.rich.state.doc.content.size), to: Math.min(position.to, editor.rich.state.doc.content.size) });
    chain.insertContent(sanitize(html)).run(); capture(editor);
  }
  async function addImages(editor, files) {
    if (!files.length || editor.busy) return;
    const position = { from: editor.rich.state.selection.from, to: editor.rich.state.selection.to };
    setBusy(editor, true); editor.status.textContent = 'Mengunggah gambar…';
    try {
      const images = [];
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) throw new Error('Gambar maksimal 5 MB per file.');
        const form = new FormData(); form.append('image', file);
        const result = await request('./api/materials.php?upload=1', { method: 'POST', headers: { 'X-Material-Token': token }, body: form });
        images.push(`<img src="${escape(result.url)}" alt="${escape(file.name.slice(0, 255))}"><p></p>`);
      }
      if (editor.rich.isDestroyed) {
        editor.draft.html += images.join(''); editor.draft.markdown += '\n\n' + images.map((html) => html.match(/<img[^>]+>/)[0]).join('\n'); editor.draft.dirty = true;
      } else insert(editor, images.join(''), position);
    } catch (error) { showError(editor, error); }
    finally { if (!editor.rich.isDestroyed) setBusy(editor, false); else editor.draft.busy = false; }
  }
  function paste(editor, event, transfer) {
    event.preventDefault(); if (editor.busy) return true;
    const files = [...transfer.files].filter((file) => file.type.startsWith('image/'));
    if (files.length) { addImages(editor, files); return true; }
    const text = transfer.getData('text/plain'), html = transfer.getData('text/html');
    if (text.length > 1_000_000 || html.length > 2_000_000) { showError(editor, new Error('Materi maksimal 1.000.000 karakter.')); return true; }
    if (editor.rich.isActive('codeBlock')) { if (text) editor.rich.commands.insertContent({ type: 'text', text }); return true; }
    const markdown = engine.looksLikeMarkdown(text);
    const parsed = html ? new DOMParser().parseFromString(html, 'text/html') : null;
    const structured = parsed?.querySelector('h1,h2,h3,h4,h5,h6,ul,ol,pre,table,blockquote');
    if (markdown && (!engine.detectCodeLanguage(text) || /^\s*(?:```|~~~|#{1,6}\s)/m.test(text))) editor.rich.chain().focus().insertContent(text, { contentType: 'markdown' }).run();
    else if (html && structured) insert(editor, clipboardHtml(html, text));
    else if (engine.detectCodeLanguage(text)) insert(editor, codeBlock(text));
    else if (html) insert(editor, sanitize(html));
    else editor.rich.chain().focus().insertContent(text, { contentType: 'markdown' }).run();
    capture(editor); return true;
  }
  function openEditor(sectionNode, lesson, section, editButton, notify) {
    const body = sectionNode.querySelector('[data-material-body]');
    const recordKey = key(lesson.id, section.id), record = records.get(recordKey);
    let draft = drafts.get(recordKey);
    if (!draft) { draft = { html: record?.html ?? originalHtml(body), markdown: record?.markdown ?? null, title: section.isNew ? '' : section.title, dirty: !!section.isNew, revision: record?.revision || 0 }; drafts.set(recordKey, draft); }
    const panel = document.createElement('div'); panel.className = 'material-edit-panel';
    panel.innerHTML = `<div class="material-edit-heading"><h3>${section.isNew ? 'Section baru' : 'Edit materi'}</h3><button type="button" data-mode aria-pressed="false">Markdown</button></div>
      ${section.custom ? `<label class="material-section-title">Judul section<input type="text" data-section-title maxlength="200" required placeholder="Misalnya: Contoh tambahan" value="${escape(draft.title)}"></label>` : ''}
      <p class="material-help">Tempel materi dari editor lain atau AI. Markdown, tabel, checklist, dan kode otomatis berformat. Gunakan Markdown untuk mengedit sumber .md. Gambar maksimal 5 MB per file.</p>
      <div class="material-editor-shell">
      <div class="material-toolbar" role="toolbar" aria-label="Format materi">
        <div class="material-tool-group"><label class="material-heading-control" title="Format paragraf">${engine.icon('heading')}<select data-heading aria-label="Format paragraf"><option value="p">Paragraf</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option></select></label></div>
        <div class="material-tool-group">${iconButton('undo-2', 'Undo', 'data-command="undo"')}${iconButton('redo-2', 'Redo', 'data-command="redo"')}</div>
        <div class="material-tool-group">${iconButton('bold', 'Tebal', 'data-command="toggleBold"')}${iconButton('italic', 'Miring', 'data-command="toggleItalic"')}${iconButton('underline', 'Garis bawah', 'data-command="toggleUnderline"')}${iconButton('strikethrough', 'Coret', 'data-command="toggleStrike"')}${iconButton('eraser', 'Hapus format', 'data-clear')}
        <label class="material-color" title="Warna teks">${engine.icon('baseline')}<span class="material-color-swatch"></span><input type="color" value="#2563eb" aria-label="Warna teks"></label></div>
        <div class="material-tool-group">${iconButton('list', 'Daftar', 'data-command="toggleBulletList"')}${iconButton('list-ordered', 'Daftar nomor', 'data-command="toggleOrderedList"')}${iconButton('list-checks', 'Checklist', 'data-command="toggleTaskList"')}</div>
        <div class="material-tool-group">${iconButton('quote', 'Kutipan', 'data-command="toggleBlockquote"')}${iconButton('minus', 'Garis', 'data-command="setHorizontalRule"')}</div>
        <div class="material-tool-group">${iconButton('link-2', 'Tautan', 'data-insert="link"')}${iconButton('table-2', 'Tabel', 'data-insert="table"')}${iconButton('code-2', 'Blok kode', 'data-add-code')}${iconButton('image-plus', 'Tambah gambar', 'data-add-image')}${iconButton('image', 'Gambar URL', 'data-insert="image"')}</div>
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple hidden aria-label="Pilih gambar materi">
      </div>
      <form class="material-insert-options" hidden><label data-url>URL <input type="url" maxlength="2048" placeholder="https://..." aria-label="URL sisipan"></label><label data-alt>Alt gambar <input type="text" maxlength="255" aria-label="Alt gambar"></label><label data-rows>Baris <input type="number" min="1" max="20" value="3" aria-label="Baris tabel"></label><label data-cols>Kolom <input type="number" min="1" max="12" value="3" aria-label="Kolom tabel"></label><button type="submit">Sisipkan</button><button type="button" data-dismiss>Tutup</button></form>
      <div class="material-editor-viewport"><div class="material-rich-host"></div><textarea class="material-markdown-source" hidden spellcheck="false" maxlength="1000000" aria-label="Sumber Markdown materi"></textarea>
      <div class="material-draft-preview material-prose" hidden></div></div></div>
      <div class="material-edit-footer"><p role="status" aria-live="polite"></p><div><button type="button" data-preview aria-pressed="false">Pratinjau</button><button type="button" data-cancel>Batal</button><button type="button" class="material-save" data-save>Simpan materi</button></div></div>`;
    body.hidden = true; editButton.hidden = true; body.before(panel);
    const editor = { panel, draft, titleInput: panel.querySelector('[data-section-title]'), isNew: !!section.isNew, source: panel.querySelector('textarea'), status: panel.querySelector('[role=status]'), rich: null, busy: false, mode: 'visual', timer: null };
    editor.refreshToolbar = (current = editor.rich) => {
      if (!current || current.isDestroyed) return;
      const names = { toggleBold: 'bold', toggleItalic: 'italic', toggleUnderline: 'underline', toggleStrike: 'strike', toggleBulletList: 'bulletList', toggleOrderedList: 'orderedList', toggleTaskList: 'taskList', toggleBlockquote: 'blockquote' };
      panel.querySelectorAll('[data-command]').forEach((button) => {
        const command = button.dataset.command;
        if (names[command]) button.setAttribute('aria-pressed', String(current.isActive(names[command])));
        if (command === 'undo' || command === 'redo') button.disabled = editor.busy || !current.can()[command]();
      });
      panel.querySelector('[data-add-code]').setAttribute('aria-pressed', String(current.isActive('codeBlock')));
      panel.querySelector('[data-insert="link"]').setAttribute('aria-pressed', String(current.isActive('link')));
      panel.querySelector('[data-heading]').value = [1, 2, 3].find((level) => current.isActive('heading', { level })) ? `h${current.getAttributes('heading').level}` : 'p';
      const color = engine.colorHex(current.getAttributes('textStyle').color) || '#2563eb';
      panel.querySelector('input[type=color]').value = color;
      panel.querySelector('.material-color').style.setProperty('--material-text-color', color);
    };
    function syncMarkdown() { if (editor.mode === 'markdown') { editor.rich.commands.setContent(editor.source.value, { contentType: 'markdown', emitUpdate: false }); capture(editor); } }
    const rich = engine.createEditor({
      element: panel.querySelector('.material-rich-host'), content: sanitize(draft.html), markdown: draft.markdown,
      ariaLabel: `Isi materi ${section.title}`,
      onUpdate: (current) => { editor.refreshToolbar(current); draft.dirty = true; editor.status.textContent = 'Perubahan belum disimpan.'; clearTimeout(editor.timer); editor.timer = setTimeout(() => capture(editor), 600); },
      onSelectionUpdate: editor.refreshToolbar,
      onPaste: (_instance, event) => paste(editor, event, event.clipboardData), onDrop: (_instance, event) => paste(editor, event, event.dataTransfer), onSave: save,
    });
    editor.rich = rich;
    rich.on('transaction', () => editor.refreshToolbar());
    editor.refreshToolbar();
    editor.baselineHtml = draft.dirty ? draft.baselineHtml || '' : rich.getHTML(); editor.baselineMarkdown = draft.dirty ? draft.baselineMarkdown || '' : rich.getMarkdown();
    editor.baselineTitle = section.title;
    draft.baselineHtml = editor.baselineHtml; draft.baselineMarkdown = editor.baselineMarkdown;
    editor.dispose = () => { capture(editor); rich.destroy(); sessions.delete(editor); }; sessions.add(editor);
    editor.status.textContent = section.isNew ? 'Isi judul dan materi, lalu simpan section baru.' : draft.dirty ? 'Draft belum disimpan dipulihkan.' : 'Siap diedit. Simpan setelah selesai.';
    if (editor.titleInput) editor.titleInput.addEventListener('input', () => { editor.titleInput.setCustomValidity(''); capture(editor); });
    const toolbar = panel.querySelector('.material-toolbar');
    toolbar.addEventListener('mousedown', (event) => { if (event.target.closest('button')) event.preventDefault(); });
    panel.querySelector('[data-heading]').addEventListener('change', (event) => { const chain = rich.chain().focus(); event.target.value === 'p' ? chain.setParagraph().run() : chain.setHeading({ level: +event.target.value.slice(1) }).run(); });
    panel.querySelectorAll('[data-command]').forEach((button) => button.addEventListener('click', () => rich.chain().focus()[button.dataset.command]().run()));
    panel.querySelector('[data-clear]').addEventListener('click', () => rich.chain().focus().unsetAllMarks().clearNodes().run());
    panel.querySelector('input[type=color]').addEventListener('input', (event) => rich.chain().focus().setColor(event.target.value).run());
    panel.querySelector('[data-add-code]').addEventListener('click', () => rich.chain().focus().toggleCodeBlock().run());
    const input = panel.querySelector('input[type=file]'); panel.querySelector('[data-add-image]').addEventListener('click', () => input.click()); input.addEventListener('change', () => { addImages(editor, [...input.files]); input.value = ''; });
    const form = panel.querySelector('form'); let insertKind = '';
    panel.querySelectorAll('[data-insert]').forEach((button) => button.addEventListener('click', () => {
      insertKind = button.dataset.insert; form.hidden = false;
      form.querySelector('[data-url]').hidden = insertKind === 'table'; form.querySelector('[data-alt]').hidden = insertKind !== 'image'; form.querySelector('[data-rows]').hidden = form.querySelector('[data-cols]').hidden = insertKind !== 'table';
      form.querySelector('[data-url] input').required = insertKind !== 'table'; form.querySelector(insertKind === 'table' ? '[data-rows] input' : '[data-url] input').focus();
    }));
    form.querySelector('[data-dismiss]').addEventListener('click', () => { form.hidden = true; });
    form.addEventListener('submit', (event) => {
      event.preventDefault(); const url = form.querySelector('[data-url] input').value.trim();
      if (insertKind !== 'table' && !engine.safeUrl(url, insertKind === 'image')) { showError(editor, new Error('Gunakan URL http atau https yang valid.')); return; }
      if (insertKind === 'table') rich.chain().focus().insertTable({ rows: Math.min(20, Math.max(1, +form.querySelector('[data-rows] input').value)), cols: Math.min(12, Math.max(1, +form.querySelector('[data-cols] input').value)), withHeaderRow: true }).run();
      else if (insertKind === 'image') rich.chain().focus().setImage({ src: url, alt: form.querySelector('[data-alt] input').value.slice(0, 255) }).run();
      else if (rich.state.selection.empty) insert(editor, `<a href="${escape(url)}">${escape(url)}</a>`);
      else rich.chain().focus().setLink({ href: url }).run(); form.hidden = true;
    });
    editor.source.addEventListener('input', () => { draft.dirty = true; draft.markdown = editor.source.value; editor.status.textContent = 'Perubahan belum disimpan.'; });
    editor.source.addEventListener('keydown', (event) => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') { event.preventDefault(); save(); } });
    panel.querySelector('[data-mode]').addEventListener('click', (event) => {
      if (editor.mode === 'visual') { capture(editor); editor.source.value = rich.getMarkdown(); editor.mode = 'markdown'; }
      else { syncMarkdown(); editor.mode = 'visual'; rich.commands.focus(); }
      panel.querySelector('.material-rich-host').hidden = editor.mode === 'markdown'; editor.source.hidden = editor.mode !== 'markdown'; toolbar.hidden = editor.mode === 'markdown'; form.hidden = true; panel.querySelector('.material-draft-preview').hidden = true;
      const previewButton = panel.querySelector('[data-preview]'); previewButton.textContent = 'Pratinjau'; previewButton.setAttribute('aria-pressed', 'false'); event.target.textContent = editor.mode === 'markdown' ? 'Visual' : 'Markdown'; event.target.setAttribute('aria-pressed', String(editor.mode === 'markdown')); if (editor.mode === 'markdown') editor.source.focus();
    });
    panel.querySelector('[data-preview]').addEventListener('click', (event) => {
      syncMarkdown(); const preview = panel.querySelector('.material-draft-preview'), show = preview.hidden;
      preview.innerHTML = show ? readingHtml(rich.getHTML()) : ''; preview.hidden = !show; panel.querySelector('.material-rich-host').hidden = show || editor.mode !== 'visual'; editor.source.hidden = show || editor.mode !== 'markdown'; toolbar.hidden = show || editor.mode !== 'visual'; form.hidden = true;
      event.target.textContent = show ? 'Kembali edit' : 'Pratinjau'; event.target.setAttribute('aria-pressed', String(show));
    });
    function close(discard = false) { editor.dispose(); if (discard) drafts.delete(recordKey); panel.remove(); body.hidden = false; editButton.hidden = false; editButton.focus(); }
    panel.querySelector('[data-cancel]').addEventListener('click', () => {
      capture(editor); if (draft.dirty && !window.confirm('Buang perubahan materi yang belum disimpan?')) return; close(true);
      if (section.isNew) {
        lesson.sections = lesson.sections.filter((item) => item !== section); sectionNode.remove(); notify(lesson);
        document.querySelector('[data-material-add]')?.focus();
      }
    });
    async function save() {
      if (editor.busy) return; syncMarkdown(); capture(editor); if (!draft.dirty) { close(true); return; }
      const title = editor.titleInput?.value.trim();
      if (editor.titleInput && !title) { editor.titleInput.setCustomValidity('Isi judul section terlebih dahulu.'); editor.titleInput.reportValidity(); editor.titleInput.focus(); return; }
      const markdown = editor.mode === 'markdown' ? editor.source.value : rich.getMarkdown();
      if (markdown.length > 1_000_000) { showError(editor, new Error('Materi maksimal 1.000.000 karakter.')); return; }
      setBusy(editor, true); editor.status.textContent = 'Menyimpan materi…';
      try {
        const result = await request('./api/materials.php', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Material-Token': token }, body: JSON.stringify({ lesson: lesson.id, section: section.id, html: sanitize(rich.getHTML()), markdown, revision: draft.revision, ...(section.custom ? { custom: true, title } : {}) }) });
        records.set(recordKey, result); body.innerHTML = readingHtml(result.html); body.classList.add('material-prose');
        if (section.custom) { section.title = result.section.title; section.isNew = false; notify(lesson); }
        close(true); sectionNode.querySelector('.material-section-status').textContent = 'Materi tersimpan.';
      } catch (error) { showError(editor, error); } finally { if (!rich.isDestroyed) setBusy(editor, false); else draft.busy = false; }
    }
    panel.querySelector('[data-save]').addEventListener('click', save);
    if (section.isNew) editor.titleInput.focus(); else rich.commands.focus();
  }
  async function mount(lesson, notify) {
    [...sessions].forEach((editor) => editor.dispose()); mountedLesson = lesson.id;
    const container = document.querySelector('#lessonSections'), addButton = container.querySelector('[data-material-add]');
    addButton.addEventListener('click', () => addSection(lesson, notify, container));
    const bodies = [...container.querySelectorAll('[data-material-body]')];
    const entries = bodies.map((body) => {
      const section = lesson.sections.find((item) => item.id === body.dataset.materialBody), node = body.parentElement;
      return attachSection(lesson, section, node, notify);
    });
    try {
      const result = await request(`./api/materials.php?lesson=${encodeURIComponent(lesson.id)}`); token = result.token;
      if (mountedLesson !== lesson.id || !addButton.isConnected) return;
      (lesson.sections || []).forEach((section) => records.delete(key(lesson.id, section.id))); result.materials.forEach((record) => records.set(key(lesson.id, record.section_id), record));
      entries.forEach(({ body, section, status }) => { const record = records.get(key(lesson.id, section.id)); if (record) { body.innerHTML = readingHtml(record.html); body.classList.add('material-prose'); } status.textContent = record ? 'Materi tersimpan' : ''; });
    } catch (error) { entries.forEach(({ status }) => { status.textContent = error.message; status.classList.add('is-error'); }); }
    finally {
      if (mountedLesson === lesson.id && addButton.isConnected) {
        addButton.disabled = false;
        entries.forEach(({ button, node, section }) => { button.disabled = false; if (drafts.has(key(lesson.id, section.id))) openEditor(node, lesson, section, button, notify); });
      }
    }
  }
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-material-copy]'); if (!button) return;
    try { await navigator.clipboard.writeText(button.closest('figure').querySelector('pre').textContent); button.innerHTML = engine.icon('check'); button.title = 'Tersalin'; button.setAttribute('aria-label', 'Tersalin'); } catch (_) { button.title = 'Pilih teks untuk menyalin'; button.setAttribute('aria-label', button.title); }
  });
  window.addEventListener('beforeunload', (event) => { if ([...drafts.values()].some((draft) => draft.dirty || draft.busy)) { event.preventDefault(); event.returnValue = ''; } });
  return { mount, loadSections, sectionMarkup, sanitize, fromText, languageFor, clipboardHtml };
})();
