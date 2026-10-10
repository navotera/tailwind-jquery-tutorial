import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const html = read("index.html");
const application = read("app.js");
const editorModule = read("code-editor.js");
const curriculum = read("lessons.js");
const essentials = read("essential-lessons.js");
const properties = read("utility-properties.js");
const guides = read("lesson-guides.js");
const examples = read("lesson-examples.js");
const references = read("tailwind-reference.js");
const guidedProjects = read("guided-learning.js");
const javascriptLessons = read("javascript-lessons.js");
const practicePlans = read("guided-practice.js");
const capstoneProjects = read("guided-capstones.js");
const guidedBaseline = JSON.parse(read('tests/fixtures/guided-source-baseline.json'));
const require = createRequire(import.meta.url);
globalThis.Prism = require(fileURLToPath(new URL("vendor/prism-1.29.0.min.js", root)));
require(fileURLToPath(new URL("vendor/prism-css.min.js", root)));
require(fileURLToPath(new URL("vendor/prism-javascript.min.js", root)));

class Element {
  constructor(id) {
    this.id = id;
    this.value = "";
    this.textContent = "";
    this.innerHTML = "";
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this.events = {};
    this.classes = new Set();
    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.classList = {
      toggle: (name, force) => force ? this.classes.add(name) : this.classes.delete(name),
      add: (name) => this.classes.add(name),
      remove: (name) => this.classes.delete(name),
      contains: (name) => this.classes.has(name)
    };
  }
  setAttribute(name, value) { this.attributes[name] = value; }
  getAttribute(name) { return this.attributes[name] ?? null; }
  removeAttribute(name) { delete this.attributes[name]; }
  addEventListener(name, handler) { this.events[name] = handler; }
  focus() { this.focused = true; }
  scrollIntoView() { this.scrolled = true; }
  select() { copiedValue = this.value; }
  remove() {}
}

