#!/usr/bin/env node
// AI Job Search India: end-to-end smoke test against a real career-ops folder.
//
// Usage:  node test/smoke.mjs <career-ops-folder> [--require-yaml]
//
// Copies india-pack into the folder and walks the path a student takes: setup,
// every market/level switch, setup again, and the dashboard unpatch/repatch that
// the README asks for before a career-ops update. CI runs it against a fresh
// `npx @santifer/career-ops init`, so a career-ops release that breaks the pack
// fails here before a student finds out.
//
// Every generated portals.yml is parsed with the js-yaml that career-ops itself
// installs. --require-yaml (set in CI) makes a missing js-yaml a failure instead
// of a skip.
import assert from 'node:assert/strict';
import { cpSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = dirname(dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
if (!target) {
  console.error('Usage: node test/smoke.mjs <career-ops-folder> [--require-yaml]');
  process.exit(2);
}
const ROOT = resolve(target);
const PACK = join(ROOT, 'india-pack');
const PORTALS = join(ROOT, 'portals.yml');
const CUSTOM = join(ROOT, 'modes', '_custom.md');
const EXPLORE = join(ROOT, 'web', 'src', 'app', 'explore', 'page.tsx');

let yaml = null;
try {
  yaml = createRequire(join(ROOT, 'package.json'))('js-yaml');
} catch {
  if (args.includes('--require-yaml')) throw new Error(`js-yaml not found in ${ROOT}; run npm install there first`);
  console.warn('! js-yaml not found in the career-ops folder: portals.yml is not parsed');
}

const run = (script, ...a) => execFileSync(process.execPath, [join(PACK, script), ...a], { cwd: ROOT, encoding: 'utf8' });
let checks = 0;
const ok = (name) => { checks += 1; console.log(`ok ${checks} - ${name}`); };

rmSync(PACK, { recursive: true, force: true });
rmSync(PORTALS, { force: true });
cpSync(join(REPO, 'india-pack'), PACK, { recursive: true });
const exploreBefore = existsSync(EXPLORE) ? readFileSync(EXPLORE, 'utf8') : null;

// 1. Setup on a fresh folder.
run('setup.mjs');
assert.match(readFileSync(PORTALS, 'utf8'), /^# market: india level: fresher\n/);
assert.equal(readFileSync(CUSTOM, 'utf8').split('<!-- india-fresher-pack:start -->').length, 2);
ok('setup adds the rules once and builds an India fresher scan list');
if (exploreBefore === null) {
  console.warn('! no web dashboard in this career-ops version: dashboard checks skipped');
} else {
  assert.ok(readFileSync(EXPLORE, 'utf8').includes('// india-pack:start'), 'dashboard block not added');
  ok('setup adds the dashboard buttons');
}

// 2. Every market and level builds a scan list career-ops can read.
for (const market of ['india', 'abroad']) {
  for (const level of ['fresher', 'experienced', 'all']) {
    run('switch-market.mjs', market, level);
    const text = readFileSync(PORTALS, 'utf8');
    assert.ok(text.startsWith(`# market: ${market} level: ${level}\n`), `${market}/${level}: wrong header`);
    if (yaml) {
      const doc = yaml.load(text);
      assert.ok(Array.isArray(doc.tracked_companies) && doc.tracked_companies.length > 0, `${market}/${level}: no tracked_companies`);
      assert.ok(doc.tracked_companies.every((c) => c.name && c.careers_url), `${market}/${level}: a company lacks name or careers_url`);
      assert.ok(doc.title_filter && doc.location_filter, `${market}/${level}: title_filter or location_filter missing`);
    }
    ok(`switch-market ${market} ${level}`);
  }
}
assert.match(run('switch-market.mjs', 'status'), /market abroad, level all/);
ok('status reports the current setting');

// 3. Running setup again changes nothing it should not.
run('setup.mjs');
assert.equal(readFileSync(CUSTOM, 'utf8').split('<!-- india-fresher-pack:start -->').length, 2);
assert.match(readFileSync(PORTALS, 'utf8'), /^# market: abroad level: all\n/);
ok('setup is idempotent and keeps the chosen scan list');

// 4. The update path from the README: unpatch restores career-ops' own page.
if (exploreBefore !== null) {
  run('setup.mjs', '--unpatch-dashboard');
  assert.equal(readFileSync(EXPLORE, 'utf8'), exploreBefore, 'unpatch did not restore the original Explore page');
  ok('unpatch restores the original Explore page byte for byte');
  run('setup.mjs');
  assert.ok(readFileSync(EXPLORE, 'utf8').includes('// india-pack:start'));
  ok('setup re-adds the dashboard buttons after an update');
}

console.log(`\n${checks} checks passed against ${ROOT}`);
