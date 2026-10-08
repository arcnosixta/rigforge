/* RigForge — интерфейс, анимации, состояние сборки. */

const state = {
  build: { cpu: null, mb: null, cooler: null, ram: null, gpu: null, ssd: null, sata: null, case: null, psu: null },
  cat: 'cpu',
  laptop: 'legion5',
  up: { ram: null, ssd: null, sata: null, wifi: null, extra: null },
  prevRows: new Set()
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmt = n => n.toLocaleString('ru-RU') + ' ₽';

/* ---------- утилиты ---------- */
function partsFor(cat) {
  if (cat === 'sata') return CATALOG.ssd.filter(p => p.iface === 'sata');
  return CATALOG[cat] || [];
}
function getPart(cat, id) {
  if (!id) return null;
  return (cat === 'sata' ? CATALOG.ssd : CATALOG[cat]).find(p => p.id === id) || null;
}
function diffIssues(base, next) {
  const s = new Set(base.issues.map(i => i.level + '|' + i.msg));
  return next.issues.filter(i => !s.has(i.level + '|' + i.msg) && i.level !== 'ok');
}
function conflictsOf(cat) {
  const id = state.build[cat];
  if (!id) return [];
  return diffIssues(analyze({ ...state.build, [cat]: null }), analyze(state.build));
}

function specs(cat, p) {
  switch (cat) {
    case 'cpu': return [p.socket, `${p.cores}/${p.threads} потоков`, `до ${p.boost} ГГц`, `${p.tdp} Вт`, p.igpu ? 'есть iGPU' : 'без iGPU'];
    case 'mb': return [p.socket, p.chipset, p.form, p.ramType, `${p.ramSlots} слота RAM`, `${p.m2Slots}×M.2 Gen${p.m2Gen}`, p.wifi ? 'Wi-Fi' : null];
    case 'cooler': return [p.type === 'aio' ? `СИО ${p.radiator} мм` : `башенный ${p.height} мм`, `${p.tdp} Вт TDP`, ...p.sockets.slice(0, 3)];
    case 'ram': return [p.type, `${p.speed} МГц`, `CL${p.cl}`, `${p.sticks}×${p.total / p.sticks} ГБ`, `${p.total} ГБ`];
    case 'gpu': return [`${p.vram} ГБ`, `${p.tdp} Вт`, `${p.len} мм`, p.conn, p.tier];
    case 'ssd': return [p.form, p.iface === 'sata' ? `до ${p.read} МБ/с` : `PCIe ${p.iface === 'm2-pcie5' ? '5.0' : '4.0'}`, `до ${p.read} МБ/с`];
    case 'case': return [...p.forms, `GPU до ${p.maxGpu} мм`, `кулер до ${p.maxCooler} мм`, p.radiators.length ? `радиаторы ${p.radiators.join('/')}` : null];
    case 'psu': return [`${p.w} Вт`, p.cert, p.form, p.conn12 ? '12V-2x6' : `${p.conn8}×8-pin`, `EPS ${p.eps}`];
  }
  return [];
}

/* ---------- выбор категории ---------- */
function renderChips() {
  const wrap = $('#catChips');
  wrap.innerHTML = CATEGORIES.map(c => {
    const sel = state.build[c.key];
    const cf = conflictsOf(c.key);
    const hasErr = cf.some(i => i.level === 'error');
    const hasWarn = cf.some(i => i.level === 'warn');
    const cls = hasErr ? 'err' : hasWarn ? 'warn' : sel ? 'ok' : '';
    const mark = hasErr ? icon('err', 13) : hasWarn ? icon('warn', 13) : sel ? icon('check', 13) : '';
    return `<button class="cat-chip ${state.cat === c.key ? 'active' : ''} ${cls}" data-cat="${c.key}">
      <span class="cc-ic">${icon(c.icon, 16)}</span>${c.label}
      <span class="cc-mark">${mark}</span>
      ${sel ? '<span class="cc-dot"></span>' : ''}
    </button>`;
  }).join('');
}

function renderParts() {
  const cat = state.cat;
  const meta = CATEGORIES.find(c => c.key === cat);
  $('#catTitle').textContent = meta.label;
  $('#catHint').textContent = meta.hint;
  const list = partsFor(cat);
  const sel = state.build[cat];
  const grid = $('#partsGrid');

  grid.innerHTML = list.map((p, i) => {
    const cf = diffIssues(analyze(state.build), analyze({ ...state.build, [cat]: p.id }));
    const errs = cf.filter(x => x.level === 'error');
    const warns = cf.filter(x => x.level === 'warn');
    const badge = errs.length
      ? `<div class="badge b-err">${icon('err', 13)} ${errs[0].msg}</div>`
      : warns.length
        ? `<div class="badge b-warn">${icon('warn', 13)} ${warns[0].msg}</div>`
        : `<div class="badge b-ok">${icon('check', 13)} Подходит к этой сборке</div>`;
    const specHtml = specs(cat, p).filter(Boolean).map(s => `<span>${s}</span>`).join('');
    return `<article class="part ${sel === p.id ? 'sel' : ''} ${errs.length ? 'bad' : ''}" data-id="${p.id}" style="--d:${i * 45}ms" tabindex="0" role="button" aria-pressed="${sel === p.id}">
      <div class="part-art">${partArt(cat, p)}</div>
      <div class="part-body">
        <div class="part-brand">${p.brand}</div>
        <h4>${p.name}</h4>
        <div class="specs">${specHtml}</div>
        ${p.note ? `<p class="part-note">${p.note}</p>` : ''}
        ${badge}
        <div class="part-foot">
          <b>${p.price ? fmt(p.price) : 'в комплекте'}</b>
          <span class="pick">${sel === p.id ? 'Выбрано' : 'Выбрать'}</span>
        </div>
      </div>
    </article>`;
  }).join('');
}

/* ---------- выбор части ---------- */
function selectPart(cat, id, srcEl) {
  const same = state.build[cat] === id;
  state.build[cat] = same ? null : id;
  if (!same && srcEl) flyToSummary(srcEl, cat);
  render();
  if (!same) {
    const cf = conflictsOf(cat);
    if (cf.some(i => i.level === 'error')) {
      const chip = $(`.cat-chip[data-cat="${cat}"]`);
      if (chip) { chip.classList.remove('shake'); void chip.offsetWidth; chip.classList.add('shake'); }
    }
  }
}

function flyToSummary(el, cat) {
  const target = $(`#buildList [data-row="${cat}"]`) || $('#buildList') || $('#summary');
  const a = el.getBoundingClientRect(), b = target.getBoundingClientRect();
  const ghost = document.createElement('div');
  ghost.className = 'fly-ghost';
  ghost.style.cssText = `left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px`;
  const art = el.querySelector('.part-art');
  ghost.innerHTML = art ? art.innerHTML : '';
  document.body.appendChild(ghost);
  ghost.animate([
    { transform: 'translate(0,0) scale(1)', opacity: 1 },
    { transform: `translate(${b.left - a.left + b.width / 2 - a.width / 2}px, ${b.top - a.top + 8}px) scale(.28)`, opacity: 0 }
  ], { duration: 620, easing: 'cubic-bezier(.5,-0.2,.3,1)' }).onfinish = () => ghost.remove();
}

/* ---------- сводка ---------- */
function renderSummary(res) {
  const rows = CATEGORIES.map(c => {
    const p = getPart(c.key, state.build[c.key]);
    if (!p) return '';
    const cf = conflictsOf(c.key);
    const bad = cf.some(i => i.level === 'error');
    const warn = cf.some(i => i.level === 'warn');
    return `<li data-row="${c.key}" class="${bad ? 'bad' : warn ? 'warn' : ''} ${state.prevRows.has(c.key) ? '' : 'enter'}">
      <span class="row-ic">${icon(c.icon, 15)}</span>
      <span class="row-txt"><b>${p.name}</b><i>${c.label}</i></span>
      <span class="row-price">${p.price ? fmt(p.price) : '—'}</span>
      <button class="row-x" data-del="${c.key}" title="Убрать">×</button>
    </li>`;
  }).join('');
  state.prevRows = new Set(CATEGORIES.filter(c => state.build[c.key]).map(c => c.key));
  $('#buildList').innerHTML = rows || '<li class="empty">Пока пусто — начните с процессора</li>';

  const req = CATEGORIES.filter(c => c.req);
  const missing = req.filter(c => !state.build[c.key]);
  let pct, title, sub, kind;
  if (missing.length) {
    pct = Math.round(100 * (req.length - missing.length) / req.length);
    kind = 'fill';
    title = 'Сборка неполная';
    sub = 'Не хватает: ' + missing.map(m => m.label.toLowerCase()).join(', ');
  } else if (res.errors) {
    pct = Math.max(5, 100 - res.errors * 25 - res.warns * 6);
    kind = 'bad';
    title = 'Конфликт совместимости';
    sub = `${res.errors} критичных · ${res.warns} замечаний`;
  } else if (res.warns) {
    pct = Math.max(50, 100 - res.warns * 7);
    kind = 'warn';
    title = 'Совместимо, но есть замечания';
    sub = `${res.warns} предупреждени(й) к проверке`;
  } else {
    pct = 100; kind = 'good';
    title = 'Полностью совместимо';
    sub = 'Эта сборка соберётся без сюрпризов';
  }
  const ring = $('#ringFg');
  ring.style.strokeDasharray = `${pct * 0.942} 100`;
  $('#verdictPct').textContent = pct + '%';
  const box = $('#verdict');
  box.className = 'verdict ' + kind;
  $('#verdictTitle').textContent = title;
  $('#verdictSub').textContent = sub;

  countTo($('#mPrice'), res.price, v => fmt(v));
  $('#mTdp').textContent = res.tdp ? res.tdp + ' Вт' : '— Вт';
  $('#mPsu').textContent = res.recW ? res.recW + ' Вт' : '— Вт';

  $('#issues').innerHTML = res.issues.filter(i => i.level !== 'ok').length
    ? res.issues.filter(i => i.level !== 'ok').map((i, n) => issueHtml(i, n)).join('')
    : (res.issues.some(i => i.level === 'ok')
      ? res.issues.map((i, n) => issueHtml(i, n)).join('')
      : `<li class="issue i-idle">${icon('warn', 16)}<div><p>Выберите комплектующие — проверки запустятся автоматически.</p></div></li>`);

  // подсветка слотов на превью корпуса
  const on = {
    cpu: state.build.cpu, mb: state.build.mb, ram: state.build.ram, cooler: state.build.cooler,
    gpu: state.build.gpu, ssd: state.build.ssd, sata: state.build.sata, psu: state.build.psu, case: state.build.case
  };
  $$('#rigPreview .cs-slot').forEach(g => g.classList.toggle('on', !!on[g.dataset.slot]));
}

function issueHtml(i, n) {
  const map = { error: ['i-err', 'err'], warn: ['i-warn', 'warn'], ok: ['i-ok', 'check'] };
  const [cls, ic] = map[i.level];
  const label = { cpu: 'Процессор', mb: 'Плата', cooler: 'Охлаждение', ram: 'Память', gpu: 'Видеокарта', ssd: 'Накопитель', case: 'Корпус', psu: 'Питание', wifi: 'Wi-Fi', sata: 'SATA', extra: 'Оснастка' }[i.cat] || '';
  return `<li class="issue ${cls}" style="--d:${n * 40}ms">
    <span class="is-ic">${icon(ic, 15)}</span>
    <div>${label ? `<b>${label}</b>` : ''}<p>${i.msg}</p></div>
  </li>`;
}

function countTo(el, target, fmtFn) {
  const from = parseInt(el.dataset.v || '0', 10);
  if (from === target) { el.textContent = fmtFn(target); return; }
  el.dataset.v = target;
  const dur = 520, t0 = performance.now();
  const step = t => {
    const k = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmtFn(Math.round(from + (target - from) * e));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- пресеты ---------- */
const PRESETS = {
  office: { cpu: 'r5-7600', mb: 'gig-b650m-ds3h', cooler: 'wraith-stealth', ram: 'venge-d5-5600', gpu: null, ssd: 'nv2-500', sata: null, case: 'matrexx-40', psu: 'pf450' },
  game1080: { cpu: 'r5-9600x', mb: 'asus-b650-plus', cooler: 'pa120', ram: 'fury-d5-6000', gpu: 'rtx4060-ventus', ssd: 'sn770-1t', sata: null, case: 'ch510', psu: 'cx650' },
  game1440: { cpu: 'r7-7800x3d', mb: 'msi-b650-tomahawk', cooler: 'ak620', ram: 'fury-d5-6000', gpu: 'rtx4070s-wf', ssd: 'kc3000-1t', sata: null, case: 'fractal-north', psu: 'rm750e' },
  heavy: { cpu: 'r9-9950x', mb: 'msi-x870e-carbon', cooler: 'lf3-360', ram: 'lancer-d5-6400', gpu: 'rtx5080-tuf', ssd: 't700-1t', sata: null, case: 'o11-evo', psu: 'focus-gx-1000' }
};

/* ---------- ноутбуки ---------- */
function renderLaptops() {
  $('#ltModels').innerHTML = LAPTOPS.map(l => `
    <button class="lt-model ${state.laptop === l.id ? 'sel' : ''}" data-lt="${l.id}">
      <b>${l.brand}</b><span>${l.name}</span><i>${l.cpu}</i>
    </button>`).join('');
}

function upgradeSelects() {
  const L = LAPTOPS.find(l => l.id === state.laptop);
  if (!L) { $('#upRows').innerHTML = '<p class="muted">Сначала выберите модель ноутбука слева.</p>'; return; }
  const defs = [
    ['ram', 'Оперативная память', LAPTOP_PARTS.ram, 'Модули SO-DIMM'],
    ['ssd', 'SSD накопитель', LAPTOP_PARTS.ssd, 'Слот M.2'],
    ['sata', 'Второй диск (SATA)', LAPTOP_PARTS.sata, 'Отсек 2.5"'],
    ['wifi', 'Модуль Wi-Fi', LAPTOP_PARTS.wifi, 'Слот M.2 2230'],
    ['extra', 'Оснастка', LAPTOP_PARTS.extra, 'Всегда подходит']
  ];
  $('#upRows').innerHTML = defs.map(([key, label, list, hint]) => {
    const opts = list.map(p => `<option value="${p.id}" ${state.up[key] === p.id ? 'selected' : ''}>${p.name} — ${fmt(p.price)}</option>`).join('');
    return `<div class="up-row">
      <label>${label}<i>${hint}</i></label>
      <select data-up="${key}"><option value="">— не менять —</option>${opts}</select>
    </div>`;
  }).join('');
}

function renderLaptopResult() {
  const L = LAPTOPS.find(l => l.id === state.laptop);
  const note = $('#ltNote');
  if (!L) {
    note.textContent = '';
    $('#ltVerdict').className = 'lt-verdict';
    $('#ltVerdict').textContent = 'Выберите модель ноутбука';
    $('#ltIssues').innerHTML = '';
    countTo($('#ltPrice'), 0, fmt);
    $$('#ltVisual .lt-zone').forEach(z => z.setAttribute('class', 'lt-zone'));
    return;
  }
  note.innerHTML = `<b>${L.brand} ${L.name}</b> — ${L.note || 'базовые параметры апгрейда'} Память сейчас: ${L.ramCurrent} ГБ ${L.ramType}${L.ramSoldered ? ` (${L.ramSoldered} ГБ припаяно)` : ''}, свободных SO-DIMM: ${L.sodimmSlots}, M.2: ${L.m2Slots} (занято ${L.m2Used}), SATA-отсеков: ${L.sataBay}.`;

  const res = analyzeLaptop(L.id, state.up);
  $('#ltVerdict').className = 'lt-verdict ' + (res.errors ? 'bad' : res.warns ? 'warn' : 'good');
  $('#ltVerdict').textContent = res.errors ? 'Несовместимо' : res.warns ? 'Работает, но с оговорками' : (Object.values(state.up).some(Boolean) ? 'Апгрейд совместим' : 'Модель выбрана — добавьте комплектующие');
  $('#ltIssues').innerHTML = res.issues.length
    ? res.issues.map((i, n) => issueHtml(i, n)).join('')
    : '<li class="issue i-idle">' + icon('warn', 16) + '<div><p>Выберите, что хотите установить.</p></div></li>';
  countTo($('#ltPrice'), res.price, fmt);

  const zoneState = (avail, selId) => !avail ? 'off' : selId ? 'on' : 'avail';
  const errOf = k => res.issues.some(i => i.level === 'error' && (i.cat === k || (k === 'ssd' && i.cat === 'ssd')));
  $$('#ltVisual .lt-zone').forEach(z => {
    const k = z.dataset.zone;
    let avail = true;
    if (k === 'ram') avail = L.sodimmSlots > 0;
    if (k === 'ssd') avail = L.m2Slots > 0 && L.m2Used < L.m2Slots;
    if (k === 'sata') avail = L.sataBay > 0;
    if (k === 'wifi') avail = L.wifi;
    let cls = zoneState(avail, state.up[k]);
    if (state.up[k] && errOf(k)) cls = 'off';
    z.setAttribute('class', 'lt-zone ' + cls);
  });
}

/* ---------- каталог ---------- */
let catalogFilter = 'all';
function renderCatalog() {
  const filters = [{ k: 'all', label: 'Все' }, ...CATEGORIES.map(c => ({ k: c.key, label: c.label }))];
  $('#catFilters').innerHTML = filters.map(f => `<button class="chipbtn ${catalogFilter === f.k ? 'on' : ''}" data-f="${f.k}">${f.label}</button>`).join('');
  const items = [];
  for (const cat in CATALOG) {
    if (catalogFilter !== 'all' && catalogFilter !== cat) continue;
    CATALOG[cat].forEach(p => items.push([cat, p]));
  }
  $('#catalogGrid').innerHTML = items.map(([cat, p], i) => `
    <article class="cat-card" style="--d:${Math.min(i, 24) * 30}ms">
      <div class="cc-art">${partArt(cat, p)}</div>
      <div class="cc-brand">${p.brand}</div>
      <h5>${p.name}</h5>
      <div class="specs">${specs(cat, p).filter(Boolean).map(s => `<span>${s}</span>`).join('')}</div>
      <b class="cc-price">${p.price ? fmt(p.price) : 'в комплекте'}</b>
    </article>`).join('');
}

/* ---------- правила (секция how) ---------- */
const HOW = [
  ['cpu', 'Сокет и поколение', 'AM5 ≠ LGA1700 ≠ LGA1851. Совпадение сокета — необходимое условие: процессор физически не встанет в чужую плату. Проверяем и чипсет (B650, B760, Z890): он определяет разгон, число линий и поддержку BIOS.'],
  ['ram', 'DDR4 против DDR5', 'Ключ слота разный, планка просто не войдёт. Сверяем также частоту с заявленным максимумом платы, число планок со слотами и общий объём с лимитом чипсета.'],
  ['case', 'Габариты', 'Плата должна совпадать с форм-фактором корпуса (ATX/mATX/ITX), длина видеокарты — с максимумом по длине, а башенный кулер — с высотой до крышки. Для СИО ищем посадочное место под радиатор.'],
  ['psu', 'Питание и ватты', 'Считаем пиковое потребление (PL2/PPT процессора + TDP видеокарты + 40 Вт платы и дисков) с запасом 40%. Проверяем разъёмы: 8-pin, 12V-2x6, число EPS и форм-фактор ATX/SFX.'],
  ['cooler', 'Запас по TDP', 'Кулер должен держать кратковременную мощность процессора. 65-ваттный боксовый кулер на 253-ваттном Core i9 — это троттлинг. Сверяем и сокет крепления, и реальный рейтинг охлаждения.'],
  ['ssd', 'Накопители', 'M.2 NVMe требует слота на плате: PCIe 5.0-диск в PCIe 4.0-слоте заработает, но на своей скорости. SATA-диску нужны свободный порт, кабель и отсек в корпусе.']
];
function renderHow() {
  $('#howGrid').innerHTML = HOW.map(([ic, t, d], i) => `
    <article class="how-card reveal" style="--d:${i * 70}ms">
      <span class="how-ic">${icon(ic, 22)}</span>
      <h4>${t}</h4><p>${d}</p>
    </article>`).join('');
  observeReveals($('#howGrid'));
}

/* ---------- общий рендер ---------- */
function render() {
  const res = analyze(state.build);
  renderChips();
  renderParts();
  renderSummary(res);
}

/* ---------- анимации / поведение ---------- */
let io;
function observeReveals(root = document) {
  $$('.reveal', root).forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
}

function initReveal() {
  io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting || e.boundingClientRect.top < 0) {
      e.target.classList.add('in'); io.unobserve(e.target);
    }
  }), { threshold: .08, rootMargin: '0px 0px -15px 0px' });
  observeReveals();

  /* страховка: IO может не отдать запись при очень быстром скролле */
  let queued = false;
  const sweep = () => {
    queued = false;
    $$('.reveal:not(.in)').forEach(el => {
      if (el.getBoundingClientRect().top < innerHeight - 15) {
        el.classList.add('in'); io.unobserve(el);
      }
    });
  };
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(sweep); } };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  schedule();
}

