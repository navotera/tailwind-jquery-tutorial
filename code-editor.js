// Satu renderer untuk editor workspace dan source code di semua bagian materi.
const CodeEditor = (() => {
  const previews = new Map();
  const languages = { html: "markup", css: "css", js: "javascript" };
  const labels = { html: "HTML", css: "CSS", js: "JavaScript" };
  const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));

  function highlight(value, file = "html") {
    const language = languages[file];
    const grammar = window.Prism?.languages[language];
    return grammar ? window.Prism.highlight(value, grammar, language) : escape(value);
  }

  function attach({ input, highlight: layer, code, numbers, measure, value = "", file = "html" }) {
    const surface = input || layer;
    let source = value;
    let activeFile = file;
    let wrapped = false;

    function syncScroll() {
      if (input) {
        layer.scrollTop = input.scrollTop;
        layer.scrollLeft = input.scrollLeft;
      }
      numbers.style.transform = `translateY(${-surface.scrollTop}px)`;
    }

    function refresh(wrap = wrapped) {
      wrapped = wrap;
      const lines = (input ? input.value : source).split("\n");
      if (input && surface.clientWidth > 0) layer.style.width = `${surface.clientWidth}px`;
      if (!wrapped || !surface.clientWidth) {
        numbers.textContent = lines.map((_, index) => index + 1).join("\n");
        measure.innerHTML = "";
        syncScroll();
        return;
      }
      // Gunakan lebar tanpa scrollbar yang sama dengan permukaan kode.
      const computed = window.getComputedStyle(surface);
      const width = surface.clientWidth - parseFloat(computed.paddingLeft) - parseFloat(computed.paddingRight);
      const lineHeight = parseFloat(computed.lineHeight);
      measure.style.width = `${Math.max(width, 1)}px`;
      measure.innerHTML = lines.map((line) => `<span class="code-measure-line">${escape(line || "\u200b")}</span>`).join("");
      numbers.innerHTML = [...measure.children].map((line, index) => {
        const height = Math.max(line.getBoundingClientRect().height, lineHeight);
        return `<span class="code-line-number" style="height:${height}px">${index + 1}</span>`;
      }).join("");
      syncScroll();
    }

    function update(value, file = activeFile, wrap = wrapped) {
      source = String(value);
      activeFile = file;
      if (input && input.value !== source) input.value = source;
      code.innerHTML = highlight(source + "\n", activeFile);
      refresh(wrap);
    }

    surface.addEventListener("scroll", syncScroll);
    return { update, refresh, syncScroll };
  }

  function sourceMarkup({ id, value, file = "html", guided = false }) {
    const numbers = value.split("\n").map((_, index) => index + 1).join("\n");
    return `<div class="editor-frame code-example-frame${guided ? " guided-source-code" : ""}" data-code-preview="${escape(id)}" data-code-file="${escape(file)}">
      <div class="line-number-viewport" aria-hidden="true"><div class="line-numbers">${numbers}</div></div>
      <div class="code-layer">
        <pre class="code-highlight property-code" tabindex="0" role="region" aria-label="Source code ${labels[file]}"><code id="property-code-${escape(id)}">${highlight(value + "\n", file)}</code></pre>
        <div class="code-measure" aria-hidden="true"></div>
      </div>
    </div>`;
  }

  function mountPreviews(wrapped = false) {
    // Bagian lama telah dilepas dari DOM saat materi diganti.
    previews.clear();
    document.querySelectorAll("[data-code-preview]").forEach((root) => {
      const code = root.querySelector("code");
      const controller = attach({
        highlight: root.querySelector(".code-highlight"), code,
        numbers: root.querySelector(".line-numbers"), measure: root.querySelector(".code-measure"),
        value: code.textContent.slice(0, -1), file: root.dataset.codeFile
      });
      previews.set(root.dataset.codePreview, controller);
      controller.refresh(wrapped);
    });
  }

  function updatePreview(id, value, file, wrapped) {
    previews.get(id)?.update(value, file, wrapped);
  }

  function refreshPreviews(wrapped) {
    previews.forEach((controller) => controller.refresh(wrapped));
  }

  return { attach, highlight, sourceMarkup, mountPreviews, updatePreview, refreshPreviews };
})();
