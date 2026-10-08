/* RigForge — векторные иллюстрации комплектующих. Всё генерируется локально, без внешних картинок. */

const BRAND_COLOR = {
  'AMD': '#ff5b32', 'Intel': '#3aa0ff', 'ASUS': '#ff3d6e', 'MSI': '#ff4747',
  'Gigabyte': '#ff9f1c', 'ASRock': '#8b5cff', 'Corsair': '#ffd166', 'Kingston': '#ff5f9e',
  'G.Skill': '#37e0a6', 'XPG': '#ff7a45', 'Crucial': '#6ecbff', 'Sapphire': '#4d9bff',
  'PowerColor': '#ff5b5b', 'Palit': '#ffc857', 'WD': '#7ee081', 'Samsung': '#6f8bff',
  'Seagate': '#9be564', 'be quiet!': '#aab4c0', 'Seasonic': '#5fd3f3', 'NZXT': '#c9d1d9',
  'Fractal Design': '#9fb0c3', 'Lian Li': '#d0d6e0', 'DeepCool': '#59d6c0', 'Thermalright': '#ff8a5c',
  'Noctua': '#d9a066', 'Cooler Master': '#7c5cff', 'Arctic': '#4dd0e1', 'Kolink': '#ff6ec7',
  'Honeywell': '#ffb703', 'Intel Wireless': '#3aa0ff'
};

function brandColor(b) { return BRAND_COLOR[b] || '#7c5cff'; }
function uid() { return 'g' + Math.random().toString(36).slice(2, 8); }

