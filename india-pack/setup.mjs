#!/usr/bin/env node
// India Fresher Pack: one-time setup. Safe to run again (it updates the pack's
// rules in place and never deletes your files).
//
// Usage (run inside your career-ops folder):
//   node india-pack/setup.mjs
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACK = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(PACK);
const START = '<!-- india-fresher-pack:start -->';
const END = '<!-- india-fresher-pack:end -->';

if (!existsSync(join(ROOT, 'AGENTS.md')) || !existsSync(join(ROOT, 'modes'))) {
  console.error('Copy the india-pack folder into your career-ops folder first, then run this from there.');
  process.exit(1);
}

// 1. House rules: add or refresh the pack's block in modes/_custom.md.
const customPath = join(ROOT, 'modes', '_custom.md');
const block = `${START}\n${readFileSync(join(PACK, 'custom-rules.md'), 'utf8').trim()}\n${END}\n`;
let custom;
if (existsSync(customPath)) {
  custom = readFileSync(customPath, 'utf8');
} else {
  const template = join(ROOT, 'modes', '_custom.template.md');
  custom = existsSync(template) ? readFileSync(template, 'utf8') : '# Custom Instructions -- career-ops\n';
}
if (custom.includes(START) && custom.includes(END)) {
  custom = custom.replace(/<!-- india-fresher-pack:start -->[\s\S]*?<!-- india-fresher-pack:end -->\r?\n?/, () => block);
  console.log('Updated the India Fresher Pack rules in modes/_custom.md');
} else {
  custom = `${custom.trimEnd()}\n\n${block}`;
  console.log('Added the India Fresher Pack rules to modes/_custom.md');
}
writeFileSync(customPath, custom);

// 2. Job scan list: start on India if there is no portals.yml yet.
const portals = join(ROOT, 'portals.yml');
if (!existsSync(portals)) {
  writeFileSync(portals, readFileSync(join(PACK, 'portals.india.yml'), 'utf8'));
  console.log('Created portals.yml with the India company list');
} else if (!/^# market: (india|abroad)/.test(readFileSync(portals, 'utf8'))) {
  console.log('You already have your own portals.yml, so it was left alone.');
  console.log('To use the pack list:  node india-pack/switch-market.mjs india   (your file is saved first)');
} else {
  console.log('portals.yml is already a pack list. Check it with:  node india-pack/switch-market.mjs status');
}

console.log('\nDone. Open Claude Code in this folder and type /career-ops to finish setup by chatting.');
console.log('Tell it: "I am an Indian fresher; use the india-pack starter files for my profile."');
