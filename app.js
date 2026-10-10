const allLessons = lessonCatalog.flatMap((track) => track.groups.flatMap((group) => group.lessons));
const state = { lessonId: allLessons[0].id, sectionId: null, activeFile: "html", exampleId: null, code: {} };
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
let runSequence = 0;
let activeRun = null;
let runTimeout;
const copyTimers = new WeakMap();
let runtimePromise;
const fullscreenPanels = {
  editor: { panelId: "editorPanel", buttonId: "toggleEditorFullscreen", focusId: "codeEditor", label: "editor", active: false },
  preview: { panelId: "previewPanel", buttonId: "togglePreviewFullscreen", focusId: "togglePreviewFullscreen", label: "preview", active: false },
  workspace: { panelId: "lessonWorkspace", buttonId: "toggleWorkspaceFullscreen", focusId: "codeEditor", label: "kode dan preview", openText: "Layar penuh kode + preview", closeText: "Keluar layar penuh", active: false }
};
const CODE_FONT_MIN = 12;
const CODE_FONT_MAX = 32;
const CODE_FONT_DEFAULT = 14;
let codeFontSize = CODE_FONT_DEFAULT;
let wordWrap = false;
let workspaceEditor;
let workspaceEditorRatio = 0.5;
let draggingWorkspaceResizer = false;
let fullscreenSession = null;
let fullscreenTransitioning = false;

function getWorkspaceEditor() {
  return workspaceEditor ||= CodeEditor.attach({
    input: $("#codeEditor"), highlight: $("#codeHighlight"), code: $("#highlightedCode"),
    numbers: $("#lineNumbers"), measure: $("#codeMeasure")
  });
}

function setPreviewVisible(visible) {
  $("#previewPanel").hidden = !visible;
  $("#workspaceLayout").classList.toggle("is-editor-only", !visible);
  $("#showPreview").hidden = visible;
  refreshEditorLayout();
}

function syncFullscreenButtons() {
  let fullscreenActive = false;
  Object.values(fullscreenPanels).forEach((item) => {
    const panel = $(`#${item.panelId}`);
    const button = $(`#${item.buttonId}`);
    const active = document.fullscreenElement === panel || panel.classList.contains("is-fullscreen");
    fullscreenActive ||= active;
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? "Keluar dari layar penuh" : `Buka ${item.label} dalam layar penuh`);
    button.title = active ? "Keluar dari layar penuh (Escape)" : "Layar penuh";
    button.textContent = active ? (item.closeText || "×") : (item.openText || "⛶");
    if (item.active && !active) button.focus({ preventScroll: true });
    item.active = active;
  });
  if (!fullscreenActive && !fullscreenTransitioning && fullscreenSession) {
    const previous = fullscreenSession;
    fullscreenSession = null;
    draggingWorkspaceResizer = false;
    setPreviewVisible(previous.previewVisible);
    window.scrollTo({ left: previous.scrollX, top: previous.scrollY, behavior: "instant" });
  }
  syncWorkspaceColumns();
  refreshEditorLayout();
}

function workspaceFullscreenActive() {
  const panel = $("#lessonWorkspace");
  return document.fullscreenElement === panel || panel.classList.contains("is-fullscreen");
}

function syncWorkspaceColumns() {
  if (!workspaceFullscreenActive()) return;
  const layout = $("#workspaceLayout");
  const resizer = $("#workspaceResizer");
  const available = Math.max(0, layout.clientWidth - resizer.offsetWidth);
  if (!available) return;
  const editorWidth = available * workspaceEditorRatio;
  layout.style.setProperty("--workspace-editor-width", `${editorWidth}px`);
  layout.style.setProperty("--workspace-preview-width", `${available - editorWidth}px`);
}

function setWorkspaceEditorWidth(clientX) {
  const layout = $("#workspaceLayout");
  const resizer = $("#workspaceResizer");
  const bounds = layout.getBoundingClientRect();
  const available = Math.max(0, layout.clientWidth - resizer.offsetWidth);
  if (!available) return;
  const minimum = available * 0.2;
  const requested = clientX - bounds.left - resizer.offsetWidth / 2;
  const editorWidth = Math.min(available - minimum, Math.max(minimum, requested));
  workspaceEditorRatio = editorWidth / available;
  resizer.setAttribute("aria-valuenow", String(Math.round(workspaceEditorRatio * 100)));
  resizer.setAttribute("aria-valuetext", `Kode ${Math.round(workspaceEditorRatio * 100)}%, preview ${Math.round((1 - workspaceEditorRatio) * 100)}%`);
  syncWorkspaceColumns();
  refreshEditorLayout();
}

function resizeWorkspaceEditorByKeyboard(event) {
  const layout = $("#workspaceLayout");
  const available = layout.clientWidth - $("#workspaceResizer").offsetWidth;
  if (!available) return;
  const minimumRatio = 0.2;
  const step = (event.shiftKey ? 64 : 24) / available;
  let ratio = workspaceEditorRatio;
  if (event.key === "ArrowLeft") ratio -= step;
  else if (event.key === "ArrowRight") ratio += step;
  else if (event.key === "Home") ratio = minimumRatio;
  else if (event.key === "End") ratio = 1 - minimumRatio;
  else return;
  event.preventDefault();
  workspaceEditorRatio = Math.min(1 - minimumRatio, Math.max(minimumRatio, ratio));
  const resizer = $("#workspaceResizer");
  const value = Math.round(workspaceEditorRatio * 100);
  resizer.setAttribute("aria-valuenow", String(value));
  resizer.setAttribute("aria-valuetext", `Kode ${value}%, preview ${Math.round((1 - workspaceEditorRatio) * 100)}%`);
  syncWorkspaceColumns();
  refreshEditorLayout();
}

function exitFallbackFullscreen() {
  let exited = false;
  Object.values(fullscreenPanels).forEach((item) => {
    const panel = $(`#${item.panelId}`);
    if (panel.classList.contains("is-fullscreen")) {
      panel.classList.remove("is-fullscreen");
      exited = true;
    }
  });
  if (exited) syncFullscreenButtons();
  return exited;
}