function initCounters() {
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, to = +el.dataset.count, t0 = performance.now();
    const step = t => {
      const k = Math.min(1, (t - t0) / 1100);
      el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    co.unobserve(el);
  }), { threshold: .5 });
  $$('[data-count]').forEach(el => co.observe(el));
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove('show'), 2600);
}

function encodeBuild() {
  const o = {};
  for (const k in state.build) if (state.build[k]) o[k] = state.build[k];
  if (state.laptop) o._lt = state.laptop;
  return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/=+$/, '');
}
function decodeBuild(s) {
  try {
    const o = JSON.parse(decodeURIComponent(escape(atob(s))));
    for (const k in state.build) state.build[k] = o[k] || null;
    if (o._lt) state.laptop = o._lt;
    return true;
  } catch (e) { return false; }
}

/* ---------- инициализация ---------- */
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash.startsWith('#b=')) decodeBuild(location.hash.slice(3));

  initReveal();
  initCounters();
  renderHow();
  renderCatalog();
  renderLaptops();
  upgradeSelects();
  renderLaptopResult();
  render();

  /* категории */
  $('#catChips').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]');
    if (!b) return;
    state.cat = b.dataset.cat;
    renderChips(); renderParts();
    $('#partsGrid').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  /* карточки деталей */
  $('#partsGrid').addEventListener('click', e => {
    const card = e.target.closest('.part');
    if (!card) return;
    selectPart(state.cat, card.dataset.id, card);
  });
  $('#partsGrid').addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.part');
    if (!card) return;
    e.preventDefault();
    selectPart(state.cat, card.dataset.id, card);
  });

  /* удаление из сводки */
  $('#buildList').addEventListener('click', e => {
    const b = e.target.closest('[data-del]');
    if (!b) return;
    state.build[b.dataset.del] = null;
    render();
  });

  /* пресеты */
  $$('[data-preset]').forEach(btn => btn.addEventListener('click', () => {
    state.build = { ...PRESETS[btn.dataset.preset] };
    state.prevRows = new Set();
    render();
    $$('[data-preset]').forEach(x => x.classList.remove('on'));
    btn.classList.add('on');
    toast('Загружена сборка «' + btn.textContent.trim() + '»');
    $('#summary').classList.remove('flash'); void $('#summary').offsetWidth; $('#summary').classList.add('flash');
  }));

  $('#resetBtn').addEventListener('click', () => {
    state.build = { cpu: null, mb: null, cooler: null, ram: null, gpu: null, ssd: null, sata: null, case: null, psu: null };
    state.prevRows = new Set();
    render();
    toast('Сборка очищена');
  });

  $('#shareBtn').addEventListener('click', async () => {
    const url = location.origin + location.pathname + '#b=' + encodeBuild();
    try { await navigator.clipboard.writeText(url); toast('Ссылка на сборку скопирована'); }
    catch (e) { location.hash = 'b=' + encodeBuild(); toast('Ссылка сохранена в адресной строке'); }
  });

  /* ноутбук */
  $('#ltModels').addEventListener('click', e => {
    const b = e.target.closest('[data-lt]');
    if (!b) return;
    state.laptop = b.dataset.lt;
    state.up = { ram: null, ssd: null, sata: null, wifi: null, extra: null };
    renderLaptops(); upgradeSelects(); renderLaptopResult();
    $('#ltVisual').classList.remove('pop'); void $('#ltVisual').offsetWidth; $('#ltVisual').classList.add('pop');
  });
  $('#upRows').addEventListener('change', e => {
    const s = e.target.closest('[data-up]');
    if (!s) return;
    state.up[s.dataset.up] = s.value || null;
    renderLaptopResult();
  });

  /* каталог */
  $('#catFilters').addEventListener('click', e => {
    const b = e.target.closest('[data-f]');
    if (!b) return;
    catalogFilter = b.dataset.f;
    renderCatalog();
  });

  /* навигация */
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('sticky', scrollY > 30), { passive: true });
  $('#burger').addEventListener('click', () => $('#navLinks').classList.toggle('open'));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => $('#navLinks').classList.remove('open')));

  /* параллакс героя */
  const rig = $('.hero-art .rig');
  if (rig && matchMedia('(pointer:fine)').matches) {
    addEventListener('mousemove', e => {
      const x = (e.clientX / innerWidth - .5), y = (e.clientY / innerHeight - .5);
      rig.style.transform = `translate3d(${x * 18}px, ${y * 14}px, 0) rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
    }, { passive: true });
  }
});
