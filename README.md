# AI Job Search India

An add-on for [career-ops](https://github.com/career-ops-hq/career-ops), the open-source AI job-search agent, set up for **job seekers in India: freshers and experienced professionals**. It adds:

- **India-specific checks** in every job evaluation: CTC vs in-hand pay, bonds and fees, consultant listings and common scam signs, plus checks for your stage:
  - **Freshers:** batch year, joining date vs final exams, hidden experience lines, CGPA and backlog cut-offs.
  - **Experienced:** experience band, notice period and buyout, title and grade differences, current/expected CTC handling, non-compete and moonlighting clauses, relieving letters.
- **Two switches for the automatic job scan:** market (**India** or **Abroad**) and level (**fresher**, **experienced** or **all**), with tested company lists.
- **Starter files** for a fresher or an experienced profile and CV.

Prepared for the TKIET "Find a Dream Job Using AI" workshop. Built to work with career-ops (MIT licence); not made or endorsed by the career-ops project.

---

## 1. Install (once)

1. Install career-ops first. You need [Node.js](https://nodejs.org) 22.13 or newer, then in a terminal:
   ```
   npx @santifer/career-ops init
   ```
   This creates a `career-ops` folder.
2. Get this pack: on this GitHub page click **Code → Download ZIP** and unzip it (or `git clone https://github.com/namaserajesh/ai-job-search-india`). Copy the **`india-pack`** folder into your `career-ops` folder.
3. In a terminal inside the `career-ops` folder, run **one** of:
   ```
   node india-pack/setup.mjs
   node india-pack/setup.mjs experienced
   ```
   The first is for freshers, the second for experienced professionals. It adds the India checks to `modes/_custom.md` and builds your job-scan list. It never deletes your files, and you can run it again after updating the pack.
4. Open your AI coding tool in the `career-ops` folder (for example `claude`) and type `/career-ops`. Say: *"I am a fresher in India"* or *"I am an experienced professional in India; use the india-pack starter files for my profile."* It sets up your CV and profile by chatting.

Claude Code needs a paid Claude plan. For free routes, read `docs/FREE_TIER.md` and `docs/RUNNING_ON_A_BUDGET.md` in your career-ops folder.

## 2. Use it every day

| You want to | Do this |
|---|---|
| Check one job | Find it on Naukri, LinkedIn, Glassdoor, Instahyre, Internshala or a campus notice. Paste the link (or the job description text) after `/career-ops` |
| See new jobs at big companies | `/career-ops scan`, or preview one company fast: `node scan.mjs --company Amazon --dry-run` |
| See all your applications | `/career-ops tracker`, or the dashboard: `npm --prefix web ci` once, then `npm run ui` |
| Practise for an interview | `/career-ops interview-prep` |

**Most jobs are not in the automatic scan.** It reads company career sites, not job portals. On 25 October 2026 the fresher scan read 22,740 jobs at 26 big companies and found only 10 clearly entry-level roles in India, while Naukri listed 217 fresher software jobs in Pune alone. Use the job portals to *find* jobs and career-ops to *check, tailor and track* them.

## 3. Choose market and level

```
node india-pack/switch-market.mjs india          (or abroad)
node india-pack/switch-market.mjs experienced    (or fresher, or all)
node india-pack/switch-market.mjs abroad experienced
node india-pack/switch-market.mjs status
```

| Setting | What the scan looks for |
|---|---|
| **india** | 26 companies tested on 25 October 2026, India locations only: Amazon, Microsoft, Google, NVIDIA, IBM, Salesforce, Intel, Adobe, Bosch, Citi, Deutsche Bank, Mastercard, BNY, Paytm, Wipro, HCLTech, Synechron, Zensar, Druva, PubMatic, Mindtickle, Rubrik, Groww, Meesho, Zeta and CRED. Accenture is in the list but switched off (about 2,900 openings); turn it on in `portals.yml` if you want it |
| **abroad** | 22 global companies (Amazon, Atlassian, Stripe, Spotify, Datadog and others) in Singapore, the UAE, Europe, the UK, Japan, Canada and Australia. India is blocked. The United States is left out on purpose |
| **fresher** | Entry-level, graduate and internship software titles; senior titles blocked |
| **experienced** | Software, data, cloud, QA, architect, lead and manager titles; internship and entry-level titles skipped by career-ops' seniority check |
| **all** | Both |

How big the difference is: on 25 October 2026, Mastercard's India board gave 4 fresher roles and 149 experienced roles.

Each setting keeps your own additions: switching saves your current list as `india-pack/my-portals.<market>-<level>.yml` and restores it when you come back. To get the pack's latest company lists after an update, delete your `my-portals` file for that setting and switch again.

**Abroad honestly:** most companies need you to already hold a work visa. career-ops quotes each job's sponsorship line; "no sponsorship" means stop.

## 4. What the India checks catch

Two real examples from 25 October 2026 (fresher profile):

| Job | What the portal showed | What the description said | Result |
|---|---|---|---|
| Capgemini, Software Engineer, Pune (Naukri) | "0 - 5 years" | "Has more than a year of relevant work experience" | Not a fresher role: scored 2.4/5, **Skip** |
| AutomationEdge, Java Developer – Fresher, Pune (Google Jobs via Glassdoor) | "Freshers Eligible" | "Joining: Immediate Preferred" and "Candidates graduating in 2025 or 2026" | Strong skills match, but a 2027 graduate scored 3.2/5: **Skip** |

For experienced people, the same checks look for a notice-period clash ("immediate joiners" vs your 60 or 90 days), an experience band you're well below or above, and clauses worth asking about before you accept.

Always read the **Verdict** line at the top of each report first.

## 5. Stay safe

- career-ops never applies or sends anything for you. You check every resume and submit it yourself.
- Never pay any "registration", "training" or "security" fee for a job.
- Never type Aadhaar, PAN, UAN, bank or passport numbers into an AI tool.
- Share your current CTC only when you choose to.
- Every line in your CV must be true. Interviewers ask about every line.

## 6. Files in this pack

| File | What it does |
|---|---|
| `india-pack/setup.mjs` | One-time install (`experienced` for experienced professionals) |
| `india-pack/switch-market.mjs` | Market and level switch |
| `india-pack/custom-rules.md` | The India checks (copied into `modes/_custom.md` by setup) |
| `india-pack/lists/` | Building blocks for the scan list: locations (India, Abroad), job titles (fresher, experienced, all), companies (India, Abroad) |
| `india-pack/starter/fresher/` | Fresher profile, targeting notes and one-page CV template |
| `india-pack/starter/experienced/` | Experienced profile (notice period, expected CTC), targeting notes and CV template |

Company lists and numbers were checked on 25 October 2026. Job boards change; if a company stops returning jobs, `node verify-pipeline.mjs` and the dashboard's Portals page will show it.
