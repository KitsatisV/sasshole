#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

const templateDir = path.join(__dirname, 'template');
const targetDir = path.join(process.cwd(), 'src/scss');

copyRecursiveSync(templateDir, targetDir);
console.log('SASS folder structure copied successfully!');

// Check if SASS is installed
exec('sass --version', (error) => {
  if (error) {
    console.log('SASS is not installed. Installing SASS...');
    exec('npm install -g sass', (installError) => {
      if (installError) {
        console.error('Failed to install SASS:', installError);
      } else {
        console.log('SASS installed successfully!');
      }
    });
  } else {
    console.log('SASS is already installed.');
  }
});