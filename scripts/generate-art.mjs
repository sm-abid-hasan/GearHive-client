
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(join(root, "equipment"), { recursive: true });
mkdirSync(join(root, "categories"), { recursive: true });


const glyphs = {
  excavator: (p) => `
    <rect x="-84" y="30" width="136" height="28" rx="14" fill="${p.dark}"/>
    ${[-64, -32, 0, 30].map((x) => `<circle cx="${x}" cy="44" r="8" fill="${p.light}" opacity=".9"/>`).join("")}
    <rect x="-72" y="2" width="104" height="30" rx="6" fill="${p.body}"/>
    <path d="M-62 2v-36h40l14 22v14z" fill="${p.body}"/>
    <path d="M-54 -26h26l9 14h-35z" fill="${p.light}" opacity=".9"/>
    <path d="M-6 -10 46 -54 58 -44 8 2z" fill="${p.accent}"/>
    <path d="M48 -56 86 -8 74 0 38 -46z" fill="${p.dark}"/>
    <path d="M72 -8 100 -2 96 22 74 18z" fill="${p.accent}"/>`,

  mixer: (p) => `
    <path d="M-60 60 -20 8M60 60 20 8" stroke="${p.dark}" stroke-width="9" stroke-linecap="round"/>
    <rect x="-70" y="52" width="140" height="10" rx="5" fill="${p.dark}"/>
    <circle cx="-62" cy="66" r="10" fill="${p.dark}"/><circle cx="62" cy="66" r="10" fill="${p.dark}"/>
    <path d="M-52 -8 0 -62 52 -8 40 38h-80z" fill="${p.body}" transform="rotate(-18)"/>
    <path d="M-20 -52 20 -52 26 -36h-52z" fill="${p.accent}" transform="rotate(-18)"/>
    <path d="M-30 4h60M-24 20h48" stroke="${p.light}" stroke-width="5" stroke-linecap="round" opacity=".6" transform="rotate(-18)"/>`,

  lift: (p) => `
    <rect x="-60" y="-64" width="120" height="12" rx="5" fill="${p.accent}"/>
    <path d="M-52 -64v-16h104v16" fill="none" stroke="${p.light}" stroke-width="5"/>
    <path d="M-46 -52 46 4M46 -52 -46 4M-46 4 46 56M46 4 -46 56" stroke="${p.body}" stroke-width="10" stroke-linecap="round"/>
    <rect x="-70" y="56" width="140" height="18" rx="6" fill="${p.dark}"/>
    <circle cx="-48" cy="80" r="9" fill="${p.dark}"/><circle cx="48" cy="80" r="9" fill="${p.dark}"/>`,

  camera: (p) => `
    <path d="M-30-48h60l10 18h-80z" fill="${p.dark}"/>
    <rect x="-88" y="-32" width="176" height="100" rx="16" fill="${p.body}"/>
    <rect x="-88" y="-8" width="176" height="14" fill="${p.dark}" opacity=".35"/>
    <circle cx="0" cy="20" r="46" fill="${p.dark}"/>
    <circle cx="0" cy="20" r="34" fill="${p.light}" opacity=".9"/>
    <circle cx="0" cy="20" r="22" fill="${p.dark}"/>
    <circle cx="-8" cy="12" r="7" fill="${p.light}" opacity=".7"/>
    <circle cx="66" cy="-14" r="7" fill="${p.accent}"/>
    <rect x="-76" y="-20" width="26" height="12" rx="4" fill="${p.light}" opacity=".8"/>`,

  light: (p) => `
    <path d="M0 10v70M0 56-34 86M0 56 34 86" stroke="${p.dark}" stroke-width="7" stroke-linecap="round"/>
    <rect x="-56" y="-56" width="112" height="70" rx="12" fill="${p.body}" transform="rotate(-12)"/>
    <rect x="-44" y="-46" width="88" height="50" rx="8" fill="${p.light}" opacity=".9" transform="rotate(-12)"/>
    <path d="M60-30 96-46M62-8 100-8M58 14 94 28" stroke="${p.accent}" stroke-width="6" stroke-linecap="round"/>`,

  drone: (p) => `
    <path d="M-30-6-76-34M30-6 76-34M-30 10-76 38M30 10 76 38" stroke="${p.dark}" stroke-width="8" stroke-linecap="round"/>
    ${[[-82, -38], [82, -38], [-82, 42], [82, 42]]
      .map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="6" fill="${p.light}" opacity=".85"/><circle cx="${x}" cy="${y}" r="6" fill="${p.dark}"/>`)
      .join("")}
    <rect x="-34" y="-20" width="68" height="40" rx="16" fill="${p.body}"/>
    <rect x="-16" y="16" width="32" height="26" rx="9" fill="${p.dark}"/>
    <circle cx="0" cy="30" r="8" fill="${p.accent}"/>
    <circle cx="0" cy="-2" r="7" fill="${p.light}" opacity=".8"/>`,

  van: (p) => `
    <path d="M-96 36v-48q0-14 14-14h112q12 0 20 8l30 30q8 8 8 20v4z" fill="${p.body}"/>
    <path d="M-80-6h34v28h-34zM-38-6h34v28h-34zM4-6h24l22 22v6H4z" fill="${p.light}" opacity=".9"/>
    <rect x="-96" y="30" width="192" height="12" rx="4" fill="${p.dark}" opacity=".35"/>
    <circle cx="-56" cy="44" r="19" fill="${p.dark}"/><circle cx="-56" cy="44" r="8" fill="${p.light}"/>
    <circle cx="58" cy="44" r="19" fill="${p.dark}"/><circle cx="58" cy="44" r="8" fill="${p.light}"/>
    <rect x="88" y="14" width="10" height="8" rx="3" fill="${p.accent}"/>`,

  pickup: (p) => `
    <path d="M-96 36v-22h72v-26h40q10 0 16 8l26 18h34q8 0 8 8v14z" fill="${p.body}"/>
    <path d="M-12 14v-18h30l18 18z" fill="${p.light}" opacity=".9"/>
    <rect x="-100" y="4" width="76" height="12" fill="${p.dark}"/>
    <rect x="-100" y="-10" width="76" height="14" fill="${p.accent}"/>
    <circle cx="-58" cy="42" r="19" fill="${p.dark}"/><circle cx="-58" cy="42" r="8" fill="${p.light}"/>
    <circle cx="58" cy="42" r="19" fill="${p.dark}"/><circle cx="58" cy="42" r="8" fill="${p.light}"/>`,

  bike: (p) => `
    <circle cx="-68" cy="40" r="28" fill="none" stroke="${p.dark}" stroke-width="7"/>
    <circle cx="68" cy="40" r="28" fill="none" stroke="${p.dark}" stroke-width="7"/>
    <path d="M-68 40 -20-10H34L68 40M-20-10-4 40h-64M34-10 22-34h-22" fill="none" stroke="${p.body}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="-100" y="-44" width="70" height="46" rx="6" fill="${p.accent}"/>
    <path d="M-100-20h70" stroke="${p.dark}" stroke-width="4" opacity=".4"/>
    <circle cx="-4" cy="40" r="10" fill="${p.dark}"/>`,

  tractor: (p) => `
    <circle cx="-52" cy="30" r="46" fill="${p.dark}"/><circle cx="-52" cy="30" r="22" fill="${p.accent}"/>
    <circle cx="74" cy="48" r="26" fill="${p.dark}"/><circle cx="74" cy="48" r="11" fill="${p.accent}"/>
    <path d="M-80 10v-62h54v62z" fill="${p.light}" opacity=".9"/>
    <path d="M-84-56h62v8h-62z" fill="${p.dark}"/>
    <path d="M-30 6h104q8 0 8 8v14H-30z" fill="${p.body}"/>
    <rect x="40" y="-14" width="42" height="26" rx="6" fill="${p.body}"/>
    <rect x="58" y="-34" width="8" height="22" fill="${p.dark}"/>`,

  tiller: (p) => `
    <path d="M-24-4 -90-58h-16" stroke="${p.dark}" stroke-width="8" stroke-linecap="round" fill="none"/>
    <rect x="-24" y="-24" width="78" height="50" rx="12" fill="${p.body}"/>
    <rect x="-8" y="-36" width="34" height="14" rx="4" fill="${p.dark}"/>
    <circle cx="14" cy="52" r="32" fill="${p.dark}"/><circle cx="14" cy="52" r="14" fill="${p.accent}"/>
    ${[0, 60, 120, 180, 240, 300].map((a) => `<rect x="12" y="14" width="4" height="14" fill="${p.accent}" transform="rotate(${a} 14 52)"/>`).join("")}
    <circle cx="86" cy="26" r="14" fill="${p.dark}"/>`,

  pump: (p) => `
    <rect x="-86" y="4" width="92" height="56" rx="12" fill="${p.body}"/>
    <rect x="-74" y="-14" width="68" height="22" rx="6" fill="${p.dark}"/>
    <circle cx="-40" cy="32" r="14" fill="${p.light}" opacity=".9"/><circle cx="-40" cy="32" r="6" fill="${p.dark}"/>
    <path d="M6 32h46q22 0 22-22v-30" fill="none" stroke="${p.accent}" stroke-width="14" stroke-linecap="round"/>
    <path d="M74-30q0-18 22-18" fill="none" stroke="${p.accent}" stroke-width="14" stroke-linecap="round"/>
    <path d="M94-72q8 16 0 28M112-70q6 14 0 24" stroke="${p.light}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>`,

  laptop: (p) => `
    <rect x="-74" y="-60" width="148" height="92" rx="10" fill="${p.dark}"/>
    <rect x="-64" y="-50" width="128" height="72" rx="4" fill="${p.light}" opacity=".95"/>
    <path d="M-48 8-22-18 0 0 24-30 48 8z" fill="${p.accent}"/>
    <circle cx="-30" cy="-30" r="9" fill="${p.body}"/>
    <path d="M-96 40h192l-10 20h-172z" fill="${p.body}"/>
    <rect x="-22" y="40" width="44" height="6" rx="3" fill="${p.dark}" opacity=".4"/>`,

  projector: (p) => `
    <rect x="-90" y="-16" width="124" height="66" rx="14" fill="${p.body}"/>
    <circle cx="6" cy="17" r="26" fill="${p.dark}"/><circle cx="6" cy="17" r="16" fill="${p.light}" opacity=".9"/>
    <rect x="-76" y="-4" width="36" height="8" rx="4" fill="${p.light}" opacity=".7"/>
    <circle cx="-62" cy="30" r="6" fill="${p.accent}"/>
    <path d="M34 4 104-50v132L34 30z" fill="${p.accent}" opacity=".35"/>
    <path d="M-70 50v10h12v-10M10 50v10h12v-10" fill="${p.dark}"/>`,

  sound: (p) => `
    <rect x="-96" y="-56" width="80" height="118" rx="10" fill="${p.body}"/>
    <circle cx="-56" cy="-22" r="14" fill="${p.dark}"/><circle cx="-56" cy="26" r="26" fill="${p.dark}"/><circle cx="-56" cy="26" r="14" fill="${p.light}" opacity=".7"/>
    <rect x="16" y="-56" width="80" height="118" rx="10" fill="${p.body}"/>
    <circle cx="56" cy="-22" r="14" fill="${p.dark}"/><circle cx="56" cy="26" r="26" fill="${p.dark}"/><circle cx="56" cy="26" r="14" fill="${p.light}" opacity=".7"/>
    <path d="M-8-30q10 18 0 36M0-40q16 28 0 56M8-30q-10 18 0 36" stroke="${p.accent}" stroke-width="6" fill="none" stroke-linecap="round"/>`,

  tent: (p) => `
    <path d="M-100 52V-4L0-62 100-4v56z" fill="${p.light}" opacity=".95"/>
    <path d="M-100-4 0-62 100-4 76 8Q38-6 0 8-38-6-76 8z" fill="${p.body}"/>
    <path d="M-30 52v-40q0-20 30-20t30 20v40z" fill="${p.dark}" opacity=".75"/>
    <path d="M-100 52h200" stroke="${p.dark}" stroke-width="8"/>
    <path d="M-100-4V52M100-4V52" stroke="${p.dark}" stroke-width="6"/>
    <circle cx="0" cy="-66" r="7" fill="${p.accent}"/>`,

  stage: (p) => `
    <path d="M-100-60h200" stroke="${p.dark}" stroke-width="8" stroke-linecap="round"/>
    ${[-64, 0, 64]
      .map(
        (x, i) => `<path d="M${x}-60v14" stroke="${p.dark}" stroke-width="6"/>
        <rect x="${x - 20}" y="-46" width="40" height="44" rx="12" fill="${p.body}" transform="rotate(${(i - 1) * 14} ${x} -46)"/>
        <path d="M${x - 14} -4 ${x - 44} 70h88L${x + 14} -4z" fill="${p.accent}" opacity=".35" transform="rotate(${(i - 1) * 14} ${x} -46)"/>`
      )
      .join("")}`,

  generator: (p) => `
    <rect x="-88" y="-34" width="176" height="92" rx="12" fill="${p.body}"/>
    <rect x="-88" y="-34" width="176" height="20" rx="10" fill="${p.dark}" opacity=".35"/>
    <rect x="-76" y="-6" width="76" height="52" rx="6" fill="${p.dark}"/>
    ${[-62, -42, -22, -2].map((x) => `<rect x="${x}" y="2" width="10" height="38" rx="3" fill="${p.light}" opacity=".7"/>`).join("")}
    <circle cx="44" cy="12" r="18" fill="${p.light}" opacity=".9"/><circle cx="44" cy="12" r="9" fill="${p.accent}"/>
    <rect x="30" y="38" width="32" height="12" rx="4" fill="${p.dark}"/>
    <path d="M-88 58h176v8h-176z" fill="${p.dark}"/>
    <path d="M-60 -52 -40-34M60-52 40-34" stroke="${p.dark}" stroke-width="7" stroke-linecap="round"/>`,
};


