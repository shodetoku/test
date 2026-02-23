import fs from 'fs';
import path from 'path';

const colorMap = {
  '#10b981': '#015396',
  '#059669': '#002B4D',
  '#047857': '#001a2e',
  '#0d9e6e': '#003d6b',
  '#34d399': '#0272c9',
  '#6ee7b7': '#3397cf',
  '#a7f3d0': '#66b1db',
  '#d1fae5': '#99cbe7',
  '#f0fdf4': '#e6f2f9',
  '#dcfce7': '#cce5f3',
  '#bbf7d0': '#99cbe7',
  '#86efac': '#66b1db',
  '#4ade80': '#3397cf',
  '#22c55e': '#015396',
  '#16a34a': '#014278',
  '#15803d': '#01325a',
  '#166534': '#00213c',
  '#145231': '#002B4D',
  'rgba(16,185,129': 'rgba(1,83,150',
  'rgba(16, 185, 129': 'rgba(1, 83, 150',
  'rgba(5,150,105': 'rgba(0,43,77'
};

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    if (content.includes(oldColor)) {
      content = content.split(oldColor).join(newColor);
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir, filePattern) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules')) {
      walkDir(filePath, filePattern);
    } else if (stat.isFile() && filePattern.test(file)) {
      updateFile(filePath);
    }
  });
}

walkDir('./src', /\.(css|jsx)$/);
console.log('Color update complete!');
