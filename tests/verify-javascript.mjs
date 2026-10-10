import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const curriculumContext = vm.createContext({});
for (const file of ["utility-properties.js", "lessons.js", "essential-lessons.js", "lesson-guides.js", "lesson-examples.js", "tailwind-reference.js", "guided-practice.js", "guided-capstones.js", "guided-learning.js", "javascript-lessons.js"]) {
  vm.runInContext(read(file), curriculumContext, { filename: file });
}
const lesson = vm.runInContext("javascriptBasicLesson", curriculumContext);
const sections = new Map(lesson.sections.map((section) => [section.id, section]));

class Node {
  constructor(value = "") {
    this.value = value;
    this.initialValue = value;
    this.children = [];
    this.listeners = {};
    this.classes = new Set();
    this.classList = { add: (name) => this.classes.add(name) };
    this.hidden = false;
    this.disabled = false;
    this._text = "";
  }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text; }
  addEventListener(type, listener) { this.listeners[type] = listener; }
  appendChild(child) { this.children.push(child); }
  focus() { this.focused = true; }
}

// Fixture memeriksa hasil instruksi/handler, bukan layout atau DevTools browser.
function execute(section, source = section.code.js) {
  const nodes = new Map();
  for (const match of section.code.html.matchAll(/<[a-z][^>]*\bid="([^"]+)"[^>]*>/gi)) {
    const value = match[0].match(/\bvalue="([^"]*)"/)?.[1] || "";
    nodes.set(match[1], new Node(value));
  }
  for (const node of nodes.values()) node.reset = () => {
    for (const field of nodes.values()) field.value = field.initialValue;
  };
  const logs = [];
  const assertions = [];
  const context = vm.createContext({
    document: { querySelector: (selector) => nodes.get(selector.slice(1)) || null, createElement: () => new Node() },
    console: { log: (...args) => logs.push(args), table: (data) => logs.push(data), assert: (condition, message) => { if (!condition) assertions.push(message); } }
  });
  vm.runInContext(source, context, { filename: `js-basic/${section.id}.js` });
  const event = (id, type) => {
    let prevented = false;
    nodes.get(id).listeners[type]({ preventDefault() { prevented = true; } });
    return prevented;
  };
  return { nodes, context, event, logs, assertions };
}

assert.equal(sections.size, 16);
let tables = 0;
let snippets = 0;
for (const section of sections.values()) {
  assert.ok(section.paragraphs.length >= 4, `${section.id}: narasi dijabarkan`);
  for (const field of ["learningGoal", "exercise", "note"]) assert.ok(section[field]?.trim(), `${section.id}/${field}`);
  for (const field of ["learningTables", "codeWalkthrough", "expectedResults", "successCriteria"]) assert.ok(section[field]?.length, `${section.id}/${field}`);
  assert.ok((section.learningSteps || section.steps)?.length, `${section.id}: langkah mencoba tersedia`);
  for (const table of section.learningTables) {
    tables += 1;
    assert.ok(table.title && table.headers.length >= 3 && table.rows.length);
    for (const row of table.rows) {
      assert.equal(row.length, table.headers.length, `${section.id}: kolom tabel konsisten`);
      assert.ok(row.every((cell) => typeof cell === "string" && cell.length));
    }
  }
  new vm.Script(section.code.js, { filename: section.id });
  for (const snippet of section.learningSnippets || []) {
    snippets += 1;
    new vm.Script(snippet.code, { filename: `${section.id}/${snippet.id}` });
  }
}

const defaultOutput = {
  pengenalan: "Halo! Teks ini diubah oleh JavaScript native.",
  "file-javascript": "JavaScript dari file terpisah berhasil berjalan.",
  variabel: "Peserta: Ayu (string)\nLatihan selesai: 3 (number)\nAktif: true (boolean)\nMateri berikutnya: undefined\nMentor: null\nNama pada var lama: Bima",
  operator: "Teks + angka: 21\nAngka + angka: 3\nTotal: Rp24000\nAngka valid: true\n2 sama dengan teks 2: false",
  kondisi: "Siap melanjutkan ke materi berikutnya.",
  fungsi: "Buku: Rp30000\nPulpen: Rp12000\nSeluruh belanja: Rp42000",
  "array-object": "Jumlah peserta: 3\nPeserta pertama: Ayu\nNilai terbaru: 85",
  perulangan: "- Ayu\n- Bima\n- Citra\nJumlah angka 1 sampai 3: 6",
  "debug-console": "Total: Rp36000"
};
for (const [id, expected] of Object.entries(defaultOutput)) {
  assert.equal(execute(sections.get(id)).nodes.get("result").textContent, expected, `${id}: hasil awal sesuai materi`);
}

