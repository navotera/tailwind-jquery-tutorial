# Library pihak ketiga

Salinan lokal dipakai supaya praktikum tidak bergantung pada CDN ketika menjalankan contoh.

| File | Versi | Sumber | Lisensi |
| --- | --- | --- | --- |
| tailwind-3.4.17.js | 3.4.17 | https://cdn.tailwindcss.com/3.4.17 | MIT |
| jquery-3.7.1.min.js | 3.7.1 | https://code.jquery.com/jquery-3.7.1.min.js | MIT |
| prism-1.29.0.min.js | 1.29.0 | https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js | MIT |
| prism-css.min.js | 1.29.0 | https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-css.min.js | MIT |
| prism-javascript.min.js | 1.29.0 | https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js | MIT |
| material-rich-editor.min.js | Tiptap 3.31.4 / Lowlight 3.3.0 | Toolchain lokal `tools/material-editor`; source `../material-rich-editor.mjs` | MIT dan lisensi dependency pada `material-rich-editor.NOTICES.txt` |
| Ikon dalam material-rich-editor.min.js | Lucide 0.468.0 | Source `../material-editor-icons.mjs` | ISC; copyright dan lisensi pada source serta `material-rich-editor.min.js.LEGAL.txt` |

Informasi copyright/lisensi yang disertakan upstream dipertahankan di file masing-masing. Tailwind Play runtime adalah alat demonstrasi browser; materi ini menggunakan sintaks Tailwind 3.

Bundle editor memakai Tiptap core tanpa React, dengan ProseMirror, parser Markdown, Lowlight, dan grammar highlight.js terbatas. `material-rich-editor.NOTICES.txt` mencatat seluruh paket yang masuk bundle beserta lisensi yang disertakan paket sumber. Komentar lisensi upstream dipertahankan oleh bundler bila tersedia. Bundle ini mandiri dan tidak mengambil library dari internet saat runtime.
