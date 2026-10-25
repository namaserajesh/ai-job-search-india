## India Fresher Pack: house rules

These rules come from the India Fresher Pack. They are procedural: they tell
career-ops how to evaluate, never what is true about the candidate. Every fact
about the candidate still comes only from `cv.md`, `config/profile.yml` and
`modes/_profile.md`.

### Evaluation rules for Indian fresher roles

1. **Batch eligibility.** If the JD names graduation years or batches ("2025 or
   2026 graduates", "2026 batch only"), compare them with the candidate's
   graduation year in `cv.md`. If the candidate's year is not listed, quote the
   JD line in Block A and Red flags, give a Global Score no higher than 3.5,
   and set the decision to "Research first" with the HR question: "Is the
   {year} batch eligible for this role?" Wording such as "encouraged to apply"
   is a preference, not a bar: say so, and still ask.
2. **Joining date.** If the JD asks for "immediate joining", "join within 15/30
   days" or a start date, compare it with the candidate's availability in
   `modes/_profile.md` or `config/profile.yml`. A student who cannot join until
   after final exams gets the same treatment as rule 1, with the question:
   "Can I join after my final exams in {month year}?"
3. **Hidden experience lines.** Indian job boards show a header range such as
   "0-5 years" that often disagrees with the description. Read the whole JD,
   including "grade specific" and "requirements" sections, and use the
   strictest experience line. Quote both lines verbatim in Block B. Never treat
   "0-X years" in a portal header as proof that freshers qualify.
4. **Academic cut-offs.** Look for CGPA or percentage cut-offs (10th, 12th,
   degree), "no active backlogs", gap-year limits and branch restrictions.
   Compare each with `cv.md`. If the CV does not state the figure, list it as an
   open question for the candidate. Never assume the candidate meets it.
5. **Bonds, service agreements and fees.** Quote any bond, service agreement,
   training-cost recovery or notice clause, and add HR questions about the
   amount, duration and exit terms. Any request for the candidate to pay
   (registration, training, security deposit, laptop, background check) is a
   Block G concern and must be called out plainly in the Verdict.
6. **Salary in Indian postings.** Treat an advertised "X LPA" or "X-Y Lacs PA"
   as CTC unless the JD says otherwise. Never present CTC as take-home pay.
   Ask how it splits into fixed pay, variable pay, joining bonus and employer
   PF, and whether variable pay is guaranteed in year one. Salary estimates
   from Naukri, AmbitionBox or Glassdoor are third-party estimates: label them
   so, with the source, and never put them in `advertised_comp`.
7. **Consultant and staffing listings.** On Naukri and similar boards a listing
   "Posted by" a consultancy or staffing firm, or a listing that hides the
   employer ("our client", "a top MNC"), is agency-mediated: apply the agency
   confirmation gate before writing anything.
8. **Common Indian fresher-job scam signals.** Treat these as Block G concerns:
   payment requests of any kind; contact only through WhatsApp or Telegram;
   recruiters using free email addresses while claiming a big brand; offer
   letters without an interview; "work from home" data-entry or typing jobs
   with high pay; salary far above typical fresher pay without a reason in the
   JD. Present observations, not accusations.
9. **Mass recruiters.** For TCS, Infosys, Wipro, Cognizant, Accenture,
   Capgemini, HCLTech, Tech Mahindra and LTIMindtree, note that most fresher
   hiring runs through campus drives and their own national tests. Tell the
   candidate to confirm the official application route on the company's own
   careers site. Do not state test names, dates or eligibility rules unless the
   JD or an official source in this session says them.
10. **Roles outside India (Abroad mode).** The candidate is authorised to work
    in India only. For any role outside India, quote the JD's sponsorship or
    work-authorisation line. If it says no sponsorship, that is a hard stop. If
    it says nothing, set the decision to "Research first" with the question
    "Do you sponsor work visas for graduates from India?" Never claim a visa
    route, salary threshold or timeline that is not in the JD or an official
    government source read in this session.

### Output preferences

- Write in Indian English. Show money as ₹ with lakh and crore, and salaries
  as LPA (lakh per annum) when the source does.
- Lead every report with the decision and the single most important
  eligibility check (batch, joining date, experience or cut-off).
- Generate PDFs on A4 paper.

### Off-limits

- Never submit an application, pay a fee, or send a message for the candidate.
- Never ask for, store or write Aadhaar, PAN, bank or passport numbers.
- Never add a skill, project, score or certificate to the CV that is not
  already in `cv.md`.

### Setting up a new student

When creating or updating `config/profile.yml` or `modes/_profile.md` for a
new user, start from `india-pack/starter/profile-india.yml` and
`india-pack/starter/_profile-india.md`, and fill them only with what the
student tells you. Use `india-pack/starter/cv-template.md` as the shape for a
new `cv.md`.
