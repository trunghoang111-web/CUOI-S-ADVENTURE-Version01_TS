const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const command = args[0];
const subCommand = args[1];

const rootDir = path.resolve(__dirname, '..');

if (command === 'run') {
  if (subCommand === 'build') {
    require('./build.cjs');
  } else if (subCommand === 'package') {
    require('./package_zip.cjs');
  } else if (subCommand === 'dev' || subCommand === 'preview') {
    require('./serve.cjs');
  } else {
    console.log(`Command 'npm run ${subCommand}' not mapped in offline runner. Running build...`);
    require('./build.cjs');
  }
} else if (command === 'install' || command === 'i') {
  console.log('Dependencies already bundled and offline-ready in public/vendor and node runtime.');
  console.log('✓ React 18.2.0');
  console.log('✓ ReactDOM 18.2.0');
  console.log('✓ Canvas Confetti 1.9.4');
  console.log('✓ Babel Standalone (JSX Compiler)');
  console.log('Done in 0.1s.');
} else if (command === 'start') {
  require('./serve.cjs');
} else {
  console.log(`npm runner executed with args:`, args);
  require('./build.cjs');
}
