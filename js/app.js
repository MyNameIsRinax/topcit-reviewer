/* TOPCIT Reviewer app: hash routing, lessons, practice, mock exam, drills, flashcards. No build step. */
(function () {
  'use strict';

  var app = document.getElementById('app');
  var overlay = document.getElementById('overlay');
  var toastEl = document.getElementById('toast');

  /* ---------- storage ---------- */
  var KEY = 'topcit_v1', SKEY = 'topcit_session_v1', LKEY = 'topcit_last_v1';
  function load(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function store(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }
  var DEF = { ans: {}, flags: {}, read: {}, drills: {}, cards: {}, plan: {}, mocks: [], settings: {} };
  var S = Object.assign({}, DEF, load(KEY, {}));
  Object.keys(DEF).forEach(function (k) { if (!S[k] || typeof S[k] !== 'object') S[k] = Array.isArray(DEF[k]) ? [] : {}; });
  S.settings = Object.assign({ theme: 'light', shuffle: false }, S.settings);
  var saveT;
  function save() { clearTimeout(saveT); saveT = setTimeout(function () { store(KEY, S); }, 120); }
  window.addEventListener('pagehide', function () { store(KEY, S); saveSession(); });

  /* ---------- data indexes ---------- */
  var MODS = TC.modules, modById = {};
  MODS.forEach(function (m) { modById[m.id] = m; });
  var lessons = TC.lessons, lessonById = {};
  lessons.forEach(function (l, i) { l.idx = i; lessonById[l.id] = l; l.qs = []; l.drills = []; l.terms = []; });
  var questions = TC.questions, qById = {};
  /* Fixed per-question choice order, so correct answers spread evenly over A–D. Numeric options keep their order. */
  function seeded(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return function () { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return (h >>> 0) / 4294967296; };
  }
  questions.forEach(function (q) {
    if (q.t !== 'mc' || q.c.every(function (c) { return /^[−\-+]?[₱$]?\d/.test(c); })) return;
    var rnd = seeded(q.id), perm = q.c.map(function (_, i) { return i; });
    for (var i = perm.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = perm[i]; perm[i] = perm[j]; perm[j] = t; }
    q.c = perm.map(function (o) { return q.c[o]; });
    if (q.ex) q.ex = perm.map(function (o) { return q.ex[o]; });
    q.a = q.multi ? q.a.map(function (o) { return perm.indexOf(o); }) : perm.indexOf(q.a);
  });
  questions.forEach(function (q) {
    qById[q.id] = q;
    var l = lessonById[q.l]; q.m = l ? l.m : q.id.slice(0, 2);
    if (l) l.qs.push(q.id);
  });
  var drills = TC.drills, dById = {};
  drills.forEach(function (d) { dById[d.id] = d; if (lessonById[d.l]) lessonById[d.l].drills.push(d.id); });
  var terms = [];
  lessons.forEach(function (l) {
    l.body.split('\n').forEach(function (line) {
      var m = line.match(/^\s*-\s+\*\*(.+?)\*\*:\s+(.+)$/);
      if (m) { var t = { key: l.id + '|' + m[1], term: m[1], def: m[2], l: l.id, m: l.m }; l.terms.push(t); terms.push(t); }
    });
  });
  function modQs(mid) { return questions.filter(function (q) { return q.m === mid; }); }
  function modLessons(mid) { return lessons.filter(function (l) { return l.m === mid; }); }
  function modTerms(mid) { return terms.filter(function (t) { return t.m === mid; }); }

  /* ---------- text helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var CODE_RE = /\{\{(.+?)\}\}(?!\})/g;
  function inline(s) {
    var codes = [];
    s = String(s == null ? '' : s).replace(CODE_RE, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    return s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + esc(codes[+i]) + '</code>'; });
  }
  function cap(s) { s = String(s || ''); return /^[a-z]/.test(s) ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function plain(s) { return String(s || '').replace(CODE_RE, '$1').replace(/\*\*/g, ''); }
  function codeBlock(code, lang) {
    return '<div class="code">' + (lang && lang !== 'text' ? '<span class="code-lang">' + esc(lang.toUpperCase()) + '</span>' : '') +
      '<pre><code>' + esc(code.replace(/^\n+|\s+$/g, '')) + '</code></pre></div>';
  }
  function splitRow(line) {
    var codes = [];
    var t = line.replace(CODE_RE, function (m) { codes.push(m); return '\u0001' + (codes.length - 1) + '\u0001'; });
    t = t.trim().replace(/^\|/, '').replace(/\|$/, '');
    return t.split('|').map(function (c) { return c.replace(/\u0001(\d+)\u0001/g, function (_, i) { return codes[+i]; }).trim(); });
  }
  function table(rows) {
    var cells = rows.map(splitRow), head = null, body = cells;
    if (cells.length > 1 && cells[1].every(function (c) { return /^:?-{2,}:?$/.test(c); })) { head = cells[0]; body = cells.slice(2); }
    return '<div class="tbl"><table>' +
      (head ? '<thead><tr>' + head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead>' : '') +
      '<tbody>' + body.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
      '</tbody></table></div>';
  }
  function list(items) {
    var top = [];
    items.forEach(function (raw) {
      var ind = raw.match(/^\s*/)[0].length, ord = /^\s*\d+\.\s/.test(raw), text = raw.replace(/^\s*(-|\d+\.)\s+/, '');
      if (ind >= 2 && top.length) { var p = top[top.length - 1]; (p.kids = p.kids || []).push({ text: text, ord: ord }); }
      else top.push({ text: text, ord: ord });
    });
    function render(arr) {
      var tag = arr[0].ord ? 'ol' : 'ul';
      return '<' + tag + '>' + arr.map(function (it) { return '<li>' + inline(it.text) + (it.kids ? render(it.kids) : '') + '</li>'; }).join('') + '</' + tag + '>';
    }
    return render(top);
  }
  var LIST_RE = /^\s*(-|\d+\.)\s/, STOP_RE = /^\s*(~~~|###|\||!>|>|-\s|\d+\.\s)/;
  function md(src) {
    var lines = String(src || '').replace(/\r/g, '').split('\n'), out = '', i = 0, buf;
    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }
      var fm = line.match(/^\s*~~~\s*([\w+#-]+)?\s*$/);
      if (fm) {
        buf = []; i++;
        while (i < lines.length && !/^\s*~~~\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++; out += codeBlock(buf.join('\n'), fm[1] || ''); continue;
      }
      if (/^####\s/.test(line)) { out += '<h4>' + inline(line.replace(/^####\s+/, '')) + '</h4>'; i++; continue; }
      if (/^###\s/.test(line)) { out += '<h3>' + inline(line.replace(/^###\s+/, '')) + '</h3>'; i++; continue; }
      if (/^\s*\|/.test(line)) { buf = []; while (i < lines.length && /^\s*\|/.test(lines[i])) { buf.push(lines[i]); i++; } out += table(buf); continue; }
      if (/^(!>|>)\s?/.test(line)) {
        var trap = line.indexOf('!>') === 0; buf = [];
        while (i < lines.length && /^(!>|>)\s?/.test(lines[i]) && (lines[i].indexOf('!>') === 0) === trap) { buf.push(lines[i].replace(/^(!>|>)\s?/, '')); i++; }
        out += '<div class="tip-box' + (trap ? ' trap' : '') + '"><b class="tag">' + (trap ? 'Exam trap' : 'Tip') + '</b>' + buf.map(inline).join('<br>') + '</div>';
        continue;
      }
      if (LIST_RE.test(line)) { buf = []; while (i < lines.length && LIST_RE.test(lines[i])) { buf.push(lines[i]); i++; } out += list(buf); continue; }
      buf = [line]; i++;
      while (i < lines.length && lines[i].trim() && !STOP_RE.test(lines[i])) { buf.push(lines[i]); i++; }
      out += '<p>' + buf.map(inline).join('<br>') + '</p>';
    }
    return out;
  }

  /* ---------- small helpers ---------- */
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }
  function letter(i) { return 'ABCDEFGH'.charAt(i); }
  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : (many || one + 's')); }
  function norm(s) {
    return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9+.%/]/g, '').replace(/\.$/, '');
  }
  function matches(accepts, given) { var g = norm(given); return !!g && accepts.some(function (a) { return norm(a) === g; }); }
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }
  function fmtTime(ms) {
    ms = Math.max(0, ms); var s = Math.floor(ms / 1000), h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), sec = s % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(sec).padStart(2, '0');
  }
  function levelFor(score) { return TC.guide.levels.filter(function (l) { return score >= parseInt(l.range, 10); }).pop(); }
  function meter(p) { return '<span class="meter"><i style="width:' + Math.max(0, Math.min(100, p)) + '%"></i></span>'; }
  function pill(mid, text) { return '<span class="pill ' + mid + '">' + esc(text || ('M' + modById[mid].n)) + '</span>'; }

  /* ---------- icons ---------- */
  var ICONS = {
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    redo: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v5h5"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/><path d="M9 8h6M9 12h4"/>',
    cards: '<rect x="3" y="7" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    sliders: '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    pen: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
    sheet: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'
  };
  function ic(name) {
    return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }
  function icBox(name, cls) { return '<span class="ic' + (cls ? ' ' + cls : '') + '">' + ic(name) + '</span>'; }

  /* ---------- theme ---------- */
  function isDark() {
    var t = S.settings.theme;
    return t === 'dark' || (t === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function applyTheme() {
    var t = S.settings.theme;
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
    var b = document.getElementById('themeBtn');
    if (b) { b.innerHTML = ic(isDark() ? 'sun' : 'moon'); b.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode'); }
  }

  /* ---------- question selection ---------- */
  function priority(q) {
    var a = S.ans[q.id];
    if (!a) return 2 + Math.random() * 0.5;
    if (!a.ok) return 3 + Math.random() * 0.5;
    var age = (Date.now() - (a.ts || 0)) / 86400000;
    return 0.5 + Math.min(1, age / 3) * 0.6 + Math.random() * 0.3;
  }
  function topN(pool, n) { return pool.map(function (q) { return { q: q, p: priority(q) }; }).sort(function (a, b) { return b.p - a.p; }).slice(0, n).map(function (x) { return x.q; }); }
  function quotas(n, weights) {
    var tot = weights.reduce(function (a, b) { return a + b; }, 0), raw = weights.map(function (w) { return n * w / tot; });
    var base = raw.map(Math.floor), left = n - base.reduce(function (a, b) { return a + b; }, 0);
    raw.map(function (r, i) { return { i: i, f: r - base[i] }; }).sort(function (a, b) { return b.f - a.f; }).slice(0, left).forEach(function (x) { base[x.i]++; });
    return base;
  }
  function smartSet(n) {
    var qs = quotas(n, MODS.map(function (m) { return m.pts; })), ids = [];
    MODS.forEach(function (m, i) { ids = ids.concat(topN(modQs(m.id), qs[i]).map(function (q) { return q.id; })); });
    return shuffle(ids);
  }
  function mistakes() { return questions.filter(function (q) { return S.ans[q.id] && !S.ans[q.id].ok; }).map(function (q) { return q.id; }); }
  function flagged() { return questions.filter(function (q) { return S.flags[q.id]; }).map(function (q) { return q.id; }); }
  function mistakeTerms() {
    var ls = {};
    mistakes().forEach(function (id) { ls[qById[id].l] = 1; });
    return terms.filter(function (t) { return ls[t.l]; });
  }

  /* ---------- sessions ---------- */
  var SESSION = load(SKEY, null), LAST = load(LKEY, null);
  if (SESSION && (!SESSION.ids || !SESSION.ids.every(function (id) { return qById[id]; }))) SESSION = null;
  function saveSession() { store(SKEY, SESSION && SESSION.mode !== 'review' ? SESSION : null); }
  function startSession(title, ids, mode, opts) {
    if (!ids.length) { toast('No questions here yet'); return; }
    opts = opts || {};
    var perm = {};
    ids.forEach(function (id) {
      var q = qById[id];
      if (q.t === 'mc') perm[id] = S.settings.shuffle ? shuffle(q.c.map(function (_, i) { return i; })) : q.c.map(function (_, i) { return i; });
    });
    SESSION = { title: title, sub: opts.sub || '', mode: mode || 'practice', ids: ids, i: 0, resp: {}, perm: perm, start: Date.now(), limit: opts.limit || 0, submitted: false };
    saveSession(); go('quiz');
  }
  function gradeQ(q, pick) {
    if (q.t === 'sa') {
      var parts = q.blanks.map(function (b, i) { return matches(b.a, pick && pick[i]); });
      return { ok: parts.every(Boolean), parts: parts };
    }
    if (q.multi) return { ok: q.a.slice().sort().join(',') === (pick || []).slice().sort().join(',') };
    return { ok: pick === q.a };
  }
  function hasPick(q, pick) {
    if (!q || pick == null) return false;
    if (q.t === 'sa') return Array.isArray(pick) && pick.some(function (x) { return x && String(x).trim(); });
    if (q.multi) return Array.isArray(pick) && pick.length > 0;
    return typeof pick === 'number';
  }
  function record(qid, ok) {
    var prev = S.ans[qid] || { n: 0 };
    S.ans[qid] = { ok: ok, n: (prev.n || 0) + 1, ts: Date.now() };
    save();
  }

  /* ---------- router ---------- */
  var timerInt = null;
  function go(h) { if (route() === h) render(); else location.hash = h; }
  function route() { return decodeURIComponent(location.hash.replace(/^#\/?/, '')) || 'home'; }
  function render() {
    clearInterval(timerInt); timerInt = null;
    closeModal();
    var r = route(), html, nav;
    if (r === 'home' || r === 'practice') { html = viewHome(); nav = 'home'; }
    else if (r === 'guide') { html = viewGuide(); nav = 'guide'; }
    else if (r === 'sheet') { html = viewSheet(); nav = 'guide'; }
    else if (r === 'learn' || r === 'cards') { html = viewLearn(); nav = 'learn'; }
    else if (r.indexOf('lesson-') === 0 && lessonById[r.slice(7)]) { html = viewLesson(lessonById[r.slice(7)]); nav = 'learn'; }
    else if (r === 'quiz') { html = viewQuiz(); nav = 'home'; }
    else if (r === 'results') { html = viewResults(); nav = 'home'; }
    else if (r === 'drills') { html = viewDrills(); nav = 'drills'; }
    else if (r.indexOf('drill-') === 0 && dById[r.slice(6)]) { html = viewDrill(dById[r.slice(6)]); nav = 'drills'; }
    else if (r === 'deck') { html = viewDeck(); nav = 'learn'; }
    else { html = viewHome(); nav = 'home'; }
    if (html == null) return;
    app.innerHTML = html;
    document.body.classList.toggle('has-bar', r === 'quiz');
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      var on = a.getAttribute('data-nav') === nav;
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    var titles = { learn: 'Lessons', drills: 'Drills', guide: 'Exam guide' };
    document.title = (titles[nav] ? titles[nav] + ' · ' : '') + 'TOPCIT Reviewer';
    if (r !== 'quiz' && r !== 'deck') window.scrollTo(0, 0);
    if (r === 'quiz' && SESSION && SESSION.mode === 'mock' && !SESSION.submitted) startTimer();
    if (r === 'learn' || r === 'cards') bindSearch();
    if (r.indexOf('drill-') === 0) bindDrill();
    if (r === 'quiz') bindQuiz();
  }
  window.addEventListener('hashchange', render);

  /* ---------- progress helpers ---------- */
  function daysLeft() {
    var now = new Date(), d = new Date(TC.exam.date), ex = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((ex - today) / 86400000);
  }
  function modStats(mid) {
    var qs = modQs(mid), seen = 0, ok = 0;
    qs.forEach(function (q) { var a = S.ans[q.id]; if (a) { seen++; if (a.ok) ok++; } });
    return { total: qs.length, seen: seen, ok: ok };
  }
  function qStats(ids) {
    var seen = 0, ok = 0;
    ids.forEach(function (id) { var a = S.ans[id]; if (a) { seen++; if (a.ok) ok++; } });
    return { seen: seen, ok: ok };
  }
  function tile(act, icon, icCls, title, text, off) {
    return '<button class="tile" data-act="' + act + '"' + (off ? ' disabled' : '') + '>' + icBox(icon, icCls) + '<b>' + title + '</b><span>' + text + '</span></button>';
  }
  function sectionHead(h, p) { return '<div class="section-head"><h2>' + h + '</h2>' + (p ? '<p>' + p + '</p>' : '') + '</div>'; }

  /* ---------- HOME (practice) ---------- */
  function viewHome() {
    var dl = daysLeft(), seen = 0, okN = 0;
    questions.forEach(function (q) { var a = S.ans[q.id]; if (a) { seen++; if (a.ok) okN++; } });
    var read = lessons.filter(function (l) { return S.read[l.id]; }).length;
    var mis = mistakes().length, fl = flagged().length;
    var when = dl > 1 ? dl + ' days to go' : dl === 1 ? '1 day to go' : dl === 0 ? 'today' : 'already done';
    var resume = SESSION && SESSION.mode !== 'review' && !SESSION.submitted
      ? '<div class="notice"><span>' + (SESSION.mode === 'mock' ? 'Mock exam' : esc(SESSION.title)) + ' in progress: ' + Object.keys(SESSION.resp).filter(function (k) { return hasPick(qById[k], SESSION.resp[k].pick); }).length + ' of ' + SESSION.ids.length + ' answered.</span><a class="btn sm primary" href="#quiz">Resume</a></div>' : '';
    var planDone = TC.guide.plan.filter(function (p) { return S.plan[p.id]; }).length;
    var mocks = S.mocks.slice(-5).reverse();

    return '<section class="card hero"><div>' +
        '<h1>Get ready for TOPCIT</h1>' +
        '<p>' + questions.length + ' practice questions, ' + lessons.length + ' lessons and ' + drills.length + ' written drills based on the official syllabus V4.0E. The exam is on ' + esc(TC.exam.label) + ' (' + when + ').</p>' +
        '<div class="hero-actions"><button class="btn primary" data-act="smart">' + ic('bolt') + 'Smart practice</button><a class="btn" href="#guide">How the exam works</a></div>' +
      '</div><div class="stats">' +
        '<div class="stat"><b>' + seen + '<small> / ' + questions.length + '</small></b><span>questions answered</span>' + meter(pct(seen, questions.length)) + '</div>' +
        '<div class="stat"><b>' + (seen ? pct(okN, seen) + '%' : '–') + '</b><span>correct on latest try</span></div>' +
        '<div class="stat"><b>' + mis + '</b><span>mistakes to review</span></div>' +
        '<div class="stat"><b>' + read + '<small> / ' + lessons.length + '</small></b><span>lessons read</span>' + meter(pct(read, lessons.length)) + '</div>' +
      '</div></section>' + resume +

      '<section class="section">' + sectionHead('Quick study', 'Short sets that focus on what you still miss') +
        '<div class="tiles">' +
          tile('smart', 'bolt', '', 'Smart practice', '20 questions: new ones plus your past mistakes', false) +
          tile('mistakes', 'redo', 'bad', 'Review mistakes', mis ? plural(mis, 'question') + ' to get right' : 'Nothing to review yet', !mis) +
          tile('flagged', 'flag', 'flag', 'Flagged', fl ? plural(fl, 'flagged question') : 'Flag questions to come back to them', !fl) +
          tile('mock', 'clock', 'ok', 'Mock exam', '40 questions, 60 minutes, with a projected level', false) +
        '</div></section>' +

      '<section class="section">' + sectionHead('Learn the syllabus', 'Short lessons that follow the official syllabus V4.0E') +
        '<div class="card learn-cta">' + icBox('book') +
          '<div class="learn-text"><b>' + lessons.length + ' lessons · ' + terms.length + ' terms</b><span>Read a lesson, then test yourself with flashcards</span></div>' +
          '<div class="learn-btns"><a class="btn" href="#sheet">' + ic('sheet') + 'Cheat sheet</a><a class="btn primary" href="#learn">Open lessons</a></div>' +
        '</div></section>' +

      '<section class="section">' + sectionHead('Written and coding drills', 'These question types are 69% of the score') +
        '<div class="card learn-cta">' + icBox('pen', 'ok') +
          '<div class="learn-text"><b>' + drills.length + ' drills · SQL, code, diagrams, calculations</b><span>Write your answer, then score it with the model answer\'s checklist</span></div>' +
          '<div class="learn-btns"><a class="btn primary" href="#drills">Open drills</a></div>' +
        '</div></section>' +

      '<section class="section">' + sectionHead('Practice by module', 'Each set picks 20 questions, favoring ones you missed or have not seen') +
        '<div class="topics">' + MODS.map(function (m) {
          var s = modStats(m.id);
          return '<button class="card topic ' + m.id + '" data-act="modPractice" data-arg="' + m.id + '">' +
            '<span class="row-top"><span><b>M' + m.n + ' ' + esc(m.name) + '</b><small>' + m.pts + ' points · ' + m.qs + ' exam questions</small></span>' + pill(m.id, s.total + ' Qs') + '</span>' +
            '<span class="desc">' + esc(m.blurb) + '</span>' + meter(pct(s.seen, s.total)) +
            '<span class="row-foot"><span>' + (s.seen ? s.seen + ' answered · ' + pct(s.ok, s.seen) + '% correct' : 'Not started') + '</span><span class="go">Practice' + ic('arrowR') + '</span></span>' +
          '</button>';
        }).join('') + '</div></section>' +

      '<section class="section"><details class="card panel"><summary>' + icBox('list') +
          '<span><b>Practice one lesson</b><small>Every question from a single lesson, in order</small></span>' + ic('right') + '</summary>' +
        '<div class="panel-body">' + MODS.map(function (m) {
          return '<span class="field-label">M' + m.n + ' ' + esc(m.name) + '</span><ul class="lesson-pick">' + modLessons(m.id).map(function (l) {
            var st = qStats(l.qs);
            return '<li><button class="link" data-act="lessonPractice" data-arg="' + l.id + '">' + esc(l.title) + '</button><span class="muted">' + st.seen + '/' + l.qs.length + (st.seen ? ' · ' + pct(st.ok, st.seen) + '%' : '') + '</span></li>';
          }).join('') + '</ul>';
        }).join('') + '</div></details></section>' +

      (mocks.length ? '<section class="section">' + sectionHead('Your mock exams', 'Latest first') +
        '<div class="card"><div class="tbl flat"><table><thead><tr><th>Date</th><th>Correct</th>' +
        MODS.map(function (m) { return '<th>M' + m.n + '</th>'; }).join('') + '<th>Projected</th></tr></thead><tbody>' +
        mocks.map(function (x) {
          return '<tr><td>' + esc(new Date(x.ts).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })) + '</td><td class="num">' + x.ok + '/' + x.total + '</td>' +
            MODS.map(function (m) { var b = x.by[m.id] || [0, 0]; return '<td class="num">' + pct(b[0], b[1]) + '%</td>'; }).join('') +
            '<td class="num">' + x.proj + ' · Level ' + levelFor(x.proj).n + '</td></tr>';
        }).join('') + '</tbody></table></div></div></section>' : '') +

      '<section class="section">' + sectionHead('2-day study plan', '<span id="planCount">' + planDone + ' of ' + TC.guide.plan.length + ' done</span>') +
        '<ul class="card plan">' + TC.guide.plan.map(function (p) {
          var done = !!S.plan[p.id];
          return '<li class="' + (done ? 'done' : '') + '"><label><input type="checkbox" data-plan="' + p.id + '"' + (done ? ' checked' : '') + '>' +
            '<span class="plan-text"><small>' + esc(p.when) + '</small><b>' + esc(p.title) + '</b><span>' + inline(p.text) + '</span></span></label></li>';
        }).join('') + '</ul></section>';
  }

  /* ---------- GUIDE ---------- */
  function viewGuide() {
    var g = TC.guide;
    return '<header class="page-head"><h1>Exam guide</h1><p>How the TOPCIT test works and where the points are. Facts are from topcit.or.kr.</p></header>' +
      '<div class="kpis">' +
        '<div class="card kpi"><span class="kpi-label">Time</span><b>150 min</b><small>Be seated 20 minutes before the start</small></div>' +
        '<div class="card kpi"><span class="kpi-label">Score</span><b>1,000</b><small>Reported as Level 1 to 5</small></div>' +
        '<div class="card kpi"><span class="kpi-label">Questions</span><b>75</b><small>In 4 modules, on a computer</small></div>' +
        '<div class="card kpi"><span class="kpi-label">Result</span><b>No pass/fail</b><small>Aim for the level your school or employer asks for</small></div>' +
      '</div>' +
      '<p class="note">The official module table adds up to 75 questions, while the same page\'s text says 65. The point split below is what matters.</p>' +

      '<section class="section">' + sectionHead('Points by module', 'Spend your study time in this order') +
        '<ul class="card barlist">' + MODS.map(function (m) {
          return '<li class="' + m.id + '"><span class="bl-label">' + pill(m.id) + '<span>' + esc(m.name) + '</span></span>' +
            '<span class="bl-track"><span class="bl-fill" style="width:' + (m.pts / 365 * 100) + '%"></span></span>' +
            '<span class="bl-value">' + m.pts + '<small>pts · ' + m.qs + ' Qs</small></span></li>';
        }).join('') + '</ul></section>' +

      '<section class="section">' + sectionHead('Question types', 'Share of the total score') +
        '<ul class="card types">' + g.types.map(function (t) {
          return '<li><b>' + esc(t.name) + '</b><span class="num">' + t.share + '%</span><span>' + esc(t.how) + ' ' + esc(t.pts) + '.</span></li>';
        }).join('') + '</ul>' +
        '<p class="note">Descriptive and performance answers are 69% of the score and get partial credit, so practice them in <a href="#drills">Drills</a>.</p></section>' +

      '<section class="section">' + sectionHead('Levels', 'Your score maps to one of five levels') +
        '<ul class="card levels">' + g.levels.map(function (l) {
          return '<li><span class="pill' + (l.n === 3 ? '' : ' grey') + '">Level ' + l.n + '</span><b>' + esc(l.name) + '</b><span class="muted num">' + esc(l.range) + '</span></li>';
        }).join('') + '</ul>' +
        '<p class="note">In the sample score report on the TOPCIT site, the national average was 187, the top 30% started at 329 and the top 10% at 418. Level 3 (400+) puts you near the top 10%.</p></section>' +

      '<section class="section">' + sectionHead('Exam-day strategy', 'Where easy points are won or lost') +
        '<ul class="card tips">' + g.strategy.map(function (s) { return '<li><b>' + esc(s.t) + '</b><span>' + esc(s.d) + '</span></li>'; }).join('') + '</ul></section>' +

      '<section class="section">' + sectionHead('Answer templates', 'Shapes for written answers, so graders find the keywords') +
        '<div class="templates">' + g.templates.map(function (t) {
          return '<div class="card template"><b>' + esc(t.t) + '</b><ol>' + t.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div>';
        }).join('') + '</div></section>' +

      '<section class="section">' + sectionHead('More', '') +
        '<div class="card links">' +
          '<a href="#sheet">' + icBox('sheet') + '<span><b>Cheat sheet</b><small>Formulas and must-know lists for all four modules</small></span>' + ic('right') + '</a>' +
          '<a href="https://topcit.or.kr/board/preview.do" target="_blank" rel="noopener">' + icBox('ext') + '<span><b>Official practice test screen</b><small>IBT simulation, UML/ERD drawing tools, and the C, C++, Java, Python compiler</small></span>' + ic('right') + '</a>' +
          '<a href="https://topcit.or.kr/introduction/syllabus.do" target="_blank" rel="noopener">' + icBox('ext') + '<span><b>Official syllabus V4.0E</b><small>Each lesson here shows its syllabus number</small></span>' + ic('right') + '</a>' +
        '</div></section>';
  }
  function viewSheet() {
    return '<div class="qhead"><a class="icon-btn" href="#guide" aria-label="Back to the exam guide">' + ic('left') + '</a>' +
      '<div class="titles"><b>Cheat sheet</b><span>Read it twice the night before, once on exam morning</span></div></div>' +
      '<article class="card prose">' + md(TC.guide.sheet) + '</article>';
  }

  /* ---------- LEARN ---------- */
  function viewLearn() {
    var again = terms.filter(function (t) { return S.cards[t.key] === 'again'; }).length, mt = mistakeTerms().length;
    return '<header class="page-head"><h1>Lessons</h1><p>' + lessons.length + ' lessons that follow the official TOPCIT syllabus V4.0E, with ' + terms.length + ' key terms. Each lesson links to its practice questions.</p></header>' +
      '<label class="search">' + ic('search') + '<input id="q" type="search" placeholder="Search terms, e.g. 2PL or CPI" autocomplete="off" aria-label="Search terms and lessons"></label>' +
      '<div id="searchOut"></div>' +
      '<div id="lessonList">' +
        '<section class="section" id="flashcards">' + sectionHead('Flashcards', 'Test what you remember, one term at a time') +
          '<div class="tiles decks">' +
            tile('deckRandom', 'bolt', '', 'Random 30', 'A mix from all four modules', false) +
            tile('deckMistakes', 'redo', 'bad', 'Terms from your mistakes', mt ? plural(mt, 'term') + ' from lessons you missed questions in' : 'Answer some questions first', !mt) +
            tile('deckAgain', 'cards', 'flag', 'Still learning', again ? plural(again, 'card') + ' you marked Again' : 'Cards you mark Again show up here', !again) +
          '</div></section>' +
        MODS.map(function (m) {
          var ls = modLessons(m.id);
          return '<section class="section" id="mod-' + m.id + '">' + sectionHead('M' + m.n + ' ' + esc(m.name),
              ls.length + ' lessons · ' + modTerms(m.id).length + ' terms · <button class="link" data-act="deckMod" data-arg="' + m.id + '">Flashcards</button>') +
            '<div class="lessons">' + ls.map(lessonCard).join('') + '</div></section>';
        }).join('') +
      '</div>';
  }
  function lessonCard(l) {
    var read = !!S.read[l.id], st = qStats(l.qs);
    return '<a class="card lesson ' + l.m + '" href="#lesson-' + l.id + '">' +
      '<span class="row-top"><span><b>' + esc(l.title) + '</b><small>Syllabus ' + esc(l.syl) + '</small></span>' + (l.terms.length ? pill(l.m, l.terms.length + ' terms') : '') + '</span>' +
      '<span class="desc">' + esc(l.summary) + '</span>' + meter(pct(st.seen, l.qs.length)) +
      '<span class="row-foot"><span>' + (read ? '<span class="ok">Read</span>' : 'Not read') + ' · ' + (st.seen ? st.seen + '/' + l.qs.length + ' answered' : plural(l.qs.length, 'question')) + '</span><span class="go">Open' + ic('arrowR') + '</span></span></a>';
  }
  function bindSearch() {
    var input = document.getElementById('q'), out = document.getElementById('searchOut'), listEl = document.getElementById('lessonList');
    if (!input) return;
    input.addEventListener('input', function () {
      var v = input.value.trim().toLowerCase();
      if (v.length < 2) { out.innerHTML = ''; listEl.hidden = false; return; }
      var ts = terms.filter(function (t) { return t.term.toLowerCase().indexOf(v) >= 0; })
        .concat(terms.filter(function (t) { return t.term.toLowerCase().indexOf(v) < 0 && plain(t.def).toLowerCase().indexOf(v) >= 0; })).slice(0, 40);
      var ls = lessons.filter(function (l) { return (l.title + ' ' + l.summary + ' ' + l.body).toLowerCase().indexOf(v) >= 0; });
      listEl.hidden = true;
      out.innerHTML = '<p class="search-count">' + plural(ts.length, 'term') + (ts.length === 40 ? '+' : '') + ' and ' + plural(ls.length, 'lesson') + ' match "' + esc(input.value.trim()) + '"</p>' +
        (ts.length ? '<div class="term-list">' + ts.map(function (t) {
          return '<a class="card term" href="#lesson-' + t.l + '"><b>' + inline(t.term) + '</b><p>' + inline(cap(t.def)) + '</p><small>' + pill(t.m) + esc(lessonById[t.l].title) + '</small></a>';
        }).join('') + '</div>' : '') +
        (ls.length ? '<section class="section">' + sectionHead('Lessons that mention it', '') + '<div class="lessons">' + ls.map(lessonCard).join('') + '</div></section>' : '');
    });
  }
  function viewLesson(l) {
    var m = modById[l.m], ml = modLessons(l.m), pos = ml.indexOf(l), prev = ml[pos - 1], next = ml[pos + 1];
    if (!S.read[l.id]) { S.read[l.id] = Date.now(); save(); }
    var ds = l.drills.map(function (id) { return dById[id]; });
    return '<div class="qhead"><a class="icon-btn" href="#learn" aria-label="Back to lessons">' + ic('left') + '</a>' +
        '<div class="titles"><b>' + esc(l.title) + '</b><span>M' + m.n + ' ' + esc(m.name) + ' · Syllabus ' + esc(l.syl) + '</span></div></div>' +
      '<section class="card lesson-hero ' + l.m + '"><p>' + esc(l.summary) + '</p>' +
        '<div class="lesson-stats">' + (l.terms.length ? '<span>' + plural(l.terms.length, 'key term') + '</span>' : '') + '<span>' + plural(l.qs.length, 'practice question') + '</span>' + (ds.length ? '<span>' + plural(ds.length, 'drill') + '</span>' : '') + '</div>' +
        '<div class="hero-actions">' +
          (l.qs.length ? '<button class="btn primary" data-act="lessonPractice" data-arg="' + l.id + '">' + ic('bolt') + 'Practice ' + l.qs.length + ' questions</button>' : '') +
          (l.terms.length ? '<button class="btn" data-act="lessonDeck" data-arg="' + l.id + '">' + ic('cards') + 'Flashcards</button>' : '') +
          ds.map(function (d) { return '<a class="btn" href="#drill-' + d.id + '">' + ic('pen') + 'Drill</a>'; }).join('') +
        '</div></section>' +
      '<article class="card prose" style="margin-top:12px">' + md(l.body) + '</article>' +
      '<nav class="lesson-nav">' +
        (prev ? '<a class="card lesson-link" href="#lesson-' + prev.id + '"><small>' + ic('arrowL') + 'Previous</small><b>' + esc(prev.title) + '</b></a>' : '<span></span>') +
        (next ? '<a class="card lesson-link next" href="#lesson-' + next.id + '"><small>Next' + ic('arrowR') + '</small><b>' + esc(next.title) + '</b></a>'
              : '<a class="card lesson-link next" href="#learn"><small>Finished M' + m.n + ic('arrowR') + '</small><b>All lessons</b></a>') +
      '</nav>';
  }

  /* ---------- QUIZ ---------- */
  function viewQuiz() {
    var s = SESSION;
    if (!s) { location.replace('#home'); return null; }
    if (s.i >= s.ids.length) s.i = s.ids.length - 1;
    var qid = s.ids[s.i], q = qById[qid], r = s.resp[qid] || {};
    var mock = s.mode === 'mock', review = s.mode === 'review';
    var reveal = review || (s.mode === 'practice' && r.done) || (mock && s.submitted);
    var okN = 0, badN = 0, answered = 0;
    s.ids.forEach(function (k) {
      var rr = s.resp[k]; if (!rr) return;
      if (!mock && rr.done) { if (rr.ok) okN++; else badN++; }
      if (hasPick(qById[k], rr.pick)) answered++;
    });
    var l = lessonById[q.l], last = s.i === s.ids.length - 1;
    var typeLabel = q.t === 'sa' ? 'Short answer' : q.multi ? 'Select all that apply' : '';

    var right = mock && !s.submitted
      ? '<div class="qright"><span class="timer" id="timer">' + fmtTime(s.start + s.limit - Date.now()) + '</span><button class="btn sm" data-act="submitAsk">Submit</button></div>'
      : '<div class="qright"><div class="score"><span class="ok">' + ic('check') + okN + '</span><span class="bad">' + ic('x') + badN + '</span></div></div>';
    if (review) right = '<div class="qright"><a class="btn sm" href="#results">Results</a></div>';
    var n = s.ids.length;
    var bar = mock && !s.submitted ? '<i class="done" style="width:' + pct(answered, n) + '%"></i>'
      : '<i class="ok" style="width:' + (okN / n * 100) + '%"></i><i class="bad" style="width:' + (badN / n * 100) + '%"></i>';
    if (review) {
      var rk = 0, rb = 0; s.ids.forEach(function (k) { var rr = s.resp[k]; if (rr && rr.done) { if (rr.ok) rk++; else rb++; } });
      bar = '<i class="ok" style="width:' + (rk / n * 100) + '%"></i><i class="bad" style="width:' + (rb / n * 100) + '%"></i>';
    }

    var flagOn = !!S.flags[qid];
    return '<div class="qhead"><a class="icon-btn" href="#home" aria-label="Back to practice">' + ic('left') + '</a>' +
        '<div class="titles"><b>' + esc(s.title) + '</b><span>' + (review ? 'Review' : mock ? 'Mock exam' : esc(s.sub || 'Practice')) + ' · ' + (s.i + 1) + ' of ' + n + '</span></div>' + right + '</div>' +
      '<div class="pbar">' + bar + '</div>' +
      '<article class="card qcard">' +
        '<div class="qmeta">' + pill(q.m) + '<a class="qsrc" href="#lesson-' + q.l + '">' + (l ? esc(l.title) : '') + '</a>' +
          (typeLabel ? '<span class="pill grey">' + typeLabel + '</span>' : '') +
          '<button class="flag-btn' + (flagOn ? ' on' : '') + '" data-act="flag" aria-pressed="' + flagOn + '">' + ic('flag') + (flagOn ? 'Flagged' : 'Flag') + '</button></div>' +
        '<div class="stem"><span class="qn">Q' + (s.i + 1) + '.</span>' + inline(q.q) + '</div>' +
        (q.code ? codeBlock(q.code, q.lang) : '') +
        answerArea(q, r, reveal, mock) +
      '</article>' +
      '<p class="kbd-hint kbd-only">' + (q.t === 'mc' ? '<kbd>A</kbd>–<kbd>D</kbd> answer · ' : '') + '<kbd>Enter</kbd> ' + (q.t === 'sa' && !reveal ? 'check' : 'next') + ' · <kbd>F</kbd> flag · <kbd>G</kbd> question list</p>' +
      '<div class="actionbar"><div class="in">' +
        '<button class="btn navbtn" data-act="prev"' + (s.i === 0 ? ' disabled' : '') + '>' + ic('arrowL') + '<span class="lbl">Prev</span></button>' +
        '<button class="btn ghost" data-act="grid" aria-label="Question list">' + ic('grid') + (s.i + 1) + ' / ' + n + '</button>' +
        (last ? (mock && !s.submitted ? '<button class="btn primary navbtn" data-act="submitAsk">Submit</button>'
               : review ? '<a class="btn primary navbtn" href="#results">Results</a>'
               : '<button class="btn primary navbtn" data-act="finish"><span class="lbl">Finish</span>' + ic('arrowR') + '</button>')
             : '<button class="btn primary navbtn" data-act="next"><span class="lbl">Next</span>' + ic('arrowR') + '</button>') +
      '</div></div>';
  }
  function answerArea(q, r, reveal, mock) {
    var s = SESSION, html = '';
    if (q.t === 'sa') {
      var pick = r.pick || [];
      if (reveal) html += verdict(r.ok, q);
      html += '<div class="blanks">' + q.blanks.map(function (b, i) {
        var st = reveal ? (r.parts && r.parts[i] ? ' ok' : ' bad') : '';
        return '<label class="blank' + st + '"><span>' + esc(b.label) + '</span>' +
          '<input type="text" id="sa-' + q.id + '-' + i + '" data-blank="' + i + '" value="' + esc(pick[i] || '') + '"' + (reveal ? ' readonly' : '') + ' autocomplete="off" spellcheck="false" placeholder="Your answer">' +
          (reveal ? '<span class="answer">' + (r.parts && r.parts[i] ? ic('check') : ic('x')) + 'Answer: <b>' + esc(b.a[0]) + '</b></span>' : '') + '</label>';
      }).join('') + '</div>';
      if (!reveal && !mock) html += '<div class="check-row"><button class="btn primary" data-act="check">Check answer</button><span class="kbd-only">or press <kbd>Enter</kbd></span></div>';
      if (reveal) {
        html += '<div class="why plain">' + inline(q.ex) + '</div>';
        if (!r.ok && s.mode === 'practice') html += '<div class="check-row"><button class="btn sm" data-act="override">' + ic('check') + 'My answer means the same: count it</button></div>';
      }
      return html;
    }
    var perm = (s.perm && s.perm[q.id]) || q.c.map(function (_, i) { return i; });
    var picks = q.multi ? (r.pick || []) : (r.pick == null ? [] : [r.pick]);
    if (reveal) {
      var ans = (q.multi ? q.a : [q.a]).map(function (o) { return letter(perm.indexOf(o)); }).sort().join(', ');
      html += verdict(r.ok, q, ans, !picks.length);
    }
    html += '<div class="choices' + (reveal ? ' revealed' : '') + (q.multi ? ' multi' : '') + '">' + perm.map(function (orig, di) {
      var picked = picks.indexOf(orig) >= 0, correct = q.multi ? q.a.indexOf(orig) >= 0 : q.a === orig, cls = 'choice';
      if (reveal) cls += correct ? ' correct' : picked ? ' wrong' : ' dim';
      else if (picked) cls += ' picked';
      var key = reveal ? (correct ? ic('check') : picked ? ic('x') : letter(di)) : (q.multi && picked ? ic('check') : letter(di));
      var out = '<button class="' + cls + '" data-act="pick" data-arg="' + orig + '"' + (reveal ? ' disabled' : '') + ' aria-pressed="' + picked + '">' +
        '<span class="key">' + key + '</span><span class="ctext">' + inline(q.c[orig]) + '</span></button>';
      if (reveal && q.ex && q.ex[orig]) {
        out += '<div class="why ' + (correct ? 'ok' : picked ? 'no' : 'other') + '">' +
          (correct ? '<span class="tag">Correct</span>' : picked ? '<span class="tag">Your answer</span>' : '') + inline(q.ex[orig]) + '</div>';
      }
      return out;
    }).join('') + '</div>';
    if (q.multi && !reveal && !mock) html += '<div class="check-row"><button class="btn primary" data-act="check"' + (picks.length ? '' : ' disabled') + '>Check answer</button><span>Select every correct option</span></div>';
    return html;
  }
  function verdict(ok, q, letters, skipped) {
    if (ok) return '<p class="verdict ok">' + ic('check') + 'Correct.</p>';
    if (q.t === 'sa') return '<p class="verdict bad">' + ic('x') + 'Not quite. Compare with the answer below.</p>';
    return '<p class="verdict bad">' + ic('x') + (skipped ? 'Not answered. ' : 'Not quite. ') + 'The answer is ' + letters + '.</p>';
  }
  function bindQuiz() {
    document.querySelectorAll('.blank input[data-blank]').forEach(function (inp) {
      inp.addEventListener('input', function () {
        var s = SESSION, qid = s.ids[s.i], r = s.resp[qid] = s.resp[qid] || {};
        r.pick = r.pick || []; r.pick[+inp.dataset.blank] = inp.value; saveSession();
      });
    });
    var first = document.querySelector('.blank input:not([readonly])');
    if (first && window.matchMedia('(min-width: 720px)').matches) first.focus({ preventScroll: true });
  }
  function doPick(orig) {
    var s = SESSION; if (!s) return;
    var qid = s.ids[s.i], q = qById[qid], r = s.resp[qid] = s.resp[qid] || {};
    if (r.done || s.mode === 'review' || s.submitted) return;
    if (q.multi) {
      var p = (r.pick || []).slice(), k = p.indexOf(orig);
      if (k >= 0) p.splice(k, 1); else p.push(orig);
      r.pick = p;
    } else {
      r.pick = orig;
      if (s.mode === 'practice') { var g = gradeQ(q, orig); r.ok = g.ok; r.done = true; record(qid, g.ok); }
    }
    saveSession(); render();
  }
  function doCheck() {
    var s = SESSION; if (!s || s.mode !== 'practice') return;
    var qid = s.ids[s.i], q = qById[qid], r = s.resp[qid] = s.resp[qid] || {};
    if (r.done) return;
    if (q.t === 'sa') {
      var pick = q.blanks.map(function (_, i) { var el = document.getElementById('sa-' + qid + '-' + i); return el ? el.value : ''; });
      if (!pick.some(function (x) { return x.trim(); })) { toast('Type an answer first'); return; }
      r.pick = pick;
    } else if (!(r.pick || []).length) return;
    var g = gradeQ(q, r.pick); r.ok = g.ok; r.parts = g.parts; r.done = true; record(qid, g.ok);
    saveSession(); render();
  }
  function move(d) {
    var s = SESSION; if (!s) return;
    var ni = s.i + d; if (ni < 0 || ni >= s.ids.length) return;
    s.i = ni; saveSession(); render(); window.scrollTo(0, 0);
  }
  function finishPractice() {
    var s = SESSION; if (!s) return;
    var done = s.ids.filter(function (id) { return s.resp[id] && s.resp[id].done; });
    LAST = { title: s.title, mode: 'practice', ids: s.ids, resp: s.resp, perm: s.perm, ts: Date.now(), dur: Date.now() - s.start, answered: done.length };
    store(LKEY, LAST); SESSION = null; saveSession(); go('results');
  }
  function submitMock() {
    var s = SESSION; if (!s || s.mode !== 'mock') return;
    var by = {}, okAll = 0;
    MODS.forEach(function (m) { by[m.id] = [0, 0]; });
    s.ids.forEach(function (id) {
      var q = qById[id], r = s.resp[id] = s.resp[id] || {};
      if (q.t === 'sa' && !r.pick) r.pick = [];
      var g = gradeQ(q, r.pick); r.ok = g.ok; r.parts = g.parts; r.done = true;
      if (hasPick(q, r.pick)) record(id, g.ok);
      by[q.m][1]++; if (g.ok) { by[q.m][0]++; okAll++; }
    });
    var proj = Math.round(MODS.reduce(function (sum, m) { var b = by[m.id]; return sum + (b[1] ? m.pts * b[0] / b[1] : 0); }, 0));
    var rec = { ts: Date.now(), ok: okAll, total: s.ids.length, by: by, proj: proj };
    S.mocks.push(rec); if (S.mocks.length > 30) S.mocks.shift(); save();
    LAST = { title: s.title, mode: 'mock', ids: s.ids, resp: s.resp, perm: s.perm, ts: Date.now(), dur: Math.min(Date.now() - s.start, s.limit), answered: s.ids.length, mock: rec };
    store(LKEY, LAST); SESSION = null; saveSession(); go('results');
  }
  function startTimer() {
    timerInt = setInterval(function () {
      var s = SESSION; if (!s || s.mode !== 'mock') { clearInterval(timerInt); return; }
      var left = s.start + s.limit - Date.now(), el = document.getElementById('timer');
      if (el) { el.textContent = fmtTime(left); el.classList.toggle('low', left < 5 * 60000); }
      if (left <= 0) { clearInterval(timerInt); toast('Time is up. Your exam was submitted.'); submitMock(); }
    }, 1000);
  }

  /* ---------- RESULTS ---------- */
  function viewResults() {
    var L = LAST;
    if (!L) return '<section class="card result-hero"><h1>No results yet</h1><p class="muted">Finish a practice set or mock exam to see results here.</p><div class="res-actions"><a class="btn primary" href="#home">Go to practice</a></div></section>';
    var counted = L.ids.filter(function (id) { return L.mode === 'mock' || (L.resp[id] && L.resp[id].done); });
    var okN = counted.filter(function (id) { return L.resp[id] && L.resp[id].ok; }).length;
    var p = pct(okN, counted.length);
    var by = {}; MODS.forEach(function (m) { by[m.id] = [0, 0]; });
    counted.forEach(function (id) { var q = qById[id]; by[q.m][1]++; if (L.resp[id].ok) by[q.m][0]++; });
    var wrongIdx = [];
    L.ids.forEach(function (id, i) { if (counted.indexOf(id) >= 0 && !L.resp[id].ok) wrongIdx.push(i); });
    var proj = L.mock ? L.mock.proj : null, lv = proj != null ? levelFor(proj) : null;
    var ringCls = p >= 70 ? 'ok' : p >= 40 ? 'warn' : 'bad';
    return '<section class="card result-hero">' +
        '<div class="ring ' + ringCls + '" style="--p:' + p + '"><b>' + p + '%</b></div>' +
        '<h1>' + esc(L.title) + '</h1>' +
        '<p class="muted">' + okN + ' of ' + counted.length + ' correct' + (L.mode === 'practice' && L.answered < L.ids.length ? ' (you answered ' + L.answered + ' of ' + L.ids.length + ')' : '') + (L.dur ? ' · ' + fmtTime(L.dur) : '') + '</p>' +
        (L.mode === 'mock' ? '<div class="passbox">Projected score ' + proj + ' / 1000 · Level ' + lv.n + ' (' + esc(lv.name) + ')' +
          '<small>Assumes your written answers score as well as these questions. Most people score lower on written answers, so keep practicing drills.</small></div>' : '') +
        '<div class="res-actions"><button class="btn primary" data-act="reviewAll">Review answers</button>' +
          (wrongIdx.length ? '<button class="btn" data-act="retryWrong">' + ic('redo') + 'Retry ' + plural(wrongIdx.length, 'miss', 'misses') + '</button>' : '') +
          '<a class="btn" href="#home">Back to practice</a></div>' +
      '</section>' +
      '<section class="section">' + sectionHead('By module', '') +
        '<div class="card tbars">' + MODS.filter(function (m) { return by[m.id][1]; }).map(function (m) {
          var b = by[m.id];
          return '<div class="' + m.id + '"><div class="tbar-head"><b>M' + m.n + ' ' + esc(m.name) + '</b><span>' + b[0] + '/' + b[1] + ' · ' + pct(b[0], b[1]) + '%</span></div>' +
            '<div class="tbar"><i style="width:' + pct(b[0], b[1]) + '%"></i></div></div>';
        }).join('') + '</div></section>' +
      (wrongIdx.length ? '<section class="section">' + sectionHead('Questions you missed', 'Tap one to see the explanation') +
        '<div class="misses">' + wrongIdx.map(function (i) {
          var q = qById[L.ids[i]];
          return '<button class="card miss" data-act="reviewAt" data-arg="' + i + '">' + pill(q.m) +
            '<span class="what"><b>' + esc(plain(q.q)) + '</b><small>Q' + (i + 1) + ' · ' + esc(lessonById[q.l].title) + '</small></span>' + ic('right') + '</button>';
        }).join('') + '</div></section>' : '');
  }

  /* ---------- DRILLS ---------- */
  function drillState(id) { return S.drills[id] || (S.drills[id] = { a: {}, open: {}, ticks: {} }); }
  function drillTouched(d) { var st = S.drills[d.id]; return !!(st && Object.keys(st.open || {}).some(function (k) { return st.open[k]; })); }
  function drillScore(d) {
    var st = S.drills[d.id]; if (!st) return null;
    var got = 0, any = false;
    d.parts.forEach(function (p, i) {
      if (st.open && st.open[i]) { any = true; got += p.pts * ((st.ticks && st.ticks[i]) || []).length / p.rubric.length; }
    });
    return any ? Math.round(got * 10) / 10 : null;
  }
  var drillFilter = 'all';
  function viewDrills() {
    var scored = drills.filter(drillTouched), tot = 0, got = 0;
    scored.forEach(function (d) { tot += d.pts; got += drillScore(d) || 0; });
    return '<header class="page-head"><h1>Drills</h1><p>Written and hands-on tasks like TOPCIT\'s descriptive and performance questions, which are 69% of the score. Write your answer, then open the model answer and tick each point you covered.</p></header>' +
      (scored.length ? '<div class="notice"><span>Your self-score so far: <b>' + Math.round(got) + '</b> of ' + tot + ' points (' + pct(got, tot) + '%) across ' + plural(scored.length, 'drill') + '.</span></div>' : '') +
      '<div class="section drill-filter"><div class="seg" role="group" aria-label="Filter drills">' + [['all', 'All'], ['Performance', 'Performance'], ['Descriptive', 'Descriptive']].map(function (k) {
        return '<button class="' + (drillFilter === k[0] ? 'on' : '') + '" data-act="drillFilter" data-arg="' + k[0] + '" aria-pressed="' + (drillFilter === k[0]) + '">' + k[1] + '</button>';
      }).join('') + '</div></div>' +
      MODS.map(function (m) {
        var ds = drills.filter(function (d) { return d.m === m.id && (drillFilter === 'all' || d.kind === drillFilter); });
        if (!ds.length) return '';
        return '<section class="section">' + sectionHead('M' + m.n + ' ' + esc(m.name), plural(ds.length, 'drill')) + '<div class="lessons">' +
          ds.map(function (d) {
            var sc = drillScore(d);
            return '<a class="card lesson ' + m.id + '" href="#drill-' + d.id + '">' +
              '<span class="row-top"><span><b>' + esc(d.title) + '</b><small>' + d.kind + ' · ' + plural(d.parts.length, 'part') + '</small></span>' + pill(m.id, d.pts + ' pts') + '</span>' +
              '<span class="desc">Lesson: ' + esc(lessonById[d.l].title) + '</span>' + meter(sc == null ? 0 : pct(sc, d.pts)) +
              '<span class="row-foot"><span>' + (sc == null ? 'Not started' : 'Self-score ' + sc + ' / ' + d.pts) + '</span><span class="go">Open' + ic('arrowR') + '</span></span></a>';
          }).join('') + '</div></section>';
      }).join('');
  }
  function viewDrill(d) {
    var st = drillState(d.id), m = modById[d.m], sc = drillScore(d);
    var idx = drills.indexOf(d), next = drills[idx + 1];
    return '<div class="qhead"><a class="icon-btn" href="#drills" aria-label="Back to drills">' + ic('left') + '</a>' +
        '<div class="titles"><b>' + esc(d.title) + '</b><span>M' + m.n + ' ' + esc(m.name) + ' · ' + d.kind + ' · ' + d.pts + ' points</span></div></div>' +
      '<div class="tip-box"><b class="tag">How to use</b>Write your answer first, as you would in the exam. Then open the model answer and tick each point you really covered. Graders give partial credit per point.</div>' +
      '<article class="card prose" style="margin-top:12px">' + md(d.scenario) + '</article>' +
      d.parts.map(function (p, i) {
        var open = !!(st.open && st.open[i]), ticks = (st.ticks && st.ticks[i]) || [];
        var ps = open ? Math.round(p.pts * ticks.length / p.rubric.length * 10) / 10 : null;
        return '<section class="card part">' +
          '<div class="part-q">' + pill(d.m, 'Part ' + (i + 1)) + '<div>' + inline(p.q) + '</div><span class="muted num">' + p.pts + ' pts</span></div>' +
          '<textarea id="drill-' + d.id + '-' + i + '" data-drill="' + d.id + '" data-part="' + i + '" placeholder="Write your answer here. It is saved in this browser.">' + esc((st.a && st.a[i]) || '') + '</textarea>' +
          (open ? '<div class="model"><span class="model-label">Model answer</span><div class="prose flat">' + md(p.model) + '</div>' +
              '<span class="model-label">Tick what your answer covered</span><ul class="rubric">' + p.rubric.map(function (rb, ri) {
                return '<li><label><input type="checkbox" data-tick="' + d.id + '|' + i + '|' + ri + '"' + (ticks.indexOf(ri) >= 0 ? ' checked' : '') + '><span>' + inline(rb) + '</span></label></li>';
              }).join('') + '</ul><p class="part-score">Your score: <b id="ps-' + i + '">' + ps + '</b> / ' + p.pts + '</p></div>'
            : '<button class="btn" data-act="drillOpen" data-arg="' + d.id + '|' + i + '">' + ic('book') + 'Show model answer</button>') +
          '</section>';
      }).join('') +
      '<div class="card drill-total"><span>Drill total: <b id="drillTotal">' + (sc == null ? '–' : sc) + '</b> / ' + d.pts + '</span>' +
        '<div><button class="btn sm ghost" data-act="drillReset" data-arg="' + d.id + '">Clear my answers</button>' +
        (next ? '<a class="btn sm primary" href="#drill-' + next.id + '">Next drill' + ic('arrowR') + '</a>' : '<a class="btn sm" href="#drills">All drills</a>') + '</div></div>';
  }
  function bindDrill() {
    document.querySelectorAll('textarea[data-drill]').forEach(function (ta) {
      ta.addEventListener('input', function () { var st = drillState(ta.dataset.drill); st.a[ta.dataset.part] = ta.value; save(); });
    });
    document.querySelectorAll('input[data-tick]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var parts = cb.dataset.tick.split('|'), d = dById[parts[0]], pi = +parts[1], ri = +parts[2], st = drillState(d.id);
        var t = (st.ticks[pi] || []).filter(function (x) { return x !== ri; });
        if (cb.checked) t.push(ri);
        st.ticks[pi] = t; save();
        var p = d.parts[pi], el = document.getElementById('ps-' + pi);
        if (el) el.textContent = Math.round(p.pts * t.length / p.rubric.length * 10) / 10;
        var tot = document.getElementById('drillTotal'); if (tot) tot.textContent = drillScore(d);
      });
    });
  }

  /* ---------- FLASHCARDS ---------- */
  var DECK = null;
  function startDeck(title, cards) {
    if (!cards.length) { toast('No cards in this deck yet'); return; }
    DECK = { title: title, cards: shuffle(cards), i: 0, flip: false, again: 0, good: 0, requeued: {} };
    go('deck');
  }
  function viewDeck() {
    var D = DECK;
    if (!D) { location.replace('#learn'); return null; }
    var head = '<div class="qhead"><a class="icon-btn" href="#learn" aria-label="Back to lessons">' + ic('left') + '</a>' +
      '<div class="titles"><b>' + esc(D.title) + '</b><span>' + (D.i < D.cards.length ? 'Card ' + (D.i + 1) + ' of ' + D.cards.length : 'Finished') + '</span></div>' +
      '<div class="qright"><div class="score"><span class="ok">' + ic('check') + D.good + '</span><span class="bad">' + ic('redo') + D.again + '</span></div></div></div>' +
      '<div class="pbar"><i class="done" style="width:' + pct(D.i, D.cards.length) + '%"></i></div>';
    if (D.i >= D.cards.length) {
      return head + '<section class="card deck-done"><h1>Deck finished</h1><p class="muted">' + D.good + ' known · ' + D.again + ' to study again</p>' +
        '<div class="res-actions"><button class="btn primary" data-act="deckRestart">' + ic('redo') + 'Go again</button><a class="btn" href="#learn">Back to lessons</a></div></section>';
    }
    var t = D.cards[D.i];
    return head +
      '<button class="card flash' + (D.flip ? ' flipped' : '') + '" data-act="flip" aria-label="Flip card">' +
        '<span class="flash-src">' + pill(t.m) + esc(lessonById[t.l].title) + '</span>' +
        '<h2>' + inline(t.term) + '</h2>' +
        (D.flip ? '<span class="flash-back">' + inline(cap(t.def)) + '</span>' : '<span class="flash-hint">Say the meaning out loud, then tap to flip</span>') +
      '</button>' +
      (D.flip ? '<div class="flash-btns"><button class="btn again" data-act="cardAgain">' + ic('redo') + 'Again</button><button class="btn known" data-act="cardGood">' + ic('check') + 'Knew it</button></div>'
              : '<div class="flash-btns"><button class="btn primary" data-act="flip">Show meaning</button></div>') +
      '<p class="kbd-hint kbd-only"><kbd>Space</kbd> flip · <kbd>1</kbd> again · <kbd>2</kbd> knew it</p>';
  }
  function cardAnswer(good) {
    var D = DECK; if (!D || !D.flip) return;
    var t = D.cards[D.i];
    S.cards[t.key] = good ? 'good' : 'again'; save();
    if (good) D.good++; else { D.again++; if (!D.requeued[t.key]) { D.requeued[t.key] = 1; D.cards.push(t); } }
    D.i++; D.flip = false; render();
  }

  /* ---------- modals ---------- */
  function openModal(title, body) {
    overlay.innerHTML = '<div class="backdrop" data-act="closeModal"></div>' +
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle"><div class="modal-head"><h2 id="mTitle">' + title + '</h2>' +
      '<button class="icon-btn" data-act="closeModal" aria-label="Close">' + ic('x') + '</button></div>' + body + '</div>';
    overlay.classList.add('open'); document.body.classList.add('noscroll');
    var f = overlay.querySelector('.modal button'); if (f) f.focus();
  }
  function closeModal() {
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open'); overlay.innerHTML = ''; document.body.classList.remove('noscroll');
  }
  function openSettings() {
    openModal('Settings',
      '<div class="set-row stack"><div><b>Theme</b><span>Light is the default</span></div><div class="seg">' +
        [['light', 'Light'], ['dark', 'Dark'], ['system', 'Match device']].map(function (t) {
          return '<button class="' + (S.settings.theme === t[0] ? 'on' : '') + '" data-act="setTheme" data-arg="' + t[0] + '">' + t[1] + '</button>';
        }).join('') + '</div></div>' +
      '<div class="set-row"><div><b>Shuffle answer choices</b><span>Reorders A–D in new sets, so you remember the answer, not its letter</span></div>' +
        '<button class="toggle" role="switch" aria-label="Shuffle answer choices" aria-checked="' + !!S.settings.shuffle + '" data-act="toggleShuffle"></button></div>' +
      '<div class="set-row"><div><b>Reset progress</b><span>Clears answers, flags, lessons read, drills and flashcards in this browser</span></div>' +
        '<button class="btn sm danger" data-act="resetAsk">Reset</button></div>' +
      '<div class="confirm" id="resetConfirm" hidden><p>Delete all your progress in this browser? This cannot be undone.</p>' +
        '<div class="modal-actions" style="margin-top:0"><button class="btn sm" data-act="resetCancel">Keep it</button><button class="btn sm danger" data-act="resetDo">Delete everything</button></div></div>' +
      '<p class="muted" style="margin:14px 0 0;font-size:13px">Progress is saved only in this browser on this device.</p>');
  }
  function openGrid() {
    var s = SESSION; if (!s) return;
    var mock = s.mode === 'mock' && !s.submitted;
    openModal('Questions',
      '<div class="legend">' + (mock ? '<span><i class="done"></i>Answered</span>' : '<span><i class="ok"></i>Correct</span><span><i class="bad"></i>Wrong</span>') +
        '<span><i></i>Not answered</span><span><i class="flag"></i>Flagged</span></div>' +
      '<div class="cells">' + s.ids.map(function (id, i) {
        var rr = s.resp[id] || {}, cls = 'cell';
        if (!mock && rr.done) cls += rr.ok ? ' ok' : ' bad';
        else if (hasPick(qById[id], rr.pick)) cls += ' done';
        if (S.flags[id]) cls += ' flag';
        if (i === s.i) cls += ' cur';
        return '<button class="' + cls + '" data-act="goto" data-arg="' + i + '">' + (i + 1) + '</button>';
      }).join('') + '</div>');
  }
  function openSubmitConfirm() {
    var s = SESSION; if (!s) return;
    var un = s.ids.filter(function (id) { return !hasPick(qById[id], (s.resp[id] || {}).pick); }).length;
    openModal('Submit the mock exam?',
      '<p>' + (un ? plural(un, 'question') + ' still unanswered will count as wrong.' : 'All questions are answered.') + ' Time left: ' + fmtTime(s.start + s.limit - Date.now()) + '.</p>' +
      '<div class="modal-actions"><button class="btn" data-act="closeModal">Keep working</button><button class="btn primary" data-act="submitDo">Submit</button></div>');
  }

  /* ---------- actions ---------- */
  var A = {
    smart: function () { startSession('Smart practice', smartSet(20), 'practice', { sub: 'All modules' }); },
    mistakes: function () { startSession('Review mistakes', shuffle(mistakes()), 'practice', { sub: 'Mistakes' }); },
    flagged: function () { startSession('Flagged questions', flagged(), 'practice', { sub: 'Flagged' }); },
    mock: function () {
      var counts = [11, 10, 10, 9], ids = [];
      MODS.forEach(function (m, i) { ids = ids.concat(shuffle(modQs(m.id)).slice(0, counts[i]).map(function (q) { return q.id; })); });
      startSession('Mock exam', ids, 'mock', { limit: 60 * 60000 });
    },
    modPractice: function (mid) { var m = modById[mid]; startSession('M' + m.n + ' ' + m.name, shuffle(topN(modQs(mid), 20).map(function (q) { return q.id; })), 'practice', { sub: 'Module practice' }); },
    lessonPractice: function (lid) { var l = lessonById[lid]; startSession(l.title, l.qs.slice(), 'practice', { sub: 'Lesson practice' }); },
    pick: function (arg) { doPick(+arg); },
    check: doCheck,
    next: function () { move(1); },
    prev: function () { move(-1); },
    goto: function (i) { closeModal(); SESSION.i = +i; saveSession(); render(); window.scrollTo(0, 0); },
    grid: openGrid,
    flag: function () {
      var id = SESSION.ids[SESSION.i];
      if (S.flags[id]) delete S.flags[id]; else S.flags[id] = 1;
      save(); render(); toast(S.flags[id] ? 'Flagged' : 'Flag removed');
    },
    override: function () {
      var s = SESSION, qid = s.ids[s.i], r = s.resp[qid];
      r.ok = true; r.parts = qById[qid].blanks.map(function () { return true; });
      S.ans[qid] = Object.assign(S.ans[qid] || {}, { ok: true, ts: Date.now() }); save(); saveSession(); render();
    },
    finish: finishPractice,
    submitAsk: openSubmitConfirm,
    submitDo: function () { closeModal(); submitMock(); },
    reviewAll: function () { A.reviewAt(0); },
    reviewAt: function (i) {
      if (!LAST) return;
      SESSION = { title: LAST.title, mode: 'review', ids: LAST.ids, i: +i, resp: LAST.resp, perm: LAST.perm || {}, submitted: true };
      go('quiz');
    },
    retryWrong: function () {
      if (!LAST) return;
      var ids = LAST.ids.filter(function (id) { var r = LAST.resp[id]; return (LAST.mode === 'mock' || (r && r.done)) && !(r && r.ok); });
      startSession('Retry missed questions', ids, 'practice', { sub: 'Retry' });
    },
    drillFilter: function (k) { drillFilter = k; render(); },
    drillOpen: function (arg) {
      var p = arg.split('|'), st = drillState(p[0]);
      var ta = document.getElementById('drill-' + p[0] + '-' + p[1]);
      if (ta) st.a[p[1]] = ta.value;
      st.open[p[1]] = true; save();
      var y = window.scrollY; render(); window.scrollTo(0, y);
    },
    drillReset: function (id, btn) {
      if (!btn.dataset.armed) { btn.dataset.armed = '1'; btn.textContent = 'Click again to clear'; setTimeout(function () { delete btn.dataset.armed; btn.textContent = 'Clear my answers'; }, 3000); return; }
      delete S.drills[id]; save(); render(); toast('Drill cleared');
    },
    deckRandom: function () { startDeck('Random 30', shuffle(terms).slice(0, 30)); },
    deckMistakes: function () { startDeck('Terms from your mistakes', mistakeTerms()); },
    deckAgain: function () { startDeck('Still learning', terms.filter(function (t) { return S.cards[t.key] === 'again'; })); },
    deckMod: function (mid) { startDeck('M' + modById[mid].n + ' ' + modById[mid].name, modTerms(mid)); },
    lessonDeck: function (lid) { startDeck(lessonById[lid].title, lessonById[lid].terms.slice()); },
    deckRestart: function () { if (DECK) startDeck(DECK.title, DECK.cards.filter(function (t, i, a) { return a.indexOf(t) === i; })); },
    flip: function () { if (DECK) { DECK.flip = !DECK.flip; render(); } },
    cardAgain: function () { cardAnswer(false); },
    cardGood: function () { cardAnswer(true); },
    openSettings: openSettings,
    closeModal: closeModal,
    setTheme: function (t) { S.settings.theme = t; save(); applyTheme(); openSettings(); },
    toggleTheme: function () { S.settings.theme = isDark() ? 'light' : 'dark'; save(); applyTheme(); },
    toggleShuffle: function (_, btn) {
      S.settings.shuffle = !S.settings.shuffle; save();
      btn.setAttribute('aria-checked', String(S.settings.shuffle));
      toast(S.settings.shuffle ? 'Choices will be shuffled in new sets' : 'Choices stay in A–D order');
    },
    resetAsk: function () { var c = document.getElementById('resetConfirm'); if (c) c.hidden = false; },
    resetCancel: function () { var c = document.getElementById('resetConfirm'); if (c) c.hidden = true; },
    resetDo: function () {
      var theme = S.settings.theme;
      Object.keys(DEF).forEach(function (k) { S[k] = Array.isArray(DEF[k]) ? [] : {}; });
      S.settings = { theme: theme, shuffle: false };
      SESSION = null; LAST = null; store(SKEY, null); store(LKEY, null); store(KEY, S);
      closeModal(); render(); toast('Progress cleared');
    }
  };

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t || t.disabled) return;
    var fn = A[t.getAttribute('data-act')];
    if (!fn) return;
    e.preventDefault();
    fn(t.getAttribute('data-arg'), t, e);
  });
  document.addEventListener('change', function (e) {
    var cb = e.target.closest('input[data-plan]');
    if (!cb) return;
    if (cb.checked) S.plan[cb.dataset.plan] = Date.now(); else delete S.plan[cb.dataset.plan];
    save(); cb.closest('li').classList.toggle('done', cb.checked);
    var c = document.getElementById('planCount');
    if (c) c.textContent = TC.guide.plan.filter(function (p) { return S.plan[p.id]; }).length + ' of ' + TC.guide.plan.length + ' done';
  });
  document.addEventListener('keydown', function (e) {
    if (overlay.classList.contains('open')) { if (e.key === 'Escape') closeModal(); return; }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    var tag = (e.target.tagName || '').toLowerCase(), typing = tag === 'input' || tag === 'textarea' || tag === 'select';
    var r = route();
    if (r === 'quiz' && SESSION) {
      var q = qById[SESSION.ids[SESSION.i]], rr = SESSION.resp[q.id] || {};
      var revealed = SESSION.mode === 'review' || rr.done || SESSION.submitted;
      if (e.key === 'Enter') {
        if (typing && q.t === 'sa' && !revealed && SESSION.mode === 'practice') { e.preventDefault(); doCheck(); return; }
        if (typing || tag === 'button' || tag === 'a') return;
        e.preventDefault();
        if (!revealed && SESSION.mode === 'practice' && q.multi) { doCheck(); return; }
        if (SESSION.i < SESSION.ids.length - 1) move(1);
        else if (SESSION.mode === 'practice') finishPractice();
        return;
      }
      if (typing) return;
      if (e.key === 'ArrowRight') { move(1); return; }
      if (e.key === 'ArrowLeft') { move(-1); return; }
      if (e.key === 'f' || e.key === 'F') { A.flag(); return; }
      if (e.key === 'g' || e.key === 'G') { openGrid(); return; }
      if (q.t === 'mc' && !revealed) {
        var k = e.key.toLowerCase(), di = '1234'.indexOf(k); if (di < 0) di = 'abcd'.indexOf(k);
        if (di >= 0) { var perm = SESSION.perm[q.id] || [0, 1, 2, 3]; if (perm[di] != null) doPick(perm[di]); }
      }
      return;
    }
    if (r === 'deck' && DECK && !typing) {
      if (e.key === ' ' || (e.key === 'Enter' && tag !== 'button')) { e.preventDefault(); A.flip(); }
      else if (DECK.flip && e.key === '1') cardAnswer(false);
      else if (DECK.flip && e.key === '2') cardAnswer(true);
    }
  });
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (mq.addEventListener) mq.addEventListener('change', applyTheme);
  }

  document.getElementById('settingsBtn').innerHTML = ic('sliders');
  applyTheme();
  render();
})();
