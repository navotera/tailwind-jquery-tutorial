// Standalone vanilla JavaScript rich editor built with Tiptap, Markdown, and Lowlight.
import { Editor, Extension, markInputRule, markPasteRule } from '@tiptap/core';
import { icon } from './material-editor-icons.mjs';
export { icon };
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { Italic, starPasteRegex, underscorePasteRegex } from '@tiptap/extension-italic';
import { TableKit } from '@tiptap/extension-table';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Image from '@tiptap/extension-image';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Plugin } from '@tiptap/pm/state';
import { createLowlight } from 'lowlight';
import { Marked } from 'marked';
import bash from 'highlight.js/lib/languages/bash';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import go from 'highlight.js/lib/languages/go';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

export const codeLanguages = [
  ['plaintext', 'Teks biasa'], ['xml', 'HTML / XML'], ['css', 'CSS'], ['javascript', 'JavaScript'],
  ['typescript', 'TypeScript'], ['json', 'JSON'], ['php', 'PHP'], ['sql', 'SQL'],
  ['bash', 'Bash / Shell'], ['python', 'Python'], ['go', 'Go'], ['java', 'Java'], ['csharp', 'C#'],
];
const lowlight = createLowlight();
lowlight.register({ bash, csharp, css, go, java, javascript, json, php, python, sql, typescript, xml });
lowlight.registerAlias({ xml: ['html', 'markup'], javascript: ['js'], typescript: ['ts'], bash: ['shell', 'sh'], csharp: ['cs', 'c#'] });
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export function colorHex(value) {
  if (/^#[a-f\d]{6}$/i.test(value || '')) return value.toLowerCase();
  const match = String(value || '').match(/^rgb\(\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\s*\)$/i);
  if (!match || match.slice(1).some((part) => Number(part) > 255)) return null;
  return '#' + match.slice(1).map((part) => Number(part).toString(16).padStart(2, '0')).join('');
}
export function safeUrl(value, image = false) {
  if (typeof value !== 'string' || value.length > 2048) return false;
  if (image && /^\.\/api\/materials\.php\?image=[1-9]\d*$/.test(value)) return true;
  if (!image && /^#[a-z0-9/_-]+$/i.test(value)) return true;
  try { return /^https?:$/.test(new URL(value).protocol); } catch (_) { return false; }
}
export function detectCodeLanguage(source) {
  // Bounded language detection, kept ahead of the raw-HTML paste path.
  const code = source.slice(0, 20000).trim();
  if (code.length < 3) return null;
  try { const data = JSON.parse(code); if (data && typeof data === 'object') return 'json'; } catch (_) { /* Try patterns. */ }
  if (/^<\?php|\$[A-Za-z_]\w*\s*=|->\w+\s*\(/m.test(code)) return 'php';
  if (/^\s*(?:<!doctype\s+html|<\/?[a-z][\w-]*(?:\s|>))/i.test(code)) return 'xml';
  if (/\b(?:SELECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|CREATE\s+TABLE)\b[\s\S]*\b(?:FROM|VALUES|SET|TABLE)\b/i.test(code)) return 'sql';
  if (/^\s*(?:package\s+main|func\s+\w+\s*\()/m.test(code)) return 'go';
  if (/\busing\s+System\s*;|Console\.WriteLine\s*\(/.test(code)) return 'csharp';
  if (/\bpublic\s+(?:static\s+)?class\s+\w+|System\.out\.print/.test(code)) return 'java';
  if (/^\s*(?:#!.*\b(?:bash|sh)\b|(?:export\s+)?[A-Z_][A-Z0-9_]*=|(?:echo|printf|sudo|chmod|curl)\s+)/m.test(code)) return 'bash';
  if (/^\s*(?:def\s+\w+\s*\(|from\s+\w+(?:\.\w+)*\s+import\s+|import\s+\w+|class\s+\w+.*:)|\bself\.\w+|print\s*\(/m.test(code)) return 'python';
  if (/\b(?:interface|type)\s+\w+\s*[={]|\b(?:const|let|var)\s+\w+\s*:\s*(?:string|number|boolean|unknown|Record)\b/.test(code)) return 'typescript';
  if (/\b(?:const|let|var)\s+\w+|=>|\bfunction\s+\w*\s*\(|console\.\w+\s*\(|\$\(/.test(code)) return 'javascript';
  if (/(?:^|})\s*[.#]?[\w\s,:>+~\[\]="'-]+\s*\{\s*[\w-]+\s*:/m.test(code)) return 'css';
  return null;
}
export function looksLikeMarkdown(value) {
  if (!value || value.length > 1_000_000) return false;
  return /^\s{0,3}(?:#{1,6}\s+\S|[-*+]\s+\S|\d+[.)]\s+\S|>\s*\S|`{3,}|~{3,}|(?:[-*_]\s*){3,}$)/m.test(value)
    || /^.+\n\s*(?:={3,}|-{3,})\s*$/m.test(value)
    || /^\s*\|?.+\|.+\n\s*\|?\s*:?-{3,}/m.test(value)
    || /\*\*[^*\n]+\*\*|~~[^~\n]+~~|\+\+[^+\n]+\+\+|`[^`\n]+`|!?\[[^\]\n]+\]\([^\s]+\)|(?:^|\s)[*_][^*_\n]+[*_](?:\s|[.,!?]|$)/.test(value);
}
const marked = new Marked({ gfm: true, breaks: true });
export function markdownToHtml(source) { return marked.parse(source); }
export function highlight(source, language) {
  const aliases = { html: 'xml', markup: 'xml', js: 'javascript', ts: 'typescript', shell: 'bash', 'c#': 'csharp' };
  const name = aliases[language] || language;
  if (!lowlight.registered(name)) return escape(source);
  function render(node) {
    if (node.type === 'text') return escape(node.value);
    const children = (node.children || []).map(render).join('');
    if (node.type !== 'element') return children;
    return `<span class="${escape((node.properties.className || []).join(' '))}">${children}</span>`;
  }
  return render(lowlight.highlight(name, source));
}

const ReliableItalic = Italic.extend({
  addInputRules() {
    return [markInputRule({ find: /(?:^|\s)(\*([^*\n]+)\*)$/, type: this.type }), markInputRule({ find: /(?:^|\s)(_([^_\n]+)_)$/, type: this.type })];
  },
  addPasteRules() { return [markPasteRule({ find: starPasteRegex, type: this.type }), markPasteRule({ find: underscorePasteRegex, type: this.type })]; },
});
const MarkdownTextStyle = TextStyle.extend({
  markdownTokenName: 'coloredText',
  parseMarkdown(token, helpers) { return helpers.applyMark('textStyle', helpers.parseInline(token.tokens || []), { color: /^#[a-f\d]{6}$/i.test(token.color) ? token.color : null }); },
  renderMarkdown(node, helpers) {
    const content = helpers.renderChildren(node);
    const color = colorHex(node.attrs?.color);
    return color ? `<span style="color: ${color}">${content}</span>` : content;
  },
  markdownTokenizer: {
    name: 'coloredText', level: 'inline',
    start(source) { return source.search(/<span\s+style=["']color\s*:/i); },
    tokenize(source, _tokens, lexer) {
      const match = /^<span\s+style=["']color\s*:\s*(#[a-f\d]{6})\s*;?["']>([\s\S]+?)<\/span>/i.exec(source);
      if (!match) return undefined;
      return { type: 'coloredText', raw: match[0], color: match[1], tokens: lexer.inlineTokens(match[2]) };
    },
  },
});
const SafeImage = Image.extend({
  parseHTML() { return [{ tag: 'img[src]', getAttrs: (node) => safeUrl(node.getAttribute('src'), true) ? null : false }]; },
  parseMarkdown(token, helpers) {
    if (!safeUrl(token.href, true)) return [];
    return helpers.createNode('image', { src: token.href, alt: (token.text || '').slice(0, 255), title: null });
  },
}).configure({ allowBase64: false, HTMLAttributes: { loading: 'lazy', referrerpolicy: 'no-referrer' } });
const TrailingParagraph = Extension.create({
  name: 'materialTrailingParagraph',
  addProseMirrorPlugins() { return [new Plugin({ appendTransaction: (_transactions, _oldState, state) => state.doc.lastChild?.type.name === 'codeBlock' ? state.tr.insert(state.doc.content.size, state.schema.nodes.paragraph.create()) : null })]; },
});
const VisualCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ({ node, editor, getPos }) => {
      const dom = document.createElement('div'); dom.className = 'material-code-node';
      const toolbar = document.createElement('div'); toolbar.className = 'material-code-actions'; toolbar.contentEditable = 'false';
      const select = document.createElement('select'); select.setAttribute('aria-label', 'Bahasa blok kode');
      codeLanguages.forEach(([value, label]) => { const option = document.createElement('option'); option.value = value; option.textContent = label; select.append(option); });
      function showLanguage(language) {
        const name = language || 'plaintext';
        if (![...select.options].some((option) => option.value === name)) { const option = document.createElement('option'); option.value = name; option.textContent = name; select.append(option); }
        select.value = name;
      }
      showLanguage(node.attrs.language);
      select.addEventListener('change', () => {
        const position = getPos(); if (typeof position !== 'number') return;
        const current = editor.state.doc.nodeAt(position);
        if (current) editor.view.dispatch(editor.state.tr.setNodeMarkup(position, undefined, { ...current.attrs, language: select.value }));
      });
      const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'material-icon-button'; copy.innerHTML = icon('copy'); copy.title = 'Salin kode'; copy.setAttribute('aria-label', 'Salin kode');
      copy.addEventListener('click', async () => {
        const position = getPos(); const source = typeof position === 'number' ? editor.state.doc.nodeAt(position)?.textContent : '';
        try { await navigator.clipboard.writeText(source || ''); copy.innerHTML = icon('check'); copy.title = 'Tersalin'; copy.setAttribute('aria-label', 'Tersalin'); } catch (_) { copy.title = 'Pilih teks untuk menyalin'; copy.setAttribute('aria-label', copy.title); }
      });
      toolbar.append(select, copy);
      const pre = document.createElement('pre'); const contentDOM = document.createElement('code'); pre.append(contentDOM); dom.append(toolbar, pre);
      return {
        dom, contentDOM,
        update(next) { if (next.type !== node.type) return false; node = next; showLanguage(next.attrs.language); return true; },
        stopEvent(event) { return toolbar.contains(event.target); },
        ignoreMutation(mutation) { return toolbar.contains(mutation.target); },
      };
    };
  },
}).configure({ lowlight, defaultLanguage: null, enableTabIndentation: true, tabSize: 2 });

export function createEditor({ element, content, markdown = null, ariaLabel, onUpdate, onSelectionUpdate, onPaste, onDrop, onSave }) {
  let detectionTimer;
  let instance;
  const editor = new Editor({
    element,
    extensions: [
      StarterKit.configure({ codeBlock: false, italic: false, link: { openOnClick: false, autolink: false, isAllowedUri: (url) => safeUrl(url) } }),
      ReliableItalic, Markdown.configure({ markedOptions: { gfm: true, breaks: true } }), VisualCodeBlock,
      TaskList, TaskItem.configure({ nested: true }), TableKit.configure({ table: { resizable: true } }),
      MarkdownTextStyle, Color, SafeImage, TrailingParagraph,
    ],
    content: markdown === null ? content : markdown,
    contentType: markdown === null ? 'html' : 'markdown',
    editorProps: {
      attributes: { class: 'material-surface material-prose', role: 'textbox', 'aria-multiline': 'true', 'aria-label': ariaLabel, spellcheck: 'false' },
      handlePaste: (_view, event) => onPaste(instance, event),
      handleDrop: (_view, event, _slice, moved) => moved ? false : onDrop(instance, event),
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') { event.preventDefault(); onSave(); return true; }
        return false;
      },
    },
    onUpdate: ({ editor: current }) => {
      onUpdate(current);
      clearTimeout(detectionTimer);
      detectionTimer = setTimeout(() => {
        if (current.isDestroyed) return;
        const transaction = current.state.tr;
        let changed = false;
        current.state.doc.descendants((node, position) => {
          if (node.type.name !== 'codeBlock' || node.attrs.language) return;
          const language = detectCodeLanguage(node.textContent);
          if (language) { transaction.setNodeMarkup(position, undefined, { ...node.attrs, language }); changed = true; }
        });
        if (changed) current.view.dispatch(transaction);
      }, 450);
    },
    onSelectionUpdate: ({ editor: current }) => onSelectionUpdate(current),
    onDestroy: () => clearTimeout(detectionTimer),
  });
  instance = editor;
  return editor;
}
