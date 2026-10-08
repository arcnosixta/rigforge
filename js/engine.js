/* RigForge — движок совместимости и расчётов сборки. */

const BY = {};
for (const cat in CATALOG) {
  BY[cat] = {};
  CATALOG[cat].forEach(p => (BY[cat][p.id] = p));
}

const lvl = { error: 0, warn: 1, ok: 2 };

function analyze(b) {
  const issues = [];
  const add = (level, cat, msg) => issues.push({ level, cat, msg });
  const cpu = b.cpu && BY.cpu[b.cpu];
  const mb = b.mb && BY.mb[b.mb];
  const cooler = b.cooler && BY.cooler[b.cooler];
  const ram = b.ram && BY.ram[b.ram];
  const gpu = b.gpu && BY.gpu[b.gpu];
  const ssd = b.ssd && BY.ssd[b.ssd];
  const extra = b.sata && BY.ssd[b.sata];
  const pcCase = b.case && BY.case[b.case];
  const psu = b.psu && BY.psu[b.psu];

  /* --- сокет и плата --- */
  if (cpu && mb) {
    if (cpu.socket !== mb.socket) {
      add('error', 'mb', `Сокет ${cpu.socket} у процессора, а плата имеет ${mb.socket}. Физически процессор не установится.`);
    } else if (cpu.brand === 'Intel' && mb.chipset && /^(B|H)\d/.test(mb.chipset) && /K$/.test(cpu.name.split(' ').pop())) {
      add('warn', 'cpu', `Чипсет ${mb.chipset} не разгоняет K-процессор — разблокированный множитель бесполезен, нужен Z-чипсет.`);
    }
    if (cpu.socket === 'LGA1700' && mb.socket === 'LGA1700' && mb.chipset === 'Z790' && cpu.gen.startsWith('Alder')) {
      add('warn', 'cpu', 'Плата Z790 обычно требует обновления BIOS для процессоров 12-го поколения — проверьте ревизию.');
    }
  }

  /* --- память --- */
  if (ram && mb) {
    if (ram.type !== mb.ramType) {
      add('error', 'ram', `Память ${ram.type}, а слоты на плате — ${mb.ramType}. Планка не войдёт в замок.`);
    }
    if (ram.sticks > mb.ramSlots) {
      add('error', 'ram', `В комплекте ${ram.sticks} планки, а на плате только ${mb.ramSlots} слота(ов).`);
    }
    if (ram.speed > mb.ramSpeedMax) {
      add('warn', 'ram', `Память на ${ram.speed} МГц, плата заявляет до ${mb.ramSpeedMax} МГц. Профиль XMP/EXPO урежут до поддерживаемого.`);
    }
    if (ram.total > mb.ramMax) {
      add('error', 'ram', `${ram.total} ГБ больше заявленного максимума платы (${mb.ramMax} ГБ).`);
    }
    if (ram.sticks === 1) {
      add('warn', 'ram', 'Одна планка памяти: работает в одноканальном режиме, теряется 10–15% производительности в играх.');
    }
    if (ram.total < 16) {
      add('warn', 'ram', 'Менее 16 ГБ — сегодня это мало для игр и многозадачности.');
    }
  }
  if (ram && cpu && ram.sticks === 1 && ram.total >= 32) {
    add('warn', 'ram', 'Одна 32-гигабайтная планка — лучше две по 16 ГБ для двухканального режима.');
  }

  /* --- кулер --- */
  if (cooler && cpu) {
    if (!cooler.sockets.includes(cpu.socket)) {
      add('error', 'cooler', `Кулер рассчитан на ${cooler.sockets.join(', ')}, а у процессора ${cpu.socket}. Нужно другое крепление.`);
    }
    const need = cpu.ppt || cpu.tdp;
    const bundledOk = cooler.price === 0 &&
      ((cooler.id === 'wraith-stealth' && cpu.bundled === 'wraith') ||
       (cooler.id === 'laminar-rm1' && cpu.bundled === 'laminar'));
    if (cooler.tdp < need && !bundledOk) {
      add(cooler.tdp < need * 0.75 ? 'error' : 'warn', 'cooler',
        `Кулер на ${cooler.tdp} Вт, а процессор кратковременно потребляет до ${need} Вт — троттлинг и шум.`);
    }
    if (cooler.price === 0) {
      const isBundled = (cooler.id === 'wraith-stealth' && cpu.bundled === 'wraith') ||
                        (cooler.id === 'laminar-rm1' && cpu.bundled === 'laminar');
      if (isBundled) {
        add('ok', 'cooler', 'Кулер в комплекте с этим процессором — покупать отдельный не нужно.');
      } else {
        add('warn', 'cooler', 'Боксовый кулер поставляется только с определёнными моделями: для этой пары нужен отдельный кулер.');
      }
    } else if (cpu.bundled) {
      add('ok', 'cooler', 'В коробке с процессором уже есть кулер — его можно оставить как запасной.');
    }
  }
  if (cooler && pcCase) {
    if (cooler.type === 'aio') {
      if (!pcCase.radiators.includes(cooler.radiator)) {
        add('error', 'cooler', `В корпусе нет посадочных мест под радиатор ${cooler.radiator} мм (есть: ${pcCase.radiators.map(r => r + ' мм').join(', ') || 'нет'}).`);
      }
    } else if (cooler.height > pcCase.maxCooler) {
      add('error', 'cooler', `Высота кулера ${cooler.height} мм, максимум в корпусе — ${pcCase.maxCooler} мм. Радиатор не закроется крышкой.`);
    }
  }

  /* --- корпус и плата --- */
  if (mb && pcCase) {
    if (!pcCase.forms.includes(mb.form)) {
      add('error', 'case', `Плата форм-фактора ${mb.form}, а корпус принимает: ${pcCase.forms.join(', ')}. Крепёжные отверстия не совпадут.`);
    }
    if (pcCase.fans === 0) {
      add('warn', 'case', 'В корпусе нет ни одного вентилятора — придётся докупать отдельно.');
    }
  }

  /* --- видеокарта --- */
  if (gpu && pcCase) {
    if (gpu.len > pcCase.maxGpu) {
      add('error', 'case', `Видеокарта ${gpu.len} мм, а в корпусе максимум ${pcCase.maxGpu} мм — карта упрётся в переднюю панель.`);
    }
  }
  if (!gpu && cpu && !cpu.igpu) {
    add('error', 'gpu', 'У процессора нет встроенного видеоядра (буква F / нет iGPU), а видеокарта не выбрана — изображения не будет.');
  }
  if (!gpu && cpu && cpu.igpu) {
    add('warn', 'gpu', 'Видеокарты нет: работа на встроенной графике. Для игр и 3D нужна дискретная видеокарта.');
  }

  /* --- блок питания --- */
  const recW = recommendWattage(cpu, gpu);
  if (psu) {
    if (recW) {
      if (psu.w < recW) {
        add(psu.w < recW * 0.85 ? 'error' : 'warn', 'psu',
          `Рекомендуемый блок от ${recW} Вт, выбран ${psu.w} Вт. Возможны аварийные отключения под нагрузкой.`);
      } else if (psu.w > recW * 2.5) {
        add('warn', 'psu', `${psu.w} Вт — с большим запасом. Дешевле и эффективнее был бы блок на ${recW}–${recW + 150} Вт.`);
      }
    }
    if (mb && psu.eps < mb.eps) {
      add('error', 'psu', `Плата требует ${mb.eps} разъёма(а) EPS/ATX12V для процессора, у блока только ${psu.eps}.`);
    }
    if (gpu) {
      const enough8 = psu.conn8 >= gpu.conn8;
      if (gpu.conn12 && !psu.conn12) {
        if (enough8) {
          add('warn', 'psu', 'У блока нет разъёма 12V-2x6 — понадобится переходник из комплекта видеокарты (следите за надёжной посадкой).');
        } else {
          add('error', 'psu', `Видеокарте нужно ${gpu.conn8}×8-pin, у блока только ${psu.conn8}. Дешёвый блок нечем запитать карту.`);
        }
      } else if (!gpu.conn12 && !enough8) {
        add('error', 'psu', `Видеокарте нужно ${gpu.conn8}×8-pin, у блока только ${psu.conn8}.`);
      } else if (gpu.conn12 && psu.conn12) {
        add('ok', 'psu', 'Нативный разъём 12V-2x6: кабель идёт в комплекте блока, переходники не нужны.');
      }
    }
    if (pcCase && !pcCase.psu.includes(psu.form)) {
      add('error', 'psu', `Корпус ${pcCase.name} принимает блоки форм-фактора ${pcCase.psu.join('/')}, выбран ${psu.form}.`);
    }
  }

  /* --- накопители --- */
  if (ssd && mb) {
    if (ssd.iface.startsWith('m2')) {
      if (mb.m2Slots < 1) {
        add('error', 'ssd', 'На плате нет слотов M.2 для NVMe-диска.');
      } else {
        if (ssd.iface === 'm2-pcie5' && mb.m2Gen < 5) {
          add('warn', 'ssd', `Диск PCIe 5.0 заработает в слоте PCIe ${mb.m2Gen}.0 — потерять скорости можно, но несовместимости нет.`);
        }
      }
    } else if (ssd.iface === 'sata') {
      if (mb.sata < 1) add('error', 'ssd', 'На плате нет SATA-портов.');
      else {
        add('warn', 'ssd', 'SATA-диск: понадобится кабель SATA и питание от блока (есть у всех выбранных блоков).');
        if (ssd.size === '3.5' && pcCase && pcCase.bays35 < 1) add('error', 'ssd', 'В корпусе нет отсеков под 3.5" HDD.');
        if (ssd.size === '2.5' && pcCase && pcCase.bays25 < 1) add('error', 'ssd', 'В корпусе нет отсеков под 2.5" диски.');
      }
    }
  }
  if (ssd && pcCase && extra) {
    if (pcCase.bays35 < 1 && extra.size === '3.5') add('error', 'ssd', 'В корпусе нет отсеков под 3.5" HDD.');
  }
  if (ssd && extra && ssd.iface.startsWith('m2') && extra.iface.startsWith('m2')) {
    if (mb && mb.m2Slots < 2) add('error', 'ssd', `Второй M.2-диск не встанет: на плате всего ${mb.m2Slots} слот(а) M.2.`);
    else add('warn', 'ssd', 'Второй диск займёт свободный M.2-слот — при наличии радиатора проверьте его высоту.');
  }
  if (extra && mb && extra.iface === 'sata' && mb.sata < 2) add('warn', 'ssd', 'SATA-портов мало — проверьте, не занят ли он выбранной SATA-SSD.');

  /* --- производительность --- */
  if (ram && gpu) {
    if (gpu.vram >= 16 && ram.total < 16) add('warn', 'ram', 'Мощная видеокарта с 16+ ГБ памяти при 16 ГБ ОЗУ будет ждать память.');
  }

  const price = total(b);
  const tdp = tdpSum(cpu, gpu, cooler, ram, ssd, psu);
  const errors = issues.filter(i => i.level === 'error').length;
  const warns = issues.filter(i => i.level === 'warn').length;

  return {
    issues: issues.sort((a, b2) => lvl[a.level] - lvl[b2.level]),
    errors, warns, price, tdp, recW,
    verdict: errors ? 'bad' : warns ? 'warn' : 'good',
    ready: errors === 0
  };
}

