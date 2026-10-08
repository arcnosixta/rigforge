/* RigForge — база комплектующих. Цены ориентировочные (₽), TDP/габариты — по спецификациям производителей. */

const CATALOG = {
  cpu: [
    { id: 'r5-7600', brand: 'AMD', name: 'Ryzen 5 7600', gen: 'Zen 4', socket: 'AM5', cores: 6, threads: 12, boost: 5.1, tdp: 65, ppt: 88, igpu: true, price: 16990, bundled: 'wraith', note: 'Поставляется с кулером Wraith Stealth' },
    { id: 'r5-7600x', brand: 'AMD', name: 'Ryzen 5 7600X', gen: 'Zen 4', socket: 'AM5', cores: 6, threads: 12, boost: 5.3, tdp: 105, ppt: 142, igpu: true, price: 19490 },
    { id: 'r7-7700x', brand: 'AMD', name: 'Ryzen 7 7700X', gen: 'Zen 4', socket: 'AM5', cores: 8, threads: 16, boost: 5.4, tdp: 105, ppt: 142, igpu: true, price: 26990 },
    { id: 'r7-7800x3d', brand: 'AMD', name: 'Ryzen 7 7800X3D', gen: 'Zen 4 · 3D V-Cache', socket: 'AM5', cores: 8, threads: 16, boost: 5.0, tdp: 120, ppt: 162, igpu: true, price: 37990, note: 'Игровой топ, требует хорошего охлаждения' },
    { id: 'r9-7950x', brand: 'AMD', name: 'Ryzen 9 7950X', gen: 'Zen 4', socket: 'AM5', cores: 16, threads: 32, boost: 5.7, tdp: 170, ppt: 230, igpu: true, price: 47990, note: '16 ядер — нужен кулер от 250 Вт' },
    { id: 'r5-9600x', brand: 'AMD', name: 'Ryzen 5 9600X', gen: 'Zen 5', socket: 'AM5', cores: 6, threads: 12, boost: 5.4, tdp: 65, ppt: 88, igpu: true, price: 21990 },
    { id: 'r7-9800x3d', brand: 'AMD', name: 'Ryzen 7 9800X3D', gen: 'Zen 5 · 3D V-Cache', socket: 'AM5', cores: 8, threads: 16, boost: 5.2, tdp: 120, ppt: 162, igpu: true, price: 54990, note: 'Лучший игровой процессор 2025' },
    { id: 'r9-9950x', brand: 'AMD', name: 'Ryzen 9 9950X', gen: 'Zen 5', socket: 'AM5', cores: 16, threads: 32, boost: 5.7, tdp: 170, ppt: 230, igpu: true, price: 64990 },
    { id: 'r5-8600g', brand: 'AMD', name: 'Ryzen 5 8600G', gen: 'Zen 4 · Radeon 760M', socket: 'AM5', cores: 6, threads: 12, boost: 5.0, tdp: 65, ppt: 88, igpu: true, price: 19990, bundled: 'wraith', note: 'Мощная встроенная графика — можно без видеокарты' },
    { id: 'r7-8700g', brand: 'AMD', name: 'Ryzen 7 8700G', gen: 'Zen 4 · Radeon 780M', socket: 'AM5', cores: 8, threads: 16, boost: 5.1, tdp: 65, ppt: 88, igpu: true, price: 27990, bundled: 'wraith', note: 'Radeon 780M тянет игры в 1080p на низких' },

    { id: 'i5-12400f', brand: 'Intel', name: 'Core i5-12400F', gen: 'Alder Lake', socket: 'LGA1700', cores: 6, threads: 12, boost: 4.4, tdp: 65, ppt: 117, igpu: false, price: 10990, bundled: 'laminar', note: 'Бюджетный хит, буква F — без встроенной графики' },
    { id: 'i5-13400f', brand: 'Intel', name: 'Core i5-13400F', gen: 'Raptor Lake', socket: 'LGA1700', cores: 10, threads: 16, boost: 4.6, tdp: 65, ppt: 148, igpu: false, price: 13990, bundled: 'laminar' },
    { id: 'i5-14400f', brand: 'Intel', name: 'Core i5-14400F', gen: 'Raptor Lake Refresh', socket: 'LGA1700', cores: 10, threads: 16, boost: 4.7, tdp: 65, ppt: 148, igpu: false, price: 15490, bundled: 'laminar' },
    { id: 'i5-14600k', brand: 'Intel', name: 'Core i5-14600K', gen: 'Raptor Lake Refresh', socket: 'LGA1700', cores: 14, threads: 20, boost: 5.3, tdp: 125, ppt: 181, igpu: true, price: 23990 },
    { id: 'i7-14700k', brand: 'Intel', name: 'Core i7-14700K', gen: 'Raptor Lake Refresh', socket: 'LGA1700', cores: 20, threads: 28, boost: 5.6, tdp: 125, ppt: 253, igpu: true, price: 32990, note: '20 ядер — PL2 253 Вт, нужно крепкое охлаждение' },
    { id: 'i9-14900k', brand: 'Intel', name: 'Core i9-14900K', gen: 'Raptor Lake Refresh', socket: 'LGA1700', cores: 24, threads: 32, boost: 6.0, tdp: 125, ppt: 253, igpu: true, price: 47990 },
    { id: 'u5-245k', brand: 'Intel', name: 'Core Ultra 5 245K', gen: 'Arrow Lake', socket: 'LGA1851', cores: 14, threads: 14, boost: 5.2, tdp: 125, ppt: 159, igpu: true, price: 26990 },
    { id: 'u7-265k', brand: 'Intel', name: 'Core Ultra 7 265K', gen: 'Arrow Lake', socket: 'LGA1851', cores: 20, threads: 20, boost: 5.5, tdp: 125, ppt: 250, igpu: true, price: 36990 },
    { id: 'u9-285k', brand: 'Intel', name: 'Core Ultra 9 285K', gen: 'Arrow Lake', socket: 'LGA1851', cores: 24, threads: 24, boost: 5.7, tdp: 125, ppt: 250, igpu: true, price: 54990 }
  ],

  mb: [
    { id: 'asus-b650-plus', brand: 'ASUS', name: 'TUF Gaming B650-PLUS WIFI', chipset: 'B650', socket: 'AM5', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 128, ramSpeedMax: 6400, m2Slots: 2, m2Gen: 4, sata: 4, pcieGen: 5, eps: 1, price: 21990, wifi: true },
    { id: 'msi-b650-tomahawk', brand: 'MSI', name: 'MAG B650 Tomahawk WIFI', chipset: 'B650', socket: 'AM5', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 128, ramSpeedMax: 6400, m2Slots: 3, m2Gen: 4, sata: 6, pcieGen: 4, eps: 2, price: 24990, wifi: true },
    { id: 'gig-b650m-ds3h', brand: 'Gigabyte', name: 'B650M DS3H', chipset: 'B650', socket: 'AM5', form: 'mATX', ramType: 'DDR5', ramSlots: 4, ramMax: 128, ramSpeedMax: 6400, m2Slots: 2, m2Gen: 4, sata: 4, pcieGen: 4, eps: 1, price: 15490, wifi: false },
    { id: 'asrock-b650m-hdv', brand: 'ASRock', name: 'B650M-HDV/M.2', chipset: 'B650', socket: 'AM5', form: 'mATX', ramType: 'DDR5', ramSlots: 2, ramMax: 96, ramSpeedMax: 6400, m2Slots: 2, m2Gen: 4, sata: 4, pcieGen: 4, eps: 1, price: 13490, wifi: false, note: 'Всего 2 слота памяти' },
    { id: 'asus-x670e-e', brand: 'ASUS', name: 'ROG Strix X670E-E Gaming', chipset: 'X670E', socket: 'AM5', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 192, ramSpeedMax: 8000, m2Slots: 4, m2Gen: 5, sata: 6, pcieGen: 5, eps: 2, price: 44990, wifi: true },
    { id: 'gig-b850-aorus', brand: 'Gigabyte', name: 'B850 AORUS Elite WIFI7', chipset: 'B850', socket: 'AM5', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 256, ramSpeedMax: 8200, m2Slots: 3, m2Gen: 5, sata: 4, pcieGen: 5, eps: 2, price: 27990, wifi: true },
    { id: 'msi-x870e-carbon', brand: 'MSI', name: 'MPG X870E Carbon WIFI', chipset: 'X870E', socket: 'AM5', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 256, ramSpeedMax: 8400, m2Slots: 4, m2Gen: 5, sata: 8, pcieGen: 5, eps: 2, price: 54990, wifi: true },

    { id: 'msi-b760m-ddr4', brand: 'MSI', name: 'PRO B760M-A WIFI DDR4', chipset: 'B760', socket: 'LGA1700', form: 'mATX', ramType: 'DDR4', ramSlots: 4, ramMax: 128, ramSpeedMax: 4800, m2Slots: 2, m2Gen: 4, sata: 4, pcieGen: 4, eps: 1, price: 13990, wifi: true, note: 'DDR4-версия: DDR5 сюда не встанет' },
    { id: 'asus-b760-plus', brand: 'ASUS', name: 'TUF Gaming B760-PLUS WIFI', chipset: 'B760', socket: 'LGA1700', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 192, ramSpeedMax: 7200, m2Slots: 3, m2Gen: 4, sata: 4, pcieGen: 4, eps: 1, price: 19990, wifi: true },
    { id: 'gig-z790-aorus', brand: 'Gigabyte', name: 'Z790 AORUS Elite AX', chipset: 'Z790', socket: 'LGA1700', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 192, ramSpeedMax: 7600, m2Slots: 4, m2Gen: 4, sata: 6, pcieGen: 5, eps: 2, price: 31990, wifi: true },
    { id: 'asrock-b760m-pg', brand: 'ASRock', name: 'B760M PG Lightning', chipset: 'B760', socket: 'LGA1700', form: 'mATX', ramType: 'DDR4', ramSlots: 4, ramMax: 128, ramSpeedMax: 4800, m2Slots: 2, m2Gen: 4, sata: 4, pcieGen: 4, eps: 1, price: 11990, wifi: false },

    { id: 'msi-z890-tomahawk', brand: 'MSI', name: 'MAG Z890 Tomahawk WIFI', chipset: 'Z890', socket: 'LGA1851', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 256, ramSpeedMax: 9066, m2Slots: 4, m2Gen: 5, sata: 4, pcieGen: 5, eps: 2, price: 34990, wifi: true },
    { id: 'asus-z890-a', brand: 'ASUS', name: 'ROG Strix Z890-A Gaming WIFI', chipset: 'Z890', socket: 'LGA1851', form: 'ATX', ramType: 'DDR5', ramSlots: 4, ramMax: 256, ramSpeedMax: 9066, m2Slots: 4, m2Gen: 5, sata: 4, pcieGen: 5, eps: 2, price: 41990, wifi: true },
    { id: 'gig-b860m-aorus', brand: 'Gigabyte', name: 'B860M AORUS Elite WIFI7', chipset: 'B860', socket: 'LGA1851', form: 'mATX', ramType: 'DDR5', ramSlots: 4, ramMax: 256, ramSpeedMax: 8400, m2Slots: 3, m2Gen: 5, sata: 4, pcieGen: 5, eps: 2, price: 21990, wifi: true }
  ],

  cooler: [
    { id: 'wraith-stealth', brand: 'AMD', name: 'Wraith Stealth (в комплекте)', type: 'air', sockets: ['AM5', 'AM4'], tdp: 65, height: 55, price: 0, note: 'Идёт в комплекте с Ryzen 5 7600/9600X и 8600G' },
    { id: 'laminar-rm1', brand: 'Intel', name: 'Laminar RM1 (в комплекте)', type: 'air', sockets: ['LGA1700'], tdp: 65, height: 60, price: 0, note: 'Боксовый кулер Intel' },
    { id: 'ak400', brand: 'DeepCool', name: 'AK400 Digital', type: 'air', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 220, height: 155, price: 2490 },
    { id: 'pa120', brand: 'Thermalright', name: 'Peerless Assassin 120 SE', type: 'air', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 245, height: 155, price: 2790, note: 'Лучший башенный кулер по цене' },
    { id: 'ak620', brand: 'DeepCool', name: 'AK620 Digital', type: 'air', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 260, height: 160, price: 4990 },
    { id: 'nh-d15', brand: 'Noctua', name: 'NH-D15 G2', type: 'air', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 280, height: 168, price: 12990, note: 'Огромный: проверьте высоту в корпусе' },
    { id: 'pure-rock-2', brand: 'be quiet!', name: 'Pure Rock 2', type: 'air', sockets: ['AM5', 'AM4', 'LGA1700'], tdp: 150, height: 155, price: 3290, note: 'Не поддерживает LGA1851 без отдельного крепления' },
    { id: 'nh-l9x65', brand: 'Noctua', name: 'NH-L9x65 chromax', type: 'air', sockets: ['AM5', 'LGA1700', 'LGA1851'], tdp: 95, height: 65, price: 5990, note: 'Низкопрофильный — для мини-корпусов' },
    { id: 'lf3-240', brand: 'Arctic', name: 'Liquid Freezer III 240', type: 'aio', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 300, height: 52, radiator: 240, price: 8990, note: 'СИО: нужен корпус с поддержкой радиатора 240 мм' },
    { id: 'lf3-360', brand: 'Arctic', name: 'Liquid Freezer III 360', type: 'aio', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 350, height: 52, radiator: 360, price: 12990, note: '360 мм — проверьте поддержку в корпусе' },
    { id: 'kraken-240', brand: 'NZXT', name: 'Kraken 240 RGB', type: 'aio', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 280, height: 52, radiator: 240, price: 11990 },
    { id: 'h150i', brand: 'Corsair', name: 'iCUE Nautilus 360 RS', type: 'aio', sockets: ['AM5', 'AM4', 'LGA1700', 'LGA1851'], tdp: 330, height: 52, radiator: 360, price: 13990 }
  ],

  ram: [
    { id: 'fury-d5-6000', brand: 'Kingston', name: 'Fury Beast DDR5 6000 CL30 2×16 ГБ', type: 'DDR5', speed: 6000, cl: 30, sticks: 2, total: 32, price: 10990, note: 'EXPO-профиль, оптимум для Ryzen 7000/9000' },
    { id: 'trident-d5-6000', brand: 'G.Skill', name: 'Trident Z5 Neo DDR5 6000 CL30 2×16 ГБ', type: 'DDR5', speed: 6000, cl: 30, sticks: 2, total: 32, price: 13490 },
    { id: 'venge-d5-5600', brand: 'Corsair', name: 'Vengeance DDR5 5600 CL36 2×16 ГБ', type: 'DDR5', speed: 5600, cl: 36, sticks: 2, total: 32, price: 9490 },
    { id: 'lancer-d5-6400', brand: 'XPG', name: 'Lancer Blade DDR5 6400 CL32 2×16 ГБ', type: 'DDR5', speed: 6400, cl: 32, sticks: 2, total: 32, price: 12490 },
    { id: 'crucial-d5-5600-1', brand: 'Crucial', name: 'DDR5 5600 CL46 1×16 ГБ', type: 'DDR5', speed: 5600, cl: 46, sticks: 1, total: 16, price: 5490, note: 'Одна планка — двухканальный режим не работает' },
    { id: 'fury-d4-3200', brand: 'Kingston', name: 'Fury Beast DDR4 3200 CL16 2×16 ГБ', type: 'DDR4', speed: 3200, cl: 16, sticks: 2, total: 32, price: 7490, note: 'Только для плат с DDR4-слотами' },
    { id: 'veng-d4-3600', brand: 'Corsair', name: 'Vengeance LPX DDR4 3600 CL18 2×16 ГБ', type: 'DDR4', speed: 3600, cl: 18, sticks: 2, total: 32, price: 8490 },
    { id: 'fury-d4-3200-1', brand: 'Kingston', name: 'Fury Beast DDR4 3200 1×8 ГБ', type: 'DDR4', speed: 3200, cl: 16, sticks: 1, total: 8, price: 2990, note: '8 ГБ — мало для современных игр' }
  ],

  gpu: [
    { id: 'rtx4060-ventus', brand: 'MSI', name: 'GeForce RTX 4060 Ventus 2X', vram: 8, tdp: 115, len: 245, conn: '1×8-pin', conn8: 1, conn12: 0, pcie: 'x8 Gen4', price: 29990, tier: '1080p' },
    { id: 'rtx4060ti-dual', brand: 'ASUS', name: 'Dual GeForce RTX 4060 Ti OC', vram: 8, tdp: 165, len: 267, conn: '1×8-pin', conn8: 1, conn12: 0, pcie: 'x8 Gen4', price: 37990, tier: '1080p' },
    { id: 'rtx4070s-wf', brand: 'Gigabyte', name: 'RTX 4070 SUPER Windforce OC', vram: 12, tdp: 220, len: 300, conn: '1×12VHPWR (адаптер 2×8-pin)', conn8: 2, conn12: 1, pcie: 'x16 Gen4', price: 61990, tier: '1440p' },
    { id: 'rtx4070tis-tuf', brand: 'ASUS', name: 'TUF RTX 4070 Ti SUPER OC', vram: 16, tdp: 285, len: 305, conn: '3×8-pin', conn8: 3, conn12: 0, pcie: 'x16 Gen4', price: 84990, tier: '1440p / 4K' },
    { id: 'rtx4080s-suprim', brand: 'MSI', name: 'RTX 4080 SUPER SUPRIM X', vram: 16, tdp: 320, len: 336, conn: '1×12V-2x6 (4×8-pin адаптер)', conn8: 4, conn12: 1, pcie: 'x16 Gen4', price: 124990, tier: '4K' },
    { id: 'rtx5070-dual', brand: 'Palit', name: 'GeForce RTX 5070 Dual', vram: 12, tdp: 250, len: 250, conn: '1×12V-2x6', conn8: 2, conn12: 1, pcie: 'x16 Gen5', price: 64990, tier: '1440p' },
    { id: 'rtx5070ti-ventus', brand: 'MSI', name: 'RTX 5070 Ti Ventus 3X', vram: 16, tdp: 300, len: 304, conn: '1×12V-2x6', conn8: 3, conn12: 1, pcie: 'x16 Gen5', price: 94990, tier: '1440p / 4K' },
    { id: 'rtx5080-tuf', brand: 'ASUS', name: 'TUF Gaming RTX 5080 OC', vram: 16, tdp: 360, len: 329, conn: '1×12V-2x6 (600 Вт)', conn8: 4, conn12: 1, pcie: 'x16 Gen5', price: 139990, tier: '4K' },
    { id: 'rx7600-pulse', brand: 'Sapphire', name: 'Radeon RX 7600 Pulse', vram: 8, tdp: 165, len: 240, conn: '1×8-pin', conn8: 1, conn12: 0, pcie: 'x8 Gen4', price: 25990, tier: '1080p' },
    { id: 'rx7800xt-nitro', brand: 'Sapphire', name: 'Radeon RX 7800 XT Nitro+', vram: 16, tdp: 263, len: 320, conn: '2×8-pin', conn8: 2, conn12: 0, pcie: 'x16 Gen4', price: 54990, tier: '1440p' },
    { id: 'rx7900xtx-reddevil', brand: 'PowerColor', name: 'Radeon RX 7900 XTX Red Devil', vram: 24, tdp: 355, len: 340, conn: '3×8-pin', conn8: 3, conn12: 0, pcie: 'x16 Gen4', price: 94990, tier: '4K' },
    { id: 'rx9070xt-nitro', brand: 'Sapphire', name: 'Radeon RX 9070 XT Nitro+', vram: 16, tdp: 304, len: 320, conn: '3×8-pin', conn8: 3, conn12: 0, pcie: 'x16 Gen5', price: 89990, tier: '1440p / 4K' }
  ],

  ssd: [
    { id: 'sn770-1t', brand: 'WD', name: 'BLACK SN770 1 ТБ', iface: 'm2-pcie4', size: '2280', form: 'M.2 2280', read: 5150, price: 7490 },
    { id: '990evo-1t', brand: 'Samsung', name: '990 EVO Plus 1 ТБ', iface: 'm2-pcie5', size: '2280', form: 'M.2 2280', read: 7250, price: 8990, note: 'PCIe 5.0 x2 — работает и в 4.0-слотах' },
    { id: 'kc3000-1t', brand: 'Kingston', name: 'KC3000 1 ТБ', iface: 'm2-pcie4', size: '2280', form: 'M.2 2280', read: 7000, price: 8290 },
    { id: 't700-1t', brand: 'Crucial', name: 'T700 1 ТБ (PCIe 5.0)', iface: 'm2-pcie5', size: '2280', form: 'M.2 2280', read: 12400, price: 13990, note: 'Требует активного радиатора на плате' },
    { id: 'nv2-500', brand: 'Kingston', name: 'NV2 500 ГБ', iface: 'm2-pcie4', size: '2280', form: 'M.2 2280', read: 3500, price: 4290 },
    { id: '870evo-1t', brand: 'Samsung', name: '870 EVO 1 ТБ (SATA)', iface: 'sata', size: '2.5', form: '2.5" SATA', read: 560, price: 8490, note: 'Нужен SATA-порт на плате и кабель' },
    { id: 'barracuda-2t', brand: 'Seagate', name: 'BarraCuda 2 ТБ (HDD)', iface: 'sata', size: '3.5', form: '3.5" SATA HDD', read: 190, price: 5490, note: 'Механический диск: медленный, но дешёвый' },
    { id: 'sn850x-2t', brand: 'WD', name: 'BLACK SN850X 2 ТБ', iface: 'm2-pcie4', size: '2280', form: 'M.2 2280', read: 7300, price: 14990 }
  ],

  case: [
    { id: 'fractal-north', brand: 'Fractal Design', name: 'North', forms: ['ATX', 'mATX', 'ITX'], maxGpu: 355, maxCooler: 170, radiators: [240, 360, 120], bays35: 2, bays25: 2, psu: ['ATX'], price: 13990, fans: 2 },
    { id: 'lancool-216', brand: 'Lian Li', name: 'Lancool 216', forms: ['ATX', 'mATX', 'ITX'], maxGpu: 392, maxCooler: 180, radiators: [240, 280, 360, 120], bays35: 2, bays25: 2, psu: ['ATX'], price: 11990, fans: 2 },
    { id: 'ch510', brand: 'DeepCool', name: 'CH510 Mesh Digital', forms: ['ATX', 'mATX', 'ITX'], maxGpu: 380, maxCooler: 175, radiators: [240, 360, 120], bays35: 2, bays25: 2, psu: ['ATX'], price: 5990, fans: 1 },
    { id: 'h5-flow', brand: 'NZXT', name: 'H5 Flow', forms: ['ATX', 'mATX', 'ITX'], maxGpu: 365, maxCooler: 165, radiators: [240, 280, 120], bays35: 2, bays: 4, bays25: 4, psu: ['ATX'], price: 8990, fans: 2 },
    { id: 'o11-evo', brand: 'Lian Li', name: 'O11 Dynamic EVO', forms: ['ATX', 'mATX', 'ITX', 'E-ATX'], maxGpu: 420, maxCooler: 167, radiators: [240, 280, 360, 120], bays35: 2, bays25: 6, psu: ['ATX'], price: 15990, fans: 0 },
    { id: 'q300l-v2', brand: 'Cooler Master', name: 'MasterBox Q300L V2', forms: ['mATX', 'ITX'], maxGpu: 340, maxCooler: 157, radiators: [240, 120], bays35: 1, bays25: 2, psu: ['ATX'], price: 5490, fans: 1, note: 'Только mATX/ITX — ATX-плата не поместится' },
    { id: 'matrexx-40', brand: 'DeepCool', name: 'Matrexx 40 3FS', forms: ['mATX', 'ITX'], maxGpu: 320, maxCooler: 160, radiators: [240, 120], bays35: 2, bays25: 2, psu: ['ATX'], price: 3990, fans: 3, note: 'Короткий отсек GPU — карта длиннее 320 мм не встанет' },
    { id: 'fractal-terra', brand: 'Fractal Design', name: 'Terra (ITX)', forms: ['ITX'], maxGpu: 322, maxCooler: 77, radiators: [120], bays35: 0, bays25: 1, psu: ['SFX'], price: 17990, fans: 1, note: 'Мини-ITX: только SFX-БП и низкий кулер' },
    { id: 'nr200p', brand: 'Cooler Master', name: 'NR200P MAX', forms: ['ITX'], maxGpu: 330, maxCooler: 155, radiators: [240, 280], bays35: 1, bays25: 2, psu: ['SFX'], price: 12990, fans: 2, note: 'ITX-корпус: нужен SFX-блок питания' }
  ],

  psu: [
    { id: 'pf450', brand: 'DeepCool', name: 'PF450 450 Вт', w: 450, cert: '80+ Standard', form: 'ATX', eps: 1, conn8: 2, conn12: 0, sata: 4, price: 2790, note: 'Для офисных сборок и систем без мощной видеокарты' },
    { id: 'syspower-550', brand: 'be quiet!', name: 'System Power 10 550 Вт', w: 550, cert: '80+ Bronze', form: 'ATX', eps: 1, conn8: 2, conn12: 0, sata: 5, price: 4490 },
    { id: 'cx650', brand: 'Corsair', name: 'CX650 (2023)', w: 650, cert: '80+ Bronze', form: 'ATX', eps: 1, conn8: 2, conn12: 0, sata: 4, price: 5490 },
    { id: 'mag-a650bn', brand: 'MSI', name: 'MAG A650BN', w: 650, cert: '80+ Bronze', form: 'ATX', eps: 1, conn8: 2, conn12: 0, sata: 6, price: 4990 },
    { id: 'px650g', brand: 'DeepCool', name: 'PX650G (ATX 3.0)', w: 650, cert: '80+ Gold', form: 'ATX', eps: 2, conn8: 2, conn12: 1, sata: 6, price: 6990 },
    { id: 'rm750e', brand: 'Corsair', name: 'RM750e (ATX 3.1)', w: 750, cert: '80+ Gold', form: 'ATX', eps: 2, conn8: 2, conn12: 1, sata: 8, price: 9490, note: '12V-2x6 кабель 600 Вт в комплекте' },
    { id: 'pure12m-850', brand: 'be quiet!', name: 'Pure Power 12 M 850 Вт', w: 850, cert: '80+ Gold', form: 'ATX', eps: 2, conn8: 4, conn12: 1, sata: 9, price: 10990 },
    { id: 'focus-gx-1000', brand: 'Seasonic', name: 'Focus GX-1000 (ATX 3.0)', w: 1000, cert: '80+ Gold', form: 'ATX', eps: 2, conn8: 4, conn12: 1, sata: 12, price: 13990 },
    { id: 'sf750', brand: 'Corsair', name: 'SF750 (SFX)', w: 750, cert: '80+ Platinum', form: 'SFX', eps: 2, conn8: 2, conn12: 1, sata: 8, price: 14990, note: 'SFX — для мини-корпусов' }
  ]
};

