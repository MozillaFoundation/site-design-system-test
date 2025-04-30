const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

// Directories
const templatesDir = path.join(__dirname, 'templates/pages');
const outputDir = path.join(__dirname, 'docs');
const assetsDir = path.join(__dirname, 'assets');
const outputAssetsDir = path.join(outputDir, 'assets');
const foundationCSS = path.join(__dirname, 'node_modules/foundation-sites/dist/css/foundation.min.css');
const foundationDest = path.join(outputDir, 'assets/vendor/foundation.min.css');

// Setup Nunjucks (search paths start at templates/)
nunjucks.configure('templates', { autoescape: true });

// Render a single file
function renderFile(inputFile, outputFile, context = {}) {
  try {
    const rendered = nunjucks.render(inputFile, context);
    if (typeof rendered !== 'string') {
      throw new Error(`Rendered content is not a string: ${inputFile}`);
    }

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, rendered, 'utf8');
    console.log(`✅ Rendered: ${outputFile}`);
  } catch (err) {
    console.error(`❌ Error rendering ${inputFile}`);
    console.error(err.stack);  // Show full details
    process.exit(1);
  }
}

// Recursively copy folder
function copyFolderSync(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  fs.readdirSync(source).forEach(item => {
    const srcPath = path.join(source, item);
    const destPath = path.join(destination, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Clean output folder
if (fs.existsSync(outputDir)) {
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log('🧹 Cleaned previous build.');
}

// Copy Foundation CSS from node_modules to docs/assets/vendor
fs.mkdirSync(path.dirname(foundationDest), { recursive: true });
fs.copyFileSync(foundationCSS, foundationDest);
console.log('📦 Copied Foundation CSS from node_modules.');

// Render all .njk pages
fs.readdirSync(templatesDir).forEach(file => {
  if (file.endsWith('.njk')) {
    const inputFile = path.join('pages', file); // relative to templates/
    const outputFile = path.join(outputDir, file.replace('.njk', '.html'));
    renderFile(inputFile, outputFile);
  } else {
    console.log(`🔁 Skipped: ${file}`);
  }
});

// Copy assets
copyFolderSync(assetsDir, outputAssetsDir);
console.log('📦 Assets copied.');
console.log('✅ Build complete!');
