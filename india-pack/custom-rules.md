## AI Job Search India: house rules

These rules come from the AI Job Search India pack. They are procedural: they
tell career-ops how to evaluate, never what is true about the candidate. Every
fact about the candidate still comes only from `cv.md`, `config/profile.yml`
and `modes/_profile.md`.

### Which rules apply

Read the "Career stage" line in `modes/_profile.md` (fresher or experienced).
If it is missing, decide from `cv.md`: under 12 months of full-time work
(internships don't count) means **fresher**; otherwise **experienced**. Apply
"For everyone in India", then the section for that stage, then "Roles outside
India" when the job is not in India. State the stage used in Block A.

### For everyone in India

1. **Salary in Indian postings.** Treat an advertised "X LPA" or "X-Y Lacs PA"
   as CTC unless the JD says otherwise. Never present CTC as take-home pay.
   Ask how it splits into fixed pay, variable pay, joining bonus, ESOPs and
   employer PF, and whether variable pay is guaranteed in year one. Salary
   estimates from Naukri, AmbitionBox or Glassdoor are third-party estimates:
   label them so, with the source, and never put them in `advertised_comp`.
2. **Bonds, service agreements and fees.** Quote any bond, service agreement,
   training-cost recovery, joining-bonus clawback or notice clause, and add HR
   questions about the amount, duration and exit terms. Any request for the
   candidate to pay (registration, training, security deposit, laptop,
   background check) is a Block G concern and must be called out plainly in
   the Verdict.
3. **Consultant and staffing listings.** On Naukri and similar boards a
   listing "Posted by" a consultancy or staffing firm, or a listing that hides
   the employer ("our client", "a top MNC"), is agency-mediated: apply the
   agency confirmation gate before writing anything. Note whether the role is
   a direct hire or a third-party payroll / contract role when the JD says so.
4. **Common Indian job-scam signals.** Treat these as Block G concerns:
   payment requests of any kind; contact only through WhatsApp or Telegram;
   recruiters using free email addresses while claiming a big brand; offer
   letters without an interview; "work from home" data-entry or typing jobs
   with high pay; pay far above the market for the stated experience without
   a reason in the JD. Present observations, not accusations.
5. **Large IT services firms.** For TCS, Infosys, Wipro, Cognizant, Accenture,
   Capgemini, HCLTech, Tech Mahindra and LTIMindtree, tell the candidate to
   confirm the official application route on the company's own careers site
   (campus drives and national tests for freshers; lateral hiring portals for
   experienced people). Do not state test names, dates, grades or eligibility
   rules unless the JD or an official source in this session says them.

### Freshers

6. **Batch eligibility.** If the JD names graduation years or batches ("2025 or
   2026 graduates", "2026 batch only"), compare them with the candidate's
   graduation year in `cv.md`. If the candidate's year is not listed, quote the
   JD line in Block A and Red flags, give a Global Score no higher than 3.5,
   and set the decision to "Research first" with the HR question: "Is the
   {year} batch eligible for this role?" Wording such as "encouraged to apply"
   is a preference, not a bar: say so, and still ask.
7. **Joining date.** If the JD asks for "immediate joining", "join within 15/30
   days" or a start date, compare it with the candidate's availability in
   `modes/_profile.md` or `config/profile.yml`. A student who cannot join until
   after final exams gets the same treatment as rule 6, with the question:
   "Can I join after my final exams in {month year}?"
8. **Hidden experience lines.** Indian job boards show a header range such as
   "0-5 years" that often disagrees with the description. Read the whole JD,
   including "grade specific" and "requirements" sections, and use the
   strictest experience line. Quote both lines verbatim in Block B. Never treat
   "0-X years" in a portal header as proof that freshers qualify.
9. **Academic cut-offs.** Look for CGPA or percentage cut-offs (10th, 12th,
   degree), "no active backlogs", gap-year limits and branch restrictions.
   Compare each with `cv.md`. If the CV does not state the figure, list it as an
   open question for the candidate. Never assume the candidate meets it.

### Experienced professionals

10. **Experience band.** Indian JDs state a range ("5-8 years"). Compare it with
    the candidate's total and relevant full-time experience, counted from the
    dates in `cv.md`. More than a year below the minimum: call it a stretch in
    Block C and say what would close the gap. Well above the maximum: flag a
    possible level or pay mismatch. Quote the JD line; never round the
    candidate's experience up.
11. **Notice period.** Compare the JD's joining expectation ("immediate
    joiners", "notice period up to 30 days", "serving notice preferred") with
    the candidate's notice period in `modes/_profile.md` or
    `config/profile.yml` (`cover_letter.notice_period_days`). If the candidate's
    notice is longer, quote both, mark it a high-importance gap, and add the HR
    question: "Is a {N}-day notice period acceptable, or do you support a
    buyout?" Never assume a buyout is possible or say how much it costs.
12. **Titles and grades.** Indian employers use different ladders (for example
    Software Engineer, Senior, Lead, Architect; or Analyst, Associate,
    Consultant, Manager). Judge the level from responsibilities, team size and
    years asked, not the title alone. Don't claim that one company's grade
    equals another's unless a source in this session says so.
13. **Current and expected CTC.** Never write the candidate's current CTC into
    a CV, cover letter or form answer unless the candidate gives it for that
    application. Use `config/profile.yml` `compensation` for the target and
    walk-away figures. Don't state a "typical hike" percentage as fact; if
    market data is used, name the source.
14. **Clauses to quote.** Quote and flag non-compete, non-solicit,
    moonlighting / dual-employment, intellectual-property and relocation or
    transfer clauses, plus joining-bonus clawback periods. These are questions
    for the candidate to raise, not reasons to stop on their own.
15. **Documents.** Lateral hiring in India usually asks for a relieving letter,
    experience letters and recent payslips. List any the JD names as a
    checklist item for the candidate. Never ask for, store or write ID or
    document numbers.

### Roles outside India (Abroad)

16. The candidate is authorised to work in India only unless
    `config/profile.yml` `location.authorized_in` says otherwise. For any role
    outside those countries, quote the JD's sponsorship or work-authorisation
    line. If it says no sponsorship, that is a hard stop. If it says nothing,
    set the decision to "Research first" with the question "Do you sponsor
    work visas for candidates from India?" Never claim a visa route, salary
    threshold or timeline that is not in the JD or an official government
    source read in this session.

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
