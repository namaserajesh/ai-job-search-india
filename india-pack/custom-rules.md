## AI Job Search India: house rules

These rules come from the AI Job Search India pack. They are procedural: they
tell career-ops how to evaluate, never what is true about the candidate. Every
fact about the candidate still comes only from `cv.md`, `config/profile.yml`
and `modes/_profile.md`.

The India checks themselves (CTC vs take-home pay, bonds and fees, consultant
listings, scam signals, batch year, joining date, hidden experience lines,
cut-offs, notice period, experience band, clauses to quote) live upstream in
career-ops `modes/in/`. Turn it on with `language.modes_dir: modes/in` in
`config/profile.yml`. The rules below are only what the pack adds on top.

### Roles outside India (Abroad)

1. The candidate is authorised to work in India only unless
   `config/profile.yml` `location.authorized_in` says otherwise. For any role
   outside those countries, quote the JD's sponsorship or work-authorisation
   line. If it says no sponsorship, that is a hard stop. If it says nothing,
   set the decision to "Research first" with the question "Do you sponsor
   work visas for candidates from India?" Never claim a visa route, salary
   threshold or timeline that is not in the JD or an official government
   source read in this session.

### Portal search (on request only)

A custom workflow for Naukri, LinkedIn, Glassdoor, Indeed, Instahyre,
Internshala, Foundit and Google Jobs. These sites can't be scanned
automatically and their terms forbid automated scraping, so this runs only
in a browser the user can see, at human pace, when the user asks in that
session (for example: "portal search: fresher Java jobs in Pune on Naukri,
last 7 days").

2. **When.** Only on an explicit request in the current conversation. Never
    on a schedule, in a batch, in a headless or delegated run, or as part of
    `scan`. If a browser tool is not available, say so and stop.
3. **Limits per request.** One site, at most 2 result pages, at most 10
    jobs. Use the site's own search box and filters (role, city,
    experience, posted date) rather than guessing result URLs.
4. **Sign-in and blocks.** The user signs in themselves. Never type a
    password, OTP or CAPTCHA answer, and never accept terms or cookie banners
    beyond the privacy-preserving choice. On a CAPTCHA, login wall,
    "unusual activity" page or rate-limit message, stop at once and tell the
    user; don't retry or work around it.
5. **What to collect.** For each matching job: the job page link, company,
    role, location and the posted date shown. Skip listings that are
    sponsored adverts for courses or paid services. Mark consultant listings
    ("Posted by" a staffing firm, or employer hidden) in the location column
    with "via {consultancy}" so the agency gate applies later.
6. **Where it goes.** Add each job to `data/pipeline.md` under "## Pending"
    as `- [ ] {url} | {company} | {role} | {location}`, after checking the URL
    isn't already in `data/pipeline.md` or the tracker. Then show the user
    the list as a table and ask which ones to evaluate. Evaluating uses the
    normal `pipeline` or auto-pipeline flow; LinkedIn links follow the
    project's LinkedIn loading guard (paste the job text if the page won't
    load).
7. **Never** click Apply, Easy Apply, Save, Follow, Message or Connect;
    never fill a form; never change the user's profile or job alerts on the
    site. Reading and copying links only.

### Output preferences

- Write in Indian English. Show money as ₹ with lakh and crore, and salaries
  as LPA (lakh per annum) when the source does.
- Lead every report with the decision and the single most important
  eligibility check for the candidate's stage (batch or joining date for
  freshers; experience band or notice period for experienced people).
- Generate PDFs on A4 paper.

### Off-limits

- Never submit an application, pay a fee, or send a message for the candidate.
- Never ask for, store or write Aadhaar, PAN, bank, passport or UAN numbers.
- Never add a skill, project, employer, title, score or certificate to the CV
  that is not already in `cv.md`.

### Setting up a new user

When creating or updating `config/profile.yml`, `modes/_profile.md` or
`cv.md` for a new user, ask whether they are a fresher or experienced, then
start from the matching folder: `india-pack/starter/fresher/` or
`india-pack/starter/experienced/` (`profile.yml`, `_profile.md`,
`cv-template.md`). Fill them only with what the user tells you, and remind
them to run `node india-pack/switch-market.mjs fresher` or `experienced` so
the job scan matches.
