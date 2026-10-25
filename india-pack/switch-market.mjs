#!/usr/bin/env node
// India Fresher Pack: switch the career-ops job scan between India and Abroad.
//
// Usage (run inside your career-ops folder):
//   node india-pack/switch-market.mjs india
//   node india-pack/switch-market.mjs abroad
//   node india-pack/switch-market.mjs status
//
// Each market keeps its own working copy of portals.yml in india-pack/, so
// companies you add while in one market are still there when you switch back.
import { existsSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACK = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(PACK);
const PORTALS = join(ROOT, 'portals.yml');
const MARKETS = ['india', 'abroad'];

if (!existsSync(join(ROOT, 'AGENTS.md')) || !existsSync(join(ROOT, 'modes'))) {
  console.error('This script must sit in the india-pack folder inside your career-ops folder.');
  process.exit(1);
}

// The first line of a pack portals file is "# market: india" or "# market: abroad".
function marketOf(file) {
  if (!existsSync(file)) return null;
  const m = readFileSync(file, 'utf8').match(/^# market: (\w+)/);
  return m ? m[1] : 'custom';
}

const target = (process.argv[2] || '').toLowerCase();
const current = marketOf(PORTALS);

if (target === 'status' || !target) {
  console.log(`Current market: ${current ?? 'none (no portals.yml yet)'}`);
  if (!target) console.log('Switch with: node india-pack/switch-market.mjs india   (or abroad)');
  process.exit(0);
}
if (!MARKETS.includes(target)) {
  console.error(`Unknown market "${target}". Use: india, abroad or status.`);
  process.exit(1);
}
if (current === target) {
  console.log(`Already on ${target}. Nothing changed.`);
  process.exit(0);
}

// Save the current list so nothing the student added is lost.
if (current) {
  const name = MARKETS.includes(current) ? `my-portals.${current}.yml` : `my-portals.custom-${new Date().toISOString().slice(0, 10)}.yml`;
  copyFileSync(PORTALS, join(PACK, name));
  console.log(`Saved your current ${current} list as india-pack/${name}`);
}

// Restore the student's own copy of the target market if there is one,
// otherwise start from the pack's list.
const mine = join(PACK, `my-portals.${target}.yml`);
const source = existsSync(mine) ? mine : join(PACK, `portals.${target}.yml`);
writeFileSync(PORTALS, readFileSync(source, 'utf8'));
console.log(`Switched to ${target} (from ${source.endsWith(`my-portals.${target}.yml`) ? 'your saved list' : "the pack's list"}).`);
console.log('Next: node scan.mjs --dry-run   (preview)   or   /career-ops scan   in Claude Code');