function recommendWattage(cpu, gpu) {
  if (!cpu && !gpu) return 0;
  const c = cpu ? (cpu.ppt || cpu.tdp) : 0;
  const g = gpu ? gpu.tdp + 25 : 0;
  if (!cpu && !gpu) return 0;
  return Math.ceil(((c + g + 50) * 1.4) / 50) * 50;
}

function tdpSum(cpu, gpu, cooler, ram, ssd, psu) {
  let s = 40;
  if (cpu) s += cpu.ppt || cpu.tdp;
  if (gpu) s += gpu.tdp;
  if (ram) s += ram.sticks * 4;
  if (ssd) s += 8;
  return s;
}

function total(b) {
  let sum = 0;
  for (const k in b) {
    if (!b[k]) continue;
    const cat = k === 'sata' ? 'ssd' : k;
    const p = BY[cat] && BY[cat][b[k]];
    if (p) sum += p.price || 0;
  }
  return sum;
}

/* ---------- ноутбуки ---------- */

function analyzeLaptop(laptopId, sel) {
  const L = LAPTOPS.find(l => l.id === laptopId);
  const issues = [];
  const add = (level, cat, msg) => issues.push({ level, cat, msg });
  if (!L) return { issues: [], price: 0, errors: 0, warns: 0, verdict: 'good', ready: false };

  const freeSodimm = Math.max(0, L.sodimmSlots - (L.ramSoldered > 0 && L.sodimmSlots > 0 ? 0 : 0));
  const parts = LAPTOP_PARTS;

  /* RAM */
  if (sel.ram) {
    const r = parts.ram.find(p => p.id === sel.ram);
    if (r) {
      if (L.sodimmSlots === 0) {
        add('error', 'ram', L.ssdSoldered && L.ramSoldered
          ? 'Память припаяна к плате: модули SO-DIMM сюда не установить.'
          : 'В этом ноутбуке нет слотов SO-DIMM — оперативная память не апгрейдится.');
      } else if (r.type !== L.ramType) {
        add('error', 'ram', `Нужен модуль ${L.ramType} SO-DIMM, выбран ${r.type} — замок отличается по ключу.`);
      } else if (L.ramCurrent + r.size > L.ramMax) {
        add('error', 'ram', `Итого станет ${L.ramCurrent + r.size} ГБ, а производитель разрешает максимум ${L.ramMax} ГБ.`);
      } else if (r.size > L.ramPerSlotMax) {
        add('error', 'ram', `Одна планка максимум ${L.ramPerSlotMax} ГБ в этой модели, выбран модуль на ${r.size} ГБ.`);
      } else if (L.ramCurrent + r.size > L.sodimmSlots * L.ramPerSlotMax) {
        add('warn', 'ram', 'Проверьте: модуль должен стоять в свободном слоте, а не поверх заводского.');
      }
      if (L.ramSoldered > 0 && r.type === L.ramType && L.ramCurrent + r.size <= L.ramMax) {
        add('warn', 'ram', `${L.ramSoldered} ГБ припаяно к плате — модуль добавится к ним, а не заменит их.`);
      }
    }
  }

  /* M.2 SSD */
  if (sel.ssd) {
    const s = parts.ssd.find(p => p.id === sel.ssd);
    if (s) {
      if (L.m2Slots === 0) {
        add('error', 'ssd', 'Диск в этой модели припаян к плате — слота M.2 нет.');
      } else if (L.m2Used >= L.m2Slots) {
        add('error', 'ssd', `Все ${L.m2Slots} слот(а) M.2 уже заняты — сначала извлеките старый диск.`);
      } else if (!L.m2Sizes.includes(s.size)) {
        add('error', 'ssd', `Слот поддерживает размер ${L.m2Sizes.join('/')}, а диск ${s.size} — не совпадает длина винта.`);
      } else if (s.gen > L.m2Gen) {
        add('warn', 'ssd', `Диск PCIe ${s.gen}.0 заработает на скорости PCIe ${L.m2Gen}.0 — несовместимости нет, но скорость урежут.`);
      }
    }
  }

  /* SATA */
  if (sel.sata) {
    const s = parts.sata.find(p => p.id === sel.sata);
    if (s) {
      if (L.sataBay < 1) {
        add('error', 'sata', 'В этой модели нет отсека под 2.5" диск — место занято батареей или просто отсутствует.');
      }
      if (L.m2Used >= L.m2Slots && L.sataBay < 1) {
        add('error', 'sata', 'Ни M.2, ни SATA-отсека нет: апгрейд диска в этой модели невозможен.');
      }
    }
  }

  /* Wi-Fi */
  if (sel.wifi) {
    if (!L.wifi) {
      add('error', 'wifi', 'Модуль Wi-Fi в этой модели припаян или недоступен для замены (например, Apple).');
    } else {
      add('ok', 'wifi', 'Слот M.2 2230 (A+E key) доступен — модуль заменяется за пару минут.');
    }
  }

  /* extra */
  if (sel.extra) add('ok', 'extra', 'Расходники всегда совместимы — нужен только шестигранный ключ.');

  if (L.sodimmSlots === 0 && L.ssdSoldered && L.sataBay === 0) {
    add('warn', 'ram', 'Апгрейд модулями в этой модели невозможен: остаётся только внешний SSD через USB.');
  }

  const price = Object.values(sel).reduce((s, id) => {
    for (const k in parts) {
      const p = parts[k].find(x => x.id === id);
      if (p) return s + p.price;
    }
    return s;
  }, 0);

  const errors = issues.filter(i => i.level === 'error').length;
  const warns = issues.filter(i => i.level === 'warn').length;
  return {
    issues: issues.sort((a, b2) => lvl[a.level] - lvl[b2.level]),
    errors, warns, price,
    verdict: errors ? 'bad' : warns ? 'warn' : 'good',
    ready: errors === 0
  };
}
