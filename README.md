# TOPCIT Reviewer

A free reviewer for the **TOPCIT** (Test of Practical Competency in IT) periodic test on **Thursday, 26 November 2026**. It follows the official syllabus **V4.0E** and test structure from [topcit.or.kr](https://topcit.or.kr/).

### [Open the reviewer →](https://mynameisrinax.github.io/topcit-reviewer/)

## What's inside

| Section | What it has |
| --- | --- |
| **Exam guide** | Format (150 minutes, 1,000 points, 4 modules), question types and their share of the score, levels, exam-day strategy, answer templates for written questions, links to the official practice test screen |
| **Lessons** | 45 lessons mapped to syllabus numbers, with tables, code, worked examples and "exam trap" notes. Search across 828 key terms |
| **Practice** | 236 original TOPCIT-style questions (multiple choice, select-all, short answer) with an explanation for every choice. Smart practice, mistakes, flagged, by module, by lesson |
| **Mock exam** | 40 questions in 60 minutes, split like the real exam, with a projected score and level |
| **Drills** | 32 written and hands-on scenarios (SQL, ERD, normalization, code, pseudocode, UML, CPM, EVM, availability, subnetting, secure coding) with model answers and a scoring checklist for partial credit |
| **Flashcards** | Every key term from the lessons (on the Lessons page): random, by module, terms from your mistakes, and a "still learning" deck |
| **Cheat sheet** | Formulas and must-know lists for all four modules (linked from Practice and the Exam guide) |

Why drills matter: in TOPCIT, descriptive and performance questions are **69%** of the score and are graded with partial credit.

| Module | Questions | Points |
| --- | :---: | :---: |
| M1 Software Development | 21 | 365 |
| M2 Data Management | 19 | 265 |
| M3 System Architecture & Information Security | 18 | 235 |
| M4 IT Business | 17 | 135 |

Progress (answers, flags, lessons read, drill answers, flashcards, study plan) is saved in the browser with `localStorage`. No account needed. Light mode is the default; dark mode is in the top bar and Settings.

The look follows the PhilNITS IT Passport Reviewer: same colors, cards, navigation and quiz screen.

## Running it

It is a static site with no build step:

```bash
python -m http.server 8766
```

Then open http://localhost:8766. Every push to `main` deploys to GitHub Pages through `.github/workflows/static.yml` (enable Pages with "GitHub Actions" as the source in the repository settings).

`tools/build_artifact.py <out-dir>` writes a copy of the site without the outer `<html>/<head>/<body>` tags, for hosts that add their own page wrapper.

## Project structure

```text
index.html            page shell and navigation
img/topcit-logo.svg   one-color TOPCIT logo from topcit.or.kr (inverted in dark mode)
css/style.css         styles (light and dark themes)
js/core.js            exam facts and module list
js/mN-lessons.js      lessons for module N
js/mN-practice.js     questions and drills for module N
js/guide.js           exam guide, study plan, strategy, cheat sheet
js/app.js             router, lessons, practice/mock engine, drills, flashcards
```

## Writing content

Lesson bodies, scenarios and model answers use a small Markdown subset (rendered by `md()` in `app.js`):

- `### Heading`, `#### Subheading`, `- bullets` (indent 2 spaces to nest), `1. numbered`
- `| tables |` with a `|---|` separator row
- `~~~java` … `~~~` for code blocks
- `{{inline code}}` and `**bold**`
- `> tip` and `!> exam trap` callouts
- A bullet written as `- **Term**: definition` becomes a flashcard automatically

Question format (`t: 'mc'` or `t: 'sa'`):

```js
{ id: 'm2q99', l: 'm2-6', t: 'mc', q: 'Question text', code: String.raw`optional code`, lang: 'sql',
  c: ['A', 'B', 'C', 'D'], a: 1, ex: ['why A', 'why B', 'why C', 'why D'] }        // multi: true, a: [0, 2] for select-all
{ id: 'm2s99', l: 'm2-6', t: 'sa', q: 'Question text',
  blanks: [{ label: 'Ⓐ', a: ['accepted answer', 'variant'] }], ex: 'Explanation' }
```

Choice order is shuffled once per question (fixed by its id) so correct answers spread evenly over A–D; options that are all numbers keep their order.

## Credits

An independent reviewer, not affiliated with IITP, KPC or TOPCIT. The TOPCIT logo belongs to its owners and is used only to identify the exam. All questions, lessons and drills are original practice material written from the public V4.0E syllabus and test structure. The official sample questions are not reproduced; use the official [IBT simulation](https://topcit.or.kr/board/preview.do) to see them.