assert.equal(vm.runInNewContext("var value = 1; var value = 2; value"), 2);
assert.equal(vm.runInNewContext("let value = 1; value = 2; value"), 2);
assert.throws(() => vm.runInNewContext("const value = 1; value = 2;"), { name: "TypeError" });
assert.throws(() => vm.runInNewContext("let value = 1; let value = 2;"), { name: "SyntaxError" });
assert.throws(() => vm.runInNewContext("const value;"), { name: "SyntaxError" });
assert.equal(vm.runInNewContext("var value = 1; { var value = 2; } value"), 2);
assert.throws(() => vm.runInNewContext("{ let local = 3; } local"), { name: "ReferenceError" });
assert.equal(vm.runInNewContext("var observed = value; var value = 1; observed"), undefined);
assert.throws(() => vm.runInNewContext("value; let value = 1;"), { name: "ReferenceError" });
assert.equal(vm.runInNewContext("const person = { score: 80 }; person.score = 85; person.score"), 85);

const condition = sections.get("kondisi");
for (const [score, submitted, expected] of [[74, true, "Ulangi latihan hingga nilai minimal 75."], [75, true, "Siap melanjutkan ke materi berikutnya."], [74, false, "Kumpulkan tugas terlebih dahulu."], [75, false, "Kumpulkan tugas terlebih dahulu."]]) {
  const source = condition.code.js.replace("const score = 80;", `const score = ${score};`).replace("const submitted = true;", `const submitted = ${submitted};`);
  assert.equal(execute(condition, source).nodes.get("result").textContent, expected);
}
for (const snippet of sections.get("variabel").learningSnippets) execute(sections.get("variabel"), snippet.code);
const discount = execute(sections.get("fungsi"), sections.get("fungsi").learningSnippets[0].code);
assert.equal(discount.nodes.get("result").textContent, "Tanpa diskon: 40000; Dengan diskon: 35000");
const dom = execute(sections.get("dom"));
assert.equal(dom.nodes.get("greeting").textContent, "Halo, Ayu!");
assert.ok(dom.nodes.get("greeting").classes.has("is-highlighted"));
dom.nodes.get("participantName").value = "Bima";
assert.equal(dom.nodes.get("greeting").textContent, "Halo, Ayu!", "Tanpa event, sapaan tidak berubah otomatis");

const form = execute(sections.get("event"));
for (const name of ["", "Al"]) {
  form.nodes.get("participantName").value = name;
  assert.ok(form.event("greetingForm", "submit"));
  assert.equal(form.nodes.get("message").textContent, "Isi nama minimal tiga karakter.");
}
form.nodes.get("participantName").value = " Ayu ";
assert.ok(form.event("greetingForm", "submit"));
assert.equal(form.nodes.get("message").textContent, "Halo, Ayu! Form tidak dikirim ke server.");

const debugConsole = sections.get("debug-console");
assert.equal(execute(debugConsole).assertions.length, 0);
assert.equal(execute(debugConsole, debugConsole.code.js.replace('"3"', '"abc"')).assertions.length, 1);
const debugError = sections.get("debug-error");
assert.throws(() => execute(debugError).event("checkButton", "click"), { name: "TypeError" });
const fixedSelector = execute(debugError, debugError.code.js.replaceAll("#resut", "#result"));
fixedSelector.event("checkButton", "click");
assert.equal(fixedSelector.nodes.get("result").textContent, "Selector sudah benar.");
const browser = sections.get("debug-browser");
for (const [value, buggy, fixed] of [["3", "31", "4"], ["0", "01", "1"], ["10", "101", "11"]]) {
  const before = execute(browser);
  before.nodes.get("quantity").value = value;
  before.event("calculate", "click");
  assert.equal(before.nodes.get("result").textContent, "Jumlah setelah ditambah satu: " + buggy);
  const after = execute(browser, browser.code.js.replace("const total = quantity + 1;", "const total = Number(quantity) + 1;"));
  after.nodes.get("quantity").value = value;
  after.event("calculate", "click");
  assert.equal(after.nodes.get("result").textContent, "Jumlah setelah ditambah satu: " + fixed);
}

