const fs = require('fs');
const path = require('path');

console.log('🚀 Starting CUOI\'S MOON ADVENTURE Build Process...');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const srcDir = path.join(rootDir, 'src');

// Load Babel
require(path.join(publicDir, 'vendor', 'babel.min.js'));
const Babel = global.Babel;
if (!Babel) {
  console.error('❌ Failed to load Babel!');
  process.exit(1);
}

// Ensure dist directories
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(path.join(distDir, 'assets'), { recursive: true });
fs.mkdirSync(path.join(distDir, 'vendor'), { recursive: true });

// Copy public assets recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('📦 Copying public assets & vendor libraries...');
copyDirRecursive(path.join(publicDir, 'assets'), path.join(distDir, 'assets'));
copyDirRecursive(path.join(publicDir, 'vendor'), path.join(distDir, 'vendor'));

// Copy CSS
console.log('🎨 Copying CSS...');
const cssContent = fs.readFileSync(path.join(srcDir, 'App.css'), 'utf8');
fs.writeFileSync(path.join(distDir, 'assets', 'App.css'), cssContent);

// Bundle JS components
console.log('⚛️ Compiling React components and bundling...');

// Read modules in dependency order
function cleanImports(code) {
  return code
    .replace(/^import\s+.*?from\s+['"].*?['"];?\r?\n/gm, '')
    .replace(/^import\s+['"].*?['"];?\r?\n/gm, '')
    .replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, 'function $1')
    .replace(/export\s+const\s+/g, 'const ')
    .replace(/export\s+default\s+([A-Za-z0-9_]+);?/g, '')
    .replace(/export\s+\{[^}]*\};?/g, '');
}

const modules = [
  'data/translations.js',
  'data/missionsData.js',
  'data/quizData.js',
  'utils/soundEffects.js',
  'components/Header.jsx',
  'components/IntroScreen.jsx',
  'components/MoonMap.jsx',
  'components/MissionScene.jsx',
  'components/FinalStoryScreen.jsx',
  'components/QuizScreen.jsx',
  'components/ResultsScreen.jsx',
  'App.jsx'
];

let combinedCode = `(function() {
  'use strict';
  const { useState, useEffect, useRef } = window.React;
  const React = window.React;
  const ReactDOM = window.ReactDOM;
\n`;

for (const mod of modules) {
  const filePath = path.join(srcDir, mod);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Module not found: ${mod}`);
    process.exit(1);
  }
  const code = fs.readFileSync(filePath, 'utf8');
  combinedCode += `// --- Module: ${mod} ---\n` + cleanImports(code) + '\n\n';
}

// Mount statement
combinedCode += `
  // Mount App
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(React.StrictMode, null, React.createElement(App, null)));
  }
})();
`;

// Transform with Babel
const transformed = Babel.transform(combinedCode, {
  presets: [['react', { runtime: 'classic' }]],
  comments: false
});

const bundlePath = path.join(distDir, 'assets', 'bundle.js');
fs.writeFileSync(bundlePath, transformed.code);
const bundleStat = fs.statSync(bundlePath);
console.log(`✓ Generated dist/assets/bundle.js (${(bundleStat.size / 1024).toFixed(1)} KB)`);

// Generate dist/index.html
console.log('📄 Generating dist/index.html...');
const distHtml = `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>CUOI'S MOON ADVENTURE – Bỏ Lại, Nhưng Không Rơi Vào Quên Lãng</title>
    <meta name="description" content="Explore NASA space exploration history guided by Vietnamese folklore character Chu Cuoi. An educational interactive web app for students ages 10-15." />
    
    <!-- Google Fonts for Cinematic Space Aesthetic -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600&family=Orbitron:wght@700;900&display=swap" rel="stylesheet" />

    <!-- Application CSS -->
    <link rel="stylesheet" href="./assets/App.css" />

    <!-- Vendor Libraries (Offline Ready) -->
    <script src="./vendor/react.min.js"></script>
    <script src="./vendor/react-dom.min.js"></script>
    <script src="./vendor/confetti.browser.js"></script>

    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌙</text></svg>" />
  </head>
  <body>
    <div id="root"></div>
    <script src="./assets/bundle.js"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(distDir, 'index.html'), distHtml);
console.log('✓ Generated dist/index.html');

console.log('🎉 Build completed successfully with 0 errors!');