async function togglePanelFullscreen(kind) {
  if (fullscreenTransitioning) return;
  const item = fullscreenPanels[kind];
  const panel = $(`#${item.panelId}`);
  const button = $(`#${item.buttonId}`);
  const active = document.fullscreenElement === panel || panel.classList.contains("is-fullscreen");
  if (active) {
    if (document.fullscreenElement === panel && document.exitFullscreen) {
      await document.exitFullscreen();
    } else {
      panel.classList.remove("is-fullscreen");
    }
    syncFullscreenButtons();
    button.focus({ preventScroll: true });
    return;
  }

  // Simpan sekali untuk seluruh sesi, termasuk saat berpindah mode fullscreen.
  fullscreenSession ||= {
    previewVisible: !$("#previewPanel").hidden,
    scrollX: window.scrollX || 0,
    scrollY: window.scrollY || 0
  };
  fullscreenTransitioning = true;
  try {
    exitFallbackFullscreen();
    // Akhiri mode native sebelumnya agar panel fullscreen tidak bertumpuk.
    if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
    if (kind === "workspace") setPreviewVisible(true);
    try {
      if (!panel.requestFullscreen) throw new Error("Fullscreen API tidak tersedia.");
      await panel.requestFullscreen();
    } catch (_) {
      panel.classList.add("is-fullscreen");
    }
  } finally {
    fullscreenTransitioning = false;
    syncFullscreenButtons();
  }
  $(`#${item.focusId}`).focus({ preventScroll: true });
}

function setCodeFontSize(value, persist = true) {
  const numeric = Number(value);
  const size = Number.isFinite(numeric) ? Math.min(CODE_FONT_MAX, Math.max(CODE_FONT_MIN, Math.round(numeric))) : CODE_FONT_DEFAULT;
  const ratio = size / codeFontSize;
  const editor = $("#codeEditor");
  codeFontSize = size;
  document.documentElement.style.setProperty("--code-font-size", `${size}px`);
  $("#codeFontSize").textContent = `${size}px`;
  $("#decreaseCodeFont").disabled = size === CODE_FONT_MIN;
  $("#increaseCodeFont").disabled = size === CODE_FONT_MAX;
  editor.scrollTop *= ratio;
  editor.scrollLeft *= ratio;
  refreshEditorLayout();
  if (persist) {
    try { localStorage.setItem("codeforge-code-font-size", String(size)); } catch (_) { /* Tetap bekerja tanpa storage. */ }
  }
}

function setWordWrap(enabled, persist = true) {
  wordWrap = Boolean(enabled);
  $("#mainContent").classList.toggle("is-code-wrapped", wordWrap);
  $("#codeEditor").setAttribute("wrap", wordWrap ? "soft" : "off");
  $("#wordWrapToggle").setAttribute("aria-pressed", String(wordWrap));
  $("#wordWrapToggle").textContent = `Word wrap: ${wordWrap ? "aktif" : "nonaktif"}`;
  if (wordWrap) $("#codeEditor").scrollLeft = 0;
  refreshEditorLayout();
  if (persist) {
    try { localStorage.setItem("codeforge-word-wrap", String(wordWrap)); } catch (_) { /* Preferensi opsional. */ }
  }
}

function currentLesson() {
  return allLessons.find((lesson) => lesson.id === state.lessonId);
}

function exampleFor(lesson, exampleId = state.exampleId) {
  return lesson.sections?.find((section) => section.id === exampleId && !section.custom);
}

function codeKeyFor(lesson, exampleId = state.exampleId) {
  const example = exampleFor(lesson, exampleId);
  return example ? `${lesson.id}/${example.id}` : lesson.id;
}

function filesFor(lesson, exampleId = state.exampleId) {
  const example = exampleFor(lesson, exampleId);
  return state.code[codeKeyFor(lesson, exampleId)] ||= { ...(example || lesson).code };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}

function setConsole(message, isError = false) {
  $("#consoleBar").classList.toggle("is-error", isError);
  $("#consoleMessage").textContent = message;
}

function setPreviewStatus(message, kind = "") {
  const status = $("#previewStatus");
  status.textContent = message;
  status.className = `preview-status${kind ? ` is-${kind}` : ""}`;
}

function renderNavigation() {
  $("#courseNav").innerHTML = lessonCatalog.map((track) => `
    <details class="nav-section" data-track="${track.sectionId}" ${track.sectionId === currentLesson().sectionId ? "open" : ""}>
      <summary class="nav-section-heading"><span>${escapeHtml(track.sectionLabel)}</span> <small>${track.groups.length} section</small></summary>
      ${track.groups.map((group) => `
        <details class="nav-group" open>
          <summary>${group.number}. ${escapeHtml(group.title)}</summary>
          ${group.lessons.map((lesson) => `
            <div class="nav-lesson-item">
              <button class="nav-lesson" type="button" data-lesson-id="${lesson.id}">
                <span class="nav-number">${lesson.number}</span><span>${escapeHtml(lesson.title)}</span>
              </button>
              ${lesson.sections?.length ? `<ul class="nav-subsections" aria-label="Bagian ${escapeHtml(lesson.title)}">
                ${lesson.sections.map((section) => `<li><a class="nav-subsection" href="#${lesson.id}/${section.id}" data-lesson-id="${lesson.id}" data-section-id="${section.id}"><span class="nav-bullet" aria-hidden="true">–</span><span>${escapeHtml(section.title)}</span></a></li>`).join("")}
              </ul>` : ""}
            </div>`).join("")}
        </details>`).join("")}
    </details>`).join("");
}

