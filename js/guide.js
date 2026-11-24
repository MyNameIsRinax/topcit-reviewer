/* Exam guide, study plan and cheat sheet */
TC.guide = {
  types: [
    { name: 'Multiple choice', share: 19, pts: '5 pts each', how: 'Four options. Some items have more than one correct answer.' },
    { name: 'Short answer', share: 12, pts: '5–10 pts', how: 'A word, number or short phrase (up to 50 words). Often fill-in-the-blank Ⓐ Ⓑ Ⓒ.' },
    { name: 'Descriptive', share: 21, pts: '~30 pts', how: 'Explain in your own words, up to 450 words, usually 2 sub-questions of 15 points.' },
    { name: 'Performance', share: 48, pts: '40–100 pts', how: 'Practical tasks: write code or pseudocode, SQL, draw UML/ERD with the built-in tools, calculate and justify.' }
  ],
  levels: [
    { n: 1, name: 'Novice', range: '0–149' },
    { n: 2, name: 'Advanced Beginner', range: '150–399' },
    { n: 3, name: 'Competent', range: '400–649' },
    { n: 4, name: 'Proficient', range: '650–849' },
    { n: 5, name: 'Expert', range: '850–1000' }
  ],
  plan: [
    { id: 'p1', when: 'Day 1 · Morning', title: 'Know the exam', text: 'Read the Exam guide. Do one 20-question Smart practice to find your weak module.' },
    { id: 'p2', when: 'Day 1 · Morning', title: 'M1 core', text: 'Lessons: SDLC, data structures, algorithms, design (cohesion/coupling), UML, testing. Then 20 M1 questions.' },
    { id: 'p3', when: 'Day 1 · Afternoon', title: 'M2 core', text: 'Lessons: ERD, normalization, SQL basics, aggregates/joins/subqueries, transactions, backup. Then 20 M2 questions.' },
    { id: 'p4', when: 'Day 1 · Afternoon', title: 'Hands-on: SQL and code', text: 'Drills: Library SQL, Normalize an order sheet, Binary search, Linked list playlist. Write answers before opening the model.' },
    { id: 'p5', when: 'Day 1 · Evening', title: 'M3 core', text: 'Lessons: OS scheduling and paging, availability/DR, networking and subnetting, crypto, access control, secure coding. Then 20 M3 questions.' },
    { id: 'p6', when: 'Day 1 · Evening', title: 'Flashcards', text: '15 minutes of flashcards for the module you scored lowest in.' },
    { id: 'p7', when: 'Day 2 · Morning', title: 'M4 core', text: 'Lessons: CPM/PERT, EVM, quality and risk, communication, ITSM, IP and ethics. Then 20 M4 questions.' },
    { id: 'p8', when: 'Day 2 · Morning', title: 'Hands-on: calculations', text: 'Drills: Critical path, Earned value, Architecture/load/availability, Subnetting, CPU scheduling.' },
    { id: 'p9', when: 'Day 2 · Afternoon', title: 'Mock exam', text: 'Take the timed mock exam. Review every wrong answer and its lesson.' },
    { id: 'p10', when: 'Day 2 · Afternoon', title: 'Written answers', text: 'Do 3 descriptive drills using the answer templates in the Exam guide. Score yourself honestly with the checklist.' },
    { id: 'p11', when: 'Day 2 · Evening', title: 'Mistakes and cheat sheet', text: 'Clear your mistakes list, then read the cheat sheet twice. Sleep early.' },
    { id: 'p12', when: 'Exam day', title: 'Morning of the exam', text: 'Skim the cheat sheet formulas only. Arrive early: you must be seated 20 minutes before start.' }
  ],
  strategy: [
    { t: 'Never leave a written answer blank', d: 'Descriptive and performance questions are 69% of the points and are graded with partial credit by keywords. A definition plus two correct keywords often earns points.' },
    { t: 'Budget your 150 minutes', d: 'About 25 minutes for multiple choice and short answers, then split the rest across written and performance items by their points. Do not spend 30 minutes on a 5-point question.' },
    { t: 'Do the sure points first', d: 'Answer everything you know quickly, mark the rest for review, then come back. The test screen lets you jump between modules and questions.' },
    { t: 'Write in short, numbered points', d: 'Graders look for terms. Use the exact technical words (e.g. "transitive dependency", "Little\'s law", "composition"). Bullet lists beat long paragraphs.' },
    { t: 'Show formulas and steps', d: 'For calculations (CPM, EVM, availability, TPS, subnetting, ALE), write the formula, the substitution, then the answer with units. A wrong final number can still earn method points.' },
    { t: 'Use the built-in tools', d: 'The IBT has a calculator, a compiler (C, C++, Java, Python) and UML/ERD drawing tools. Try them on the official practice page before the exam.' },
    { t: 'Pick one language and stick with it', d: 'When a performance question lets you choose, write in the language you know best. Clear pseudocode is better than broken code.' },
    { t: 'Read "incorrect" carefully', d: 'Many multiple-choice items ask for the incorrect statement. Circle the word "incorrect" in your head before reading the options.' }
  ],
  templates: [
    { t: 'Explain a concept', steps: ['Definition in one sentence', 'Purpose: why it exists / what problem it solves', '2–3 key characteristics or components', 'A concrete example', 'Pros and cons (or comparison with the alternative)'] },
    { t: 'Compare A and B', steps: ['One-line definition of each', 'A small table: 3–4 criteria (purpose, method, pros, cons, use case)', 'When to choose each', 'One-line conclusion that answers the question'] },
    { t: 'Analyze a problem in a scenario', steps: ['Quote the fact from the scenario', 'Name the problem with the technical term', 'Explain the consequence (risk, cost, data loss)', 'Repeat for each problem (aim for 3–5)'] },
    { t: 'Propose a solution', steps: ['Name the technique or pattern', 'Explain how it works in 2–3 steps', 'Tie it back to each requirement in the scenario', 'Mention one trade-off or operational point (testing, monitoring)'] },
    { t: 'Calculation question', steps: ['Write the formula', 'Substitute the given numbers', 'Compute and state the result with units', 'Interpret it in one sentence (e.g. "behind schedule")'] }
  ],
  sheet: String.raw`
### M1 Software Development
| Topic | Must remember |
|---|---|
| Cohesion (worst → best) | Coincidental, Logical, Temporal, Procedural, Communicational, Sequential, **Functional** |
| Coupling (worst → best) | Content, Common, External, Control, Stamp, **Data** |
| Binary tree | Max nodes level i: 2^(i−1); depth k: 2^k − 1; leaves n0 = n2 + 1 |
| Sorting | O(n log n) worst: merge, heap. Quick worst O(n²). Stable: bubble, insertion, merge, radix |
| Binary search | Sorted data, O(log n), max comparisons ⌊log₂n⌋ + 1 |
| Cyclomatic complexity | V(G) = E − N + 2 = decisions + 1 |
| Stub vs driver | Stub = fake **lower** module (top-down). Driver = fake **upper** caller (bottom-up) |
| Maintenance | Corrective (bugs), Adaptive (environment/law), Perfective (new features), Preventive |
| UML | Aggregation ◇ (parts live alone), Composition ◆ (parts die with whole), Generalization △ |
| Use case | «include» always, «extend» optional/conditional |
| Precision / Recall | TP/(TP+FP) · TP/(TP+FN) · F1 = 2PR/(P+R) |
| chmod | r=4 w=2 x=1 · 754 = rwxr-xr-- |

### M2 Data Management
| Topic | Must remember |
|---|---|
| Independence | Logical: external ↔ conceptual. Physical: conceptual ↔ internal |
| Degree / cardinality | Columns / rows. A×B: degree adds, cardinality multiplies |
| Keys | Candidate = unique + minimal. Super = unique only |
| Normal forms | 1NF atomic → 2NF no partial → 3NF no transitive → BCNF every determinant a candidate key → 4NF no MVD → 5NF no JD |
| SQL order | Executed: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY |
| Aggregates | Ignore NULL except COUNT(*). NOT IN with NULL returns nothing |
| ACID | Atomicity, Consistency, Isolation (concurrency control), Durability (logs) |
| Isolation | RU: all anomalies · RC: no dirty · RR: no dirty, no non-repeatable · SER: none |
| 2PL | Growing then shrinking. Serializable, **not** deadlock-free |
| Recovery | Committed after checkpoint → REDO. Uncommitted → UNDO |
| Backup restore | Differential: full + last diff. Incremental: full + every incremental. Logs → point-in-time |
| Association rules | Support = P(A∧B). Confidence = P(A∧B)/P(A). Lift = Conf/P(B) |
| Scaling | Min-max (x−min)/(max−min). Z-score (x−μ)/σ |

### M3 Architecture & Security
| Topic | Must remember |
|---|---|
| Availability | MTBF/(MTBF+MTTR). Series A1×A2. Parallel 1−(1−A1)(1−A2) |
| Nines | 99.9% ≈ 8.76 h/yr · 99.99% ≈ 52.6 min/yr · 99.999% ≈ 5.26 min/yr |
| DR sites | Mirror (RTO≈0, RPO≈0) > Hot (hours) > Warm (days) > Cold (weeks) |
| Little's law | Users N = TPS × (R + Z). Think time Z = N/TPS − R |
| Cache EAT | h·Tc + (1−h)·Tm |
| Scheduling | FCFS, SJF (min avg wait), SRT, RR, HRN = (wait + service)/service |
| Deadlock | Mutual exclusion, hold & wait, no preemption, circular wait. Banker's = avoidance |
| OSI PDUs | Bit, Frame, Packet, Segment, Data. Hub L1, Switch L2, Router L3 |
| Subnet hosts | 2^(host bits) − 2. /24 = 254, /25 = 126, /26 = 62, /27 = 30, /28 = 14 |
| Private IPs | 10/8, 172.16/12, 192.168/16 |
| Ports | 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 67/68 DHCP, 80 HTTP, 110 POP3, 143 IMAP, 161 SNMP, 443 HTTPS, 3389 RDP |
| TCP | 3-way: SYN, SYN+ACK, ACK. Close: FIN, ACK, FIN, ACK. SCTP: 4-way with cookie |
| Keys needed | Symmetric n(n−1)/2. Asymmetric 2n |
| Signature | Sign with **sender's private**, verify with sender's public. Confidentiality: receiver's public |
| Access control | DAC owner/ACL · MAC labels (BLP: no read up, no write down) · RBAC roles · ABAC attributes |
| Risk | SLE = AV × EF. ALE = SLE × ARO. Avoid, Transfer, Mitigate, Accept |
| IPsec | AH = integrity/auth, no encryption. ESP = encryption |
| Fixes | SQLi → PreparedStatement. XSS → output encoding, CSP, HttpOnly. CSRF → token, SameSite |

### M4 IT Business
| Topic | Must remember |
|---|---|
| EVM | SV = EV−PV, CV = EV−AC, SPI = EV/PV, CPI = EV/AC |
| Forecast | EAC = BAC/CPI, ETC = EAC−AC, VAC = BAC−EAC, TCPI = (BAC−EV)/(BAC−AC) |
| PERT | (O + 4M + P)/6, σ = (P−O)/6 |
| CPM | Critical path = longest, zero float. TF = LS−ES = LF−EF |
| Compression | Crashing = add resources (cost↑). Fast tracking = parallel (risk↑) |
| Channels | n(n−1)/2 |
| Cost of quality | Conformance: prevention + appraisal. Nonconformance: internal + external failure |
| QA vs QC | QA = process (audits). QC = product (inspection/testing) |
| Risk (threats) | Avoid, Transfer, Mitigate, Accept, Escalate. Opportunities: Exploit, Share, Enhance, Accept |
| EMV | Probability × impact |
| Tuckman | Forming, Storming, Norming, Performing, Adjourning |
| Conflict | Best = Collaborate/problem solve |
| Herzberg | Hygiene (salary, conditions) vs Motivators (achievement, recognition) |
| Org structure | PM authority: Functional < Weak < Balanced < Strong matrix < Projectized |
| ITIL v3 | Strategy, Design, Transition, Operation, CSI. Incident = restore. Problem = root cause |
| SLA / OLA / UC | Customer / internal team / external supplier |
| BCG | Star, Cash cow, Question mark, Dog |
| Ansoff | Penetration, Market development, Product development, Diversification |
| IP | Copyright: automatic, expression only. Patent ~20 yrs from filing. Trademark 10 yrs renewable. Trade secret: no registration |
| CMMI | Initial, Managed, Defined, Quantitatively Managed, Optimizing |
`
};
