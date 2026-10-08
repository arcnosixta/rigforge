/* RigForge — база ноутбуков и апгрейд-компонентов (SO-DIMM, M.2, SATA, Wi-Fi). */

const LAPTOPS = [
  {
    id: 'legion5', brand: 'Lenovo', name: 'Legion 5 15IRX8H', cpu: 'Core i7-13700H',
    ramType: 'DDR5', sodimmSlots: 2, ramSoldered: 0, ramMax: 64, ramCurrent: 16, ramPerSlotMax: 32,
    m2Slots: 2, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false,
    note: 'Игровой ноутбук: 2 слота SO-DIMM и 2 слота M.2 2280.'
  },
  {
    id: 'tuf-f15', brand: 'ASUS', name: 'TUF Gaming F15 FX507VU', cpu: 'Core i7-13620H',
    ramType: 'DDR5', sodimmSlots: 2, ramSoldered: 0, ramMax: 32, ramCurrent: 16, ramPerSlotMax: 16,
    m2Slots: 2, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false,
    note: 'Официальный максимум памяти — 32 ГБ (2×16).'
  },
  {
    id: 'nitro-v', brand: 'Acer', name: 'Nitro V 15 ANV15-51', cpu: 'Core i5-13420H',
    ramType: 'DDR5', sodimmSlots: 2, ramSoldered: 0, ramMax: 32, ramCurrent: 8, ramPerSlotMax: 16,
    m2Slots: 2, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false,
    note: 'Бюджетник с двумя M.2 — частый выбор для апгрейда.'
  },
  {
    id: 'victus15', brand: 'HP', name: 'Victus 15-fa0000', cpu: 'Core i5-12450H',
    ramType: 'DDR4', sodimmSlots: 2, ramSoldered: 0, ramMax: 32, ramCurrent: 8, ramPerSlotMax: 16,
    m2Slots: 1, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 1, wifi: true, ssdSoldered: false,
    note: 'Есть отсек под 2.5" HDD/SSD — редкий плюс для тонкого ноутбука.'
  },
  {
    id: 'katana15', brand: 'MSI', name: 'Katana 15 B13VFK', cpu: 'Core i7-13620H',
    ramType: 'DDR5', sodimmSlots: 2, ramSoldered: 0, ramMax: 64, ramCurrent: 16, ramPerSlotMax: 32,
    m2Slots: 2, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false
  },
  {
    id: 'g15-5520', brand: 'Dell', name: 'G15 5520', cpu: 'Core i7-12700H',
    ramType: 'DDR5', sodimmSlots: 2, ramSoldered: 0, ramMax: 32, ramCurrent: 16, ramPerSlotMax: 16,
    m2Slots: 2, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 1, wifi: true, ssdSoldered: false
  },
  {
    id: 'ideapad3', brand: 'Lenovo', name: 'IdeaPad 3 15ITL6', cpu: 'Core i5-1135G7',
    ramType: 'DDR4', sodimmSlots: 1, ramSoldered: 1, ramMax: 24, ramCurrent: 8, ramPerSlotMax: 16,
    m2Slots: 1, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false,
    note: '4 ГБ припаяно + 1 слот SO-DIMM. Итого не более 24 ГБ.'
  },
  {
    id: 'aspire7', brand: 'Acer', name: 'Aspire 7 A715-51G', cpu: 'Core i5-1235U',
    ramType: 'DDR4', sodimmSlots: 2, ramSoldered: 0, ramMax: 32, ramCurrent: 8, ramPerSlotMax: 16,
    m2Slots: 1, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 1, wifi: true, ssdSoldered: false
  },
  {
    id: 'thinkpad-t14', brand: 'Lenovo', name: 'ThinkPad T14 Gen 3', cpu: 'Core i5-1235U',
    ramType: 'DDR5', sodimmSlots: 1, ramSoldered: 1, ramMax: 48, ramCurrent: 16, ramPerSlotMax: 32,
    m2Slots: 1, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false,
    note: '16 ГБ на материнке + 1 слот. Бизнес-серия, документированный апгрейд.'
  },
  {
    id: 'vivobook15', brand: 'ASUS', name: 'VivoBook 15 X1502ZA', cpu: 'Core i5-1235U',
    ramType: 'DDR4', sodimmSlots: 1, ramSoldered: 1, ramMax: 24, ramCurrent: 8, ramPerSlotMax: 16,
    m2Slots: 1, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: true, ssdSoldered: false
  },
  {
    id: 'mba-m2', brand: 'Apple', name: 'MacBook Air 13" M2', cpu: 'Apple M2',
    ramType: 'LPDDR5', sodimmSlots: 0, ramSoldered: 1, ramMax: 24, ramCurrent: 8, ramPerSlotMax: 0,
    m2Slots: 0, m2Sizes: [], m2Gen: 0, m2Used: 0,
    sataBay: 0, wifi: true, ssdSoldered: true,
    note: 'Память и SSD припаяны к плате: апгрейд модулями невозможен.'
  },
  {
    id: 'galaxy-book3', brand: 'Samsung', name: 'Galaxy Book3 15', cpu: 'Core i5-1335U',
    ramType: 'LPDDR5', sodimmSlots: 0, ramSoldered: 1, ramMax: 16, ramCurrent: 16, ramPerSlotMax: 0,
    m2Slots: 1, m2Sizes: ['2280'], m2Gen: 4, m2Used: 1,
    sataBay: 0, wifi: false, ssdSoldered: false,
    note: 'Память припаяна, но M.2 2280 заменяется — апгрейд диска возможен.'
  }
];

