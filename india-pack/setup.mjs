#!/usr/bin/env node
// AI Job Search India: one-time setup. Safe to run again (it updates the
// pack's rules and dashboard buttons in place and never deletes your files).
//
// Usage (run inside your career-ops folder):
//   node india-pack/setup.mjs                      freshers (default)
//   node india-pack/setup.mjs experienced          experienced professionals
//   node india-pack/setup.mjs --no-dashboard       skip the dashboard buttons
//   node india-pack/setup.mjs --unpatch-dashboard  remove the dashboard buttons
//                                                  (do this before updating career-ops)
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACK = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(PACK);
// Marker names kept from the pack's first release so older installs update in place.
const START = '<!-- india-fresher-pack:start -->';
const END = '<!-- india-fresher-pack:end -->';
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const level = (args.find((a) => !a.startsWith('--')) || 'fresher').toLowerCase();

if (!existsSync(join(ROOT, 'AGENTS.md')) || !existsSync(join(ROOT, 'modes'))) {
  console.error('Copy the india-pack folder into your career-ops folder first, then run this from there.');
  process.exit(1);
}

// Dashboard buttons live in one marked block at the end of the Explore page,
// plus a rename of its default export so the block can wrap it.
const EXPLORE = join(ROOT, 'web', 'src', 'app', 'explore', 'page.tsx');
const HOOK = 'export default function ExplorePage()';
const RENAMED = 'function ExplorePageOriginal()';
const BLOCK_RE = /\r?\n?\/\/ india-pack:start[\s\S]*?\/\/ india-pack:end\r?\n?/;

function unpatchDashboard() {
  if (!existsSync(EXPLORE)) return 'no dashboard found';
  const src = readFileSync(EXPLORE, 'utf8');
  if (!src.includes('// india-pack:start')) return 'not installed';
  writeFileSync(EXPLORE, src.replace(BLOCK_RE, '\n').replace(RENAMED, HOOK).replace(/\n+$/, '\n'));
  return 'removed';
}

function patchDashboard() {
  if (!existsSync(EXPLORE)) return 'skipped (no web dashboard in this career-ops version)';
  const block = readFileSync(join(PACK, 'dashboard', 'explore-switch.tsx.txt'), 'utf8').trim();
  let src = readFileSync(EXPLORE, 'utf8');
  if (src.includes('// india-pack:start')) {
    src = src.replace(BLOCK_RE, `\n\n${block}\n`);
    writeFileSync(EXPLORE, src);
    return 'updated';
  }
  if (src.split(HOOK).length !== 2) {
    return 'skipped: this career-ops version changed its Explore page, so the buttons were not added (use the switch-market command instead)';
  }
  writeFileSync(EXPLORE, `${src.replace(HOOK, RENAMED).trimEnd()}\n\n${block}\n`);
  return 'added';
}

if (flags.has('--unpatch-dashboard')) {
  console.log(`Dashboard buttons: ${unpatchDashboard()}. You can now update career-ops; run this setup again afterwards.`);
  process.exit(0);
}
if (!['fresher', 'experienced', 'all'].includes(level)) {
  console.error(`Unknown level "${level}". Use fresher, experienced or all.`);
  process.exit(1);
}

// 1. House rules: add or refresh the pack's block in modes/_custom.md.
const customPath = join(ROOT, 'modes', '_custom.md');
const rules = `${START}\n${readFileSync(join(PACK, 'custom-rules.md'), 'utf8').trim()}\n${END}\n`;
let custom;
if (existsSync(customPath)) {
  custom = readFileSync(customPath, 'utf8');
} else {
  const template = join(ROOT, 'modes', '_custom.template.md');
  custom = existsSync(template) ? readFileSync(template, 'utf8') : '# Custom Instructions -- career-ops\n';
}
if (custom.includes(START) && custom.includes(END)) {
  custom = custom.replace(/<!-- india-fresher-pack:start -->[\s\S]*?<!-- india-fresher-pack:end -->\r?\n?/, () => rules);
  console.log('Updated the AI Job Search India rules in modes/_custom.md');
} else {
  custom = `${custom.trimEnd()}\n\n${rules}`;
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

// 3. Dashboard buttons on the Explore page.
if (!flags.has('--no-dashboard')) console.log(`Dashboard buttons (Explore page): ${patchDashboard()}`);

console.log('\nDone. Open Claude Code in this folder and type /career-ops to finish setup by chatting.');
console.log(`Tell it: "I am ${level === 'experienced' ? 'an experienced professional' : 'a fresher'} in India; use the india-pack starter files for my profile."`);
console.log('Before updating career-ops, run:  node india-pack/setup.mjs --unpatch-dashboard   (then run setup again)');
