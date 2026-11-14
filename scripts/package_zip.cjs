const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Starting packaging for GitHub...');

const rootDir = path.resolve(__dirname, '..');
const zipFile = path.join(rootDir, 'cuois-moon-adventure.zip');

if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

const includeItems = [
  '.github',
  '.gitignore',
  'dist',
  'public',
  'src',
  'scripts',
  'index.html',
  'package.json',
  'vite.config.js',
  'README.md',
  'ASSET_MANIFEST.md',
  'CHAY_APP.bat',
  'MO_TRUC_TIEP.bat',
  'node.cmd',
  'npm.cmd'
];

console.log('Zipping project files using tar...');
const tarCommand = `tar.exe -a -c -f cuois-moon-adventure.zip ${includeItems.join(' ')}`;
execSync(tarCommand, { cwd: rootDir, stdio: 'inherit' });

if (fs.existsSync(zipFile)) {
  const stat = fs.statSync(zipFile);
  console.log(`✅ Successfully created cuois-moon-adventure.zip (${(stat.size / (1024 * 1024)).toFixed(2)} MB)`);
} else {
  console.error('❌ Failed to create zip file.');
}
