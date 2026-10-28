# Contributing

Thanks for helping Indian job seekers get more out of career-ops. Most useful
changes are small: a company board that stopped working, a new board that
returns India roles, or an India check the rules miss.

## Before you start

- **A career-ops bug goes to career-ops.** If the problem is in career-ops itself
  (the scanner, the dashboard, a mode), report it in the
  [career-ops issues](https://github.com/career-ops-hq/career-ops/issues).
- **Open an issue first** for anything bigger than a list edit, so we can agree
  on the approach before you write it.

## Adding or fixing a company

1. Add it to `india-pack/lists/companies.india.yml` (or `companies.abroad.yml`),
   next to similar companies.
2. Check it returns jobs: inside a career-ops folder with the pack installed, run
   `node scan.mjs --company "<Name>" --dry-run`.
3. In the pull request, say the date you tested it and how many India roles it
   returned.

## Testing

Run the smoke test against a career-ops folder before opening a pull request:

```
npx @santifer/career-ops init /tmp/career-ops
node test/smoke.mjs /tmp/career-ops --require-yaml
```

CI runs the same test on every pull request and once a month against the latest
career-ops release.

## What we will not merge

- Anything that applies, submits or sends on the user's behalf.
- Scheduled or unattended scraping of job portals. Naukri, LinkedIn and
  Glassdoor do not allow automated access.
- Real personal data: CVs, phone numbers, email addresses. Use made-up examples.

## Commits

Explain **why** in the message; the diff already shows what changed. Add a line
to `CHANGELOG.md` under **Unreleased**.

By contributing you agree that your work is released under the MIT License, and
you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
