/**
 * angular-fix.js
 * Script tout-en-un pour préparer ton projet Angular à compiler sans erreur
 */

const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'src', 'app');

/** Recursively list all TS files in a folder */
function getAllFiles(dir, ext = '.ts', fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, ext, fileList);
    } else if (fullPath.endsWith(ext)) {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

/** Correct TS properties */
function correctProperties(file) {
  let content = fs.readFileSync(file, 'utf8');
  const origContent = content;

  content = content.replace(/\.titre\b/g, '.title');
  content = content.replace(/\.filiere\?\.(id)\b/g, '.filiere.id');

  if (content !== origContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Propriétés corrigées dans : ${file}`);
  }
}

/** Update module imports for FormsModule, ReactiveFormsModule, CommonModule */
function fixModuleImports(file) {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  const importsNeeded = [];
  if (!/FormsModule/.test(content)) importsNeeded.push('FormsModule');
  if (!/ReactiveFormsModule/.test(content)) importsNeeded.push('ReactiveFormsModule');
  if (!/CommonModule/.test(content)) importsNeeded.push('CommonModule');

  if (importsNeeded.length > 0) {
    // Ajouter l'import en haut
    content = `import { ${importsNeeded.join(', ')} } from '@angular/forms';\n` + content;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Modules ajoutés/imports fixés : ${file}`);
  }
}

/** Detect and declare missing components in NgModule */
function fixModuleDeclarations(file) {
  let content = fs.readFileSync(file, 'utf8');

  const componentRegex = /import { ([\w]+) } from .+\.component/gi;
  let match;
  const importedComponents = [];

  while ((match = componentRegex.exec(content)) !== null) {
    importedComponents.push(match[1]);
  }

  const declarationsMatch = content.match(/declarations\s*:\s*\[([^\]]*)\]/s);
  if (declarationsMatch) {
    let declarationsContent = declarationsMatch[1];
    let missingComponents = importedComponents.filter(c => !declarationsContent.includes(c));
    if (missingComponents.length > 0) {
      declarationsContent = declarationsContent.trim().endsWith(',')
        ? declarationsContent + ' ' + missingComponents.join(', ')
        : declarationsContent + ', ' + missingComponents.join(', ');

      content = content.replace(/declarations\s*:\s*\[[^\]]*\]/s, `declarations: [${declarationsContent}]`);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Composants ajoutés aux declarations : ${file}`);
    }
  }
}

/** Fix SharedModule paths */
function fixSharedModulePaths(file) {
  let content = fs.readFileSync(file, 'utf8');
  let updated = false;

  const sharedRegex = /from\s+['"]\.\/shared\/shared\.module['"]/g;
  if (sharedRegex.test(content)) {
    content = content.replace(sharedRegex, `from './shared/shared.module'`);
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Chemins SharedModule corrigés : ${file}`);
  }
}

// --- EXECUTION ---

console.log('⚡ Début du script Angular Fix tout-en-un...');

const tsFiles = getAllFiles(appDir, '.ts');
tsFiles.forEach(file => {
  correctProperties(file);
  if (file.endsWith('module.ts')) {
    fixModuleImports(file);
    fixModuleDeclarations(file);
    fixSharedModulePaths(file);
  }
});

console.log('🎯 Script terminé : toutes les corrections automatiques appliquées.');
console.log('⚠️ Vérifie manuellement les templates HTML pour assignations interdites ou expressions complexes.');
