const https = require('https');
const fs = require('fs');
const path = require('path');

// Function to download a file from a URL
function downloadFile(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${outputPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

// Create the assets/images directory if it doesn't exist
const assetsDir = path.join(__dirname, '..', 'assets', 'images');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Download placeholder images
const images = [
  {
    url: 'https://placehold.co/1024x1024/6200ee/ffffff?text=LW',
    path: path.join(assetsDir, 'icon.png')
  },
  {
    url: 'https://placehold.co/1242x2436/6200ee/ffffff?text=LearnWise',
    path: path.join(assetsDir, 'splash.png')
  },
  {
    url: 'https://placehold.co/1024x1024/6200ee/ffffff?text=LW',
    path: path.join(assetsDir, 'adaptive-icon.png')
  },
  {
    url: 'https://placehold.co/32x32/6200ee/ffffff?text=LW',
    path: path.join(assetsDir, 'favicon.png')
  }
];

// Download all images
Promise.all(images.map(img => downloadFile(img.url, img.path)))
  .then(() => {
    console.log('All placeholder images downloaded successfully!');
  })
  .catch(err => {
    console.error('Error downloading placeholder images:', err);
  }); 