const elements = new Map([...html.matchAll(/\bid="([^"]+)"/g)].map((match) => [match[1], new Element(match[1])]));
const tabs = ["html", "css", "js"].map((file) => { const element = elements.get(`tab-${file}`); element.dataset.file = file; return element; });
const windowEvents = {};
const documentEvents = {};
const timers = new Map();
let timerSequence = 0;
let copiedValue;
let copyAllowed = true;
let navButtons = [];
let navLinks = [];
let navTracks = [];
let clipboard = [];
const runtimeFetches = [];
const frameWindow = {};
elements.get("previewFrame").contentWindow = frameWindow;
const document = {
  baseURI: "http://localhost/tailwind-jquery-tutorial/",
  documentElement: { dataset: {}, style: { setProperty(name, value) { this[name] = value; } } },
  activeElement: elements.get("codeEditor"),
  querySelector(selector) {
    assert.ok(selector.startsWith("#"), `Selector tidak didukung fixture: ${selector}`);
    assert.ok(elements.has(selector.slice(1)), `ID tidak ditemukan di index.html: ${selector}`);
    return elements.get(selector.slice(1));
  },
  querySelectorAll(selector) {
    if (selector === "[data-code-preview]") {
      return [...elements.get("lessonSections").innerHTML.matchAll(/data-code-preview="([^"]+)" data-code-file="([^"]+)"[\s\S]*?<code id="([^"]+)">([\s\S]*?)<\/code>/g)].map((match) => {
        const root = new Element(`preview-${match[1]}`);
        root.dataset = { codePreview: match[1], codeFile: match[2] };
        const code = new Element(match[3]);
        code.innerHTML = match[4];
        code.textContent = match[4].replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");
        const layer = new Element(`preview-layer-${match[1]}`);
        const numbers = new Element(`preview-numbers-${match[1]}`);
        const measure = new Element(`preview-measure-${match[1]}`);
        elements.set(code.id, code);
        elements.set(layer.id, layer);
        elements.set(numbers.id, numbers);
        elements.set(measure.id, measure);
        root.querySelector = (selector) => ({ code, ".code-highlight": layer, ".line-numbers": numbers, ".code-measure": measure })[selector];
        return root;
      });
    }
    if (selector === ".file-tab") return tabs;
    if (selector === ".nav-lesson") return navButtons;
    if (selector === ".nav-subsection") return navLinks;
    if (selector === ".nav-section") return navTracks;
    return [];
  },
  getElementById: (id) => elements.get(id) || null,
  addEventListener: (name, handler) => { documentEvents[name] = handler; },
  createElement: (name) => new Element(name),
  body: { appendChild() {} },
  execCommand: () => copyAllowed
};
const context = vm.createContext({
  console, document, URL, Date, JSON, Promise,
  window: { Prism, location: { hash: "" }, scrollTo() {}, addEventListener: (name, handler) => { windowEvents[name] = handler; } },
  navigator: { clipboard: { writeText: async (value) => { clipboard.push(value); } } },
  localStorage: { getItem() { throw new Error("storage blocked"); }, setItem() { throw new Error("storage blocked"); } },
  setTimeout: (handler) => { const id = ++timerSequence; timers.set(id, handler); return id; },
  clearTimeout: (id) => timers.delete(id),
  fetch: async (url) => {
    runtimeFetches.push(String(url));
    return { ok: true, text: async () => String(url).includes("tailwind") ? "/* local Tailwind runtime */" : "/* local jQuery runtime */" };
  },
  DOMParser: class {
    parseFromString(source) {
      // Fixture untuk memeriksa komposisi dokumen; bukan pengganti parser browser.
      const full = /^\s*(?:<!doctype|<html)/i.test(source);
      const body = full ? source.match(/<body([^>]*)>([\s\S]*?)<\/body>/i) : null;
      const attributes = body ? [...body[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => ({ name: match[1], value: match[2] })) : [];
      return { head: { innerHTML: full ? source.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "" : "" }, body: { innerHTML: body ? body[2] : source, attributes } };
    }
  }
});
vm.runInContext(properties, context);
vm.runInContext(curriculum, context);
vm.runInContext(essentials, context);
vm.runInContext(guides, context);
vm.runInContext(examples, context);
vm.runInContext(references, context);
vm.runInContext(practicePlans, context);
vm.runInContext(capstoneProjects, context);
vm.runInContext(guidedProjects, context);
vm.runInContext(javascriptLessons, context);
vm.runInContext(editorModule, context);
vm.runInContext(application.replace(/\ninit\(\);\s*$/, ""), context);
const run = (code) => vm.runInContext(code, context);
const catalog = run("lessonCatalog");
const lessons = run("allLessons");
const tailwindLessons = lessons.filter((lesson) => lesson.sectionId === "tailwind");
const tailwindSections = tailwindLessons.flatMap((lesson) => lesson.sections || []);
const frameworkLesson = lessons.find((lesson) => lesson.id === "tw-framework");
const nativeExample = frameworkLesson.sections.find((section) => section.id === "css-biasa");
const utilityExample = frameworkLesson.sections.find((section) => section.id === "utility");
const installLesson = lessons.find((lesson) => lesson.id === "tw-install");
const cdnExample = installLesson.sections.find((section) => section.id === "cdn");
const localExample = installLesson.sections.find((section) => section.id === "dokumen");
assert.equal(nativeExample.runtime, "none");
assert.doesNotMatch(nativeExample.code.html, /<script|tailwind|jquery/i);
assert.match(nativeExample.code.html, /<style>/);
for (const match of nativeExample.code.html.matchAll(/class="([^"]+)"/g)) {
  assert.ok(["native-card", "native-button"].includes(match[1]), "Native tidak memakai utility Tailwind");
}
for (const content of ["Praktikum Web", "Belajar membuat komponen yang rapi dan mudah dibaca.", "Mulai belajar"]) {
  assert.ok(nativeExample.code.html.includes(content) && utilityExample.code.html.includes(content), "Isi komponen perbandingan setara");
}
assert.ok(utilityExample.code.html.split("\n").length < nativeExample.code.html.split("\n").length);
assert.ok(utilityExample.code.html.replace(/\s/g, "").length < nativeExample.code.html.replace(/\s/g, "").length);
assert.doesNotMatch(utilityExample.code.html, /<style>/);
assert.match(utilityExample.code.html, /hover:bg-blue-800/);
assert.match(nativeExample.code.html, /\.native-button:hover/);
assert.equal(cdnExample.runtime, "document");
assert.equal(localExample.runtime, "document");
assert.match(cdnExample.code.html, /<script src="https:\/\/cdn\.tailwindcss\.com\/3\.4\.17"><\/script>/);
assert.match(localExample.code.html, /<script src="\.\/vendor\/tailwind-3\.4\.17\.js"><\/script>/);
assert.doesNotMatch(cdnExample.code.html, /src="\.\/vendor|<!--/);
assert.doesNotMatch(localExample.code.html, /<!--/);
assert.equal(installLesson.code.html, cdnExample.code.html, "Pengantar instalasi langsung memakai CDN");
assert.equal(run("Object.keys(tailwindPropertyReferences).length"), tailwindLessons.length);
assert.ok(html.indexOf('./tailwind-reference.js') > html.indexOf('./lesson-examples.js'));
assert.ok(html.indexOf('./tailwind-reference.js') < html.indexOf('./app.js'));
for (const lesson of tailwindLessons) {
  assert.ok(lesson.propertyRows.length >= 4, `Tabel halaman ${lesson.id} lengkap`);
  for (const table of [lesson.propertyRows, ...(lesson.sections || []).map((section) => section.rows)]) {
    assert.ok(table.length > 0, `Tabel bagian ${lesson.id} tersedia`);
    for (const row of table) {
      assert.equal(row.length, 3);
      assert.ok(row.every((cell) => typeof cell === "string" && cell.trim().length > 0));
    }
  }
}
assert.equal(lessons.filter((lesson) => lesson.sectionId === "jquery" && lesson.propertyRows).length, 0);
assert.equal(lessons.find((lesson) => lesson.id === "tw-font").sections.find((section) => section.id === "keluarga").rows[0][0], "font-family");
assert.equal(lessons.find((lesson) => lesson.id === "tw-font").sections.find((section) => section.id === "baris").rows[0][0], "line-height");
assert.equal(catalog[0].groups.length, 19);
assert.equal(catalog.find((track) => track.sectionId === "jquery").groups.length, 8);
assert.deepEqual(Array.from(catalog[0].groups, (group) => group.title), [
  "Pengenalan Tailwind CSS", "Hello World", "Instalasi dan setup", "Layout", "Flexbox", "Grid", "Alignment", "Spacing dan sizing", "Typography", "Backgrounds", "Borders", "Effects dan filters", "Tables", "Transitions dan animation", "Transforms", "Interactivity", "Form", "Button", "Komponen esensial"
]);
assert.equal(lessons.some((lesson) => lesson.id.startsWith("tw-svg-")), false);
assert.equal(run('navigationTarget("#tw-svg-fill")'), null);
assert.ok(html.indexOf('./essential-lessons.js') > html.indexOf('./lessons.js'));
assert.ok(html.indexOf('./essential-lessons.js') < html.indexOf('./lesson-guides.js'));
const essentialLessons = lessons.filter((lesson) => lesson.sectionId === "tailwind" && lesson.groupNumber >= 17);
assert.equal(essentialLessons.length, 10);
assert.ok(essentialLessons.every((lesson) => lesson.sections.length >= 2));
assert.match(lessons.find((lesson) => lesson.id === "tw-form-input").sections[0].code.html, /for="studentName"/);
assert.match(lessons.find((lesson) => lesson.id === "tw-form-choice").sections.find((section) => section.id === "radio").code.html, /name="schedule"/);
assert.match(lessons.find((lesson) => lesson.id === "tw-accordion").code.html, /<details/);
assert.doesNotMatch(lessons.find((lesson) => lesson.id === "tw-accordion").code.js, /addEventListener/);
assert.equal(new Set(lessons.map((lesson) => lesson.id)).size, lessons.length);
const utilityLesson = lessons.find((lesson) => lesson.id === "tw-utility");
const sectionCount = lessons.reduce((count, lesson) => count + (lesson.sections?.length || 0), 0);
assert.equal(run("Object.keys(lessonGuides).length"), lessons.length, "Semua halaman mendapat review narasi");
assert.ok(html.indexOf('./guided-learning.js') > html.indexOf('./tailwind-reference.js'));
assert.ok(html.indexOf('./guided-practice.js') > html.indexOf('./tailwind-reference.js'));
assert.ok(html.indexOf('./guided-practice.js') < html.indexOf('./guided-learning.js'));
assert.ok(html.indexOf('./guided-capstones.js') > html.indexOf('./guided-practice.js'));
assert.ok(html.indexOf('./guided-capstones.js') < html.indexOf('./guided-learning.js'));
assert.ok(html.indexOf('./guided-learning.js') < html.indexOf('./app.js'));
const guidedSections = [];
// Baseline pengembangan capstone berlaku untuk proyek Tailwind/jQuery lama.
const capstoneCatalog = catalog.filter((track) => track.sectionId !== "javascript");
for (const track of capstoneCatalog) {
  for (const group of track.groups) {
    const lastLesson = group.lessons.at(-1);
    const integrated = lastLesson.sections.at(-1);
    guidedSections.push(integrated);
    assert.equal(integrated.id, 'guided-learning', `Contoh gabungan terakhir di ${track.sectionId}/${group.number}`);
    assert.equal(integrated.runtime, 'document');
    assert.equal(integrated.codeFile, 'html', 'Copy menyalin dokumen lengkap, bukan JS saja');
    assert.equal(integrated.steps.length, 13);
    assert.equal(integrated.challenges.length, 8);
    assert.equal(integrated.completion.length, 3);
    for (const challenge of integrated.challenges) {
      for (const key of ['title', 'target', 'instruction', 'expected', 'hint']) assert.ok(typeof challenge[key] === 'string' && challenge[key].trim().length > 0, `Tantangan lengkap: ${lastLesson.id}/${challenge.title}/${key}`);
      assert.ok(challenge.instruction.length > 30 && challenge.expected.length > 25 && challenge.hint.length > 15, `Tugas konkret dan kriteria tersedia: ${lastLesson.id}/${challenge.title}`);
    }
    assert.ok(integrated.steps.every((step) => step.length > 55));
    assert.ok(group.lessons.every((lesson) => integrated.connections.some((item) => item.id === lesson.id)), 'Konsep seluruh kelompok dirujuk');
    if (group.number > 1) assert.ok(integrated.connections.some((item) => lessons.find((lesson) => lesson.id === item.id)?.groupNumber < group.number), 'Menghubungkan materi sebelumnya');
    for (const link of integrated.connections) assert.ok(lessons.some((lesson) => lesson.id === link.id));
    const documentSource = integrated.code.html;
    const original = guidedBaseline[lastLesson.id];
    assert.ok(original, 'Semua sumber awal mempunyai baseline tetap');
    assert.ok(documentSource.split('\n').length >= original.lines * 4, `Source minimal 4x baris: ${lastLesson.id}`);
    assert.ok(documentSource.replace(/\s/g, '').length >= original.characters * 4, `Source minimal 4x karakter tanpa spasi: ${lastLesson.id}`);
    assert.ok((documentSource.match(/<[a-z][\w-]*(?=[\s>])/gi) || []).length >= original.elements * 4, `Elemen nyata minimal 4x: ${lastLesson.id}`);
    assert.equal(integrated.moduleCount, 3);
    assert.equal(integrated.itemCount, 9);
    assert.match(documentSource, /id="capstone-project"/);
    assert.match(documentSource, /id="capstone-tools"/);
    assert.equal((documentSource.match(/id="capstone-module-\d+"/g) || []).length, 3);
    assert.equal((documentSource.match(/id="capstone-item-\d+"/g) || []).length, 9);
    assert.match(documentSource, /id="studio-extension"/);
    assert.match(documentSource, /id="studio-journal"/);
    for (const textarea of documentSource.matchAll(/<textarea\b[^>]*>([\s\S]*?)<\/textarea>/g)) assert.equal(textarea[1], '', 'Formatting tidak memberi nilai awal textarea');
    assert.match(documentSource, /^<!doctype html>\n<html lang="id">/);
    for (const tag of ['head', 'body', 'header', 'nav', 'main', 'footer']) assert.match(documentSource, new RegExp(`<${tag}\\b`));
    assert.match(documentSource, /name="viewport"/);
    assert.match(documentSource, /\[hidden\] \{ display: none !important; \}/, 'hidden tidak dikalahkan display utility');
    assert.match(documentSource, /<script src="\.\/vendor\/tailwind-3.4.17.js"><\/script>/);
    assert.equal(/jquery-3.7.1.min.js/.test(documentSource), track.sectionId === 'jquery');
    const ids = Array.from(documentSource.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
    assert.equal(new Set(ids).size, ids.length, 'ID halaman unik');
    for (const link of documentSource.matchAll(/(?:href="#|\bfor="|aria-controls=")([\w-]+)"/g)) assert.ok(ids.includes(link[1]), `Sasaran link/label ${link[1]} tersedia`);
    const inlineScripts = Array.from(documentSource.matchAll(/<script>([\s\S]*?)<\/script>/g), (match) => match[1]);
    for (const script of inlineScripts) {
      new vm.Script(script, { filename: `${lastLesson.id}-guided-inline.js` });
      for (const selector of script.matchAll(/(?:\$|querySelector)\("#([\w-]+)"\)/g)) assert.ok(ids.includes(selector[1]), `Selector #${selector[1]} memiliki elemen`);
    }
    const target = run(`navigationTarget(${JSON.stringify(`#${lastLesson.id}/guided-learning`)})`);
    assert.ok(target, 'Tautan langsung ke guided learning dikenali');
  }
}
assert.equal(guidedSections.length, 27);
assert.deepEqual(Object.keys(guidedBaseline).sort(), Array.from(capstoneCatalog).flatMap((track) => Array.from(track.groups, (group) => group.lessons.at(-1).id)).sort(), 'Baseline tidak melewatkan satu kelompok capstone pun');
assert.equal(guidedSections.reduce((total, section) => total + section.challenges.length, 0), 216);
assert.equal(new Set(guidedSections.map((section) => section.challenges.slice(2, 7).map((challenge) => challenge.instruction).join('\n'))).size, 27, 'Tantangan sesuai topik, bukan template yang sama');
assert.equal(lessons.filter((lesson) => lesson.sections?.length).length, 53);
assert.equal(new Set(guidedSections.map((section) => section.code.html)).size, 27, 'Halaman utuh berbeda sesuai topik');
assert.ok(sectionCount > 80, "Materi multi-konsep dipecah menjadi contoh terpisah");
assert.ok(html.indexOf('./lesson-guides.js') > html.indexOf('./lessons.js'));
assert.ok(html.indexOf('./lesson-examples.js') < html.indexOf('./app.js'));
assert.equal(utilityLesson.sections.length, 15);
assert.equal(new Set(utilityLesson.sections.map((section) => section.id)).size, 15);
for (const section of utilityLesson.sections) {
  assert.ok(section.paragraphs.length >= 2 && section.rows.length >= 5 && section.exercise && section.note);
  new vm.Script(section.code.js, { filename: `utility-${section.id}.js` });
  assert.match(Prism.highlight(section.code.html, Prism.languages.markup, "markup"), /class="token/);
}
for (const track of catalog) {
  track.groups.forEach((group, groupIndex) => {
    assert.equal(group.number, groupIndex + 1);
    assert.ok(group.lessons.length > 0);
    group.lessons.forEach((lesson, index) => {
      assert.equal(lesson.number, `${groupIndex + 1}.${index + 1}`);
      assert.ok(lesson.description && lesson.lead && lesson.assignmentText && lesson.outcomes.length);
      assert.equal(lesson.walkthrough.length, 2);
      assert.doesNotMatch(lesson.lead, /^Contoh di bawah menggunakan/);
      assert.ok(lesson.description.length > 70 && lesson.lead.length > 100);
      for (const file of ["html", "css", "js"]) assert.equal(typeof lesson.code[file], "string");
      new vm.Script(lesson.code.js, { filename: `${lesson.id}.js` });
      assert.equal(new Set(lesson.sections?.map((section) => section.id)).size, lesson.sections?.length || 0);
      for (const section of lesson.sections || []) {
        assert.ok(section.paragraphs.length >= 2 && section.paragraphs.every(Boolean) && section.note && section.exercise);
        for (const file of ["html", "css", "js"]) assert.equal(typeof section.code[file], "string");
        new vm.Script(section.code.js, { filename: `${lesson.id}-${section.id}.js` });
        assert.ok(["html", "css", "js"].includes(section.codeFile || "html"));
        for (const match of section.code.js.matchAll(/\$\("#([\w-]+)"\)/g)) {
          assert.ok(section.code.html.includes(`id="${match[1]}"`), `${lesson.id}/${section.id}: selector #${match[1]} memiliki sasaran HTML`);
        }
      }
    });
  });
}
for (const name of ["tailwind-3.4.17.js", "jquery-3.7.1.min.js"]) new vm.Script(read(`vendor/${name}`), { filename: name });
for (const [language, example] of [["markup", '<div class="p-4">Hi</div>'], ["css", "body { color: red; }"], ["javascript", 'const message = "Hi";']]) {
  assert.match(Prism.highlight(example, Prism.languages[language], language), /class="token/);
}
navButtons = lessons.map((lesson) => {
  const button = new Element(lesson.id);
  button.dataset.lessonId = lesson.id;
  button.group = { open: false };
  button.wrapper = new Element(`wrapper-${lesson.id}`);
  button.closest = (selector) => selector === ".nav-lesson-item" ? button.wrapper : button.group;
  return button;
});
navLinks = [utilityLesson, ...lessons.filter((lesson) => lesson !== utilityLesson)].flatMap((lesson) => (lesson.sections || []).map((section) => {
  const link = new Element(`nav-${section.id}`);
  link.dataset = { lessonId: lesson.id, sectionId: section.id };
  link.parentElement = new Element(`nav-li-${section.id}`);
  elements.set(`property-section-${section.id}`, new Element(`property-section-${section.id}`));
  return link;
}));
navTracks = catalog.map((track) => {
  const trackNode = new Element(track.sectionId);
  trackNode.dataset.track = track.sectionId;
  trackNode.open = track.sectionId === "tailwind";
  const heading = new Element(`heading-${track.sectionId}`);
  heading.textContent = track.sectionLabel;
  const groups = track.groups.map((group) => {
    const groupNode = new Element(`${track.sectionId}-${group.number}`);
    groupNode.open = true;
    const groupButtons = navButtons.filter((button) => group.lessons.some((lesson) => lesson.id === button.dataset.lessonId));
    groupButtons.forEach((button) => { button.group = groupNode; });
    groupNode.querySelectorAll = (selector) => selector === ".nav-lesson" ? groupButtons : selector === ".nav-subsection" ? navLinks.filter((link) => groupButtons.some((button) => button.dataset.lessonId === link.dataset.lessonId)) : [];
    return groupNode;
  });
  trackNode.querySelector = () => heading;
  trackNode.querySelectorAll = (selector) => selector === ".nav-group" ? groups : [];
  return trackNode;
});

run("init()");
assert.equal(elements.get("codeComparison").hidden, false);
assert.match(elements.get("codeComparison").innerHTML, new RegExp(`${nativeExample.code.html.split("\n").length} baris HTML`));
assert.match(elements.get("codeComparison").innerHTML, new RegExp(`${utilityExample.code.html.split("\n").length} baris HTML`));
run('selectExample("css-biasa")');
const nativeInitialFetchCount = runtimeFetches.length;
await run("runCode()");
assert.equal(runtimeFetches.length, nativeInitialFetchCount, "Run native tidak mengambil runtime");
assert.doesNotMatch(elements.get("previewFrame").srcdoc, /local Tailwind runtime|local jQuery runtime|<script src=/);

// Fullscreen preview mempertahankan hasil, mendukung fallback, dan keluar dengan aman.
const previewPanel = elements.get("previewPanel");
const previewFullscreen = elements.get("togglePreviewFullscreen");
const fullscreenSource = elements.get("previewFrame").srcdoc;
await previewFullscreen.events.click();
assert.equal(previewPanel.classList.contains("is-fullscreen"), true);
assert.equal(previewFullscreen.attributes["aria-pressed"], "true");
assert.equal(elements.get("previewFrame").srcdoc, fullscreenSource);
await previewFullscreen.events.click();
assert.equal(previewFullscreen.attributes["aria-pressed"], "false");
await previewFullscreen.events.click();
documentEvents.keydown({ key: "Escape", preventDefault() {} });
assert.equal(previewPanel.classList.contains("is-fullscreen"), false);
await previewFullscreen.events.click();
windowEvents.message({ source: frameWindow, data: { source: "codeforge-preview", token: run("activeRun.token"), type: "escape" } });
assert.equal(previewPanel.classList.contains("is-fullscreen"), false, "Escape dari iframe keluar dari fullscreen fallback");
await elements.get("toggleEditorFullscreen").events.click();
await previewFullscreen.events.click();
assert.equal(elements.get("editorPanel").classList.contains("is-fullscreen"), false, "Hanya satu panel memakai fullscreen fallback");
await elements.get("closePreview").events.click();
assert.equal(previewPanel.classList.contains("is-fullscreen"), false);
assert.equal(previewPanel.hidden, true);
elements.get("showPreview").events.click();
previewPanel.requestFullscreen = async () => { document.fullscreenElement = previewPanel; documentEvents.fullscreenchange(); };
document.exitFullscreen = async () => { document.fullscreenElement = null; documentEvents.fullscreenchange(); };
await previewFullscreen.events.click();
assert.equal(document.fullscreenElement, previewPanel);
assert.equal(previewFullscreen.attributes["aria-pressed"], "true");
document.fullscreenElement = null;
documentEvents.fullscreenchange();
assert.equal(previewFullscreen.attributes["aria-pressed"], "false", "Escape native menyinkronkan tombol");
await previewFullscreen.events.click();
await elements.get("closePreview").events.click();
assert.equal(document.fullscreenElement, null, "Tutup preview mengakhiri fullscreen native");
elements.get("showPreview").events.click();
previewPanel.requestFullscreen = async () => { throw new Error("Fullscreen ditolak"); };
await previewFullscreen.events.click();
assert.equal(previewPanel.classList.contains("is-fullscreen"), true, "API ditolak memakai fallback");
await previewFullscreen.events.click();
delete previewPanel.requestFullscreen;
delete document.exitFullscreen;
assert.equal(elements.get("previewFrame").srcdoc, fullscreenSource, "Fullscreen tidak menjalankan ulang iframe");

// Workspace gabungan memakai DOM editor/preview yang sama dan membuka hasil yang tersembunyi.
const workspacePanel = elements.get("lessonWorkspace");
const workspaceFullscreen = elements.get("toggleWorkspaceFullscreen");
const workspaceLayout = elements.get("workspaceLayout");
const workspaceResizer = elements.get("workspaceResizer");
const workspaceCode = elements.get("codeEditor").value;
workspaceLayout.clientWidth = 1200;
workspaceLayout.getBoundingClientRect = () => ({ left: 100 });
workspaceLayout.style.setProperty = function (name, value) { this[name] = value; };
workspaceResizer.offsetWidth = 12;
workspaceResizer.setPointerCapture = () => {};
workspaceResizer.releasePointerCapture = () => {};
run("setPreviewVisible(false)");
await workspaceFullscreen.events.click();
assert.equal(workspacePanel.classList.contains("is-fullscreen"), true);
assert.equal(workspaceFullscreen.attributes["aria-pressed"], "true");
assert.equal(workspaceFullscreen.textContent, "Keluar layar penuh");
assert.equal(previewPanel.hidden, false);
assert.equal(elements.get("workspaceLayout").classList.contains("is-editor-only"), false);
assert.equal(elements.get("codeEditor").value, workspaceCode);
assert.equal(elements.get("previewFrame").srcdoc, fullscreenSource);
workspaceResizer.events.pointerdown({ clientX: 956, pointerId: 3, preventDefault() {} });
workspaceResizer.events.pointermove({ clientX: 956, pointerId: 3 });
assert.equal(workspaceResizer.attributes["aria-valuenow"], "72", "Geser pembatas mengubah porsi editor");
assert.equal(workspaceLayout.style["--workspace-editor-width"], "850px");
workspaceResizer.events.pointerup({ pointerId: 3 });
workspaceResizer.events.keydown({ key: "ArrowLeft", shiftKey: false, preventDefault() {} });
assert.equal(workspaceResizer.attributes["aria-valuenow"], "70", "Tombol panah menggeser pembatas");
workspaceResizer.events.keydown({ key: "Home", shiftKey: false, preventDefault() {} });
assert.equal(workspaceResizer.attributes["aria-valuenow"], "20");
workspaceResizer.events.keydown({ key: "End", shiftKey: false, preventDefault() {} });
assert.equal(workspaceResizer.attributes["aria-valuenow"], "80");
workspaceResizer.events.pointerdown({ clientX: 90, pointerId: 4, preventDefault() {} });
assert.equal(workspaceResizer.attributes["aria-valuenow"], "20", "Editor tetap memiliki lebar minimum");
workspaceResizer.events.pointerup({ pointerId: 4 });
await workspaceFullscreen.events.click();
assert.equal(workspaceFullscreen.textContent, "Layar penuh kode + preview");
assert.equal(previewPanel.hidden, true, "Keluar fullscreen memulihkan preview yang semula disembunyikan");
assert.equal(elements.get("workspaceLayout").classList.contains("is-editor-only"), true);
elements.get("showPreview").events.click();
await workspaceFullscreen.events.click();
documentEvents.keydown({ key: "Escape", preventDefault() {} });
assert.equal(workspacePanel.classList.contains("is-fullscreen"), false);
assert.equal(workspaceFullscreen.attributes["aria-pressed"], "false");
assert.equal(previewPanel.hidden, false, "Escape memulihkan mode editor dan preview sebelumnya");
await workspaceFullscreen.events.click();
windowEvents.message({ source: frameWindow, data: { source: "codeforge-preview", token: run("activeRun.token"), type: "escape" } });
assert.equal(workspacePanel.classList.contains("is-fullscreen"), false, "Escape dari hasil preview menutup fullscreen gabungan");
assert.equal(previewPanel.hidden, false);
await workspaceFullscreen.events.click();
await elements.get("closePreview").events.click();
assert.equal(previewPanel.hidden, true, "Preview bisa disembunyikan selama fullscreen");
await workspaceFullscreen.events.click();
assert.equal(previewPanel.hidden, false, "Keluar fullscreen memulihkan preview yang sebelumnya terbuka");
workspacePanel.requestFullscreen = async () => { document.fullscreenElement = workspacePanel; documentEvents.fullscreenchange(); };
document.exitFullscreen = async () => { document.fullscreenElement = null; documentEvents.fullscreenchange(); };
await workspaceFullscreen.events.click();
assert.equal(document.fullscreenElement, workspacePanel);
await workspaceFullscreen.events.click();
assert.equal(document.fullscreenElement, null);
workspacePanel.requestFullscreen = async () => { throw new Error("Fullscreen ditolak"); };
await workspaceFullscreen.events.click();
assert.equal(workspacePanel.classList.contains("is-fullscreen"), true);
await elements.get("toggleEditorFullscreen").events.click();
assert.equal(workspacePanel.classList.contains("is-fullscreen"), false, "Pindah mode membersihkan fullscreen gabungan fallback");
await elements.get("toggleEditorFullscreen").events.click();
delete workspacePanel.requestFullscreen;
delete document.exitFullscreen;
assert.equal(elements.get("codeEditor").value, workspaceCode);
assert.equal(elements.get("previewFrame").srcdoc, fullscreenSource);

elements.get("codeEditor").value += "\n<!-- Percobaan native -->";
elements.get("codeEditor").events.input();
assert.match(elements.get("codeComparison").innerHTML, new RegExp(`${nativeExample.code.html.split("\n").length + 1} baris HTML`));
run("resetCode()");
const comparisonButton = new Element("compare-run-tailwind");
comparisonButton.dataset = { propertyAction: "run", sectionId: "utility" };
await elements.get("lessonExampleSections").events.click({ target: { closest: (selector) => selector === "[data-property-action]" ? comparisonButton : null } });
assert.equal(run("state.exampleId"), "utility");
assert.match(elements.get("previewFrame").srcdoc, /<script src="\.\/vendor\/tailwind-3\.4\.17\.js"><\/script>/);
assert.doesNotMatch(elements.get("previewFrame").srcdoc, /local Tailwind runtime|local jQuery runtime/);
run('selectLesson("tw-install"); selectExample("cdn")');
assert.equal(elements.get("codeComparison").hidden, true);
assert.equal(elements.get("codeComparison").innerHTML, "");
const cdnInitialFetchCount = runtimeFetches.length;
await run("runCode()");
assert.equal(runtimeFetches.length, cdnInitialFetchCount, "Run CDN tidak mengambil runtime lokal");
assert.match(elements.get("previewFrame").srcdoc, /<script src="https:\/\/cdn\.tailwindcss\.com\/3\.4\.17"><\/script>/);
assert.doesNotMatch(elements.get("previewFrame").srcdoc, /local Tailwind runtime|local jQuery runtime|vendor\/tailwind/);
const cdnToken = run("activeRun.token");
windowEvents.message({ source: frameWindow, data: { source: "codeforge-preview", token: cdnToken, type: "error", message: "Resource gagal dimuat: https://cdn.tailwindcss.com/3.4.17" } });
windowEvents.message({ source: frameWindow, data: { source: "codeforge-preview", token: cdnToken, type: "ready", message: "Preview siap" } });
assert.equal(elements.get("previewStatus").textContent, "Error", "Kegagalan CDN tidak disamarkan fallback atau ready");
run('selectLesson("tw-framework")');
assert.equal(document.documentElement.dataset.theme, "light", "Init tetap bekerja ketika storage diblokir");
assert.match(elements.get("courseNav").innerHTML, /1\.1/);
assert.match(elements.get("courseNav").innerHTML, /19\.5/);
assert.doesNotMatch(elements.get("courseNav").innerHTML, /tw-svg-|>SVG</);
assert.match(elements.get("courseNav").innerHTML, /href="#tw-form-input\/textarea"/);
assert.match(elements.get("courseNav").innerHTML, /href="#tw-button-state\/loading"/);
assert.equal((elements.get("courseNav").innerHTML.match(/class="nav-subsection"/g) || []).length, sectionCount);
assert.equal((elements.get("courseNav").innerHTML.match(/<details class="nav-section"/g) || []).length, catalog.length);
assert.ok(navTracks[0].classList.contains("has-active-page"));
context.window.location.hash = "#jq-events/input";
run("init()");
assert.match(elements.get("courseNav").innerHTML, /data-track="jquery" open/);
assert.doesNotMatch(elements.get("courseNav").innerHTML, /data-track="tailwind" open/);
assert.equal(run("state.lessonId"), "jq-events");
assert.equal(run("state.sectionId"), "input");
context.window.location.hash = "#tw-framework";
run("init()");
assert.match(elements.get("courseNav").innerHTML, /href="#tw-utility\/font"/);
assert.equal(elements.get("previousLesson").disabled, true);
assert.equal(elements.get("nextLesson").disabled, false);
assert.equal(navButtons.filter((button) => button.attributes["aria-current"] === "page").length, 1);
for (const lesson of lessons) {
  run(`selectLesson(${JSON.stringify(lesson.id)})`);
  assert.ok(elements.get("lessonTitle").textContent.includes(lesson.title));
  const initialExample = lesson.sections?.[0] || lesson;
  const initialFile = initialExample.codeFile || "html";
  assert.equal(elements.get("codeEditor").value, initialExample.code[initialFile]);
  assert.equal(run("state.activeFile"), initialFile);
  assert.equal(elements.get("previewFrame").srcdoc, "", "Kode awal tersedia tanpa menjalankan preview");
  for (const section of lesson.sections || []) {
    const source = section.code[section.codeFile || "html"];
    assert.equal(elements.get(`preview-numbers-${section.id}`).textContent, source.split("\n").map((_, index) => index + 1).join("\n"), `${lesson.id}/${section.id}: nomor baris tersedia tanpa Run`);
    assert.equal(elements.get(`property-code-${section.id}`).innerHTML, run(`CodeEditor.highlight(${JSON.stringify(source + "\n")}, ${JSON.stringify(section.codeFile || "html")})`));
  }
  assert.equal(elements.get("lessonPropertyReference").hidden, lesson.sectionId !== "tailwind");
  if (lesson.sectionId === "tailwind") {
    const table = elements.get("lessonPropertyTable").innerHTML;
    assert.match(table, /Property CSS<\/th>/);
    assert.match(table, /Utility Tailwind<\/th>/);
    assert.match(table, /Keterangan<\/th>/);
    assert.equal((table.match(/<th scope="row">/g) || []).length, lesson.propertyRows.length);
    for (const section of lesson.sections || []) {
      assert.ok(elements.get("lessonSections").innerHTML.includes(run(`escapeHtml(${JSON.stringify(section.rows[0][1].split(" · ")[0])})`)));
    }
  } else {
    assert.equal(elements.get("lessonPropertyTable").innerHTML, "", "Tabel Tailwind tidak tertinggal saat pindah jQuery");
    assert.doesNotMatch(elements.get("lessonSections").innerHTML, /Utility Tailwind<\/th>/);
  }
  assert.equal(navButtons.filter((button) => button.attributes["aria-current"] === "page").length, 1);
  assert.ok(navButtons.find((button) => button.dataset.lessonId === lesson.id).classList.contains("is-active"));
  assert.ok(elements.get("lessonWalkthrough").innerHTML.includes(run(`escapeHtml(${JSON.stringify(lesson.walkthrough[0])})`)));
  const integratedSection = lesson.sections?.find((section) => section.guided);
  if (integratedSection) {
    assert.ok(elements.get("lessonSections").innerHTML.includes(run(`escapeHtml(${JSON.stringify(integratedSection.steps[1])})`)));
    assert.match(elements.get("lessonSections").innerHTML, /Konsep yang digabungkan/);
    assert.match(elements.get("lessonSections").innerHTML, /Guided Learning Source Code/);
    assert.match(elements.get("lessonSections").innerHTML, /karakter kode tanpa spasi/);
    assert.match(elements.get("lessonSections").innerHTML, /guided-source-code/);
    assert.match(elements.get("lessonSections").innerHTML, /Tantangan mandiri: edit source code di atas/);
    assert.ok(elements.get("lessonSections").innerHTML.indexOf('guided-challenges"') > elements.get("lessonSections").innerHTML.indexOf('property-code-guided-learning'), 'Tantangan berada setelah source code');
    for (const challenge of integratedSection.challenges) assert.ok(elements.get("lessonSections").innerHTML.includes(run(`escapeHtml(${JSON.stringify(challenge.expected)})`)));
  }
  for (const section of lesson.sections || []) {
    run(`selectExample(${JSON.stringify(section.id)})`);
    assert.equal(elements.get("codeEditor").value, section.code[section.codeFile || "html"]);
    const button = new Element(`copy-${lesson.id}-${section.id}`);
    button.dataset = { propertyAction: "copy", sectionId: section.id };
    await elements.get("lessonExampleSections").events.click({ target: { closest: (selector) => selector === "[data-property-action]" ? button : null } });
    assert.equal(clipboard.at(-1), section.code[section.codeFile || "html"]);
    button.dataset.propertyAction = "run";
    await elements.get("lessonExampleSections").events.click({ target: { closest: (selector) => selector === "[data-property-action]" ? button : null } });
    assert.equal(run("state.exampleId"), section.id);
    assert.match(elements.get("previewFrame").srcdoc, /codeforge-preview/);
    if (section.guided) {
      assert.match(elements.get("previewFrame").srcdoc, /<header/);
      assert.match(elements.get("previewFrame").srcdoc, /<footer/);
      assert.doesNotMatch(elements.get("previewFrame").srcdoc, /local Tailwind runtime|local jQuery runtime/, 'Dokumen guided tidak menerima injeksi library ganda');
    }
  }
}
assert.equal(elements.get("nextLesson").disabled, true);
// CTA tantangan membuka draft yang sama tanpa auto-Run atau menimpa hasil edit.
run('selectLesson("tw-flex-order"); selectExample("guided-learning")');
elements.set('guided-source-size-guided-learning', new Element('guided-source-size-guided-learning'));
const challengeDraft = elements.get('codeEditor').value + '\n<!-- Catatan hasil tantangan peserta -->';
elements.get('codeEditor').value = challengeDraft;
elements.get('codeEditor').events.input();
assert.equal(elements.get('guided-source-size-guided-learning').textContent, run('guidedSourceSize(currentLesson(), exampleFor(currentLesson()))'), 'Indikator source mengikuti draft HTML peserta');
run('selectExample(null)');
const editChallengeButton = new Element('edit-challenge');
editChallengeButton.dataset = { propertyAction: 'edit', sectionId: 'guided-learning' };
const beforeEditFetches = runtimeFetches.length;
await elements.get('lessonExampleSections').events.click({ target: { closest: (selector) => selector === '[data-property-action]' ? editChallengeButton : null } });
assert.equal(run('state.exampleId'), 'guided-learning');
assert.equal(run('state.activeFile'), 'html');
assert.equal(elements.get('codeEditor').value, challengeDraft);
assert.equal(elements.get('codeEditor').focused, true);
assert.equal(elements.get('lessonWorkspace').scrolled, true);
assert.equal(elements.get('previewFrame').srcdoc, '', 'Buka editor tidak menjalankan contoh');
assert.equal(runtimeFetches.length, beforeEditFetches);
editChallengeButton.dataset.propertyAction = 'copy';
await elements.get('lessonExampleSections').events.click({ target: { closest: (selector) => selector === '[data-property-action]' ? editChallengeButton : null } });
assert.equal(clipboard.at(-1), challengeDraft, 'Copy setelah tantangan menyertakan edit peserta');
// Kelompok track dapat dilipat tanpa mengubah halaman; search membuka sementara.
run('selectLesson("tw-font")');
navTracks[0].open = false;
run("updateActiveNavigation()");
assert.equal(navTracks[0].open, false, "Penanda aktif tidak membuka track yang dilipat manual");
elements.get("lessonSearch").value = "line height";
run("filterNavigation()");
assert.equal(navTracks[0].open, true);
elements.get("lessonSearch").value = "";
run("filterNavigation()");
assert.equal(navTracks[0].open, false, "Menghapus search memulihkan collapse track");
run('selectLesson("jq-events")');
assert.equal(navTracks[0].open, false, "Pindah jQuery tidak membuka Tailwind");
assert.equal(navTracks.find((track) => track.dataset.track === "jquery").open, true);
assert.ok(navTracks.find((track) => track.dataset.track === "jquery").classList.contains("has-active-page"));
assert.equal(navTracks[0].classList.contains("has-active-page"), false);
run('navigateSection("jq-events", "input"); selectExample("input")');
assert.equal(run("state.activeFile"), "js");
assert.equal(context.window.location.hash, "#jq-events/input");
elements.get("codeEditor").value = '$("#result").text("Draft JS instruktur");';
elements.get("codeEditor").events.input();
assert.match(elements.get("property-code-input").innerHTML, /Draft JS instruktur/);
run('selectExample("click"); selectExample("input")');
assert.match(elements.get("codeEditor").value, /Draft JS instruktur/);
run("resetCode()");
assert.doesNotMatch(elements.get("property-code-input").innerHTML, /Draft JS instruktur/);
assert.match(elements.get("property-code-input").innerHTML, /class="token/);
// Klik sidebar memuat halaman induk lalu memusatkan bagian yang diminta.
const clickNavLink = (id) => {
  const link = navLinks.find((item) => item.dataset.sectionId === id);
  elements.get("courseNav").events.click({ preventDefault() {}, target: { closest: () => link } });
};
clickNavLink("font");
assert.equal(run("state.lessonId"), "tw-utility");
assert.equal(run("state.sectionId"), "font");
assert.equal(context.window.location.hash, "#tw-utility/font");
assert.equal(elements.get("property-section-font").scrolled, true);
assert.equal(elements.get("property-section-font").focused, true);
assert.equal(navLinks[0].attributes["aria-current"], "location");
run('selectExample("font")');
elements.get("codeEditor").value = "Draft sebelum pindah bagian";
elements.get("codeEditor").events.input();
clickNavLink("spacing");
assert.equal(elements.get("codeEditor").value, utilityLesson.sections.find((section) => section.id === "spacing").code.html, "Navigasi memuat kode bagian tanpa Run");
clickNavLink("font");
assert.equal(elements.get("codeEditor").value, "Draft sebelum pindah bagian", "Draft bagian sebelumnya tetap tersedia");
clickNavLink("spacing");
assert.equal(navLinks[0].attributes["aria-current"], undefined);
assert.equal(navLinks.find((link) => link.dataset.sectionId === "spacing").attributes["aria-current"], "location");
// Pencarian nama bagian tetap memperlihatkan nomor/lesson induknya.
elements.get("lessonSearch").value = "overflow";
elements.get("lessonSearch").events.input();
assert.equal(navLinks.find((link) => link.dataset.sectionId === "overflow").parentElement.hidden, false);
assert.equal(navLinks.find((link) => link.dataset.sectionId === "font").parentElement.hidden, true);
assert.equal(navButtons.find((button) => button.dataset.lessonId === "tw-utility").wrapper.hidden, false);
elements.get("lessonSearch").value = "tidak-ada-materi-ini";
elements.get("lessonSearch").events.input();
assert.equal(elements.get("searchEmpty").hidden, false);
elements.get("lessonSearch").value = "";
elements.get("lessonSearch").events.input();
assert.ok(navLinks.every((link) => link.parentElement.hidden === false));
// Back/Forward dan reload memakai route yang sama, termasuk deep link bagian.
context.window.location.hash = "#tw-utility/font";
windowEvents.hashchange();
assert.equal(run("state.sectionId"), "font");
context.window.location.hash = "#tw-utility";
windowEvents.hashchange();
assert.equal(run("state.sectionId"), null);
context.window.location.hash = "#tw-utility/spacing";
windowEvents.hashchange();
assert.equal(run("state.sectionId"), "spacing");
run('selectLesson("tw-hello", false); init()');
assert.equal(run("state.lessonId"), "tw-utility");
assert.equal(run("state.sectionId"), "spacing");
assert.equal(run('navigationTarget("#tw-utility/tidak-ada")'), null);
assert.equal(run('navigationTarget("#tw-utility/font/ekstra")'), null);
run('selectExample("font"); resetCode()');
// Halaman property memiliki bagian terpisah dan draft yang independen per contoh.
run('selectLesson("tw-utility")');
assert.equal(elements.get("lessonSections").hidden, false);
assert.match(elements.get("lessonSections").innerHTML, /property-section-font/);
assert.match(elements.get("lessonSections").innerHTML, /property-section-variants/);
assert.equal((elements.get("lessonSections").innerHTML.match(/data-property-action="run"/g) || []).length, 15);
assert.equal((elements.get("lessonSections").innerHTML.match(/data-property-action="copy"/g) || []).length, 15);
for (const section of utilityLesson.sections) {
  run(`selectExample(${JSON.stringify(section.id)})`);
  assert.equal(elements.get("codeEditor").value, section.code.html);
  assert.equal(elements.get("assignmentText").textContent, section.exercise);
}
run('selectExample("font")');
elements.get("codeEditor").value = '<h1 class="font-serif">Draft font instruktur</h1>';
elements.get("codeEditor").events.input();
assert.match(elements.get("property-code-font").innerHTML, /Draft font instruktur/);
run('selectExample("spacing")');
assert.equal(elements.get("codeEditor").value, utilityLesson.sections.find((section) => section.id === "spacing").code.html);
run('selectExample("font")');
assert.match(elements.get("codeEditor").value, /Draft font instruktur/);
const sectionCopyButton = new Element("copy-font");
sectionCopyButton.dataset = { propertyAction: "copy", sectionId: "font" };
await elements.get("lessonExampleSections").events.click({ target: { closest: (selector) => selector === "[data-property-action]" ? sectionCopyButton : null } });
assert.equal(clipboard.at(-1), elements.get("codeEditor").value, "Copy pada bagian menyalin draft yang sedang ditampilkan");
const sectionRunButton = new Element("run-spacing");
sectionRunButton.dataset = { propertyAction: "run", sectionId: "spacing" };
await elements.get("lessonExampleSections").events.click({ target: { closest: (selector) => selector === "[data-property-action]" ? sectionRunButton : null } });
assert.equal(run("state.exampleId"), "spacing");
assert.match(elements.get("previewFrame").srcdoc, /Padding di dalam kartu/);
run('selectExample("font")');
tabs[1].events.click();
run("resetCode()");
assert.doesNotMatch(elements.get("property-code-font").innerHTML, /Draft font instruktur/);
run("selectExample(null)");
assert.equal(elements.get("codeEditor").value, utilityLesson.code.html);
assert.equal(elements.get("overviewExample").hidden, true);
run('selectLesson("tw-hello")');
assert.equal(elements.get("lessonSections").hidden, false);
assert.match(elements.get("lessonSections").innerHTML, /Contoh dasar/);
assert.match(elements.get("lessonSections").innerHTML, /Guided learning/);
assert.equal(elements.get("exampleContext").hidden, false);
run('selectLesson("tw-hello")');
elements.get("codeEditor").value = '<h1 class="text-red-700">Edit instruktur</h1>';
elements.get("codeEditor").events.input();
run('selectLesson("jq-form"); selectLesson("tw-hello")');
assert.match(elements.get("codeEditor").value, /Edit instruktur/);
tabs[2].events.click();
elements.get("codeEditor").value = 'console.log("kode JS yang diedit");';
elements.get("codeEditor").events.input();
await run("copyCurrentCode()");
assert.equal(clipboard.at(-1), elements.get("codeEditor").value);
context.navigator.clipboard.writeText = async () => { throw new Error("clipboard blocked"); };
await run("copyCurrentCode()");
assert.equal(copiedValue, elements.get("codeEditor").value);
assert.equal(elements.get("copyCode").textContent, "✓ Tersalin");
copyAllowed = false;
await run("copyCurrentCode()");
assert.equal(elements.get("copyCode").textContent, "Copy gagal");
assert.match(elements.get("consoleMessage").textContent, /belum tersalin/);
run("resetCode()");
assert.equal(elements.get("codeEditor").value, lessons.find((lesson) => lesson.id === "tw-hello").code.js);
tabs[0].events.click();
assert.equal(elements.get("codeEditor").value, lessons.find((lesson) => lesson.id === "tw-hello").code.html);
elements.get("codeEditor").scrollTop = 40;
elements.get("codeEditor").scrollLeft = 100;
elements.get("codeEditor").events.scroll();
assert.equal(elements.get("codeHighlight").scrollTop, 40);
assert.equal(elements.get("codeHighlight").scrollLeft, 100);
assert.equal(elements.get("lineNumbers").style.transform, "translateY(-40px)");

// Modul yang sama memperbarui nomor baris, scroll, dan wrapping di kedua permukaan.
run('selectLesson("tw-utility"); selectExample("font")');
const sharedSource = '<h1>Baris pertama yang panjang</h1>\n<p>Baris kedua</p>';
elements.get("codeEditor").value = sharedSource;
elements.get("codeEditor").events.input();
assert.equal(elements.get("lineNumbers").textContent, "1\n2");
assert.equal(elements.get("preview-numbers-font").textContent, "1\n2");
assert.equal(elements.get("highlightedCode").innerHTML, elements.get("property-code-font").innerHTML);
elements.get("preview-layer-font").scrollTop = 24;
elements.get("preview-layer-font").events.scroll();
assert.equal(elements.get("preview-numbers-font").style.transform, "translateY(-24px)");
context.window.getComputedStyle = () => ({ paddingLeft: "13px", paddingRight: "13px", lineHeight: "24px" });
elements.get("codeEditor").clientWidth = 100;
elements.get("preview-layer-font").clientWidth = 100;
const wrappedLines = [48, 24].map((height) => ({ getBoundingClientRect: () => ({ height }) }));
elements.get("codeMeasure").children = wrappedLines;
elements.get("preview-measure-font").children = wrappedLines;
run("setWordWrap(true)");
assert.match(elements.get("lineNumbers").innerHTML, /height:48px/);
assert.equal(elements.get("lineNumbers").innerHTML, elements.get("preview-numbers-font").innerHTML);
assert.equal(elements.get("codeEditor").value, sharedSource, "Wrapping tidak mengubah kode");
elements.get("codeEditor").clientWidth = 0;
elements.get("preview-layer-font").clientWidth = 0;
run("setWordWrap(false); resetCode()");
assert.equal(elements.get("property-code-font").innerHTML, elements.get("highlightedCode").innerHTML, "Reset tersinkron di kedua permukaan");

// Penutup script/style di string kode tidak boleh merusak pembungkus preview.
const tricky = 'const text = "</script><script>injection</script>";\nconst css = "</style>";';
context.tricky = tricky;
assert.equal(JSON.parse(run("scriptString(tricky)")), tricky);
context.files = { html: '<!doctype html><html><head><title>Test</title></head><body class="bg-blue-100"><script>console.error("erreur HTML");</script><p>Exemple</p></body></html>', css: 'p::after { content: "</style>"; }', js: tricky };
context.runtimes = ["/* tailwind */", "/* jquery */"];
const preview = run('makePreviewDocument(files, runtimes, "test-token")');
assert.match(preview, /<body class="bg-blue-100">/);
assert.match(preview, /<title>Test<\/title>/);
assert.match(preview, /<base href="http:\/\/localhost\/tailwind-jquery-tutorial\/">/);
assert.ok(preview.indexOf("codeforge-preview") < preview.indexOf("erreur HTML"));
const scripts = [...preview.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]);
assert.equal(scripts.length, 6, "String JS editor tidak membuat tag script tambahan");
scripts.forEach((source, index) => new vm.Script(source, { filename: `preview-${index}.js` }));

// Uji bridge untuk error, ready, rejection, dan resource gagal dimuat.
const messages = [];
const guestEvents = {};
const guestWindow = { addEventListener: (name, handler) => { guestEvents[name] = handler; } };
const guest = vm.createContext({ window: guestWindow, parent: { postMessage: (data) => messages.push(data) }, console: { error() {} } });
vm.runInContext(scripts[0], guest);
guestEvents.error({ target: guestWindow, message: "Syntax error", filename: "contoh-script.js", lineno: 2, colno: 3 });
guestEvents.load();
guestEvents.unhandledrejection({ reason: new Error("Promise gagal") });
guestEvents.error({ target: { src: "https://invalid.test/image.png" } });
assert.equal(messages[0].type, "error");
assert.match(messages[0].message, /contoh-script.js:2:3/);
assert.equal(messages[1].type, "ready");
assert.match(messages[2].message, /Promise gagal/);
assert.match(messages[3].message, /Resource gagal/);

await run("runCode()");
const token = run("activeRun.token");
const message = (type, messageText, overrides = {}) => windowEvents.message({ source: frameWindow, data: { source: "codeforge-preview", token, type, message: messageText, ...overrides } });
message("error", "Unexpected token");
message("ready", "Preview siap");
assert.equal(elements.get("previewStatus").textContent, "Error");
assert.match(elements.get("consoleMessage").textContent, /Unexpected token/);
message("ready", "Pesan lama", { token: "stale-token" });
windowEvents.message({ source: {}, data: { source: "codeforge-preview", token, type: "ready", message: "Sumber lain" } });
assert.equal(elements.get("previewStatus").textContent, "Error");
await run("runCode()");
const newToken = run("activeRun.token");
windowEvents.message({ source: frameWindow, data: { source: "codeforge-preview", token: newToken, type: "ready", message: "Preview siap" } });
assert.equal(elements.get("previewStatus").textContent, "Siap");

// Run yang menunggu library tidak boleh menimpa materi yang baru dipilih.
const fetchResolvers = [];
context.fetch = () => new Promise((resolve) => { fetchResolvers.push(resolve); });
run("runtimePromise = null");
const pendingRun = run("runCode()");
run('selectLesson("jq-form")');
fetchResolvers.forEach((resolve) => resolve({ ok: true, text: async () => "" }));
await pendingRun;
assert.equal(elements.get("previewFrame").srcdoc, "");
assert.equal(elements.get("previewStatus").textContent, "Belum dijalankan");

// Jalankan contoh form untuk memeriksa feedback invalid dan interpolasi nama.
const fields = new Map(["#signup", "#name", "#email", "#message"].map((id) => [id, { value: "", text: "", events: {} }]));
const jqueryFixture = (selector) => {
  const field = fields.get(selector);
  const api = {
    on: (name, handler) => { field.events[name] = handler; return api; },
    val: () => field.value,
    removeClass: () => api,
    addClass: () => api,
    text: (value) => { field.text = value; return api; }
  };
  return api;
};
vm.runInNewContext(lessons.find((lesson) => lesson.id === "jq-form").code.js, { $: jqueryFixture });
let prevented = false;
fields.get("#signup").events.submit({ preventDefault: () => { prevented = true; } });
assert.equal(prevented, true);
assert.match(fields.get("#message").text, /valid/);
fields.get("#name").value = "Ayu";
fields.get("#email").value = "ayu@example.test";
fields.get("#signup").events.submit({ preventDefault() {} });
assert.equal(fields.get("#message").text, "Halo, Ayu! Form valid.");

// Jalankan logika komponen baru dengan DOM kecil: menguji transisi keadaan,
// bukan layout, media query, atau implementasi validasi native browser.
function componentFixture(lessonId, sectionId) {
  const section = lessons.find((lesson) => lesson.id === lessonId).sections.find((item) => item.id === sectionId);
  const nodes = new Map([...section.code.html.matchAll(/\bid="([^"]+)"/g)].map((match) => [match[1], new Element(match[1])]));
  const pending = [];
  const script = section.guided ? [...section.code.html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((match) => match[1]).join('\n') : section.code.js;
  vm.runInNewContext(script, {
    document: { querySelector(selector) { assert.ok(nodes.has(selector.slice(1)), `Sasaran ${selector} tersedia`); return nodes.get(selector.slice(1)); } },
    setTimeout(handler, delay) { pending.push({ handler, delay }); }
  });
  return { nodes, pending };
}
const validationFixture = componentFixture("tw-form-state", "validasi");
const emailNode = validationFixture.nodes.get("contactEmail");
const validationMessage = validationFixture.nodes.get("formMessage");
emailNode.checkValidity = () => false;
let formDefaultPrevented = false;
validationFixture.nodes.get("emailForm").events.submit({ preventDefault() { formDefaultPrevented = true; } });
assert.equal(formDefaultPrevented, true);
assert.equal(emailNode.getAttribute("aria-invalid"), "true");
assert.equal(emailNode.focused, true);
assert.ok(validationMessage.classList.contains("text-red-700"));
assert.match(validationMessage.textContent, /nama@example.com/);
emailNode.checkValidity = () => true;
validationFixture.nodes.get("emailForm").events.submit({ preventDefault() {} });
assert.equal(emailNode.getAttribute("aria-invalid"), "false");
assert.equal(validationMessage.classList.contains("text-red-700"), false);
assert.ok(validationMessage.classList.contains("text-emerald-700"));
assert.match(validationMessage.textContent, /Data tidak dikirim/);
const toggleFixture = componentFixture("tw-button-state", "toggle");
const favorite = toggleFixture.nodes.get("favoriteButton");
favorite.setAttribute("aria-pressed", "false");
favorite.events.click.call(favorite);
assert.equal(favorite.getAttribute("aria-pressed"), "true");
assert.match(toggleFixture.nodes.get("favoriteStatus").textContent, /Sudah/);
favorite.events.click.call(favorite);
assert.equal(favorite.getAttribute("aria-pressed"), "false");
const loadingFixture = componentFixture("tw-button-state", "loading");
const saveButton = loadingFixture.nodes.get("saveButton");
saveButton.events.click.call(saveButton);
assert.equal(saveButton.disabled, true);
assert.equal(saveButton.getAttribute("aria-busy"), "true");
assert.equal(loadingFixture.pending[0].delay, 800);
loadingFixture.pending[0].handler();
assert.equal(saveButton.disabled, false);
assert.equal(saveButton.getAttribute("aria-busy"), "false");
assert.match(loadingFixture.nodes.get("saveStatus").textContent, /Tidak ada data disimpan/);
const menuFixture = componentFixture("tw-navigation", "navbar");
const menuButton = menuFixture.nodes.get("menuToggle");
const mobileMenu = menuFixture.nodes.get("mobileMenu");
menuButton.setAttribute("aria-expanded", "false");
mobileMenu.classList.add("hidden");
menuButton.events.click.call(menuButton);
assert.equal(menuButton.getAttribute("aria-expanded"), "true");
assert.equal(mobileMenu.classList.contains("hidden"), false);
menuButton.events.click.call(menuButton);
assert.equal(menuButton.getAttribute("aria-expanded"), "false");
assert.ok(mobileMenu.classList.contains("hidden"));
const alertFixture = componentFixture("tw-alert", "tutup");
alertFixture.nodes.get("closeAlert").events.click();
assert.equal(alertFixture.nodes.get("notice").hidden, true);
assert.equal(alertFixture.nodes.get("showAlert").focused, true);
alertFixture.nodes.get("showAlert").events.click();
assert.equal(alertFixture.nodes.get("notice").hidden, false);
assert.match(alertFixture.nodes.get("noticeText").textContent, /kembali/);

// Eksekusi inline JS dokumen guided, bukan hanya file JS workspace.
const guidedNotes = componentFixture('tw-resize-select', 'guided-learning');
guidedNotes.nodes.get('noteAction').events.click();
assert.match(guidedNotes.nodes.get('noteStatus').textContent, /ditandai/);
const guidedForm = componentFixture('tw-form-state', 'guided-learning');
const registration = guidedForm.nodes.get('registration');
let guidedPrevented = false;
registration.reportValidity = () => false;
registration.events.submit.call(registration, { preventDefault() { guidedPrevented = true; } });
assert.equal(guidedPrevented, true);
assert.doesNotMatch(guidedForm.nodes.get('registrationStatus').textContent, /Form valid/);
registration.reportValidity = () => true;
guidedForm.nodes.get('fullName').value = ' Ayu ';
registration.events.submit.call(registration, { preventDefault() {} });
assert.match(guidedForm.nodes.get('registrationStatus').textContent, /Ayu\. Form valid/);
const guidedSettings = componentFixture('tw-button-state', 'guided-learning');
const reminderButton = guidedSettings.nodes.get('reminder');
reminderButton.setAttribute('aria-pressed', 'false');
reminderButton.events.click.call(reminderButton);
assert.equal(reminderButton.getAttribute('aria-pressed'), 'true');
reminderButton.events.click.call(reminderButton);
assert.equal(reminderButton.getAttribute('aria-pressed'), 'false');
const settingsSave = guidedSettings.nodes.get('saveSettings');
settingsSave.events.click.call(settingsSave);
assert.equal(settingsSave.disabled, true);
assert.equal(settingsSave.getAttribute('aria-busy'), 'true');
guidedSettings.pending[0].handler();
assert.equal(settingsSave.disabled, false);
assert.equal(settingsSave.getAttribute('aria-busy'), 'false');
assert.match(guidedSettings.nodes.get('settingsStatus').textContent, /tidak disimpan/);
const guidedPortal = componentFixture('tw-accordion', 'guided-learning');
const portalMenu = guidedPortal.nodes.get('portalMenu');
portalMenu.setAttribute('aria-expanded', 'false');
portalMenu.events.click.call(portalMenu);
assert.equal(portalMenu.getAttribute('aria-expanded'), 'true');
assert.equal(guidedPortal.nodes.get('portalLinks').classList.contains('hidden'), false);
portalMenu.events.click.call(portalMenu);
assert.equal(portalMenu.getAttribute('aria-expanded'), 'false');
assert.equal(guidedPortal.nodes.get('portalLinks').classList.contains('hidden'), true);
guidedPortal.nodes.get('portalClose').events.click();
assert.equal(guidedPortal.nodes.get('portalAlert').hidden, true);
assert.equal(guidedPortal.nodes.get('portalShow').focused, true);
guidedPortal.nodes.get('portalShow').events.click();
assert.equal(guidedPortal.nodes.get('portalAlert').hidden, false);

// Kontrol tambahan proyek lengkap menjalankan script dari Copy HTML yang sama.
const fullForm = guidedForm.nodes.get('capstone-registration');
const fullName = guidedForm.nodes.get('capstone-name');
const fullResult = guidedForm.nodes.get('capstone-result');
let capstonePrevented = false;
fullName.value = '   ';
fullForm.events.submit.call(fullForm, { preventDefault() { capstonePrevented = true; } });
assert.equal(capstonePrevented, true);
assert.match(fullResult.textContent, /tidak boleh hanya spasi/);
assert.equal(fullName.focused, true);
fullName.value = ' Ayu ';
fullForm.reportValidity = () => false;
fullForm.events.submit.call(fullForm, { preventDefault() {} });
assert.match(fullResult.textContent, /Perbaiki kolom wajib/);
fullForm.reportValidity = () => true;
guidedForm.nodes.get('capstone-class').value = 'Web B';
fullForm.events.submit.call(fullForm, { preventDefault() {} });
assert.match(fullResult.textContent, /Ayu memilih Web B/);
fullForm.events.reset();
assert.match(fullResult.textContent, /Form dikosongkan/);
const fullReminder = guidedSettings.nodes.get('capstone-reminder');
fullReminder.setAttribute('aria-pressed', 'false');
fullReminder.events.click.call(fullReminder);
assert.equal(fullReminder.getAttribute('aria-pressed'), 'true');
const fullProcess = guidedSettings.nodes.get('capstone-process');
const fullReset = guidedSettings.nodes.get('capstone-settings-reset');
fullProcess.events.click.call(fullProcess);
assert.equal(fullProcess.disabled, true);
assert.equal(fullReset.disabled, true);
assert.equal(fullProcess.getAttribute('aria-busy'), 'true');
guidedSettings.nodes.get('capstone-setting-name').value = 'Kelas proyek';
const fullTimer = guidedSettings.pending.find((timer) => timer.delay === 1000);
assert.ok(fullTimer);
fullTimer.handler();
assert.equal(fullProcess.disabled, false);
assert.equal(fullReset.disabled, false);
assert.equal(fullProcess.getAttribute('aria-busy'), 'false');
assert.match(guidedSettings.nodes.get('capstone-result').textContent, /Kelas proyek/);
fullReset.events.click();
assert.equal(fullReminder.getAttribute('aria-pressed'), 'false');
assert.equal(guidedSettings.nodes.get('capstone-setting-name').value, 'Praktikum Web');

// Fixture rantai jQuery untuk callback proyek, bukan pengganti library/browser.
function fullJqueryFixture(lessonId) {
  const lesson = lessons.find((item) => item.id === lessonId);
  const source = lesson.sections.find((section) => section.guided).code.html;
  const nodes = new Map(Array.from(source.matchAll(/\bid="([^"]+)"/g), (match) => [match[1], Object.assign(new Element(match[1]), { children: [] })]));
  const requests = [];
  function wrap(targets) {
    const api = { 0: targets[0], node: targets[0],
      on(name, handler) { targets.forEach((node) => { node.events[name] = handler; }); return api; },
      val(value) { if (value === undefined) return targets[0].value; targets.forEach((node) => { node.value = value; }); return api; },
      text(value) { if (value === undefined) return targets[0].textContent; targets.forEach((node) => { node.textContent = String(value); }); return api; },
      attr(name, value) { if (value === undefined) return targets[0].getAttribute(name); targets.forEach((node) => node.setAttribute(name, value)); return api; },
      prop(name, value) { if (value === undefined) return targets[0][name]; targets.forEach((node) => { node[name] = value; }); return api; },
      addClass(value) { targets.forEach((node) => value.split(' ').forEach((name) => node.classList.add(name))); return api; },
      removeClass(value) { targets.forEach((node) => value.split(' ').forEach((name) => node.classList.remove(name))); return api; },
      empty() { targets.forEach((node) => { node.children = []; }); return api; },
      append(child) { targets.forEach((node) => node.children.push(child.node)); return api; },
      focus() { targets[0].focus(); return api; }
    };
    return api;
  }
  function jq(selector) {
    if (typeof selector === 'function') { selector(); return; }
    if (selector instanceof Element) return wrap([selector]);
    if (selector.startsWith('<')) return wrap([Object.assign(new Element(selector), { children: [] })]);
    const targets = selector.split(',').map((part) => {
      const id = part.trim().slice(1);
      assert.ok(nodes.has(id), `Selector fixture tersedia: ${id}`);
      return nodes.get(id);
    });
    return wrap(targets);
  }
  jq.ajax = (options) => {
    const callbacks = {};
    const chain = { done(handler) { callbacks.done = handler; return chain; }, fail(handler) { callbacks.fail = handler; return chain; }, always(handler) { callbacks.always = handler; return chain; } };
    requests.push({ options, finish() {
      const json = decodeURIComponent(options.url.slice(options.url.indexOf(',') + 1));
      let data;
      try { data = JSON.parse(json); } catch { callbacks.fail(); callbacks.always(); return; }
      callbacks.done(data); callbacks.always();
    } });
    return chain;
  };
  const script = run(`capstoneJqueryScript(${lesson.groupNumber})`);
  assert.ok(source.includes(script), 'Script yang diuji identik dengan Copy HTML');
  vm.runInNewContext(script, { $: jq });
  return { nodes, requests };
}
const fullSignup = fullJqueryFixture('jq-form');
const signupForm = fullSignup.nodes.get('capstone-registration');
fullSignup.nodes.get('capstone-name').value = 'A';
fullSignup.nodes.get('capstone-email').checkValidity = () => false;
let signupPrevented = false;
signupForm.events.submit({ preventDefault() { signupPrevented = true; } });
assert.equal(signupPrevented, true);
assert.match(fullSignup.nodes.get('capstone-result').textContent, /minimal tiga/);
assert.equal(fullSignup.nodes.get('capstone-name').getAttribute('aria-invalid'), 'true');
fullSignup.nodes.get('capstone-name').value = ' Ayu ';
fullSignup.nodes.get('capstone-email').checkValidity = () => true;
fullSignup.nodes.get('capstone-class').value = 'Web C';
fullSignup.nodes.get('capstone-consent').checked = true;
signupForm.events.submit({ preventDefault() {} });
assert.match(fullSignup.nodes.get('capstone-result').textContent, /Ayu memilih Web C/);
signupForm.events.reset();
assert.equal(fullSignup.nodes.get('capstone-name').getAttribute('aria-invalid'), 'false');
const fullDirectory = fullJqueryFixture('jq-ajax');
const directoryLoad = fullDirectory.nodes.get('capstone-load');
for (const mode of ['valid', 'broken', 'empty', 'valid']) {
  fullDirectory.nodes.get('capstone-request-mode').value = mode;
  directoryLoad.events.click.call(directoryLoad);
  assert.equal(directoryLoad.disabled, true);
  assert.equal(directoryLoad.getAttribute('aria-busy'), 'true');
  assert.equal(fullDirectory.nodes.get('capstone-directory').children.length, 0);
  fullDirectory.requests.at(-1).finish();
  assert.equal(directoryLoad.disabled, false);
  assert.equal(directoryLoad.getAttribute('aria-busy'), 'false');
  const status = fullDirectory.nodes.get('capstone-result');
  assert.equal(status.classList.contains('text-red-700'), mode === 'broken');
  if (mode === 'valid') {
    assert.equal(fullDirectory.nodes.get('capstone-directory').children.length, 6, 'Retry tidak menggandakan hasil');
    assert.match(status.textContent, /6 peserta/);
  } else assert.match(status.textContent, mode === 'broken' ? /JSON tidak dapat dibaca/ : /belum ada peserta/);
}

console.log(`Lulus: ${lessons.length} subsection; ${catalog.map((track) => `${track.groups.length} section ${track.sectionLabel}`).join(" + ")}.`);
console.log("Lulus: syntax contoh/library, highlighting, navigasi bebas, edit/copy/reset, scroll editor, dan bridge error preview.");
console.log("Lulus: 14 bagian property + guided learning, Run/Copy per bagian, draft independen, dan reset dari tab CSS.");
console.log("Lulus: sub-menu bagian, pencarian, fokus/scroll, deep link, dan navigasi hash tanpa kehilangan draft.");
console.log(`Lulus: review narasi ${lessons.length} halaman, ${sectionCount} bagian, Copy/Run HTML dan JS setiap bagian, serta collapse track dan penanda aktif.`);
console.log(`Lulus: tabel Property CSS / Utility Tailwind / Keterangan pada ${tailwindLessons.length} halaman dan ${tailwindSections.length} bagian Tailwind, serta tabel bersih saat pindah jQuery.`);
console.log("Lulus: dokumen CDN/lokal aktif, native tanpa Tailwind, perbandingan jumlah kode, Run tanpa injeksi library ganda, dan error CDN tanpa fallback.");
console.log("Lulus: SVG dihapus dari kurikulum/menu, 10 halaman Form/Button/Komponen esensial dengan section dan tabel masing-masing.");
console.log("Lulus: submit dicegah, feedback validasi/aria-invalid, toggle/aria-pressed, loading/disabled, menu/aria-expanded, serta tutup/buka alert dan fokus.");
console.log("Lulus: 27 halaman utuh dengan 13 tahap coding, source diperluas, komponen tambahan/jurnal, 216 tantangan dengan sasaran/hint/kriteria, hubungan materi sebelumnya, syntax script inline, Copy/Run mandiri tanpa injeksi ganda, dan interaksi guided Tailwind.");
console.log("Lulus: setiap source minimal 4x baris, karakter tanpa spasi, dan elemen dibanding baseline tetap; 3 modul/9 entri tambahan, indikator panjang mengikuti draft, form lengkap, serta toggle/loading/reset proyek.");
console.log("Lulus: callback jQuery proyek lengkap untuk validasi/reset dan AJAX sukses/gagal/kosong/retry menggunakan fixture tanpa request jaringan.");
console.log("Catatan: pemeriksaan menggunakan fixture DOM; tampilan dan eksekusi library di browser masih memerlukan pemeriksaan visual.");
