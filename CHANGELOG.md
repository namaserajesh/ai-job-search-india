# Changelog

All notable changes to this project are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-10-28

First tagged release, prepared for the TKIET workshop.

### Added

- India checks for every career-ops job evaluation (`india-pack/custom-rules.md`):
  CTC vs in-hand pay, bonds and fees, consultant listings and scam signs, plus
  fresher checks (batch year, joining date, hidden experience lines, CGPA and
  backlog cut-offs) and experienced checks (notice period, experience band, CTC
  handling, non-compete and moonlighting clauses).
- `setup.mjs`: one-time install for freshers or experienced professionals. Safe to
  run again; never deletes the user's files.
- `switch-market.mjs`: market (India or Abroad) and level (fresher, experienced or
  all) switch for the job scan, keeping the user's own list for each setting.
- Scan lists for 51 India job boards and 22 abroad, tested on 2026-10-25.
- India/Abroad and level buttons on the career-ops dashboard's Explore page, with
  `--unpatch-dashboard` for career-ops updates and `--no-dashboard` to skip them.
- On-request portal search for Naukri, LinkedIn and Glassdoor: small, signed in,
  with the user watching, never scheduled.
- Starter profile and CV files for freshers and experienced professionals.
- End-to-end smoke test (`test/smoke.mjs`), run by CI on every change and monthly
  against the latest career-ops release.
- Contributing guide, security policy, code of conduct, issue forms and pull
  request template.

[Unreleased]: https://github.com/namaserajesh/ai-job-search-india/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/namaserajesh/ai-job-search-india/releases/tag/v1.0.0
