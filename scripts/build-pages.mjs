import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
import './localize-manual.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, 'dist');
if (!process.env.STATICRYPT_PASSWORD) {
  throw new Error('Set STATICRYPT_PASSWORD before building the Pages edition.');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const themeRevision = createHash('sha256').update(await readFile(path.join(root, 'theme.css'))).digest('hex').slice(0, 12);
const template = await readFile(path.join(root, 'scripts/password-template.html'), 'utf8');
const templatePath = path.join(output, '.password-template.html');
await writeFile(templatePath, template.replace('href="theme.css"', `href="theme.css?v=${themeRevision}"`));
const result = spawnSync(process.execPath, [
  path.join(root, 'node_modules/staticrypt/cli/index.js'),
  'index.html', '--directory', 'dist', '--config', 'false', '--short',
  '--remember', 'false', '--template', templatePath,
  '--template-title', 'Go2 EDU | Lab Field Guide',
], { cwd: root, env: process.env, stdio: 'inherit' });
await rm(templatePath, { force: true });
if (result.status !== 0) throw new Error('Encrypted Pages build failed.');
for (const item of ['styles.css', 'theme.css', 'app.js', 'i18n.js', 'assets', 'downloads']) {
  await cp(path.join(root, item), path.join(output, item), { recursive: true });
}
await cp(path.join(root, 'node_modules/staticrypt/LICENSE'), path.join(output, 'STATICRYPT-LICENSE.txt'));
await writeFile(path.join(output, '.nojekyll'), '');
await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
const encrypted = await readFile(path.join(output, 'index.html'), 'utf8');
if (!encrypted.includes('staticryptEncryptedMsgUniqueVariableName')) {
  throw new Error('The output does not contain an encrypted page.');
}
console.log('Pages edition ready in dist/: encrypted manual, unchanged images and attachments.');