function filterNavigation() {
  const query = $("#lessonSearch").value.trim().toLocaleLowerCase("id");
  let matches = 0;
  $$(".nav-section").forEach((section) => {
    let trackMatches = 0;
    $$(".nav-group", section).forEach((group) => {
      let groupMatches = 0;
      $$(".nav-lesson", group).forEach((button) => {
        const lesson = allLessons.find((item) => item.id === button.dataset.lessonId);
        const haystack = `${section.querySelector(".nav-section-heading").textContent} ${lesson.groupTitle} ${lesson.number} ${lesson.title}`.toLocaleLowerCase("id");
        const parentMatches = haystack.includes(query);
        let childMatches = 0;
        $$(".nav-subsection", group).filter((link) => link.dataset.lessonId === lesson.id).forEach((link) => {
          const subsection = lesson.sections.find((item) => item.id === link.dataset.sectionId);
          const matched = parentMatches || subsection.title.toLocaleLowerCase("id").includes(query);
          link.parentElement.hidden = !matched;
          if (matched) childMatches++;
        });
        button.hidden = !parentMatches && childMatches === 0;
        button.closest(".nav-lesson-item").hidden = button.hidden;
        if (!button.hidden) groupMatches++;
      });
      group.hidden = groupMatches === 0;
      // Simpan status collapse agar pencarian tidak menghilangkan pilihan instruktur.
      if (query) {
        if (!group.dataset.searchOpen) group.dataset.searchOpen = String(group.open);
        group.open = true;
      } else if (group.dataset.searchOpen) {
        group.open = group.dataset.searchOpen === "true";
        delete group.dataset.searchOpen;
      }
      trackMatches += groupMatches;
    });
    section.hidden = trackMatches === 0;
    if (query) {
      if (!section.dataset.searchOpen) section.dataset.searchOpen = String(section.open);
      section.open = true;
    } else if (section.dataset.searchOpen) {
      section.open = section.dataset.searchOpen === "true";
      delete section.dataset.searchOpen;
    }
    matches += trackMatches;
  });
  $("#searchEmpty").hidden = matches !== 0;
}

