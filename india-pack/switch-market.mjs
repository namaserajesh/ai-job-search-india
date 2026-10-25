#!/usr/bin/env node
// AI Job Search India: choose which jobs the career-ops scan looks for.
//
// Usage (run inside your career-ops folder), in any order:
//   node india-pack/switch-market.mjs india            market: India or abroad
//   node india-pack/switch-market.mjs experienced      level: fresher, experienced or all
//   node india-pack/switch-market.mjs abroad fresher   both at once
//   node india-pack/switch-market.mjs status
//
// portals.yml is built from india-pack/lists/ (location + titles + companies).
// Each market/level pair keeps its own working copy in india-pack/, so
// companies you add while on one setting are still there when you come back.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACK = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(PACK);
const LISTS = join(PACK, 'lists');
const PORTALS = join(ROOT, 'portals.yml');
const MARKETS = ['india', 'abroad'];
const LEVELS = ['fresher', 'experienced', 'all'];

if (!existsSync(join(ROOT, 'AGENTS.md')) || !existsSync(join(ROOT, 'modes'))) {
  console.error('This script must sit in the india-pack folder inside your career-ops folder.');
  process.exit(1);
}

// The first line of a pack-built portals.yml is "# market: india level: fresher".
// Files from older pack versions say only "# market: india" (fresher).
function settingOf(file) {
  if (!existsSync(file)) return null;
  const m = readFileSync(file, 'utf8').match(/^# market: (\w+)(?: level: (\w+))?/);
  return m ? { market: m[1], level: m[2] || 'fresher' } : { market: 'custom', level: null };
}

function build(market, level) {
  const read = (name) => readFileSync(join(LISTS, name), 'utf8').trimEnd();
  const levelText = { fresher: 'fresher and internship roles', experienced: 'experienced roles (no intern or entry-level titles)', all: 'all levels' }[level];
  const header = [
    `# market: ${market} level: ${level}`,
    `# AI Job Search India: career-ops scan list for ${market === 'india' ? 'jobs in India' : 'jobs outside India'}, ${levelText}.`,
    '# Built by india-pack/switch-market.mjs from india-pack/lists/. Change it with:',
    '#   node india-pack/switch-market.mjs india|abroad fresher|experienced|all',
    '# You can add companies here; switching saves your copy for this setting.',
    '',
  ].join('\n');
  return [header, read(`location.${market}.yml`), read(`titles.${level}.yml`), read(`companies.${market}.yml`)].join('\n\n') + '\n';
}

const args = process.argv.slice(2).map((a) => a.toLowerCase());
const current = settingOf(PORTALS);

if (args.length === 0 || args.includes('status')) {
  console.log(current ? `Current setting: market ${current.market}${current.level ? `, level ${current.level}` : ''}` : 'No portals.yml yet.');
  if (args.length === 0) console.log('Change it with: node india-pack/switch-market.mjs india|abroad fresher|experienced|all');
  process.exit(0);
}
const bad = args.filter((a) => !MARKETS.includes(a) && !LEVELS.includes(a));
if (bad.length) {
  console.error(`Unknown option "${bad.join(' ')}". Use india or abroad, and fresher, experienced or all.`);
  process.exit(1);
}

const known = current && MARKETS.includes(current.market);
const market = args.find((a) => MARKETS.includes(a)) || (known ? current.market : 'india');
const level = args.find((a) => LEVELS.includes(a)) || (known ? current.level : 'fresher');

if (known && current.market === market && current.level === level) {
  console.log(`Already on market ${market}, level ${level}. Nothing changed.`);
  process.exit(0);
}

// Save the current list so nothing the user added is lost.
if (current) {
  const name = known ? `my-portals.${current.market}-${current.level}.yml` : `my-portals.custom-${new Date().toISOString().slice(0, 10)}.yml`;
  writeFileSync(join(PACK, name), readFileSync(PORTALS, 'utf8'));
  console.log(`Saved your current list as india-pack/${name}`);
}

// Restore the user's own copy for this setting, otherwise build a fresh one.
const mine = join(PACK, `my-portals.${market}-${level}.yml`);
writeFileSync(PORTALS, existsSync(mine) ? readFileSync(mine, 'utf8') : build(market, level));
console.log(`Switched to market ${market}, level ${level}${existsSync(mine) ? ' (your saved list)' : ''}.`);
console.log('Next: node scan.mjs --dry-run   (preview)   or   /career-ops scan   in Claude Code');
