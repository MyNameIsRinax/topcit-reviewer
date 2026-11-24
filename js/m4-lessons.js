/* M4 IT Business: lessons (syllabus V4.0E, area 4) */
TC.lessons.push(
{
  id: 'm4-1', m: 'm4', syl: '4.1.1', title: 'IT business fundamentals and the value chain',
  summary: 'What IT business is, types of IT services, Porter\'s value chain, platforms and network effects, business model canvas.',
  body: String.raw`
### IT business
- **IT business**: creating value by building, providing or using information technology products and services: hardware, software, IT services and digital platforms.
Characteristics: fast technology change and short product life cycles, high initial cost but near-zero marginal cost for software, **network effects**, lock-in and switching costs, standards competition, convergence with other industries.

Types of IT service business:
- **SI (System Integration)**: building an information system for a client by integrating hardware, software and networks as a project.
- **SM (System Management) / maintenance**: operating and maintaining systems after delivery.
- **ITO (IT Outsourcing)**: contracting all or part of IT functions to an external provider. **BPO** outsources business processes (call centers, payroll).
- **IT consulting**: ISP, EA, process innovation (PI), IT governance advice.
- **Packaged software / solutions**: ERP, CRM products sold under license.
- **SaaS / cloud services**: subscription-based software delivered over the internet.

### Value chain (Michael Porter)
A firm's activities that create value for customers; IT can add value or reduce cost at each step.
| Primary activities | Support activities |
|---|---|
| Inbound logistics → Operations → Outbound logistics → Marketing & sales → Service | Firm infrastructure (management, finance, IT), Human resource management, Technology development (R&D), Procurement |
Margin = value created − cost of activities. Examples of IT support: SCM for logistics, MES for operations, CRM for marketing/sales/service, ERP for infrastructure.

- **Platform business**: creates value by connecting groups of users (buyers and sellers, riders and drivers) rather than producing goods itself.
- **Network effect**: a product becomes more valuable as more people use it. **Direct** (same side: messaging apps) or **indirect/cross-side** (more sellers attract more buyers).
- **Lock-in / switching cost**: the cost of moving to another product keeps customers.
- **Economies of scale**: average cost falls as output rises (huge for software and cloud).

### Business model canvas (Osterwalder) — 9 blocks
Customer segments, value propositions, channels, customer relationships, revenue streams, key resources, key activities, key partnerships, cost structure.

Common IT revenue models: license, **subscription**, **freemium** (free basic, paid premium), advertising, transaction fee/commission, pay-per-use, maintenance fees.
`},
{
  id: 'm4-2', m: 'm4', syl: '4.1.2', title: 'Business strategy models and ISP',
  summary: 'PEST, Five Forces, SWOT/TOWS, 3C, BCG, Ansoff, generic strategies, STP, BSC, plus ISP and enterprise architecture.',
  body: String.raw`
### Environment analysis
- **PEST / PESTEL**: macro-environment: **P**olitical, **E**conomic, **S**ocial, **T**echnological (+ **E**nvironmental, **L**egal).
- **Porter's Five Forces**: industry attractiveness: (1) rivalry among existing competitors, (2) threat of new entrants, (3) threat of substitutes, (4) bargaining power of buyers, (5) bargaining power of suppliers.
- **3C analysis**: Customer, Competitor, Company.
- **SWOT**: internal **S**trengths and **W**eaknesses; external **O**pportunities and **T**hreats.
- **TOWS strategies** from SWOT: **SO** (use strengths to seize opportunities; aggressive), **ST** (use strengths to counter threats; diversification), **WO** (overcome weaknesses by using opportunities; turnaround), **WT** (minimize weaknesses and avoid threats; defensive).
- **Value chain analysis**: find which internal activities give competitive advantage (see previous lesson).

### Portfolio and growth models
- **BCG matrix**: axes = market growth rate (vertical) × relative market share (horizontal).
| | High share | Low share |
|---|---|---|
| High growth | **Star** (invest to grow) | **Question mark / problem child** (invest or drop) |
| Low growth | **Cash cow** (harvest cash) | **Dog** (divest) |
- **GE-McKinsey matrix**: industry attractiveness × business strength, 3×3 grid.
- **Ansoff matrix** (growth): existing product + existing market = **market penetration**; new market = **market development**; new product = **product development**; both new = **diversification** (riskiest).

### Competitive strategy
- **Porter's generic strategies**: **cost leadership**, **differentiation**, **focus** (cost focus or differentiation focus on a niche). Being "stuck in the middle" is dangerous.
- **Core competence**: a unique capability that is hard to imitate and gives access to many markets.
- **Blue ocean strategy**: create uncontested market space using the **ERRC** grid: Eliminate, Reduce, Raise, Create. (Red ocean = existing, competitive markets.)
- **STP**: **S**egmentation (divide the market) → **T**argeting (choose segments) → **P**ositioning (place the offering in customers' minds).
- **Marketing mix 4P**: Product, Price, Place, Promotion (service: + People, Process, Physical evidence = 7P). Customer view **4C**: Customer value, Cost, Convenience, Communication.

### Balanced Scorecard (Kaplan & Norton)
Measures performance from four perspectives: **financial**, **customer**, **internal business process**, **learning and growth**. Links strategy to KPIs and balances short-term financial results with long-term drivers.
- **KPI (Key Performance Indicator)**: a measurable value showing progress toward a goal.
- **CSF (Critical Success Factor)**: something that must go well for the strategy to succeed.

### ISP (Information Strategy Planning)
- **ISP**: planning the organization's information systems to support its business strategy: what systems, data and infrastructure are needed, and in what order to build them.
Typical steps: (1) **environment analysis** (business environment, IT trends, benchmarking) → (2) **current-state (As-Is) analysis** of business processes and IT → (3) **target (To-Be) model** for processes, applications, data, infrastructure → (4) **implementation plan** (projects, priorities, schedule, budget, organization).
Related planning: BSP (IBM's Business Systems Planning), ISMP (Information System Master Plan: a more detailed plan to the RFP level).

### Enterprise Architecture (EA)
- **EA**: a blueprint that aligns the organization's business, data, applications and technology. Views: **BA** (business), **DA** (data), **AA** (application), **TA** (technology).
- Frameworks: **Zachman** (6×6 matrix of perspectives × What/How/Where/Who/When/Why), **TOGAF** (ADM: Architecture Development Method cycle).
- **IT governance**: leadership, structures and processes that make IT support the organization's goals. Frameworks: **COBIT**, **ISO/IEC 38500**.
`},
{
  id: 'm4-3', m: 'm4', syl: '4.1.3', title: 'IT adoption, process improvement and performance evaluation',
  summary: 'RFI/RFP procurement, make vs buy, BPR vs PI, Six Sigma DMAIC, CMMI levels, ROI/NPV/payback/TCO.',
  body: String.raw`
### IT business procedures
Typical project procurement flow: **RFI** (Request for Information: survey vendors and technologies) → **RFP** (Request for Proposal: formal requirements, scope, evaluation criteria) → **proposal** from vendors → **evaluation** (technical and price; presentation) → **contract** → execution → inspection/acceptance → operation.
- **RFQ**: request for quotation when requirements are fully specified and price is the main factor.
- **Make vs buy**: build in-house (fit, control, cost/time) vs buy a package or SaaS (speed, proven, less customization) vs outsource.
- **Contract types**: **fixed price** (seller bears cost risk), **cost-reimbursable** (buyer bears cost risk; cost plus fixed fee, cost plus incentive fee), **time and material** (hourly rates; small or unclear scope).
- **SLA**: agreed service levels written into outsourcing contracts.

### Process improvement
- **BPR (Business Process Reengineering)**: fundamental rethinking and **radical** redesign of processes for dramatic improvement in cost, quality, service and speed (Hammer). High risk, high reward.
- **PI (Process Innovation) / BPI**: improving processes, often enabled by IT.
- **BPM (Business Process Management)**: continuous cycle of modeling, automating, executing, monitoring and optimizing processes; notation **BPMN**.
- **Six Sigma**: data-driven method to reduce variation and defects to 3.4 defects per million opportunities. **DMAIC** for improving existing processes: **D**efine, **M**easure, **A**nalyze, **I**mprove, **C**ontrol. **DMADV/DFSS** for designing new ones (Define, Measure, Analyze, Design, Verify).
- **Lean**: eliminate waste (muda): overproduction, waiting, transport, over-processing, inventory, motion, defects, unused talent.
- **TQM**: organization-wide commitment to continuous quality improvement and customer satisfaction.
- **Benchmarking**: comparing processes with best-in-class organizations.
- **RPA (Robotic Process Automation)**: software bots that mimic repetitive rule-based UI tasks.

### CMMI (Capability Maturity Model Integration)
Maturity levels: **1 Initial** (ad hoc, chaotic) → **2 Managed** (basic project management, repeatable) → **3 Defined** (organization-wide standard processes) → **4 Quantitatively Managed** (statistical measurement and control) → **5 Optimizing** (continuous process improvement).
Related: **SPICE (ISO/IEC 15504 / 33000)** process capability levels 0–5.

### Performance evaluation of IT investments
- **ROI (Return on Investment)** = (benefit − cost) / cost × 100%.
- **NPV (Net Present Value)**: present value of future cash flows minus investment; **NPV > 0 → accept**. PV = CF / (1 + r)^t.
- **IRR (Internal Rate of Return)**: discount rate where NPV = 0; accept if IRR > required rate (hurdle rate).
- **Payback period**: time to recover the initial investment (simple, ignores time value of money and later cash flows).
- **TCO (Total Cost of Ownership)**: all costs over the life cycle: purchase, implementation, operation, maintenance, training, upgrades, disposal.
- **Cost-benefit analysis**: tangible benefits (cost savings) and intangible benefits (customer satisfaction, decision quality).
- **BSC / IT BSC**: for strategic evaluation; IT BSC perspectives: corporate contribution, user orientation, operational excellence, future orientation.
- **Evaluation timing**: ex-ante (before investment: feasibility), interim (during), ex-post (after: post-implementation review, PIR).

Example: invest ₱1,000,000, yearly net benefit ₱400,000 → payback = 2.5 years. ROI over 3 years = (1,200,000 − 1,000,000)/1,000,000 = 20%.
`},
{
  id: 'm4-4', m: 'm4', syl: '4.1.4', title: 'Information systems and IT service management (ITIL)',
  summary: 'TPS, MIS, DSS, EIS, ERP, SCM, CRM, BI, then ITSM and ITIL: incident vs problem vs change, SLA/OLA/UC, CMDB.',
  body: String.raw`
### Information systems by management level
| System | Users | Supports |
|---|---|---|
| **TPS** (Transaction Processing System) | Operational staff | Recording daily transactions (sales, payroll, orders) |
| **MIS** (Management Information System) | Middle managers | Regular summary reports from TPS data for structured decisions |
| **DSS** (Decision Support System) | Managers, analysts | Semi-structured/unstructured decisions with models and **what-if** analysis |
| **EIS / ESS** (Executive Information/Support System) | Senior executives | Strategic decisions: dashboards, drill-down, external data |
| **KMS** (Knowledge Management System) | Knowledge workers | Capturing and sharing knowledge (tacit ↔ explicit; SECI model) |
| **GDSS** | Groups | Group decision making |

Enterprise applications:
- **ERP (Enterprise Resource Planning)**: integrated system covering finance, HR, production, logistics and sales with a single database and built-in **best practices** (SAP, Oracle).
- **SCM (Supply Chain Management)**: plans and coordinates the flow of goods, information and money from suppliers to customers; fights the **bullwhip effect** (demand swings amplify up the chain).
- **CRM (Customer Relationship Management)**: manages customer interactions to acquire, keep and grow customers. **Operational** (sales/marketing/service automation), **analytical** (data mining of customer data), **collaborative** (channels and partners).
- **BI (Business Intelligence)**: tools and processes (DW, OLAP, reporting, dashboards, data mining) that turn data into insight for decisions.
- **MES**: shop-floor manufacturing execution. **PLM**: product life cycle data. **SRM**: supplier relationships.

### IT Service Management (ITSM)
- **ITSM**: managing IT as a set of services that deliver value to customers, with defined processes, quality levels and continual improvement.
- **ITIL v3 service lifecycle**: **Service Strategy → Service Design → Service Transition → Service Operation**, surrounded by **Continual Service Improvement (CSI)**.
- **ITIL 4**: the **Service Value System (SVS)** with the **service value chain** (plan, improve, engage, design & transition, obtain/build, deliver & support), **34 practices**, **7 guiding principles** (focus on value; start where you are; progress iteratively with feedback; collaborate and promote visibility; think and work holistically; keep it simple and practical; optimize and automate) and **4 dimensions** (organizations & people, information & technology, partners & suppliers, value streams & processes).
- **ISO/IEC 20000**: the certifiable international ITSM standard.

Key processes/practices:
- **Service desk**: single point of contact (SPOC) for users.
- **Incident management**: restore normal service **as quickly as possible** after an unplanned interruption (workarounds are fine).
- **Problem management**: find and remove the **root cause** of one or more incidents; records known errors and workarounds.
- **Change management (change enablement)**: control changes to minimize risk; types: standard (pre-approved), normal (assessed by the **CAB**, Change Advisory Board), emergency (ECAB).
- **Release and deployment management**: plan, build, test and deploy releases.
- **Service level management**: agree, monitor and report service levels.
- **Configuration management**: keep accurate information on **CIs (configuration items)** and their relationships in the **CMDB** (Configuration Management Database).
- **Capacity**, **availability** and **IT service continuity management**.

!> A server crashes: rebooting it to bring users back is **incident** management; investigating why it crashed and fixing the memory leak is **problem** management; deploying the patch through the CAB is **change** management.

### Service agreements
- **SLA (Service Level Agreement)**: between the IT service provider and the **customer**; defines service, availability, response and resolution times, penalties.
- **OLA (Operational Level Agreement)**: between **internal** teams of the provider (network team ↔ service desk) supporting the SLA.
- **UC (Underpinning Contract)**: with an **external supplier** supporting the SLA.
- **SLM metrics**: availability %, MTTR, first-call resolution rate, response time, customer satisfaction.
`},
{
  id: 'm4-5', m: 'm4', syl: '4.2', title: 'IT business trends and AI business',
  summary: 'Digital transformation, platforms, fintech and blockchain, metaverse and digital twins, hype cycle, adoption curve, AI business and regulation.',
  body: String.raw`
### Changes in the IT business environment
- **Digital transformation (DX)**: using digital technologies to fundamentally change business models, processes, customer experience and culture.
- **Fourth Industrial Revolution**: convergence of physical, digital and biological systems: AI, IoT, big data, cloud, robotics, 3D printing.
- **Platform economy**, **sharing economy** (using idle assets: Airbnb, ride sharing), **O2O** (online-to-offline: order online, receive offline), **subscription economy**, **gig economy**.
- **Data economy / MyData**: individuals control and move their own data between services.
- **ESG and green IT**: energy-efficient data centers, carbon reporting.

### Latest IT business services
- **Fintech**: finance + technology: mobile payments, P2P lending, robo-advisors, open banking (third parties access bank data/services via APIs), insurtech, regtech.
- **Blockchain**: a **distributed ledger** of blocks linked by hashes, shared across nodes and practically tamper-proof. **Consensus** methods: **PoW** (proof of work: mining, energy-heavy), **PoS** (proof of stake), PBFT. Types: **public** (anyone), **private** (one organization), **consortium** (group of organizations). **Smart contract**: self-executing code on the blockchain. **NFT**: unique token proving ownership of a digital item. **CBDC**: central bank digital currency. **DeFi**: decentralized finance.
- **Metaverse**: persistent shared 3D virtual spaces for social, work and economic activity. **AR** (overlay on the real world), **VR** (fully virtual), **MR** (mixed, interacting), **XR** (umbrella term).
- **Digital twin**: a virtual replica of a physical object, process or system, updated with real-time data, used for simulation, monitoring and prediction (smart factories, cities).
- **IoT and smart factory**: connected sensors and machines; **CPS** (cyber-physical systems); predictive maintenance.
- **Cloud and XaaS**, **edge computing**, **5G** services.
- **RPA**, **low-code/no-code**, **super apps**.
- **Autonomous vehicles**, **drones**, **robotics**.

### AI business (4.2.2.2)
- **AIaaS**: AI capabilities delivered as cloud APIs (vision, speech, LLM APIs).
- **Generative AI services**: content creation, coding assistants, customer chatbots, document summarization, design; **AI agents** that complete multi-step tasks using tools.
- **LLMOps / MLOps**: operating models in production (monitoring, evaluation, cost, prompt/version management).
- Business value: automation, personalization, prediction (demand, churn), decision support, new products.
- Risks: hallucination, bias, privacy, copyright of training data and outputs, security (prompt injection), cost, over-reliance.
- **Responsible AI principles**: fairness, transparency/**explainability (XAI)**, accountability, privacy, safety/robustness, human oversight.
- **EU AI Act** risk tiers: **unacceptable** (banned, e.g., social scoring), **high-risk** (strict obligations: hiring, credit, medical), **limited** (transparency duties, e.g., tell users they are talking to a chatbot), **minimal** (no extra obligations). Korea has its own **AI Basic Act** (passed in early 2025).

### Technology adoption models
- **Gartner hype cycle**: **Innovation trigger → Peak of inflated expectations → Trough of disillusionment → Slope of enlightenment → Plateau of productivity**.
- **Technology adoption life cycle (Rogers)**: innovators 2.5% → early adopters 13.5% → early majority 34% → late majority 34% → laggards 16%.
- **Chasm (Moore)**: the gap between early adopters (visionaries) and the early majority (pragmatists) where many high-tech products fail.
- **Long tail**: many niche products together can outsell a few hits when distribution costs are near zero (online stores).
- **Disruptive innovation (Christensen)**: a simpler, cheaper product starts at the low end or a new market and eventually displaces incumbents. **Sustaining innovation** improves existing products for existing customers.
- **Open innovation**: using external ideas and partners as well as internal R&D.
`},
{
  id: 'm4-6', m: 'm4', syl: '4.3', title: 'Professional ethics, privacy and intellectual property',
  summary: 'IT ethics codes and issues, privacy principles and laws, copyright vs industrial property, software licenses and escrow.',
  body: String.raw`
### Professional ethics
- **Professional ethics**: standards of conduct that professionals follow beyond what the law requires.
- **ACM/IEEE-CS Software Engineering Code of Ethics**: 8 principles: **Public** (act in the public interest), **Client and employer**, **Product** (highest professional standards), **Judgment** (integrity and independence), **Management**, **Profession**, **Colleagues**, **Self** (lifelong learning).
- **Mason's PAPA** ethical issues of the information age: **P**rivacy, **A**ccuracy, **P**roperty, **A**ccessibility.
- Common issues: privacy invasion, surveillance, software piracy, plagiarism, conflicts of interest, accepting gifts, bias in algorithms, the **digital divide** (unequal access to IT), cybercrime, job displacement by automation, AI misuse (deepfakes).
- **Whistleblowing**: reporting wrongdoing (e.g., a safety-critical defect being hidden) through proper channels, first internally, then externally if needed.
- Professional duties: confidentiality of client information, honesty in estimates and reporting, competence (only accept work you can do), respect for intellectual property, avoiding conflicts of interest.

### Privacy and personal information
- **Personal information**: information that identifies or can identify a living person (name, ID number, face, phone, plus combinations).
- **Sensitive personal information**: health, religion, political views, biometrics, etc., needing stronger protection.
- Principles (OECD/GDPR style): lawfulness and consent, **purpose limitation**, **data minimization**, accuracy, storage limitation, security, transparency, accountability.
- **Privacy by design / by default**: build privacy protection into systems from the start; the most privacy-friendly settings are the default.
- **PIA (Privacy Impact Assessment)**: assess privacy risks of a new system before building it.
- Data subject rights: access, correction, deletion (right to be forgotten), objection, data portability.
- Laws: **GDPR** (EU, extraterritorial, fines up to 4% of global turnover), Korea's **PIPA** (Personal Information Protection Act), Philippines' **Data Privacy Act of 2012 (RA 10173)** with the National Privacy Commission.

### Intellectual property (IP)
- **Copyright**: protects the **expression** of creative works (software code, books, music, images), **not ideas, algorithms or procedures**. It arises **automatically** upon creation; registration is optional (useful as evidence).
  - **Economic rights**: reproduction, distribution, public transmission/performance, rental, making **derivative works**.
  - **Moral rights** (author's personal rights, not transferable): right of disclosure (publication), right of attribution (name), right of integrity (no distortion).
  - Duration: generally author's life + 70 years in Korea and the EU (life + 50 in the Philippines); works made for hire/corporate works usually 70 years from publication in Korea.
  - **Fair use**: limited use without permission (education, criticism, research), judged by purpose, nature, amount and market effect.
- **Industrial property rights** (need registration with the patent office):
  - **Patent**: a new, inventive (non-obvious) and industrially applicable **invention**; about **20 years from filing**. Software can be patented when it is a technical invention (e.g., combined with hardware/process), not as an abstract idea.
  - **Utility model**: smaller improvements to shape/structure ("petty patent"); about 10 years in Korea.
  - **Design right**: the ornamental appearance of a product; about 20 years from registration in Korea.
  - **Trademark**: signs that distinguish goods/services (logo, brand name); **10 years, renewable indefinitely**.
- **Trade secret**: valuable business information kept secret with reasonable efforts (source code, algorithms, customer lists); protected without registration for as long as it stays secret. **NDAs** help protect it.
- **Work for hire**: software created by employees in the course of their job usually belongs to the employer by contract/law.

### Software licensing
- **Proprietary/commercial**: use under a paid license (EULA), source code closed. Types: per user/seat, per device, **site license**, concurrent users, **subscription**, enterprise agreement.
- **Freeware** (free, closed), **shareware** (try then pay), **public domain** (no copyright), **open source** (source available under an OSS license).
- **OSS licenses**: copyleft (GPL, AGPL, LGPL, MPL) vs permissive (MIT, BSD, Apache 2.0). Always check license **compatibility** and obligations (notices, source disclosure) before distribution.
- **Software escrow**: the vendor's source code is deposited with a trusted third party and released to the licensee if the vendor goes bankrupt or stops support.
- **Clean room design**: re-implementing functionality without access to the original code, to avoid copyright infringement.
- **Software piracy**: unauthorized copying/distribution; also **over-deployment** (installing on more machines than licensed) in companies.
`},
{
  id: 'm4-7', m: 'm4', syl: '4.4', title: 'Projects, organizations, life cycles and documents',
  summary: 'What makes a project, triple constraint, functional vs matrix vs projectized, PMO, PMBOK process groups and knowledge areas, key documents.',
  body: String.raw`
### Project basics
- **Project**: a **temporary** endeavor undertaken to create a **unique** product, service or result. It is **progressively elaborated** (details refined as it proceeds).
- **Operations**: ongoing, repetitive work that sustains the business.
- **Program**: a group of related projects managed together for benefits not available individually. **Portfolio**: projects, programs and operations managed together to achieve strategic objectives.
- **Triple constraint**: **scope, time (schedule), cost**; changing one affects the others and quality. (Extended: + quality, risk, resources.)
- **Stakeholder**: anyone who affects or is affected by the project (sponsor, customer, users, team, suppliers, regulators).
- **Project sponsor**: provides funding and authority, champions the project.
- **Project manager**: the person assigned to lead the team to achieve the project objectives.

### Organizational structures
| Structure | PM authority | Resource availability | Who controls budget | Notes |
|---|---|---|---|---|
| **Functional** | Little or none | Little | Functional manager | Staff report to department heads; project work is part-time |
| **Weak matrix** | Low | Low | Functional manager | PM acts like a coordinator/expediter |
| **Balanced matrix** | Low to moderate | Low to moderate | Mixed | Shared power |
| **Strong matrix** | Moderate to high | Moderate to high | Project manager | Full-time PM and PM staff |
| **Projectized** | High to almost total | High | Project manager | Team dedicated to the project; "home" problem at project end |
Matrix organizations have **two bosses** (functional and project manager), which can create conflict.

- **PMO (Project Management Office)**: standardizes project governance and shares resources, methods and tools. Types: **supportive** (templates, low control), **controlling** (requires compliance, moderate control), **directive** (directly manages projects, high control).

### Life cycles and methodologies
- **Predictive (waterfall)**: scope, time and cost fixed early; phases in sequence.
- **Iterative / incremental**: repeated cycles; deliver partial functionality.
- **Adaptive (agile)**: short iterations, changing requirements welcomed.
- **Hybrid**: a mix.
Generic project life cycle: starting → organizing and preparing → carrying out the work → closing. Cost and staffing are low at the start, peak during execution, and drop at closing. **Stakeholder influence and risk are highest at the start**, while the **cost of changes is lowest at the start** and rises over time.

### PMBOK framework
- **5 process groups** (6th ed.): **Initiating → Planning → Executing → Monitoring & Controlling → Closing**.
- **10 knowledge areas**: Integration, Scope, Schedule, Cost, Quality, Resource, Communications, Risk, Procurement, Stakeholder management.
- PMBOK 7th edition is principle-based: 12 principles and **8 performance domains**: stakeholders, team, development approach and life cycle, planning, project work, delivery, measurement, uncertainty.

### Key project documents
- **Project charter**: **authorizes** the project and gives the PM authority; high-level objectives, requirements, milestones, budget, risks, stakeholders; issued by the sponsor in **initiating**.
- **Stakeholder register**: who the stakeholders are, their interests and influence.
- **Project management plan**: how the project will be executed, monitored and closed (integrates the subsidiary plans and baselines: scope, schedule, cost).
- **Scope statement**, **WBS** and **WBS dictionary** (the scope baseline).
- **Schedule** (Gantt chart, network), **budget**.
- **RACI / responsibility assignment matrix**: who is **R**esponsible, **A**ccountable (only one per task), **C**onsulted, **I**nformed.
- **Risk register**, **issue log**, **change log**, **change requests**.
- **Status / progress reports**, meeting minutes.
- **Lessons learned register** and **final report** at closing.

### Feasibility and project selection
Feasibility study types: **technical**, **economic** (cost-benefit, NPV, ROI, payback), **operational** (will users accept it), **legal**, **schedule**.
Selection methods: benefit measurement (scoring models, NPV, IRR, payback) and constrained optimization (mathematical models).
`},
{
  id: 'm4-8', m: 'm4', syl: '4.5.1–4.5.2', title: 'Scope and schedule: WBS, CPM, PERT',
  summary: 'Scope processes, WBS rules, scope creep vs gold plating, dependencies, forward/backward pass, float, PERT, crashing vs fast-tracking.',
  body: String.raw`
### Scope management
Processes: plan scope management → **collect requirements** → **define scope** (project scope statement) → **create WBS** → **validate scope** (customer formally **accepts** deliverables) → **control scope**.
- **Product scope**: features of the product. **Project scope**: the work needed to deliver it.
- **WBS (Work Breakdown Structure)**: a hierarchical decomposition of the total project work into deliverables and **work packages** (the lowest level, which can be estimated, scheduled and assigned).
- **100% rule**: the WBS includes 100% of the work defined by the scope, and nothing extra.
- **8/80 rule** (guideline): a work package takes between 8 and 80 hours.
- **WBS dictionary**: describes each WBS element (description, owner, acceptance criteria, cost, schedule).
- **Scope baseline** = approved scope statement + WBS + WBS dictionary.
- **Scope creep**: uncontrolled growth of scope without adjusting time, cost and resources.
- **Gold plating**: the team adds extra features the customer did not ask for. Both should be avoided.
- **Requirements traceability matrix**: links requirements to their origin and to deliverables and tests.
- **Validate scope** (acceptance by the customer) vs **control quality** (internal correctness check, usually done first).

### Schedule management
Processes: plan schedule management → **define activities** → **sequence activities** → **estimate durations** → **develop schedule** → **control schedule**.
Dependency types (Precedence Diagramming Method, activity-on-node):
- **FS (Finish-to-Start)**: B starts after A finishes (most common).
- **SS (Start-to-Start)**: B starts after A starts.
- **FF (Finish-to-Finish)**: B finishes after A finishes.
- **SF (Start-to-Finish)**: B finishes after A starts (rare).
- **Lead**: B may start before A finishes (overlap). **Lag**: required wait (concrete curing 2 days).
- Dependencies: **mandatory** (hard logic), **discretionary** (preferred/soft logic), **external**, **internal**.

Duration estimating:
- **Analogous**: based on a similar past project (top-down, quick, less accurate).
- **Parametric**: statistical relationship (e.g., 10 hours per screen × 30 screens).
- **Three-point (PERT)**: expected time **tE = (O + 4M + P) / 6**, standard deviation **σ = (P − O) / 6**. Triangular: (O + M + P) / 3.
- **Bottom-up**: estimate each work package and add up.

### CPM (Critical Path Method)
- **Critical path**: the **longest** path through the network; it sets the shortest possible project duration. Activities on it have **zero total float**.
- **Forward pass**: ES of the first activity = 0; EF = ES + duration; the next ES = the **largest** EF of its predecessors.
- **Backward pass**: LF of the last activity = project end; LS = LF − duration; the previous LF = the **smallest** LS of its successors.
- **Total float (slack)** = LS − ES = LF − EF: how long an activity can slip without delaying the project.
- **Free float** = ES of the earliest successor − EF of the activity: how long it can slip without delaying any successor.

Worked example:
| Activity | Duration | Predecessor |
|---|---|---|
| A | 3 | – |
| B | 4 | A |
| C | 2 | A |
| D | 5 | B |
| E | 3 | C |
| F | 2 | D, E |
Paths: A-B-D-F = 3+4+5+2 = **14** (critical); A-C-E-F = 3+2+3+2 = 10.

| Activity | ES | EF | LS | LF | Total float |
|---|---|---|---|---|---|
| A | 0 | 3 | 0 | 3 | 0 |
| B | 3 | 7 | 3 | 7 | 0 |
| C | 3 | 5 | 7 | 9 | **4** |
| D | 7 | 12 | 7 | 12 | 0 |
| E | 5 | 8 | 9 | 12 | **4** |
| F | 12 | 14 | 12 | 14 | 0 |
F's ES is the larger of D's EF (12) and E's EF (8). On the backward pass, C's LF is E's LS (9). C and E can slip 4 days together without delaying the project.

### Schedule compression
- **Crashing**: add resources to critical-path activities to shorten them; **increases cost**. Crash the activity with the lowest cost per day first.
- **Fast tracking**: perform activities in **parallel** that were planned in sequence; **increases risk/rework**, not direct cost.
- **Resource leveling**: adjusts start dates to resolve over-allocation; **can lengthen** the critical path.
- **Resource smoothing**: adjusts within float only; the critical path does not change.

### Schedule presentation
- **Gantt (bar) chart**: activities against time; easy to read; dependencies weakly shown.
- **Milestone chart**: only key events (zero duration).
- **Network diagram**: AON/PDM (activities on nodes) or AOA/ADM (activities on arrows; may need **dummy** activities).
- **Critical chain**: schedules with resource constraints and buffers (project, feeding buffers).
`},
{
  id: 'm4-9', m: 'm4', syl: '4.5.5', title: 'Cost management, EVM and software estimation',
  summary: 'Cost estimating, the full EVM formula set with a worked example, function points, COCOMO and Brooks\'s law.',
  body: String.raw`
### Cost management
Processes: plan cost management → **estimate costs** → **determine budget** (cost baseline = budget without management reserve) → **control costs**.
- **Contingency reserve**: for **identified** risks (known unknowns); part of the cost baseline; controlled by the PM.
- **Management reserve**: for **unidentified** risks (unknown unknowns); not in the baseline; needs management approval.
- Project budget = cost baseline + management reserve.

### Earned Value Management (EVM)
| Term | Meaning |
|---|---|
| **PV** (Planned Value, BCWS) | Budgeted cost of work **scheduled** to date |
| **EV** (Earned Value, BCWP) | Budgeted cost of work **actually performed** to date |
| **AC** (Actual Cost, ACWP) | Actual cost of the work performed |
| **BAC** | Budget at completion (total planned budget) |

| Formula | Interpretation |
|---|---|
| **SV = EV − PV** | < 0 behind schedule |
| **CV = EV − AC** | < 0 over budget |
| **SPI = EV / PV** | < 1 behind schedule |
| **CPI = EV / AC** | < 1 over budget (getting less than ₱1 of work per ₱1 spent) |
| **EAC = BAC / CPI** | Estimate at completion if current cost performance continues (typical) |
| EAC = AC + (BAC − EV) | If the variance was a one-time event (atypical) |
| EAC = AC + (BAC − EV) / (CPI × SPI) | If both cost and schedule performance continue to affect the rest |
| **ETC = EAC − AC** | Estimate to complete |
| **VAC = BAC − EAC** | Expected budget surplus (+) or overrun (−) |
| **TCPI = (BAC − EV) / (BAC − AC)** | Cost efficiency needed on the remaining work to finish within BAC |

Memory aids: every formula starts with **EV**; variance = minus, index = divide; negative/below 1 = bad.

**Worked example**: BAC = ₱1,000,000 over 10 months. At month 4, planned 40% done (PV = 400,000), actually 30% done (EV = 300,000), spent AC = 350,000.
- SV = 300,000 − 400,000 = **−100,000** (behind); SPI = 0.75.
- CV = 300,000 − 350,000 = **−50,000** (over budget); CPI ≈ 0.857.
- EAC = 1,000,000 / 0.857 ≈ **₱1,166,667**; ETC ≈ 816,667; VAC ≈ −166,667.
- TCPI = 700,000 / 650,000 ≈ 1.077 (must be 7.7% more efficient to stay on budget).

### Cost estimating techniques
Analogous (top-down), parametric, bottom-up (most accurate, most effort), three-point, expert judgment, vendor bid analysis. Accuracy improves over the project: rough order of magnitude (−25% to +75%) early, definitive (−5% to +10%) later.

### Software size and effort estimation
- **LOC (Lines of Code)**: simple but language-dependent and known only late.
- **Function Point (FP) analysis**: measures size by **functionality from the user's view**, independent of language. Data functions: **ILF** (internal logical file), **EIF** (external interface file). Transaction functions: **EI** (external input), **EO** (external output), **EQ** (external inquiry). Unadjusted FP × value adjustment factor (14 general system characteristics) = adjusted FP. Simplified methods count only ILF/EIF in early phases.
- **COCOMO (Boehm)**: effort = a × (KLOC)^b person-months. Project types: **organic** (small, familiar, simple: a=2.4, b=1.05), **semi-detached** (medium: 3.0, 1.12), **embedded** (complex, tight constraints: 3.6, 1.20). Levels: basic, intermediate (cost drivers), detailed. COCOMO II for modern projects.
- **Putnam (SLIM)**: based on the Rayleigh staffing curve.
- **Man-month (person-month)**: effort unit. Duration = effort / staff, but only to a point.
- **Brooks's law**: "Adding manpower to a late software project makes it later" (training time and communication overhead grow).
`},
{
  id: 'm4-10', m: 'm4', syl: '4.5.3–4.5.4', title: 'Quality management and risk management',
  summary: 'QA vs QC, cost of quality, the 7 QC tools, ISO/IEC 25010, reviews; risk processes, EMV, responses to threats and opportunities.',
  body: String.raw`
### Quality concepts
- **Quality**: the degree to which a set of inherent characteristics fulfills requirements (conformance to requirements + fitness for use).
- Processes: **plan quality management** → **manage quality** (QA) → **control quality** (QC).
- **Quality assurance (QA)**: **process**-focused and preventive: audits, process improvement, making sure the right processes are followed.
- **Quality control (QC)**: **product**-focused and detective: inspecting and testing deliverables to find defects.
- **Prevention over inspection**: it is cheaper to build quality in than to inspect it in.
- **Grade vs quality**: grade is a category of features (low grade can be fine); low quality (defects) is always a problem.
- Gurus: **Deming** (PDCA cycle: Plan-Do-Check-Act; 14 points), **Juran** (fitness for use; quality trilogy; Pareto 80/20), **Crosby** (zero defects; quality is free; cost of quality), **Ishikawa** (fishbone diagram).

### Cost of quality (COQ)
| Cost of conformance (spent to **avoid** failures) | Cost of nonconformance (failure costs) |
|---|---|
| **Prevention costs**: training, process design, standards, quality planning, good tools | **Internal failure costs** (found **before** delivery): rework, scrap, re-testing, debugging |
| **Appraisal costs**: testing, inspections, reviews, audits, test equipment | **External failure costs** (found **by the customer**): warranty, complaints, recalls, lost business, liability |
Investing in prevention and appraisal reduces the much larger failure costs.

### Seven basic quality tools
- **Cause-and-effect (Ishikawa/fishbone) diagram**: finds root causes, grouped by categories (people, method, machine, material, measurement, environment).
- **Flowchart**: shows process steps to find where problems occur.
- **Check sheet (tally sheet)**: collects and counts data about defects.
- **Pareto chart**: bar chart sorted by frequency with a cumulative line; focuses on the **vital few** causes (80/20 rule).
- **Histogram**: shows the frequency distribution of data in bars (shape, spread, central tendency).
- **Control chart**: plots a process over time with mean, **UCL** and **LCL** to see if it is stable (in control). Out of control: a point beyond the limits, or the **rule of seven** (7 consecutive points on one side of the mean).
- **Scatter diagram**: shows the correlation between two variables.

### Software quality models
- **ISO/IEC 25010** (product quality, 2011): **functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, portability** (8 characteristics). The 2023 revision renames usability to **interaction capability** and portability to **flexibility**, and adds **safety**.
- **ISO/IEC 9126** (older): functionality, reliability, usability, efficiency, maintainability, portability (6 characteristics).
- **ISO/IEC 25000 (SQuaRE)** series replaces 9126 and 14598.
- **McCall's model**: product operation, product revision, product transition.

### Reviews
- **Inspection**: the most formal review; trained **moderator**, defined roles (author, reader, recorder, inspectors), checklists, entry/exit criteria, metrics (Fagan). Finds the most defects.
- **Walkthrough**: the **author leads** the team through the work product to gather feedback; less formal.
- **Technical review**: peers evaluate technical suitability; moderately formal.
- **Audit**: independent check of compliance with standards and processes.

### Risk management
- **Risk**: an uncertain event or condition that, if it occurs, has a positive (**opportunity**) or negative (**threat**) effect on objectives.
Processes: **plan risk management → identify risks → perform qualitative analysis → perform quantitative analysis → plan responses → implement responses → monitor risks**.
- Identification techniques: brainstorming, **Delphi technique** (anonymous experts, repeated rounds to reach consensus without dominance), interviews, checklists, SWOT, root cause analysis, assumption analysis.
- **Risk register**: list of identified risks with probability, impact, owner, and responses.
- **Qualitative analysis**: rank risks by **probability × impact** in a matrix.
- **Quantitative analysis**: **EMV (Expected Monetary Value) = probability × impact** (threats negative, opportunities positive), **decision tree analysis**, **Monte Carlo simulation**, **sensitivity analysis (tornado diagram)**.
EMV example: 30% chance of a ₱200,000 penalty → EMV = −₱60,000; 20% chance of a ₱100,000 bonus → +₱20,000; net = −₱40,000.

| Threat (negative) responses | Opportunity (positive) responses |
|---|---|
| **Avoid**: change the plan to eliminate the threat | **Exploit**: make sure the opportunity happens |
| **Transfer**: shift ownership/impact to a third party (insurance, fixed-price contract, outsourcing) | **Share**: give it to a partner best able to capture it |
| **Mitigate**: reduce probability or impact (prototypes, extra testing) | **Enhance**: increase probability or impact |
| **Accept**: active (contingency reserve) or passive | **Accept**: take it if it comes |
| **Escalate**: outside the project's authority | **Escalate** |

- **Residual risk**: remains after the response. **Secondary risk**: arises from implementing a response.
- **Contingency plan**: executed when a risk trigger occurs. **Fallback plan**: used if the contingency plan fails.
- **Risk owner**: person responsible for monitoring the risk and carrying out the response.
- **Risk appetite / tolerance / threshold**: how much risk the organization will accept.
`},
{
  id: 'm4-11', m: 'm4', syl: '4.5.5, 4.4', title: 'Monitoring, communication, teams and technical writing',
  summary: 'PMIS and agile charts, change control, communication channels and models, communication network types, conflict, Tuckman, motivation, writing and charts.',
  body: String.raw`
### Project monitoring and tools
- **PMIS (Project Management Information System)**: software and tools for scheduling, cost, resources, documents and reporting (MS Project, Jira, Primavera).
- Reports: **status report** (where the project is now), **progress report** (what was done in the period), **forecast report** (predicted future: EAC, finish date), variance analysis, trend analysis.
- **Dashboards** with traffic-light (RAG) status, KPIs.
- **Burndown chart**: remaining work vs time in a sprint/release; **burnup chart**: completed work and total scope over time (shows scope changes).
- **Velocity**: story points completed per sprint; used to forecast.
- **Kanban board** and **cumulative flow diagram (CFD)**: show work by state and bottlenecks.
- **Milestone trend analysis**, **earned value** reports, **S-curve** (cumulative cost over time).
- **Integrated change control**: all change requests are logged, analyzed for impact (scope, time, cost, quality, risk), and approved or rejected by the **CCB (Change Control Board)**; approved changes update baselines and plans.

### Communication management
- Number of **communication channels** = **n(n − 1) / 2** (n = number of people). 10 people → 45 channels; adding 5 more (15) → 105 channels.
- **Communication model**: sender **encodes** a message → transmits via a **medium** (with **noise**) → receiver **decodes** → gives **feedback**/acknowledgment.
- **Communication methods**: **interactive** (meetings, calls, video: most effective for complex or sensitive topics), **push** (sent to recipients: emails, memos, reports; no confirmation of understanding), **pull** (recipients access at their discretion: intranet, knowledge base; for large audiences).
- Formal vs informal, written vs oral, vertical vs horizontal.
- **Communications management plan**: who needs what information, when, in what format, from whom, and how often.
- Effective meetings: agenda in advance, time-box, a facilitator, minutes with action items and owners.

### Communication networks (organizational behavior)
| Network | Shape | Centralization | Speed | Accuracy | Member satisfaction | Leader emergence |
|---|---|---|---|---|---|---|
| **Chain** | Line through a hierarchy | High | Moderate | High (written) | Low | Moderate |
| **Y-type** | Chain that branches | High-moderate | Moderate | Moderate | Low-moderate | Moderate |
| **Wheel (star)** | Everyone talks only to a center | **Highest** | **Fast** (simple tasks) | High | **Low** (except the center) | **High** (center) |
| **Circle** | Each talks to two neighbors | Low | **Slow** | Low | Moderate-high | None |
| **All-channel (complete)** | Everyone talks to everyone | **Lowest** | Fast for **complex** tasks | Moderate | **High** | None |
> Exam pattern: "evaluate problem-solving speed, power concentration and satisfaction for wheel, chain, all-channel". Wheel: fast, high concentration, low satisfaction. Chain: moderate, high, low. All-channel: fast for complex problems, low concentration, high satisfaction.

### Team development and leadership
- **Tuckman's stages**: **Forming** (polite, unclear) → **Storming** (conflict over roles and approach) → **Norming** (agreed norms, cohesion) → **Performing** (efficient, interdependent) → **Adjourning** (project ends, team released).
- **Conflict resolution techniques**: **withdraw/avoid** (retreat; temporary), **smooth/accommodate** (emphasize agreement; temporary), **compromise/reconcile** (each gives something; lose-lose-ish), **force/direct** (impose a solution; win-lose), **collaborate/problem solve** (confront the problem openly, find a win-win solution: **best** long-term).
- Common sources of project conflict: schedules, priorities, resources (most common), technical opinions, procedures, costs, personalities (least).
- **Power of the PM**: **legitimate/formal** (position), **reward**, **penalty/coercive**, **expert** (knowledge; best), **referent** (respect, charisma).
- **Motivation theories**: **Maslow's hierarchy** (physiological → safety → social → esteem → self-actualization), **Herzberg's two-factor theory** (**hygiene factors** such as salary and working conditions prevent dissatisfaction but do not motivate; **motivators** such as achievement, recognition and responsibility motivate), **McGregor's Theory X** (people dislike work; need control) **and Y** (people are self-motivated), **McClelland** (needs for achievement, affiliation, power), **Vroom's expectancy theory** (motivation = expectancy × instrumentality × valence).
- Leadership styles: directing, coaching, supporting, delegating (situational leadership); **servant leadership** in agile.
- **Emotional intelligence**, **active listening**, negotiation (win-win), virtual teams (time zones, communication tools).

### Technical writing and documentation
Principles: know the **audience and purpose**; be **clear, concise, accurate, complete and consistent**; one idea per paragraph; active voice; define terms; use headings, lists, tables and figures; review and revise.
Structure of a technical/science document: title → abstract → **introduction** (background, problem, purpose; mostly present/past tense, while plans are in future tense in proposals) → methods/body → results → discussion/conclusion → references → appendices.
Writing process: select the topic and purpose → gather and organize material (outline) → **write the draft quickly** → **revise and edit** (critical reading; usually takes the most time) → proofread.
Document types: proposals, requirements specs (SRS), design documents, test plans/reports, user manuals, release notes, meeting minutes, status reports, presentations.

Choosing charts:
- **Line graph**: change over **time** (monthly sales trend).
- **Bar/column chart**: **comparing** quantities across categories.
- **Pie chart**: **proportion** of a whole (parts of 100%); does **not** show cause-and-effect; avoid more than ~6 slices.
- **Histogram**: **frequency distribution** of continuous data in class intervals (bars touch).
- **Scatter plot**: **correlation** between two variables.
- **Radar (spider) chart**: compares several evaluation items at once; shows the **balance** of a profile.
- **Gantt chart**: schedules; **flowchart**: processes; **Pareto chart**: prioritizing causes.
`}
);