function card({ glyph, hues, scale = 1, withSun = true }) {
  const [h1, h2] = hues;
  const palette = { body: `hsl(${h1} 62% 38%)`, dark: "#12262c", accent: "#f5a524", light: "#ffffff" };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" role="img">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${h1} 55% 86%)"/>
      <stop offset="1" stop-color="hsl(${h2} 60% 72%)"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  ${withSun ? `<circle cx="318" cy="70" r="46" fill="#fff" opacity=".35"/><circle cx="62" cy="248" r="64" fill="#fff" opacity=".22"/>` : ""}
  <ellipse cx="200" cy="246" rx="128" ry="12" fill="#12262c" opacity=".18"/>
  <g transform="translate(200 150) scale(${scale})">${glyphs[glyph](palette)}</g>
</svg>
`;
}


const equipment = {
  "mini-excavator": ["excavator", [24, 40], 1.2],
  "concrete-mixer": ["mixer", [200, 215], 1.15],
  "scissor-lift": ["lift", [30, 20], 1.1],
  "camera-kit": ["camera", [215, 240], 1.2],
  "studio-light": ["light", [260, 290], 1.15],
  "mavic-drone": ["drone", [195, 170], 1.25],
  "passenger-van": ["van", [160, 190], 1.3],
  "pickup-truck": ["pickup", [20, 5], 1.3],
  "cargo-bike": ["bike", [140, 160], 1.25],
  "compact-tractor": ["tractor", [100, 130], 1.2],
  "power-tiller": ["tiller", [75, 100], 1.3],
  "irrigation-pump": ["pump", [195, 210], 1.3],
  "gaming-laptop": ["laptop", [270, 300], 1.25],
  "laser-projector": ["projector", [225, 250], 1.25],
  "pa-sound-system": ["sound", [335, 350], 1.2],
  "event-tent": ["tent", [345, 325], 1.25],
  "stage-lighting": ["stage", [280, 310], 1.3],
  "diesel-generator": ["generator", [45, 25], 1.25],
};

for (const [name, [glyph, hues, scale]] of Object.entries(equipment)) {
  writeFileSync(join(root, "equipment", `${name}.svg`), card({ glyph, hues, scale }));
}


const categories = {
  construction: ["excavator", [24, 40]],
  photography: ["camera", [215, 240]],
  vehicles: ["van", [160, 190]],
  agriculture: ["tractor", [100, 130]],
  electronics: ["laptop", [270, 300]],
  events: ["sound", [335, 350]],
};

for (const [name, [glyph, hues]] of Object.entries(categories)) {
  writeFileSync(join(root, "categories", `${name}.svg`), card({ glyph, hues, scale: 1.25 }));
}


const heroPalette = { body: "#f5a524", dark: "#0b2530", accent: "#ffffff", light: "#d7f3ec" };
const hero = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 640" role="img" aria-label="Illustration of rental equipment: excavator, drone and sound system">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#0d9c80"/>
      <stop offset="0.55" stop-color="#0b6f68"/>
      <stop offset="1" stop-color="#1d3557"/>
    </linearGradient>
    <linearGradient id="sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd36b"/>
      <stop offset="1" stop-color="#f5a524"/>
    </linearGradient>
  </defs>
  <rect width="800" height="640" fill="url(#sky)"/>
  <circle cx="590" cy="190" r="120" fill="url(#sun)" opacity=".95"/>
  <circle cx="590" cy="190" r="170" fill="#ffffff" opacity=".07"/>
  <circle cx="590" cy="190" r="225" fill="#ffffff" opacity=".05"/>
  <!-- clouds -->
  <g fill="#fff" opacity=".18"><rect x="60" y="120" width="170" height="26" rx="13"/><rect x="110" y="96" width="110" height="26" rx="13"/><rect x="520" y="340" width="190" height="24" rx="12"/></g>
  <!-- tower crane -->
  <g stroke="#0b2530" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85">
    <path d="M130 520V150M170 520V150M130 520l40-60M130 460l40-60M130 400l40-60M130 340l40-60M130 280l40-60M130 220l40-60"/>
    <path d="M60 150h300M150 150V100l210 50M150 100 60 150"/>
    <path d="M320 150v70"/>
  </g>
  <rect x="300" y="220" width="40" height="26" rx="4" fill="#0b2530" opacity=".85"/>
  <!-- hills -->
  <path d="M0 470q140-70 300-30t300-40 200 20v220H0z" fill="#0a4f55"/>
  <path d="M0 520q180-60 360-20t440-30v170H0z" fill="#08333f"/>
  <!-- ground -->
  <rect y="590" width="800" height="50" fill="#06222c"/>
  <!-- excavator -->
  <g transform="translate(430 480) scale(1.75)">${glyphs.excavator(heroPalette)}</g>
  <!-- drone -->
  <g transform="translate(250 270) scale(.9)">${glyphs.drone({ body: "#ffffff", dark: "#0b2530", accent: "#f5a524", light: "#ffffff" })}</g>
  <!-- sound system -->
  <g transform="translate(125 565) scale(.62)">${glyphs.sound({ body: "#ffffff", dark: "#0b2530", accent: "#f5a524", light: "#d7f3ec" })}</g>
  <!-- sparkles -->
  <g fill="#fff" opacity=".8"><circle cx="700" cy="90" r="4"/><circle cx="740" cy="140" r="3"/><circle cx="70" cy="60" r="3"/><circle cx="360" cy="70" r="4"/></g>
</svg>
`;
writeFileSync(join(root, "hero.svg"), hero);

console.log("Images generated in public/images");
