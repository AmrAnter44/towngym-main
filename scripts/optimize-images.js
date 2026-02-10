import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to process
const directories = [
  path.join(__dirname, '../public/assets/map'),
  path.join(__dirname, '../public/trans'),
  path.join(__dirname, '../public/coaches'),
];

// Output directory
const outputBase = path.join(__dirname, '../public/assets/optimized');

// Image sizes to generate (responsive)
const sizes = [640, 1024, 1920];

// Quality settings
const webpQuality = 80;
const jpgQuality = 85;

// Create output directory if it doesn't exist
if (!fs.existsSync(outputBase)) {
  fs.mkdirSync(outputBase, { recursive: true });
}

async function optimizeImage(inputPath, relativePath) {
  const fileName = path.basename(inputPath, path.extname(inputPath));
  const relativeDir = path.dirname(relativePath);

  // Create subdirectories in optimized folder
  const outputDir = path.join(outputBase, relativeDir);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    console.log(`Processing: ${relativePath} (${metadata.width}x${metadata.height})`);

    // Generate WebP versions at different sizes
    for (const size of sizes) {
      if (size <= metadata.width) {
        const outputPath = path.join(outputDir, `${fileName}-${size}w.webp`);
        await image
          .clone()
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: webpQuality })
          .toFile(outputPath);
        console.log(`  ✓ Generated ${size}w WebP`);
      }
    }

    // Generate full-size WebP
    const fullSizeWebP = path.join(outputDir, `${fileName}.webp`);
    await image
      .clone()
      .webp({ quality: webpQuality })
      .toFile(fullSizeWebP);
    console.log(`  ✓ Generated full-size WebP`);

    // Generate optimized JPG fallback
    const fallbackJpg = path.join(outputDir, `${fileName}.jpg`);
    await image
      .clone()
      .jpeg({ quality: jpgQuality, mozjpeg: true })
      .toFile(fallbackJpg);
    console.log(`  ✓ Generated optimized JPG fallback`);

    // Calculate size reduction
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(fullSizeWebP).size;
    const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(`  📉 Size reduction: ${reduction}% (${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(webpSize / 1024 / 1024).toFixed(2)}MB)`);

  } catch (error) {
    console.error(`  ❌ Error processing ${relativePath}:`, error.message);
  }
}

async function processDirectory(dir, baseDir) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath, baseDir);
    } else if (stat.isFile()) {
      const ext = path.extname(item).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        await optimizeImage(fullPath, relativePath);
      }
    }
  }
}

async function main() {
  console.log('🚀 Starting image optimization...\n');

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const dir of directories) {
    if (fs.existsSync(dir)) {
      console.log(`\n📁 Processing directory: ${path.relative(path.join(__dirname, '..'), dir)}\n`);
      const baseDir = path.join(__dirname, '../public');
      await processDirectory(dir, baseDir);
    } else {
      console.log(`⚠️  Directory not found: ${dir}`);
    }
  }

  console.log('\n✅ Image optimization complete!');
  console.log(`\n📊 All optimized images saved to: ${path.relative(path.join(__dirname, '..'), outputBase)}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Create LazyImage component');
  console.log('   2. Update image references in components to use LazyImage');
  console.log('   3. Test image loading on all pages');
}

main().catch(console.error);
