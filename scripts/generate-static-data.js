/**
 * Build script: Generate static JSON data from markdown files
 * This script reads markdown files from content/ directory and generates
 * JSON files in public/data/ for use in the static site.
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Directories
const contentDir = path.join(process.cwd(), 'content');
const productsDir = path.join(contentDir, 'products');
const outputDir = path.join(process.cwd(), 'public', 'data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('✓ Created output directory:', outputDir);
}

/**
 * Generate products.json from markdown files
 */
function generateProducts() {
  console.log('\n📦 Generating products data...');

  if (!fs.existsSync(productsDir)) {
    console.warn('⚠️  Products directory not found:', productsDir);
    return;
  }

  const filenames = fs.readdirSync(productsDir);
  const products = [];

  filenames
    .filter((filename) => filename.endsWith('.md'))
    .forEach((filename) => {
      const filePath = path.join(productsDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);

      const product = {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || '',
        description: data.description || '',
        specifications: data.specifications || '',
        features: data.features || [],
        gallery: data.gallery || [],
        price: data.price,
        rooms: data.rooms || [],
        colors: data.colors || [],
        dimensions: data.dimensions || [],
        collection: data.collection || '',
      };

      products.push(product);
      console.log(`  ✓ Processed: ${product.title} (${product.slug})`);
    });

  // Write products.json
  const outputPath = path.join(outputDir, 'products.json');
  fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
  console.log(`✓ Generated: ${outputPath} (${products.length} products)`);

  return products;
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting static data generation...');
  console.log('Content directory:', contentDir);
  console.log('Output directory:', outputDir);

  try {
    const products = generateProducts();

    console.log('\n✅ Static data generation complete!');
    console.log(`   Products: ${products.length}`);
  } catch (error) {
    console.error('\n❌ Error generating static data:', error);
    process.exit(1);
  }
}

// Run the script
main();