const guided = sections.get("guided-learning");
const inlineSection = sections.get("script-html");
const inlineSource = inlineSection.code.html.match(/<script>([\s\S]*?)<\/script>/)[1];
assert.equal(execute(inlineSection, inlineSource).nodes.get("result").textContent, "JavaScript dari HTML berhasil berjalan.");
const externalSection = sections.get("script-eksternal");
assert.ok(externalSection.code.html.includes('<script src="./javascript-example.js" defer></script>'));
assert.equal(execute(externalSection, read("javascript-example.js")).nodes.get("result").textContent, "JavaScript dari file terpisah berhasil berjalan.");
const script = guided.code.html.match(/<script>([\s\S]*?)<\/script>/)[1];
const project = execute(guided, script);
assert.equal(project.nodes.get("summary").textContent, "Jumlah peserta: 0");
assert.equal(project.nodes.get("clearButton").disabled, true);
for (const [name, score] of [["", "80"], ["Al", "80"], ["Ayu", ""], ["Ayu", "-1"], ["Ayu", "101"]]) {
  project.nodes.get("name").value = name;
  project.nodes.get("score").value = score;
  assert.ok(project.event("participantForm", "submit"));
  assert.equal(project.nodes.get("participantList").children.length, 0);
}
for (const [score, status] of [["0", "Perlu latihan"], ["74", "Perlu latihan"], ["75", "Siap lanjut"], ["100", "Siap lanjut"]]) {
  project.nodes.get("name").value = "Ayu";
  project.nodes.get("score").value = score;
  project.event("participantForm", "submit");
  assert.ok(project.nodes.get("participantList").children.at(-1).textContent.endsWith(status));
}
project.event("clearButton", "click");
assert.equal(project.nodes.get("participantList").children.length, 0);
assert.equal(project.nodes.get("emptyMessage").hidden, false);
assert.equal(project.nodes.get("clearButton").disabled, true);
assert.equal(vm.runInContext("nextNumber", project.context), 1);
assert.equal(guided.steps.length, 13);
assert.equal(guided.challenges.length, 8);

// Periksa renderer bersama: tabel kolom dinamis dan cuplikan memakai CodeEditor.
const renderNodes = new Map();
curriculumContext.window = {};
curriculumContext.document = {
  querySelector(selector) { if (!renderNodes.has(selector)) renderNodes.set(selector, new Node()); return renderNodes.get(selector); },
  querySelectorAll() { return []; }
};
vm.runInContext(read("code-editor.js"), curriculumContext);
vm.runInContext(read("app.js").replace(/\ninit\(\);\s*$/, ""), curriculumContext);
vm.runInContext('state.lessonId = "js-basic"; renderLessonSections();', curriculumContext);
const markup = renderNodes.get("#lessonSections").innerHTML;
assert.equal((markup.match(/class="property-table learning-table"/g) || []).length, tables);
assert.ok(markup.includes('<th scope="col">var</th><th scope="col">let</th><th scope="col">const</th>'));
assert.equal((markup.match(/Membaca kode langkah demi langkah/g) || []).length, sections.size);
assert.equal((markup.match(/Hasil yang seharusnya terlihat/g) || []).length, sections.size);
assert.ok(markup.includes('data-code-preview="js-basic-variabel-scope"'));
assert.ok(markup.includes("&lt;pre id=&quot;result&quot;&gt;"), "HTML dalam tabel menjadi teks");
console.log(`Lulus: ${sections.size} bagian JavaScript, ${tables} tabel, ${snippets} cuplikan, hasil contoh, semantik var/let/const, pemasangan script, kasus debugging, event, proyek, dan renderer bersama. Fixture tidak menguji layout atau DevTools browser.`);
