#!/usr/bin/env node
// AI Job Search India: one-time setup. Safe to run again (it updates the
// pack's rules in place and never deletes your files).
//
// Usage (run inside your career-ops folder):
//   node india-pack/setup.mjs                 freshers (default)
//   node india-pack/setup.mjs experienced     experienced professionals
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACK = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(PACK);
// Marker names kept from the pack's first release so older installs update in place.
const START = '<!-- india-fresher-pack:start -->';
const END = '<!-- india-fresher-pack:end -->';
const level = (process.argv[2] || 'fresher').toLowerCase();

if (!existsSync(join(ROOT, 'AGENTS.md')) || !existsSync(join(ROOT, 'modes'))) {
  console.error('Copy the india-pack folder into your career-ops folder first, then run this from there.');
  process.exit(1);
}
if (!['fresher', 'experienced', 'all'].includes(level)) {
  console.error(`Unknown level "${level}". Use fresher, experienced or all.`);
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
  console.log('Updated the AI Job Search India rules in modes/_custom.md');
} else {
  custom = `${custom.trimEnd()}\n\n${block}`;
  console.log('Added the AI Job Search India rules to modes/_custom.md');
}
writeFileSync(customPath, custom);

// 2. Job scan list: build one for India at the chosen level if there is none.
const portals = join(ROOT, 'portals.yml');
const switcher = join(PACK, 'switch-market.mjs');
if (!existsSync(portals)) {
  execFileSync(process.execPath, [switcher, 'india', level], { stdio: 'inherit' });
} else if (!/^# market: (india|abroad)/.test(readFileSync(portals, 'utf8'))) {
  console.log('You already have your own portals.yml, so it was left alone.');
  console.log(`To use the pack list:  node india-pack/switch-market.mjs india ${level}   (your file is saved first)`);
} else {
  console.log('portals.yml is already a pack list. Change it with:  node india-pack/switch-market.mjs india|abroad fresher|experienced|all');
}

console.log('\nDone. Open Claude Code in this folder and type /career-ops to finish setup by chatting.');
console.log(`Tell it: "I am ${level === 'experienced' ? 'an experienced professional' : 'a fresher'} in India; use the india-pack starter files for my profile."`);
