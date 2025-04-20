const fs = require('fs');
const path = require('path');

// Create a simple colored square as a placeholder icon
function createColoredSquare(size, color, outputPath) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Fill with color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  
  // Add some text
  ctx.fillStyle = 'white';
  ctx.font = `${size/4}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('LW', size/2, size/2);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created ${outputPath}`);
}

// Since we can't use canvas in Node.js directly, let's create a simple text file
// that explains how to create the icons manually
const iconInstructions = `
Please create the following icon files manually:

1. assets/images/icon.png - A 1024x1024 app icon
2. assets/images/splash.png - A 1242x2436 splash screen
3. assets/images/adaptive-icon.png - A 1024x1024 adaptive icon for Android
4. assets/images/favicon.png - A 32x32 favicon for web

You can use any image editing software to create these files.
For a quick solution, you can use online tools like:
- https://www.canva.com/
- https://www.figma.com/
- https://www.adobe.com/express/create/icon

Or download placeholder images from:
- https://placeholder.com/
- https://placehold.co/
`;

fs.writeFileSync(path.join(__dirname, 'icon-instructions.txt'), iconInstructions);
console.log('Created icon instructions file at scripts/icon-instructions.txt'); 