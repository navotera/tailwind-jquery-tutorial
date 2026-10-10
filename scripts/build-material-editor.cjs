// Rebuild the checked-in browser bundle from an installed Tiptap toolchain.
// Example: node scripts/build-material-editor.cjs C:/laragon/www/Palemo/web
const path = require('node:path');
const fs = require('node:fs');
const sourceRoot = path.resolve(process.argv[2] || '.');
const modules = path.join(sourceRoot, 'node_modules');
const esbuild = require(require.resolve('esbuild', { paths: [sourceRoot] }));
const root = path.resolve(__dirname, '..');
const build = esbuild.buildSync({
  entryPoints: [path.join(root, 'material-rich-editor.mjs')],
  outfile: path.join(root, 'vendor/material-rich-editor.min.js'),
  bundle: true, minify: true, format: 'iife', globalName: 'MaterialRichEditor',
  platform: 'browser', target: ['es2020'], nodePaths: [modules], legalComments: 'linked',
  absWorkingDir: root, metafile: true,
});
// Include each bundled package's license; keep notices with the local artifact.
const packages = new Map();
for (const input of Object.keys(build.metafile.inputs)) {
  let directory = path.dirname(path.resolve(root, input));
  if (!directory.includes(path.sep + 'node_modules' + path.sep)) continue;
  while (directory !== path.dirname(directory)) {
    const manifest = path.join(directory, 'package.json');
    if (fs.existsSync(manifest)) {
      const metadata = JSON.parse(fs.readFileSync(manifest, 'utf8'));
      if (metadata.name && metadata.version) { packages.set(metadata.name, { directory, metadata }); break; }
    }
    directory = path.dirname(directory);
  }
}
const notices = [...packages.values()].sort((a, b) => a.metadata.name.localeCompare(b.metadata.name)).map(({ directory, metadata }) => {
  const license = fs.readdirSync(directory).find((file) => /^licen[cs]e(?:[._-]|$)/i.test(file));
  return `${metadata.name} ${metadata.version} (${metadata.license || 'See package license'})\n${license ? fs.readFileSync(path.join(directory, license), 'utf8') : `Source: ${typeof metadata.repository === 'string' ? metadata.repository : metadata.repository?.url || metadata.homepage || metadata.name}`}`;
});
fs.writeFileSync(path.join(root, 'vendor/material-rich-editor.NOTICES.txt'), notices.join('\n\n---\n\n'));
console.log('Browser editor bundle rebuilt from the installed Palemo toolchain.');