function updateActiveNavigation() {
  $$(".nav-section").forEach((track) => {
    track.classList.toggle("has-active-page", track.dataset.track === currentLesson().sectionId);
  });
  $$(".nav-lesson").forEach((button) => {
    const active = button.dataset.lessonId === state.lessonId;
    button.classList.toggle("is-active", active);
    if (active) {
      button.setAttribute("aria-current", "page");
      const group = button.closest(".nav-group");
      group.open = true;
      if (group.dataset.searchOpen) group.dataset.searchOpen = "true";
    } else button.removeAttribute("aria-current");
  });
  $$(".nav-subsection").forEach((link) => {
    const active = link.dataset.lessonId === state.lessonId && link.dataset.sectionId === state.sectionId;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function navigationTarget(hash = window.location.hash) {
  const [lessonId, sectionId, ...extra] = hash.replace(/^#/, "").split("/");
  const lesson = allLessons.find((item) => item.id === lessonId);
  if (!lesson || extra.length || (sectionId && !lesson.sections?.some((section) => section.id === sectionId))) return null;
  return { lessonId, sectionId: sectionId || null };
}

function navigateSection(lessonId, sectionId, updateHash = true) {
  const lesson = allLessons.find((item) => item.id === lessonId);
  if (!lesson?.sections?.some((section) => section.id === sectionId)) return;
  if (state.lessonId !== lessonId) selectLesson(lessonId, false);
  state.sectionId = sectionId;
  // Tampilkan kode bagian yang dipilih di editor tanpa menjalankan preview.
  if (!lesson.sections.find((section) => section.id === sectionId).custom) selectExample(sectionId);
  updateActiveNavigation();
  const hash = `#${lessonId}/${sectionId}`;
  if (updateHash && window.location.hash !== hash) window.location.hash = hash;
  setSidebar(false);
  const section = document.getElementById(`property-section-${sectionId}`);
  section?.scrollIntoView({ block: "start", behavior: "auto" });
  section?.focus({ preventScroll: true });
}

function refreshEditorLayout() {
  getWorkspaceEditor().refresh(wordWrap);
  CodeEditor.refreshPreviews(wordWrap);
}

function updateHighlight() {
  const value = $("#codeEditor").value;
  getWorkspaceEditor().update(value, state.activeFile, wordWrap);
  const lines = value.split("\n").length;
  $("#lineCount").textContent = `${lines} baris`;
}

function updateEditor() {
  const editor = $("#codeEditor");
  editor.value = filesFor(currentLesson())[state.activeFile];
  editor.scrollTop = 0;
  editor.scrollLeft = 0;
  const label = { html: "HTML", css: "CSS", js: "JavaScript" }[state.activeFile];
  $("#fileLanguage").textContent = label;
  editor.setAttribute("aria-label", `Kode ${label}`);
  $("#codePanel").setAttribute("aria-labelledby", `tab-${state.activeFile}`);
  $$(".file-tab").forEach((tab) => {
    const selected = tab.dataset.file === state.activeFile;
    tab.classList.toggle("is-active", selected);
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  updateHighlight();
}

function renderPropertyTable(rows, label) {
  if (!rows?.length) return "";
  return `<div class="property-table-scroll" role="region" aria-label="${escapeHtml(label)}" tabindex="0">
    <table class="property-table">
      <caption>${escapeHtml(label)}</caption>
      <thead><tr><th scope="col">Property CSS</th><th scope="col">Utility Tailwind</th><th scope="col">Keterangan</th></tr></thead>
      <tbody>${rows.map(([property, utilities, explanation]) => `<tr><th scope="row"><code>${escapeHtml(property)}</code></th><td>${utilities.split(" · ").map((utility) => `<code>${escapeHtml(utility)}</code>`).join(" ")}</td><td>${escapeHtml(explanation)}</td></tr>`).join("")}</tbody>
    </table>
  </div>`;
}

function renderLearningTable(table) {
  return `<div class="property-table-scroll" role="region" aria-label="${escapeHtml(table.title)}" tabindex="0">
    <table class="property-table learning-table">
      <caption>${escapeHtml(table.title)}</caption>
      <thead><tr>${table.headers.map((header) => `<th scope="col">${escapeHtml(header)}</th>`).join("")}</tr></thead>
      <tbody>${table.rows.map((row) => `<tr>${row.map((cell, index) => index === 0 ? `<th scope="row">${escapeHtml(cell)}</th>` : `<td>${escapeHtml(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
  </div>`;
}

function renderLearningPreparation(lesson, section) {
  return `${section.learningGoal ? `<p><strong>Setelah bagian ini:</strong> ${escapeHtml(section.learningGoal)}</p>` : ""}
    ${(section.learningTables || []).map(renderLearningTable).join("")}
    ${(section.learningSnippets || []).map((snippet) => `<div class="property-example">
      <div class="property-example-toolbar"><h3>${escapeHtml(snippet.title)}</h3></div>
      ${CodeEditor.sourceMarkup({ id: `${lesson.id}-${section.id}-${snippet.id}`, value: snippet.code, file: snippet.file || "js" })}
    </div>${snippet.explanation ? `<p>${escapeHtml(snippet.explanation)}</p>` : ""}`).join("")}
    ${section.learningSteps?.length ? `<div class="lesson-walkthrough"><h3>Cara mencoba contoh</h3><ol>${section.learningSteps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></div>` : ""}`;
}

function renderLearningReview(section) {
  return `${section.codeWalkthrough?.length ? `<div class="lesson-walkthrough"><h3>Membaca kode langkah demi langkah</h3><ol>${section.codeWalkthrough.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></div>` : ""}
    ${section.expectedResults?.length ? `<div class="lesson-walkthrough"><h3>Hasil yang seharusnya terlihat</h3><ul>${section.expectedResults.map((result) => `<li>${escapeHtml(result)}</li>`).join("")}</ul></div>` : ""}
    ${section.successCriteria?.length ? `<div class="lesson-walkthrough"><h3>Periksa pemahamanmu</h3><ul>${section.successCriteria.map((criterion) => `<li>${escapeHtml(criterion)}</li>`).join("")}</ul></div>` : ""}`;
}

function renderLessonPropertyReference() {
  const lesson = currentLesson();
  const visible = lesson.sectionId === "tailwind" && Boolean(lesson.propertyRows?.length);
  $("#lessonPropertyReference").hidden = !visible;
  $("#lessonPropertyTable").innerHTML = visible
    ? renderPropertyTable(lesson.propertyRows, `Property dan utility: ${lesson.title}`)
    : "";
}

function renderCodeComparison() {
  const lesson = currentLesson();
  const panel = $("#codeComparison");
  panel.hidden = !lesson.comparison;
  if (panel.hidden) { panel.innerHTML = ""; return; }
  const examples = [lesson.comparison.left, lesson.comparison.right].map((id) => exampleFor(lesson, id));
  panel.innerHTML = `<h2>Hasil setara, kode yang ditulis berbeda</h2>
    <p>Bandingkan dua dokumen lengkap ini. CSS native ditulis di dalam <code>style</code>; versi Tailwind memakai utility dan satu script library.</p>
    <div class="code-comparison-grid">${examples.map((example) => {
      const source = filesFor(lesson, example.id).html;
      const lines = source.split("\n").length;
      const characters = source.replace(/\s/g, "").length;
      return `<article class="code-comparison-card"><h3>${escapeHtml(example.title)}</h3>
        <p class="code-comparison-count">${lines} baris HTML · ${characters} karakter tanpa spasi</p>
        <p>${example.runtime === "none" ? "Aturan komponen ditulis dengan CSS sendiri. Tidak memuat Tailwind." : "Tidak menulis CSS komponen sendiri. Utility disediakan Tailwind."}</p>
        <button type="button" data-property-action="run" data-section-id="${example.id}">Run ${example.runtime === "none" ? "CSS native" : "Tailwind"}</button>
      </article>`;
    }).join("")}</div>
    <p class="property-reference-note">Jumlah dihitung dari kode HTML yang sedang ditampilkan, termasuk style atau script, dan ikut berubah saat diedit. Ini membandingkan kode yang kita tulis untuk contoh ini, bukan ukuran library yang diunduh. Format penulisan dapat memengaruhi jumlah baris.</p>`;
}

function guidedSourceSize(lesson, section) {
  const source = filesFor(lesson, section.id).html;
  const lines = source.split("\n").length;
  const characters = source.replace(/\s/g, "").length;
  return `${lines} baris · ${characters.toLocaleString("id-ID")} karakter kode tanpa spasi · ${section.moduleCount} modul proyek tambahan`;
}

function renderLessonSections() {
  const lesson = currentLesson();
  const container = $("#lessonSections");
  container.hidden = false;
  $("#lessonExampleSections").hidden = false;
  container.innerHTML = `
    <nav class="property-toc" aria-labelledby="propertyTocTitle">
      <p class="section-label">DAFTAR ISI HALAMAN</p>
      <div class="material-toc-heading"><h2 id="propertyTocTitle">Belajar selangkah demi selangkah</h2><button type="button" class="material-add-new" data-material-add disabled>Add new</button></div>
      <p>Pilih bagian untuk membaca penjelasan dan memuat kodenya ke editor. Tekan Run jika ingin melihat hasilnya di preview. Untuk latihan, ketik ulang kode secara manual; jangan copy-paste.</p>
      <ol>${(lesson.sections || []).map((section) => `<li><button type="button" data-property-jump="${section.id}">${escapeHtml(section.title)}</button></li>`).join("")}</ol>
    </nav>
    ${(lesson.sections || []).map((section, index) => section.custom ? window.MaterialEditor.sectionMarkup(lesson, section, index) : `
      <section id="property-section-${section.id}" class="property-section" aria-labelledby="property-title-${section.id}" tabindex="-1">
        <p class="section-label">BAGIAN ${index + 1} / ${lesson.sections.length}</p>
        <h2 id="property-title-${section.id}">${lesson.number}.${index + 1} ${escapeHtml(section.title)}</h2>
        <div class="material-section-body" data-material-body="${section.id}">
        ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
        ${renderLearningPreparation(lesson, section)}
        <p class="manual-typing-hint"><strong>Praktik mahasiswa:</strong> jadikan blok kode sebagai acuan, pilih semua kode di editor lalu hapus, kemudian ketik ulang manual. Jangan copy-paste. Copy hanya untuk instruktur.</p>
        ${section.connections?.length ? `<div class="guided-connections"><h3>Konsep yang digabungkan</h3><ul>${section.connections.map((item) => `<li><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join("")}</ul></div>` : ""}
        ${section.steps?.length ? `<div class="lesson-walkthrough"><h3>Panduan membuat halaman</h3>${section.duration ? `<p>${escapeHtml(section.duration)}</p>` : ""}<ol>${section.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol></div>` : ""}
        ${renderPropertyTable(section.rows, `Property dan utility: ${section.title}`)}
        <div class="property-example">
          <div class="property-example-toolbar"><h3>${section.guided ? "Guided Learning Source Code" : `Contoh ${escapeHtml(section.title.split(":")[0])}`}</h3><div>
            <button type="button" data-property-action="copy" data-section-id="${section.id}" aria-label="Salin contoh ${escapeHtml(section.title)} untuk instruktur" title="Copy untuk instruktur">Copy · instruktur</button>
            <button class="property-run" type="button" data-property-action="run" data-section-id="${section.id}" aria-label="Edit dan jalankan contoh ${escapeHtml(section.title)}">Run ▶</button>
          </div></div>
          ${section.guided ? `<p class="guided-source-size" id="guided-source-size-${section.id}">${escapeHtml(guidedSourceSize(lesson, section))}</p>` : ""}
          ${CodeEditor.sourceMarkup({ id: section.id, value: filesFor(lesson, section.id)[section.codeFile || "html"], file: section.codeFile || "html", guided: section.guided })}
        </div>
        ${renderLearningReview(section)}
        <p class="property-note"><strong>Perhatikan:</strong> ${escapeHtml(section.note)}</p>
        ${section.references?.length ? `<p class="property-note"><strong>Referensi dokumentasi:</strong> ${section.references.map((reference) => `<a href="${escapeHtml(reference.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(reference.label)}</a>`).join(" · ")}</p>` : ""}
        <div class="property-exercise"><strong>Latihan bagian ini</strong><p>${escapeHtml(section.exercise)}</p></div>
        ${section.challenges?.length ? `<div class="guided-challenges" aria-labelledby="guided-challenges-${section.id}">
          <h3 id="guided-challenges-${section.id}">Tantangan mandiri: edit source code di atas</h3>
          <p>Ketik dan kembangkan kode sendiri pada versi Guided Learning yang sama. Ubah satu hal, tulis dugaanmu, tekan Run, lalu cek kriteria berhasil. Tombol Copy untuk instruktur; simpan hasil kerja dengan cara yang ditetapkan instruktur sebelum Reset mengembalikan contoh awal.</p>
          <button type="button" class="guided-edit-button" aria-controls="codeEditor" data-property-action="edit" data-section-id="${section.id}">Buka source code di editor</button>
          <ol class="guided-challenge-list">${section.challenges.map((challenge) => `<li>
            <h4>${escapeHtml(challenge.title)}</h4>
            <p class="guided-target"><strong>Sasaran kode:</strong> <code>${escapeHtml(challenge.target)}</code></p>
            <p>${escapeHtml(challenge.instruction)}</p>
            <p><strong>Kriteria berhasil:</strong> ${escapeHtml(challenge.expected)}</p>
            <details><summary>Petunjuk jika buntu</summary><p>${escapeHtml(challenge.hint)}</p></details>
          </li>`).join("")}</ol>
          <h4>Hasil yang perlu disiapkan</h4><ul>${section.completion.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>` : ""}
        </div>
      </section>`).join("")}`;
  CodeEditor.mountPreviews(wordWrap);
  renderCodeComparison();
  window.MaterialEditor?.mount(lesson, refreshMaterialSections);
}

function refreshMaterialSections(lesson) {
  const navItem = $(`.nav-lesson[data-lesson-id="${lesson.id}"]`)?.closest('.nav-lesson-item');
  if (navItem) {
    let list = navItem.querySelector('.nav-subsections');
    if (!list) { list = document.createElement('ul'); list.className = 'nav-subsections'; list.setAttribute('aria-label', `Bagian ${lesson.title}`); navItem.append(list); }
    list.innerHTML = lesson.sections.map((section) => `<li><a class="nav-subsection" href="#${lesson.id}/${section.id}" data-lesson-id="${lesson.id}" data-section-id="${section.id}"><span class="nav-bullet" aria-hidden="true">–</span><span>${escapeHtml(section.title)}</span></a></li>`).join('');
  }
  if (state.lessonId === lesson.id) {
    $('#lessonSections .property-toc ol').innerHTML = lesson.sections.map((section) => `<li><button type="button" data-property-jump="${section.id}">${escapeHtml(section.title)}</button></li>`).join('');
    lesson.sections.forEach((section, index) => {
      const node = document.getElementById(`property-section-${section.id}`);
      if (!node) return;
      node.querySelector('.section-label').textContent = `BAGIAN ${index + 1} / ${lesson.sections.length}`;
      node.querySelector('h2').textContent = `${lesson.number}.${index + 1} ${section.title}`;
    });
    if (state.sectionId && !lesson.sections.some((section) => section.id === state.sectionId)) {
      state.sectionId = null;
      history.replaceState(null, '', `#${lesson.id}`);
    }
  }
  filterNavigation();
  updateActiveNavigation();
}

function updateExampleContext() {
  const lesson = currentLesson();
  const example = exampleFor(lesson);
  $("#exampleContext").hidden = !lesson.sections?.length;
  $("#exampleLabel").textContent = `Contoh aktif: ${example ? example.title : "Contoh pengantar"}`;
  $("#overviewExample").hidden = !example;
  $("#assignmentText").textContent = example?.exercise || lesson.assignmentText;
  $$('[data-property-action="run"]').forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.sectionId === state.exampleId));
  });
}

function selectExample(id) {
  if (id !== null && !exampleFor(currentLesson(), id)) return false;
  state.exampleId = id;
  state.activeFile = exampleFor(currentLesson(), id)?.codeFile || "html";
  clearPreview();
  updateEditor();
  updateExampleContext();
  return true;
}

function scrollToWorkspace() {
  $("#lessonWorkspace").scrollIntoView({ block: "start", behavior: "auto" });
  $("#codeEditor").focus({ preventScroll: true });
}

function refreshSectionSnippet() {
  renderCodeComparison();
  if (!state.exampleId) return;
  const file = exampleFor(currentLesson())?.codeFile || "html";
  CodeEditor.updatePreview(state.exampleId, filesFor(currentLesson())[file], file, wordWrap);
  const section = exampleFor(currentLesson());
  const sizeLabel = document.getElementById(`guided-source-size-${state.exampleId}`);
  if (section?.guided && sizeLabel) sizeLabel.textContent = guidedSourceSize(currentLesson(), section);
}

function clearPreview() {
  runSequence++;
  activeRun = null;
  clearTimeout(runTimeout);
  $("#previewFrame").srcdoc = "";
  $("#previewEmpty").classList.remove("is-hidden");
  setPreviewStatus("Belum dijalankan");
  setConsole("Preview belum dijalankan. Ubah contoh lalu tekan Run.");
}

function renderLesson() {
  const lesson = currentLesson();
  const track = lessonCatalog.find((item) => item.sectionId === lesson.sectionId);
  const position = allLessons.indexOf(lesson);
  document.title = `${lesson.number} ${lesson.title} — ${track.sectionLabel} | Codeforge Lab`;
  $("#breadcrumbTrack").textContent = track.sectionLabel;
  $("#breadcrumbSection").textContent = `${lesson.groupNumber}. ${lesson.groupTitle}`;
  $("#lessonTrack").textContent = track.sectionLabel.toUpperCase();
  $("#lessonIndex").textContent = `Materi ${lesson.number}`;
  $("#lessonTitle").textContent = `${lesson.number} ${lesson.title}`;
  $("#lessonDescription").textContent = lesson.description;
  $("#practiceTitle").textContent = lesson.practiceTitle;
  $("#lessonLead").textContent = lesson.lead;
  $("#lessonWalkthrough").innerHTML = (lesson.walkthrough || []).map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  $("#lessonNote").textContent = lesson.note;
  $("#assignmentText").textContent = lesson.assignmentText;
  $("#outcomeList").innerHTML = lesson.outcomes.map(([title, text]) => `<div class="outcome-item"><strong>${escapeHtml(title)}</strong>${escapeHtml(text)}</div>`).join("");
  $("#lessonReference").href = track.reference;
  $("#lessonReference").textContent = `Referensi ${track.sectionLabel} ↗`;
  $("#previousLesson").disabled = position === 0;
  $("#nextLesson").disabled = position === allLessons.length - 1;
  $("#previousTitle").textContent = allLessons[position - 1]?.title || "Materi pertama";
  $("#nextTitle").textContent = allLessons[position + 1]?.title || "Materi terakhir";
  clearPreview();
  updateEditor();
  renderLessonPropertyReference();
  renderLessonSections();
  updateExampleContext();
  updateActiveNavigation();
}

function setSidebar(open) {
  $("#sidebar").classList.toggle("is-open", open);
  $("#sidebarBackdrop").hidden = !open;
  $("#openSidebar").setAttribute("aria-expanded", String(open));
}

function selectLesson(id, updateHash = true) {
  if (!allLessons.some((lesson) => lesson.id === id)) return;
  state.lessonId = id;
  state.sectionId = null;
  state.exampleId = currentLesson().sections?.find((section) => !section.custom)?.id || null;
  state.activeFile = exampleFor(currentLesson())?.codeFile || "html";
  renderLesson();
  $$(".nav-section").forEach((track) => {
    if (track.dataset.track === currentLesson().sectionId) {
      track.open = true;
      if (track.dataset.searchOpen) track.dataset.searchOpen = "true";
    }
  });
  if (updateHash && window.location.hash !== `#${id}`) window.location.hash = id;
  setSidebar(false);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function loadRuntimes() {
  if (!runtimePromise) {
    runtimePromise = Promise.all(["tailwind-3.4.17.js", "jquery-3.7.1.min.js"].map(async (name) => {
      const response = await fetch(new URL(`./vendor/${name}`, document.baseURI));
      if (!response.ok) throw new Error(`Library ${name} gagal dimuat (HTTP ${response.status}).`);
      return response.text();
    })).catch((error) => { runtimePromise = null; throw error; });
  }
  return runtimePromise;
}

// Karakter '<' di dalam string JS di-escape melalui JSON, sehingga isi editor
// tidak dapat menutup script pembungkus dan isi string pengguna tetap sama.
function scriptTag(source) {
  return `<script>${source}</script>`;
}

function scriptString(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

function makePreviewDocument(files, runtimes, token) {
  const bridge = scriptTag(`(() => {
    const token = ${scriptString(token)};
    const report = (type, message) => parent.postMessage({ source: "codeforge-preview", token, type, message: String(message) }, "*");
    window.addEventListener("error", (event) => {
      if (event.target !== window) {
        const target = event.target;
        report("error", "Resource gagal dimuat: " + (target.src || target.href || target.tagName));
        return;
      }
      const where = event.filename ? " (" + event.filename + ":" + event.lineno + ":" + event.colno + ")" : "";
      report("error", event.message + where);
    }, true);
    window.addEventListener("unhandledrejection", (event) => report("error", "Promise ditolak: " + (event.reason?.message || event.reason)));
    const originalError = console.error.bind(console);
    console.error = (...args) => { originalError(...args); report("error", args.map(String).join(" ")); };
    window.addEventListener("keydown", (event) => { if (event.key === "Escape") report("escape", ""); });
    window.addEventListener("load", () => report("ready", "Preview siap. Coba interaksi pada contoh."));
  })();`);
  // Parser mendukung cuplikan body maupun dokumen HTML lengkap. Script HTML
  // pengguna dipertahankan; bridge dipasang sebelum semuanya agar error tertangkap.
  const parsed = new DOMParser().parseFromString(files.html, "text/html");
  const baseUrl = escapeHtml(new URL("./", document.baseURI).href);
  const libraries = runtimes.map((source) => scriptTag(`try { (0, eval)(${scriptString(source)}); } catch (error) { console.error(error.message); }`)).join("");
  const userScript = scriptTag(`try {
    const script = document.createElement("script");
    script.textContent = ${scriptString(files.js + "\n//# sourceURL=contoh-script.js")};
    document.body.appendChild(script);
  } catch (error) { console.error(error.message); }`);
  const customStyle = scriptTag(`(() => { const customStyle = document.createElement("style"); customStyle.textContent = ${scriptString(files.css)}; document.head.appendChild(customStyle); })();`);
  const bodyAttributes = [...parsed.body.attributes].map((attribute) => `${attribute.name}="${escapeHtml(attribute.value)}"`).join(" ");
  return `<!doctype html><html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><base href="${baseUrl}">${bridge}${libraries}<style>body{margin:0;font:16px/1.5 system-ui,sans-serif}button,input,textarea{font:inherit}</style>${parsed.head.innerHTML}${customStyle}</head><body ${bodyAttributes}>${parsed.body.innerHTML}${userScript}</body></html>`;
}

async function runCode() {
  setPreviewVisible(true);
  const sequence = ++runSequence;
  const token = `${sequence}-${Date.now()}`;
  // Jalankan snapshot kode ketika Run ditekan, meskipun editor berubah saat loading.
  const files = { ...filesFor(currentLesson()) };
  const example = exampleFor(currentLesson()) || currentLesson();
  // Dokumen mandiri menyediakan script sendiri. Native tidak memuat library;
  // contoh CDN tidak boleh memakai fallback lokal yang menyamarkan hasil demo.
  const runtime = example.runtime || "local";
  clearTimeout(runTimeout);
  activeRun = { token, hasError: false };
  setPreviewStatus("Menjalankan…", "running");
  setConsole("Menjalankan kode di browser sandbox…");
  try {
    const runtimes = runtime === "local" ? await loadRuntimes() : [];
    if (sequence !== runSequence) return;
    $("#previewEmpty").classList.add("is-hidden");
    $("#previewFrame").srcdoc = makePreviewDocument(files, runtimes, token);
    runTimeout = setTimeout(() => {
      if (activeRun?.token !== token) return;
      activeRun.hasError = true;
      setPreviewStatus("Error", "error");
      setConsole("Preview belum selesai setelah 10 detik. Periksa script, resource eksternal, atau loop pada contoh.", true);
    }, 10000);
  } catch (error) {
    if (sequence !== runSequence) return;
    activeRun.hasError = true;
    setPreviewStatus("Error", "error");
    setConsole(`${error.message} Jalankan aplikasi melalui server HTTP lokal.`, true);
  }
}

async function copyCodeValue(value, button) {
  let copied = false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      copied = true;
    }
  } catch (_) { /* Coba fallback pada browser yang membatasi Clipboard API. */ }
  if (!copied) {
    const focus = document.activeElement;
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("aria-hidden", "true");
    temporary.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.appendChild(temporary);
    temporary.select();
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    temporary.remove();
    focus?.focus();
  }
  clearTimeout(copyTimers.get(button));
  button.textContent = copied ? "✓ Tersalin" : "Copy gagal";
  if (!copied) setConsole("Kode belum tersalin untuk instruktur. Pilih kode di editor dan gunakan Ctrl/Cmd+C.", true);
  copyTimers.set(button, setTimeout(() => { button.textContent = "Copy · instruktur"; }, 1600));
}

async function copyCurrentCode() {
  await copyCodeValue($("#codeEditor").value, $("#copyCode"));
}

function resetCode() {
  const lesson = currentLesson();
  state.code[codeKeyFor(lesson)] = { ...(exampleFor(lesson) || lesson).code };
  updateEditor();
  refreshSectionSnippet();
  clearPreview();
  setConsole("Semua file contoh aktif dikembalikan ke kondisi awal. Tekan Run untuk menjalankannya.");
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  $("#themeToggle").setAttribute("aria-label", `Gunakan tema ${theme === "light" ? "gelap" : "terang"}`);
  try { localStorage.setItem("codeforge-theme", theme); } catch (_) { /* Tema tetap bekerja tanpa penyimpanan. */ }
}

function bindEvents() {
  $("#closePreview").addEventListener("click", async () => {
    const panel = $("#previewPanel");
    if (document.fullscreenElement === panel || panel.classList.contains("is-fullscreen")) {
      await togglePanelFullscreen("preview");
    }
    setPreviewVisible(false);
    $("#codeEditor").focus({ preventScroll: true });
  });
  $("#showPreview").addEventListener("click", () => {
    setPreviewVisible(true);
    $("#closePreview").focus({ preventScroll: true });
  });
  $("#decreaseCodeFont").addEventListener("click", () => setCodeFontSize(codeFontSize - 2));
  $("#increaseCodeFont").addEventListener("click", () => setCodeFontSize(codeFontSize + 2));
  $("#resetCodeFont").addEventListener("click", () => setCodeFontSize(CODE_FONT_DEFAULT));
  $("#wordWrapToggle").addEventListener("click", () => setWordWrap(!wordWrap));
  $("#courseNav").addEventListener("click", (event) => {
    const button = event.target.closest("[data-lesson-id]");
    if (!button) return;
    event.preventDefault();
    if (button.dataset.sectionId) navigateSection(button.dataset.lessonId, button.dataset.sectionId);
    else selectLesson(button.dataset.lessonId);
  });
  $("#lessonSearch").addEventListener("input", filterNavigation);
  $("#lessonExampleSections").addEventListener("click", async (event) => {
    const jump = event.target.closest("[data-property-jump]");
    if (jump) {
      navigateSection(state.lessonId, jump.dataset.propertyJump);
      return;
    }
    const button = event.target.closest("[data-property-action]");
    if (!button) return;
    const example = exampleFor(currentLesson(), button.dataset.sectionId);
    if (!example) return;
    if (button.dataset.propertyAction === "copy") await copyCodeValue(filesFor(currentLesson(), example.id)[example.codeFile || "html"], button);
    if (button.dataset.propertyAction === "edit" && selectExample(example.id)) scrollToWorkspace();
    if (button.dataset.propertyAction === "run" && selectExample(example.id)) {
      scrollToWorkspace();
      await runCode();
    }
  });
  $("#overviewExample").addEventListener("click", () => { selectExample(null); scrollToWorkspace(); });
  $$(".file-tab").forEach((tab, index, tabs) => {
    tab.addEventListener("click", () => { state.activeFile = tab.dataset.file; updateEditor(); });
    tab.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index + tabs.length - 1) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      tabs[nextIndex].click();
      tabs[nextIndex].focus();
    });
  });
  $("#codeEditor").addEventListener("input", () => {
    filesFor(currentLesson())[state.activeFile] = $("#codeEditor").value;
    updateHighlight();
    refreshSectionSnippet();
  });
  $("#runCode").addEventListener("click", runCode);
  $("#runCodeSecondary").addEventListener("click", runCode);
  $("#copyCode").addEventListener("click", copyCurrentCode);
  $("#toggleEditorFullscreen").addEventListener("click", () => togglePanelFullscreen("editor"));
  $("#togglePreviewFullscreen").addEventListener("click", () => togglePanelFullscreen("preview"));
  $("#toggleWorkspaceFullscreen").addEventListener("click", () => togglePanelFullscreen("workspace"));
  const workspaceResizer = $("#workspaceResizer");
  workspaceResizer.addEventListener("pointerdown", (event) => {
    if (!workspaceFullscreenActive()) return;
    event.preventDefault();
    draggingWorkspaceResizer = true;
    workspaceResizer.setPointerCapture?.(event.pointerId);
    setWorkspaceEditorWidth(event.clientX);
  });
  workspaceResizer.addEventListener("pointermove", (event) => {
    if (draggingWorkspaceResizer && workspaceFullscreenActive()) setWorkspaceEditorWidth(event.clientX);
  });
  const finishWorkspaceResize = (event) => {
    if (!draggingWorkspaceResizer) return;
    draggingWorkspaceResizer = false;
    workspaceResizer.releasePointerCapture?.(event.pointerId);
  };
  workspaceResizer.addEventListener("pointerup", finishWorkspaceResize);
  workspaceResizer.addEventListener("pointercancel", finishWorkspaceResize);
  workspaceResizer.addEventListener("keydown", resizeWorkspaceEditorByKeyboard);
  document.addEventListener("fullscreenchange", syncFullscreenButtons);
  $("#resetCode").addEventListener("click", resetCode);
  $("#focusEditor").addEventListener("click", () => $("#codeEditor").focus());
  $("#clearConsole").addEventListener("click", () => setConsole("Pesan dibersihkan. Jalankan ulang contoh untuk memeriksa hasil terbaru."));
  $("#previousLesson").addEventListener("click", () => selectLesson(allLessons[allLessons.indexOf(currentLesson()) - 1]?.id));
  $("#nextLesson").addEventListener("click", () => selectLesson(allLessons[allLessons.indexOf(currentLesson()) + 1]?.id));
  $("#themeToggle").addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  $("#openSidebar").addEventListener("click", () => { setSidebar(true); $("#closeSidebar").focus(); });
  $("#closeSidebar").addEventListener("click", () => { setSidebar(false); $("#openSidebar").focus(); });
  $("#sidebarBackdrop").addEventListener("click", () => { setSidebar(false); $("#openSidebar").focus(); });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && !event.target.closest?.(".material-edit-panel")) { event.preventDefault(); runCode(); }
    if (event.key === "Escape" && exitFallbackFullscreen()) {
      event.preventDefault();
      return;
    }
    if (event.key === "Escape" && $("#sidebar").classList.contains("is-open")) { setSidebar(false); $("#openSidebar").focus(); }
  });
  window.addEventListener("hashchange", () => {
    const target = navigationTarget();
    if (!target) return;
    if (target.sectionId) navigateSection(target.lessonId, target.sectionId, false);
    else if (target.lessonId !== state.lessonId || state.sectionId) selectLesson(target.lessonId, false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 800) setSidebar(false);
    syncWorkspaceColumns();
    refreshEditorLayout();
  });
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (event.source !== $("#previewFrame").contentWindow || data?.source !== "codeforge-preview" || data.token !== activeRun?.token) return;
    if (data.type === "escape") exitFallbackFullscreen();
    if (data.type === "error") {
      clearTimeout(runTimeout);
      activeRun.hasError = true;
      setPreviewStatus("Error", "error");
      setConsole(`Error preview: ${data.message}`, true);
    }
    if (data.type === "ready") {
      clearTimeout(runTimeout);
      if (activeRun.hasError) return;
      setPreviewStatus("Siap");
      setConsole(data.message);
    }
  });
}

