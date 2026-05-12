const fs = require('fs');
const path = require('path');

const clientDist = path.join(process.cwd(), 'dist', 'client');
const assetsDir = path.join(clientDist, 'assets');

if (!fs.existsSync(clientDist)) {
  console.error('dist/client not found');
  process.exit(1);
}

// Find main JS and CSS
const files = fs.readdirSync(assetsDir);
// Find the largest index JS file (which is the main app entry)
const mainJs = files.filter(f => f.startsWith('index-') && f.endsWith('.js')).sort((a, b) => {
  return fs.statSync(path.join(assetsDir, b)).size - fs.statSync(path.join(assetsDir, a)).size;
})[0];
const mainCss = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

if (!mainJs) {
  console.error('Main JS not found in dist/client/assets');
  process.exit(1);
}

console.log('Detected main JS:', mainJs);
if (mainCss) console.log('Detected main CSS:', mainCss);

const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/png" href="/assets/logo/logo.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Conciencia Revolucionaria</title>
    ${mainCss ? `<link rel="stylesheet" href="/assets/${mainCss}">` : ''}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJs}"></script>
  </body>
</html>`;

fs.writeFileSync(path.join(clientDist, 'index.html'), htmlTemplate);
console.log('Successfully generated production index.html in dist/client');