const LAPTOP_PARTS = {
  ram: [
    { id: 'sd-ddr4-8', type: 'DDR4', name: 'SO-DIMM DDR4 3200 8 ГБ', size: 8, price: 2490 },
    { id: 'sd-ddr4-16', type: 'DDR4', name: 'SO-DIMM DDR4 3200 16 ГБ', size: 16, price: 4290 },
    { id: 'sd-ddr5-8', type: 'DDR5', name: 'SO-DIMM DDR5 5600 8 ГБ', size: 8, price: 3290 },
    { id: 'sd-ddr5-16', type: 'DDR5', name: 'SO-DIMM DDR5 5600 16 ГБ', size: 16, price: 5990 },
    { id: 'sd-ddr5-32', type: 'DDR5', name: 'SO-DIMM DDR5 5600 32 ГБ', size: 32, price: 11990 }
  ],
  ssd: [
    { id: 'l-ssd-2280-1t', name: 'M.2 2280 PCIe 4.0 1 ТБ', size: '2280', gen: 4, price: 7490, form: 'M.2 2280' },
    { id: 'l-ssd-2280-2t', name: 'M.2 2280 PCIe 4.0 2 ТБ', size: '2280', gen: 4, price: 14490, form: 'M.2 2280' },
    { id: 'l-ssd-2280-5t', name: 'M.2 2280 PCIe 5.0 1 ТБ', size: '2280', gen: 5, price: 13990, form: 'M.2 2280' },
    { id: 'l-ssd-2242-512', name: 'M.2 2242 PCIe 4.0 512 ГБ', size: '2242', gen: 4, price: 4490, form: 'M.2 2242' },
    { id: 'l-ssd-2242-1t', name: 'M.2 2242 PCIe 4.0 1 ТБ', size: '2242', gen: 4, price: 7990, form: 'M.2 2242' }
  ],
  sata: [
    { id: 'l-sata-ssd-1t', name: '2.5" SSD SATA 1 ТБ', price: 7990, form: '2.5" SATA' },
    { id: 'l-sata-hdd-2t', name: '2.5" HDD 2 ТБ (7200 об/мин)', price: 5490, form: '2.5" HDD' }
  ],
  wifi: [
    { id: 'ax210', name: 'Intel AX210 — Wi-Fi 6E + BT 5.3', price: 2490 },
    { id: 'be200', name: 'Intel BE200 — Wi-Fi 7 + BT 5.4', price: 4490 }
  ],
  extra: [
    { id: 'ptm7950', name: 'Термопаста Honeywell PTM7950', price: 1290 },
    { id: 'thermal-pads', name: 'Термопрокладки 1 мм (комплект)', price: 690 },
    { id: 'cooling-pad', name: 'Кулер-подставка с регулировкой', price: 2490 }
  ]
};