const CATEGORIES = [
  { key: 'cpu', label: 'Процессор', icon: 'cpu', req: true, hint: 'Сокет определяет выбор материнской платы и кулера' },
  { key: 'mb', label: 'Материнская плата', icon: 'mb', req: true, hint: 'Форм-фактор, чипсет, тип памяти и слоты M.2' },
  { key: 'cooler', label: 'Охлаждение', icon: 'cooler', req: true, hint: 'Сокет, высота радиатора и запас по TDP' },
  { key: 'ram', label: 'Оперативная память', icon: 'ram', req: true, hint: 'DDR4/DDR5 должны совпадать с платой' },
  { key: 'gpu', label: 'Видеокарта', icon: 'gpu', req: false, hint: 'Длина карты и разъёмы питания БП' },
  { key: 'ssd', label: 'Накопитель', icon: 'ssd', req: true, hint: 'M.2 NVMe или SATA — зависит от платы' },
  { key: 'sata', label: 'Доп. диск', icon: 'hdd', req: false, hint: 'Второй диск: SATA SSD или жёсткий диск' },
  { key: 'case', label: 'Корпус', icon: 'case', req: true, hint: 'Вмещает плату, карту и кулер по габаритам' },
  { key: 'psu', label: 'Блок питания', icon: 'psu', req: true, hint: 'Мощность и коннекторы под вашу конфигурацию' }
];
