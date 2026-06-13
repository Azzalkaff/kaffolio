import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const CONTENT_TYPES = ['products', 'portfolios', 'articles'];

async function downloadImage(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${dest}`);
  } catch (error) {
    console.error(`❌ Error downloading ${url}:`, error.message);
  }
}

function getExt(url) {
  if (url.includes('unsplash.com')) return '.jpg';
  if (url.includes('.png')) return '.png';
  if (url.includes('.jpg') || url.includes('.jpeg')) return '.jpg';
  return '.jpg'; // default fallback
}

async function processFile(filePath, typeDir) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownBody } = matter(content);
  
  const idOrSlug = data.slug || data.id || path.basename(filePath, '.md');
  const localImgDir = path.join(rootDir, 'public', 'images', typeDir, idOrSlug);
  const relativeImgPathBase = `/images/${typeDir}/${idOrSlug}`;
  
  let isModified = false;
  let newFrontmatter = { ...data };
  let newMarkdownBody = markdownBody;

  // 1. Process cloudinaryUrl (Thumbnail)
  if (data.cloudinaryUrl && data.cloudinaryUrl.startsWith('http')) {
    const ext = getExt(data.cloudinaryUrl);
    const filename = `thumbnail${ext}`;
    const dest = path.join(localImgDir, filename);
    await downloadImage(data.cloudinaryUrl, dest);
    newFrontmatter.cloudinaryUrl = `${relativeImgPathBase}/${filename}`;
    isModified = true;
  }

  // 2. Process galleryUrls
  if (data.galleryUrls && Array.isArray(data.galleryUrls)) {
    newFrontmatter.galleryUrls = [];
    for (let i = 0; i < data.galleryUrls.length; i++) {
      const url = data.galleryUrls[i];
      if (url.startsWith('http')) {
        const ext = getExt(url);
        const filename = `gallery-${i + 1}${ext}`;
        const dest = path.join(localImgDir, filename);
        await downloadImage(url, dest);
        newFrontmatter.galleryUrls.push(`${relativeImgPathBase}/${filename}`);
        isModified = true;
      } else {
        newFrontmatter.galleryUrls.push(url);
      }
    }
  }

  // 3. Process benefitHighlights.imageUrl
  if (data.benefitHighlights && Array.isArray(data.benefitHighlights)) {
    for (let i = 0; i < data.benefitHighlights.length; i++) {
      const hl = data.benefitHighlights[i];
      if (hl.imageUrl && hl.imageUrl.startsWith('http')) {
        const ext = getExt(hl.imageUrl);
        const filename = `benefit-${i + 1}${ext}`;
        const dest = path.join(localImgDir, filename);
        await downloadImage(hl.imageUrl, dest);
        hl.imageUrl = `${relativeImgPathBase}/${filename}`;
        isModified = true;
      }
    }
  }

  // 4. Process images in Markdown Body (![alt](url))
  const imgRegex = /!\[([^\]]*)\]\((https?:\/\/[^\)]+)\)/g;
  let match;
  let counter = 1;
  while ((match = imgRegex.exec(markdownBody)) !== null) {
    const alt = match[1];
    const url = match[2];
    const ext = getExt(url);
    const filename = `body-img-${counter}${ext}`;
    const dest = path.join(localImgDir, filename);
    await downloadImage(url, dest);
    
    // Replace in body
    newMarkdownBody = newMarkdownBody.replace(url, `${relativeImgPathBase}/${filename}`);
    isModified = true;
    counter++;
  }

  // Write back if modified
  if (isModified) {
    const newContent = matter.stringify(newMarkdownBody, newFrontmatter);
    fs.writeFileSync(filePath, newContent);
    console.log(`📝 Updated file: ${filePath}`);
  }
}

async function main() {
  for (const type of CONTENT_TYPES) {
    const typePath = path.join(rootDir, 'src', 'content', type);
    if (!fs.existsSync(typePath)) continue;
    
    const files = fs.readdirSync(typePath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    for (const file of files) {
      console.log(`\nProcessing ${type}/${file}...`);
      await processFile(path.join(typePath, file), type);
    }
  }
  console.log('\n🎉 Migration complete!');
}

main();