function grad(c1, c2, id) {
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`;
}

function partArt(cat, p) {
  const c = brandColor(p.brand);
  const g = uid();
  const dark = '#101013', mid = '#FBFBF6', line = '#101013', tail = '#DFE1D8';
  switch (cat) {
    case 'cpu': return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(c, shade(c, -35), g)}</defs>
        <rect x="30" y="8" width="100" height="84" rx="8" fill="${dark}" stroke="${line}" stroke-width="2"/>
        <rect x="42" y="20" width="76" height="60" rx="6" fill="url(#${g})" opacity=".9"/>
        <rect x="56" y="32" width="48" height="36" rx="4" fill="${dark}" opacity=".55"/>
        <text x="80" y="54" text-anchor="middle" font-size="13" font-weight="700" fill="#fff" opacity=".92" font-family="Inter,system-ui">${short(p.brand)}</text>
        <g stroke="${c}" stroke-width="3" stroke-linecap="round" opacity=".75">
          <path d="M46 8V2M64 8V2M82 8V2M100 8V2M118 8V2M46 98v-6M64 98v-6M82 98v-6M100 98v-6M118 98v-6"/>
          <path d="M30 26h-6M30 44h-6M30 62h-6M30 80h-6M136 26h6M136 44h6M136 62h6M136 80h6"/>
        </g>
        <circle cx="38" cy="16" r="3" fill="${c}"/>
      </svg>`;

    case 'mb': return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(mid, tail, g)}</defs>
        <rect x="14" y="6" width="132" height="88" rx="6" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <rect x="30" y="16" width="40" height="40" rx="4" fill="#0b0e14" stroke="${c}" stroke-width="2"/>
        <rect x="38" y="24" width="24" height="24" rx="3" fill="${c}" opacity=".55"/>
        <g fill="${c}" opacity=".7"><rect x="76" y="16" width="5" height="44" rx="2"/><rect x="85" y="16" width="5" height="44" rx="2"/><rect x="94" y="16" width="5" height="44" rx="2"/><rect x="103" y="16" width="5" height="44" rx="2"/></g>
        <rect x="26" y="64" width="96" height="9" rx="3" fill="#0b0e14" stroke="${line}"/>
        <rect x="26" y="78" width="60" height="7" rx="3" fill="#0b0e14" stroke="${line}"/>
        <rect x="112" y="62" width="26" height="26" rx="4" fill="${c}" opacity=".35" stroke="${c}"/>
        <g fill="${c}" opacity=".8"><rect x="16" y="14" width="8" height="20" rx="2"/><rect x="16" y="40" width="8" height="14" rx="2"/></g>
        <circle cx="132" cy="24" r="7" fill="none" stroke="${c}" stroke-width="2"/><circle cx="132" cy="46" r="7" fill="none" stroke="${c}" stroke-width="2"/>
      </svg>`;

    case 'gpu': {
      const fans = p.len > 300 ? 3 : 2;
      const fx = fans === 3 ? [40, 80, 120] : [52, 100];
      return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(shade(c, -20), tail, g)}</defs>
        <rect x="10" y="24" width="130" height="52" rx="7" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        ${fx.map(x => `<g><circle cx="${x}" cy="50" r="17" fill="#0b0e14" stroke="${c}" stroke-width="2" opacity=".9"/><circle cx="${x}" cy="50" r="5" fill="${c}"/><path d="M${x} 33v10M${x} 57v10M${x - 17} 50h10M${x + 7} 50h10" stroke="${c}" stroke-width="2" stroke-linecap="round" opacity=".65"/></g>`).join('')}
        <rect x="6" y="18" width="8" height="64" rx="2" fill="${mid}" stroke="${line}"/>
        <g fill="${line}"><rect x="1" y="26" width="5" height="8" rx="1.5"/><rect x="1" y="38" width="5" height="8" rx="1.5"/><rect x="1" y="50" width="5" height="8" rx="1.5"/></g>
        <rect x="140" y="34" width="14" height="14" rx="3" fill="${c}" opacity=".8"/>
        <rect x="140" y="54" width="14" height="9" rx="3" fill="${c}" opacity=".5"/>
        <rect x="30" y="82" width="70" height="6" rx="3" fill="#0b0e14" stroke="${line}"/>
      </svg>`;
    }

    case 'ram': {
      const n = Math.max(1, Math.min(4, p.sticks));
      const chips = Array.from({ length: 4 }, (_, i) => `<rect x="${26 + i * 26}" y="${n > 1 ? 30 : 34}" width="20" height="24" rx="2" fill="#0b0e14" opacity=".85"/>`).join('');
      const stick = (y) => `<g transform="translate(0,${y})"><rect x="16" y="${n > 1 ? 14 : 30}" width="128" height="34" rx="4" fill="url(#${g})" stroke="${line}" stroke-width="2"/><rect x="16" y="${n > 1 ? 14 : 30}" width="128" height="34" rx="4" fill="none" stroke="${c}" stroke-width="2" opacity=".6"/>${chips}<path d="M60 ${n > 1 ? 48 : 64}h6" stroke="${line}" stroke-width="3"/><path d="M62 ${n > 1 ? 48 : 64}v6" stroke="${c}" stroke-width="3"/></g>`;
      return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(mid, tail, g)}</defs>
        ${n >= 2 ? stick(-4) : ''}
        ${n >= 2 ? stick(24) : stick(0)}
        <rect x="16" y="86" width="128" height="7" rx="2" fill="${c}" opacity=".5"/>
        <text x="80" y="97" text-anchor="middle" font-size="8" font-weight="700" fill="${shade(c,-55)}" font-family="Inter,system-ui">${p.type} ${p.speed}</text>
      </svg>`;
    }

    case 'ssd': {
      if (p.iface === 'sata' && p.size === '3.5') return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(mid, tail, g)}</defs>
        <rect x="22" y="18" width="116" height="64" rx="6" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <circle cx="80" cy="50" r="24" fill="#0b0e14" stroke="${c}" stroke-width="2"/>
        <circle cx="80" cy="50" r="7" fill="${c}" opacity=".8"/>
        <rect x="98" y="34" width="26" height="18" rx="3" fill="${c}" opacity=".35" stroke="${c}"/>
        <g fill="${line}"><rect x="30" y="70" width="18" height="4" rx="2"/><rect x="52" y="70" width="10" height="4" rx="2"/></g>
      </svg>`;
      if (p.iface === 'sata') return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(shade(c, -30), tail, g)}</defs>
        <rect x="26" y="20" width="108" height="60" rx="7" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <rect x="38" y="32" width="60" height="36" rx="4" fill="#0b0e14" opacity=".7"/>
        <text x="68" y="54" text-anchor="middle" font-size="11" font-weight="700" fill="${c}" font-family="Inter,system-ui">2.5"</text>
        <g fill="${c}" opacity=".8"><rect x="122" y="34" width="10" height="6" rx="1.5"/><rect x="122" y="44" width="10" height="6" rx="1.5"/><rect x="122" y="54" width="10" height="6" rx="1.5"/></g>
        <rect x="26" y="76" width="108" height="6" rx="3" fill="${c}" opacity=".4"/>
      </svg>`;
      const pcie5 = p.iface === 'm2-pcie5';
      return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(pcie5 ? c : mid, tail, g)}</defs>
        <rect x="8" y="34" width="144" height="32" rx="5" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <g fill="#0b0e14" opacity=".85"><rect x="34" y="41" width="22" height="18" rx="2"/><rect x="62" y="41" width="22" height="18" rx="2"/><rect x="90" y="41" width="22" height="18" rx="2"/></g>
        <rect x="120" y="41" width="20" height="18" rx="2" fill="${c}" opacity=".55"/>
        <g fill="${c}"><rect x="8" y="42" width="4" height="16" rx="1.5"/><rect x="14" y="42" width="3" height="16" rx="1"/></g>
        <rect x="8" y="66" width="16" height="10" rx="2" fill="${c}" opacity=".7"/>
        <circle cx="28" cy="60" r="3" fill="${c}"/>
        <text x="88" y="84" text-anchor="middle" font-size="9" font-weight="700" fill="${shade(c,-55)}" font-family="Inter,system-ui">${pcie5 ? 'PCIe 5.0 NVMe' : 'M.2 NVMe'}</text>
      </svg>`;
    }

    case 'psu': return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(mid, '#0b0e14', g)}</defs>
        <rect x="16" y="20" width="112" height="62" rx="7" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <circle cx="58" cy="51" r="26" fill="#0b0e14" stroke="${c}" stroke-width="2"/>
        <circle cx="58" cy="51" r="6" fill="${c}"/>
        <g stroke="${c}" stroke-width="2" opacity=".55" fill="none"><circle cx="58" cy="51" r="13"/><circle cx="58" cy="51" r="20"/></g>
        <rect x="94" y="32" width="26" height="16" rx="3" fill="${c}" opacity=".45"/>
        <rect x="94" y="54" width="26" height="16" rx="3" fill="${c}" opacity=".25"/>
        <text x="72" y="94" text-anchor="middle" font-size="10" font-weight="800" fill="${shade(c,-55)}" font-family="Inter,system-ui">${p.w} Вт</text>
        <path d="M128 34c14 0 14 14 24 14M128 50c14 0 14 14 24 14M128 66c14 0 14 14 24 14" stroke="${line}" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>`;

    case 'case': return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(mid, '#0b0e14', g)}</defs>
        <rect x="38" y="4" width="84" height="92" rx="8" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <rect x="46" y="12" width="60" height="76" rx="5" fill="#0b0e14" stroke="${c}" stroke-width="1.5" opacity=".9"/>
        <g opacity=".85"><circle cx="66" cy="32" r="13" fill="none" stroke="${c}" stroke-width="2"/><circle cx="66" cy="32" r="4" fill="${c}"/><circle cx="92" cy="32" r="13" fill="none" stroke="${c}" stroke-width="2"/><circle cx="92" cy="32" r="4" fill="${c}"/></g>
        <rect x="54" y="54" width="44" height="12" rx="3" fill="${c}" opacity=".35"/>
        <rect x="54" y="70" width="44" height="10" rx="3" fill="${c}" opacity=".2"/>
        <circle cx="114" cy="86" r="4" fill="${c}"/>
        <rect x="46" y="88" width="60" height="4" rx="2" fill="${c}" opacity=".5"/>
      </svg>`;

    case 'cooler': {
      if (p.type === 'aio') return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(c, shade(c, -40), g)}</defs>
        <rect x="14" y="14" width="76" height="72" rx="6" fill="${mid}" stroke="${line}" stroke-width="2"/>
        <g stroke="${c}" stroke-width="2" opacity=".7"><path d="M22 22v56M32 22v56M42 22v56M52 22v56M62 22v56M72 22v56M82 22v56"/></g>
        <rect x="96" y="34" width="48" height="34" rx="8" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <circle cx="120" cy="51" r="12" fill="#0b0e14" stroke="${c}" stroke-width="2"/><circle cx="120" cy="51" r="4" fill="${c}"/>
        <path d="M90 44c-8 0-8 14-16 14" stroke="${line}" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="52" y="96" text-anchor="middle" font-size="9" font-weight="700" fill="${shade(c,-55)}" font-family="Inter,system-ui">радиатор ${p.radiator} мм</text>
      </svg>`;
      return `
      <svg viewBox="0 0 160 100" class="pa">
        <defs>${grad(shade(c, -15), tail, g)}</defs>
        <rect x="52" y="8" width="56" height="72" rx="5" fill="url(#${g})" stroke="${line}" stroke-width="2"/>
        <g stroke="${shade(c, -30)}" stroke-width="3" stroke-linecap="round" opacity=".8">
          <path d="M58 16h44M58 26h44M58 36h44M58 46h44M58 56h44M58 66h44M58 74h44"/>
        </g>
        <rect x="34" y="22" width="24" height="46" rx="6" fill="${mid}" stroke="${c}" stroke-width="2"/>
        <circle cx="46" cy="45" r="9" fill="#0b0e14" stroke="${c}" stroke-width="2"/><circle cx="46" cy="45" r="3" fill="${c}"/>
        <rect x="66" y="84" width="28" height="8" rx="3" fill="${c}" opacity=".7"/>
        <text x="80" y="98" text-anchor="middle" font-size="9" font-weight="700" fill="${shade(c,-55)}" font-family="Inter,system-ui">${p.tdp} Вт TDP</text>
      </svg>`;
    }
    case 'hdd': return partArt('ssd', { ...p, iface: 'sata', size: '3.5' });
    default: return `<svg viewBox="0 0 160 100" class="pa"><rect x="20" y="20" width="120" height="60" rx="8" fill="${mid}" stroke="${c}" stroke-width="2"/></svg>`;
  }
}

function short(brand) {
  const m = { 'AMD': 'AMD', 'Intel': 'CORE', 'Fractal Design': 'FD', 'Cooler Master': 'CM', 'be quiet!': 'bq', 'PowerColor': 'PC', 'Seagate': 'SG', 'G.Skill': 'GS', 'Samsung': 'SSD' };
  return m[brand] || brand.slice(0, 6).toUpperCase();
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

/* --- иконки категорий --- */
const CAT_ICON = {
  cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  mb: '<rect x="3" y="4" width="18" height="16" rx="2"/><rect x="6" y="7" width="5" height="5"/><path d="M14 7h4M14 10h4M6 15h12"/>',
  cooler: '<circle cx="12" cy="12" r="7"/><path d="M12 5v7l5 3"/>',
  ram: '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M7 16v3M17 16v3M7 8V5M17 8V5"/>',
  gpu: '<rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="8" cy="12" r="3"/><circle cx="15" cy="12" r="3"/>',
  ssd: '<rect x="2" y="9" width="20" height="6" rx="2"/><path d="M6 15v3"/>',
  hdd: '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="4"/>',
  case: '<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="8" r="2.5"/><path d="M9 15h6M9 18h6"/>',
  psu: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="9" cy="12" r="4"/><path d="M16 9h3M16 12h3M16 15h3"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  warn: '<path d="M12 3l9.5 17H2.5z"/><path d="M12 9v5M12 17.5v.5"/>',
  err: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>'
};

function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${CAT_ICON[name] || ''}</svg>`;
}