async function init() {
  let theme = "light";
  let savedCodeFont = CODE_FONT_DEFAULT;
  let savedWordWrap = false;
  try { theme = localStorage.getItem("codeforge-theme") || theme; } catch (_) { /* Storage opsional. */ }
  try { savedCodeFont = localStorage.getItem("codeforge-code-font-size") || CODE_FONT_DEFAULT; } catch (_) { /* Storage opsional. */ }
  try { savedWordWrap = localStorage.getItem("codeforge-word-wrap") === "true"; } catch (_) { /* Storage opsional. */ }
  setTheme(theme === "dark" ? "dark" : "light");
  setCodeFontSize(savedCodeFont, false);
  setWordWrap(savedWordWrap, false);
  if (window.MaterialEditor) await window.MaterialEditor.loadSections(allLessons);
  const target = navigationTarget();
  if (target) state.lessonId = target.lessonId;
  state.exampleId = currentLesson().sections?.find((section) => !section.custom)?.id || null;
  state.activeFile = exampleFor(currentLesson())?.codeFile || "html";
  renderNavigation();
  bindEvents();
  renderLesson();
  if (target?.sectionId) navigateSection(target.lessonId, target.sectionId, false);
  // Prefetch sekali; kegagalan dapat dicoba ulang saat instruktur menekan Run.
  loadRuntimes().catch(() => {});
}

init();
