import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = await readFile(path.join(root, 'content/manual.zh.html'), 'utf8');
const translations = JSON.parse(await readFile(path.join(root, 'locales/en.json'), 'utf8'));
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' };
const decode = (value) => value.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (match, entity) => {
  if (entity[0] === '#') {
    return String.fromCodePoint(entity[1].toLowerCase() === 'x'
      ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10));
  }
  return entities[entity] ?? match;
});
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const translate = (value) => {
  const decoded = decode(value);
  const key = decoded.trim();
  if (Object.hasOwn(translations, key)) {
    return decoded.slice(0, decoded.indexOf(key)) + translations[key] + decoded.slice(decoded.indexOf(key) + key.length);
  }
  if (/[\u4e00-\u9fff]/u.test(key)) throw new Error(`Missing English translation: ${key}`);
  return decoded;
};

// Preserve the authored structure, anchors, links, credentials and code identifiers.
const tokens = source.split(/(<[^>]+>)/g);
let output = tokens.map((token, index) => {
  if (!token.startsWith('<')) {
    const translated = translate(token);
    // Chinese prose may touch inline code or emphasis without spaces. English needs word boundaries.
    const inlineCode = /^<(?:code|title)(?:\s|>)/i.test(tokens[index - 1] || '');
    const spaced = Object.hasOwn(translations, decode(token).trim()) && !inlineCode
      ? `${/^[A-Za-z0-9(]/.test(translated) ? ' ' : ''}${translated}${/[A-Za-z0-9):;,]$/.test(translated) ? ' ' : ''}`
      : translated;
    return escape(spaced);
  }
  return token.replace(/\b(alt|aria-label|content|data-copy-label)="([^"]*)"/g,
    (_, name, value) => `${name}="${escape(translate(value)).replaceAll('"', '&quot;')}"`);
}).join('').replace('<html lang="zh-CN">', '<html lang="en">');

const catalog = JSON.stringify(Object.entries(translations).map(([zh, en]) => [en, zh]))
  .replaceAll('<', '\\u003c');
output = output.replace('  <script src="app.js"></script>',
  `  <script id="manual-translations" type="application/json">${catalog}</script>\n  <script src="i18n.js?v=20261027"></script>\n  <script src="app.js?v=20261027"></script>`);
const styleRevision = createHash('sha256').update(await readFile(path.join(root, 'styles.css'))).digest('hex').slice(0, 12);
output = output.replace('href="styles.css"', `href="styles.css?v=${styleRevision}"`);
await writeFile(path.join(root, 'index.html'), output);
console.log('Bilingual manual generated: English default, Chinese switch available.');
