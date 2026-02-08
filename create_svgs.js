const fs = require('fs');
const path = require('path');

const heroSvg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#334155;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad1)" />
  <text x="50%" y="50%" font-family="Arial" font-size="40" fill="white" text-anchor="middle">Luxury Real Estate</text>
</svg>`;

const propertySvg = (color) => `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}" />
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">Property Image</text>
</svg>`;

const publicDir = path.join(__dirname, 'public');
const propertiesDir = path.join(publicDir, 'properties');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(propertiesDir)) fs.mkdirSync(propertiesDir);

fs.writeFileSync(path.join(publicDir, 'hero-bg.jpg'), heroSvg); // Save as jpg filename but content is svg, browsers handle it or I rename in component
// Actually better to save as .svg and update component. But component expects .jpg.
// Browser can display SVG with .jpg extension? No.
// I will save as .svg and update components.

fs.writeFileSync(path.join(publicDir, 'hero-bg.svg'), heroSvg);
fs.writeFileSync(path.join(propertiesDir, '1.svg'), propertySvg('#1e293b'));
fs.writeFileSync(path.join(propertiesDir, '2.svg'), propertySvg('#334155'));
fs.writeFileSync(path.join(propertiesDir, '3.svg'), propertySvg('#475569'));
fs.writeFileSync(path.join(propertiesDir, '4.svg'), propertySvg('#64748b'));

console.log('SVGs created');
