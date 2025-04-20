const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files that import from nativewind
const findFiles = () => {
  try {
    const result = execSync('grep -r "import.*nativewind" --include="*.tsx" --include="*.ts" components/').toString();
    return result.split('\n').filter(line => line.trim() !== '');
  } catch (error) {
    console.error('Error finding files:', error);
    return [];
  }
};

// Update the import statement in a file
const updateFile = (filePath) => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace any existing nativewind import with the new one
    const oldImportRegex = /import\s+{\s*styled\s*}\s+from\s+['"].*nativewind.*['"]/;
    const newImport = "import { styled } from 'nativewind'";
    
    if (oldImportRegex.test(content)) {
      content = content.replace(oldImportRegex, newImport);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
      return true;
    } else {
      console.log(`No matching import found in ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error);
    return false;
  }
};

// Main function
const main = () => {
  console.log('Finding files with nativewind imports...');
  const files = findFiles();
  
  if (files.length === 0) {
    console.log('No files found with nativewind imports.');
    return;
  }
  
  console.log(`Found ${files.length} files with nativewind imports.`);
  
  let updatedCount = 0;
  
  files.forEach(line => {
    const filePath = line.split(':')[0];
    if (updateFile(filePath)) {
      updatedCount++;
    }
  });
  
  console.log(`Updated ${updatedCount} files.`);
};

main(); 