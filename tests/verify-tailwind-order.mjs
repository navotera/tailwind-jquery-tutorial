import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { join, dirname, resolve, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import vm from 'node:vm';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const context = vm.createContext({});
const files = ['utility-properties.js', 'lessons.js', 'essential-lessons.js', 'lesson-guides.js', 'lesson-examples.js', 'tailwind-reference.js', 'guided-practice.js', 'guided-capstones.js', 'guided-learning.js', 'javascript-lessons.js', 'tailwind-details.js'];
for (const file of files) vm.runInContext(readFileSync(join(root, file), 'utf8'), context, { filename: file });
const catalog = vm.runInContext('lessonCatalog', context);
const tailwind = catalog.find((track) => track.sectionId === 'tailwind');
const lessons = tailwind.groups.flatMap((group) => group.lessons);
const allLessons = catalog.flatMap((track) => track.groups.flatMap((group) => group.lessons));
const position = new Map(lessons.map((lesson, index) => [lesson.id, index]));
const before = (prerequisite, topic) => assert.ok(position.get(prerequisite) < position.get(topic), `${prerequisite} harus sebelum ${topic}`);

assert.equal(tailwind.groups.length, 19);
assert.equal(position.size, lessons.length, 'Tidak ada halaman hilang/duplikat saat urutan dipindah');
for (const [prerequisite, topic] of [
  ['tw-framework', 'tw-install'], ['tw-install', 'tw-hello'], ['tw-hello', 'tw-utility'],
  ['tw-utility', 'tw-padding'], ['tw-padding', 'tw-container'], ['tw-size', 'tw-container'],
  ['tw-minmax', 'tw-overflow'], ['tw-display', 'tw-position'], ['tw-display', 'tw-visibility'],
  ['tw-position', 'tw-zindex'], ['tw-font', 'tw-bg-image'], ['tw-bg-color', 'tw-border-width'],
  ['tw-border-width', 'tw-radius'], ['tw-border-style', 'tw-radius'],
  ['tw-display', 'tw-flex-direction'], ['tw-size', 'tw-flex-sizing'], ['tw-flex-sizing', 'tw-flex-wrap'],
  ['tw-flex-direction', 'tw-justify'], ['tw-grid-template', 'tw-grid-span'], ['tw-grid-template', 'tw-place'],
  ['tw-grid-template', 'tw-responsive'], ['tw-flex-wrap', 'tw-responsive'], ['tw-align', 'tw-responsive'],
  ['tw-bg-image', 'tw-filters'], ['tw-shadow', 'tw-transitions'], ['tw-transitions', 'tw-scale'],
  ['tw-outline', 'tw-form-state'], ['tw-form-input', 'tw-button-state'], ['tw-button-state', 'tw-accordion']
]) before(prerequisite, topic);

const installation = lessons.find((lesson) => lesson.id === 'tw-install');
assert.deepEqual(Array.from(installation.sections, (section) => section.id), ['cdn', 'dokumen', 'cuplikan']);
assert.match(installation.sections[0].code.html, /src="https:\/\/cdn\.tailwindcss\.com\/3\.4\.17"/);
assert.match(installation.sections[1].code.html, /src="\.\/vendor\/tailwind-3\.4\.17\.js"/);

const baseline = JSON.parse(readFileSync(join(root, 'tests/fixtures/guided-source-baseline.json'), 'utf8'));
const oldGuidedPages = Object.keys(baseline).filter((id) => id.startsWith('tw-'));
assert.deepEqual(Array.from(tailwind.groups, (group) => group.lessons.at(-1).id).sort(), oldGuidedPages.sort(), 'Route Guided Learning lama tetap tersedia');
let edges = 0;
for (const track of catalog.filter((item) => item.sectionId !== 'javascript')) {
  for (const [index, group] of track.groups.entries()) {
    assert.equal(group.number, index + 1);
    for (const [lessonIndex, lesson] of group.lessons.entries()) {
      assert.equal(lesson.groupNumber, group.number);
      assert.equal(lesson.number, `${group.number}.${lessonIndex + 1}`);
      const ids = (lesson.sections || []).map((section) => section.id);
      assert.equal(new Set(ids).size, ids.length, `ID bagian unik: ${lesson.id}`);
    }
    const lesson = group.lessons.at(-1), guided = lesson.sections.at(-1);
    assert.equal(guided.id, 'guided-learning');
    assert.equal(guided.steps.length, 13);
    assert.equal(guided.challenges.length, 8);
    for (const link of guided.connections) {
      const prior = allLessons.find((item) => item.id === link.id);
      assert.ok(prior, `Prasyarat ditemukan: ${link.id}`);
      assert.ok(prior.sectionId !== track.sectionId || prior.groupNumber <= group.number, `Tidak merujuk kelompok mendatang: ${lesson.id}/${prior.id}`);
      assert.equal(link.label, `${prior.number} ${prior.title}`);
      edges++;
    }
    if (track.sectionId === 'tailwind') {
      const learned = track.groups.slice(0, index + 1).flatMap((part) => part.lessons);
      const hasFlex = learned.some((item) => item.id === 'tw-flex-direction');
      const hasGrid = learned.some((item) => item.id === 'tw-grid-template');
      const classes = [...guided.code.html.matchAll(/class="([^"]*)"/g)].flatMap((match) => match[1].split(/\s+/)).map((utility) => utility.split(':').at(-1));
      if (!hasFlex) assert.equal(classes.some((utility) => /^(?:inline-flex|flex(?:-|$)|basis-|grow(?:-|$)|shrink(?:-|$))/.test(utility)), false, `Proyek ${lesson.id} belum meminta Flexbox`);
      if (!hasGrid) assert.equal(classes.some((utility) => /^(?:inline-grid|grid(?:-|$)|col-|row-)/.test(utility)), false, `Proyek ${lesson.id} belum meminta Grid`);
      assert.equal(guided.moduleCount, 3);
      assert.equal(guided.itemCount, 9);
      assert.match(guided.note, /#tw-install\/cdn/);
      const original = baseline[lesson.id];
      assert.ok(guided.code.html.split('\n').length >= original.lines * 4);
      assert.ok(guided.code.html.replace(/\s/g, '').length >= original.characters * 4);
    }
  }
}
console.log(`Lulus: ${lessons.length} halaman Tailwind, urutan prasyarat, ${edges} tautan konsep, penomoran Tailwind/jQuery, instalasi CDN/lokal, ${oldGuidedPages.length} route Guided Learning lama, dan proyek sebelum Flex/Grid.`);

if (process.env.BROWSER_MODULE_PATH) {
  const { chromium } = await import(pathToFileURL(process.env.BROWSER_MODULE_PATH).href);
  const folder = mkdtempSync(join(tmpdir(), 'codeforge-order-'));
  const listener = createServer();
  await new Promise((resolve) => listener.listen(0, '127.0.0.1', resolve));
  const port = listener.address().port;
  await new Promise((resolve) => listener.close(resolve));
  const base = `http://127.0.0.1:${port}`;
  const server = spawn('php', ['-S', `127.0.0.1:${port}`], { cwd: root, env: { ...process.env, CODEFORGE_DB_PATH: join(folder, 'materials.sqlite') }, stdio: 'ignore' });
  let browser;
  try {
    let ready = false;
    for (let attempt = 0; attempt < 40; attempt++) {
      try { await fetch(`${base}/index.html`); ready = true; break; }
      catch (_) { await new Promise((resolve) => setTimeout(resolve, 100)); }
    }
    assert.ok(ready, 'Server PHP tersedia');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = []; page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`${base}/#tw-install/cdn`);
    await page.waitForFunction(() => document.querySelector('#lessonTitle').textContent.startsWith('1.2 '));
    const sections = await page.locator('#lessonSections > section').evaluateAll((nodes) => nodes.map((node) => node.id));
    assert.deepEqual(sections, ['property-section-cdn', 'property-section-dokumen', 'property-section-cuplikan']);
    await page.locator('#nextLesson').click();
    await page.waitForFunction(() => location.hash === '#tw-hello');
    assert.match(await page.locator('#lessonTitle').textContent(), /^1\.3 /);
    await page.locator('#nextLesson').click();
    await page.waitForFunction(() => location.hash === '#tw-utility');
    assert.match(await page.locator('#lessonTitle').textContent(), /^2\.1 /);
    await page.locator('#nextLesson').click();
    await page.waitForFunction(() => location.hash === '#tw-padding');
    assert.match(await page.locator('#lessonTitle').textContent(), /^3\.1 /);
    await page.locator('#previousLesson').click();
    await page.waitForFunction(() => location.hash === '#tw-utility');
    await page.evaluate(() => { location.hash = 'tw-responsive/breakpoint'; });
    await page.waitForFunction(() => document.querySelector('#lessonTitle').textContent.startsWith('11.1 '));
    assert.equal(await page.locator('.nav-subsection[href="#tw-responsive/breakpoint"]').getAttribute('aria-current'), 'location');
    assert.match(await page.locator('#property-section-guided-learning .guided-connections a[href="#tw-grid-template"]').textContent(), /^9\.1 /);
    await page.reload();
    await page.waitForFunction(() => document.querySelector('#lessonTitle').textContent.startsWith('11.1 '));
    assert.equal(await page.locator('.nav-subsection[href="#tw-responsive/breakpoint"]').getAttribute('aria-current'), 'location');
    assert.equal(await page.locator('.nav-section[data-track=tailwind] .nav-group').count(), 19);
    assert.deepEqual(errors, []);
    console.log('Lulus: browser urutan CDN/lokal/workspace, nomor sidebar, Next/Previous lintas kelompok, tautan prasyarat Grid, dan direct-route/reload responsive.');
  } finally {
    await browser?.close();
    const exited = new Promise((resolve) => server.once('exit', resolve)); server.kill(); await exited;
    const target = resolve(folder);
    assert.equal(dirname(target), resolve(tmpdir()));
    assert.match(basename(target), /^codeforge-order-/);
    rmSync(target, { recursive: true, force: true });
  }
}
