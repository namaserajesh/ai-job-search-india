# India Fresher Pack

An add-on for [career-ops](https://github.com/career-ops-hq/career-ops), the open-source AI job-search agent, set up for **Indian engineering freshers**. It adds:

- **Fresher checks** in every job evaluation: batch eligibility, joining date, hidden experience lines, CGPA cut-offs, bonds, CTC vs in-hand pay, consultant listings and common scam signs.
- **An India / Abroad switch** for the automatic job scan, with tested company lists for each.
- **Starter files** for an Indian fresher's profile and CV.

Prepared for the TKIET "Find a Dream Job Using AI" workshop. Built to work with career-ops (MIT licence); not made or endorsed by the career-ops project.

---

## 1. Install (once)

1. Install career-ops first. You need [Node.js](https://nodejs.org) 22.13 or newer, then in a terminal:
   ```
   npx @santifer/career-ops init
   ```
   This creates a `career-ops` folder.
2. Get this pack: on this GitHub page click **Code → Download ZIP** and unzip it (or `git clone https://github.com/namaserajesh/ai-job-search-india`). Copy the **`india-pack`** folder into your `career-ops` folder.
3. In a terminal inside the `career-ops` folder, run:
   ```
   node india-pack/setup.mjs
   ```
   It adds the fresher checks to `modes/_custom.md` and sets the job scan to India. It never deletes your files, and you can run it again after updating the pack.
4. Open your AI coding tool in the `career-ops` folder (for example `claude`) and type `/career-ops`. Say: *"I am an Indian fresher; use the india-pack starter files for my profile."* It sets up your CV and profile by chatting.

Claude Code needs a paid Claude plan. For free routes, read `docs/FREE_TIER.md` and `docs/RUNNING_ON_A_BUDGET.md` in your career-ops folder.

## 2. Use it every day

| You want to | Do this |
|---|---|
| Check one job | Find it on Naukri, LinkedIn, Glassdoor, Internshala or a campus notice. Paste the link (or the job description text) after `/career-ops` |
| See new jobs at big companies | `/career-ops scan`, or preview one company fast: `node scan.mjs --company Amazon --dry-run` |
| See all your applications | `/career-ops tracker`, or the dashboard: `npm --prefix web ci` once, then `npm run ui` |
| Practise for an interview | `/career-ops interview-prep` |

**Most fresher jobs are not in the automatic scan.** On 25 October 2026 the scan read 22,740 jobs at 26 big companies and found only 10 clearly entry-level roles in India. The same day, Naukri listed 217 fresher software jobs in Pune alone. Use the job portals to *find* jobs and career-ops to *check, tailor and track* them.

## 3. India or Abroad

```
node india-pack/switch-market.mjs india
node india-pack/switch-market.mjs abroad
node india-pack/switch-market.mjs status
```

- **India:** 26 companies tested on 25 October 2026, India locations only, including Amazon, Microsoft, Google, NVIDIA, IBM, Bosch, Citi, Mastercard, Wipro, HCLTech, Synechron and Zensar.
- **Abroad:** global companies (Amazon, Atlassian, Stripe, Spotify, Datadog and others) in Singapore, the UAE, Europe, the UK, Japan, Canada and Australia. India is blocked. The United States is left out on purpose; see the note at the top of `portals.abroad.yml`.
- Each market keeps your own additions: switching saves your current list as `india-pack/my-portals.<market>.yml` and restores it when you switch back.

**Abroad honestly:** most companies need you to already hold a work visa, and few sponsor fresh graduates from India. The fresher checks make career-ops quote the job's sponsorship line; "no sponsorship" means stop.

## 4. What the fresher checks catch

Two real examples from 25 October 2026:

| Job | What the portal showed | What the description said | Result |
|---|---|---|---|
| Capgemini, Software Engineer, Pune (Naukri) | "0 - 5 years" | "Has more than a year of relevant work experience" | Not a fresher role: scored 2.4/5, **Skip** |
| AutomationEdge, Java Developer – Fresher, Pune (Google Jobs via Glassdoor) | "Freshers Eligible" | "Joining: Immediate Preferred" and "Candidates graduating in 2025 or 2026" | Strong skills match, but a 2027 graduate scored 3.2/5: **Skip** |

Always read the **Verdict** line at the top of each report, then the batch and joining-date checks.

## 5. Stay safe

- career-ops never applies or sends anything for you. You check every resume and submit it yourself.
- Never pay any "registration", "training" or "security" fee for a job.
- Never type Aadhaar, PAN, bank or passport numbers into an AI tool.
- Every line in your CV must be true. Interviewers ask about every line.

## 6. Files in this pack

| File | What it does |
|---|---|
| `india-pack/setup.mjs` | One-time install |
| `india-pack/switch-market.mjs` | India / Abroad switch |
| `india-pack/custom-rules.md` | The fresher checks (copied into `modes/_custom.md` by setup) |
| `india-pack/portals.india.yml` | India company list |
| `india-pack/portals.abroad.yml` | Abroad company list |
| `india-pack/starter/profile-india.yml` | Starter profile (CTC in LPA, A4, India work rights) |
| `india-pack/starter/_profile-india.md` | Starter targeting notes for fresher roles |
| `india-pack/starter/cv-template.md` | One-page fresher CV template |

Company lists and numbers were checked on 25 October 2026. Job boards change; if a company stops returning jobs, `node verify-pipeline.mjs` and the dashboard's Portals page will show it.
