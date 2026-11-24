/* Shared data store. Content files push lessons, questions and drills into TC. */
window.TC = {
  exam: {
    date: '2026-11-26T09:00:00+08:00',
    label: 'Thursday, 26 November 2026',
    minutes: 150,
    points: 1000,
    questions: 75
  },
  modules: [
    { id: 'm1', n: 1, name: 'Software Development', short: 'Software Dev', qs: 21, pts: 365,
      blurb: 'SDLC, data structures and algorithms, AI basics, analysis and design, UML, coding in C/Java/Python, testing, maintenance.' },
    { id: 'm2', n: 2, name: 'Data Management', short: 'Data', qs: 19, pts: 265,
      blurb: 'Database concepts, ERD and normalization, SQL, transactions, recovery, data warehouses, big data and data for AI.' },
    { id: 'm3', n: 3, name: 'System Architecture & Information Security', short: 'Arch & Security', qs: 18, pts: 235,
      blurb: 'Hardware, OS, high availability, cloud, networks and protocols, cryptography, access control, secure coding.' },
    { id: 'm4', n: 4, name: 'IT Business', short: 'IT Business', qs: 17, pts: 135,
      blurb: 'Strategy and analysis models, ITSM, IT trends, ethics and IP, project management, EVM, quality, risk, communication.' }
  ],
  lessons: [],
  questions: [],
  drills: []
};
