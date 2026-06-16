import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- TYPES ---
export interface BenefitHighlight {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  features?: string[];
  galleryUrls?: string[];
  price: string;
  thumbnailUrl: string;
  platformName: string;
  externalLink: string;
  previewLink?: string;
  badge?: string;
  storyHook?: string;
  problemStory?: string;
  benefitHighlights?: BenefitHighlight[];
  content?: string; // The markdown body
}

export interface Portfolio {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  startDate?: string;
  completedDate?: string;
  isOngoing: boolean;
  isFeatured: boolean;
  category?: string;
  role?: string;
  techStack: string[];
  cloudinaryUrl: string;
  galleryUrls?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  figmaUrl?: string;
  youtubeUrl?: string;
  background?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  content?: string; // The markdown body
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
}

export interface CreativeProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  img: string;
  shortDescription?: string;
  content?: string;
}

export interface MarketingSnapshot {
  industry: string;
  scope: string;
  timeline: string;
  tools: string;
  role: string;
}

export interface MarketingOutcome {
  metric: string;
  label: string;
}

export interface MarketingCampaign {
  id: string;
  slug: string;
  title: string;
  category: string;
  size: 'small' | 'medium' | 'large';
  img: string;
  shortDescription?: string;
  snapshot: MarketingSnapshot;
  outcomes: MarketingOutcome[];
  content?: string;
}

// --- CORE UTILS ---
const CONTENT_PATH = path.join(process.cwd(), 'src', 'content');

function getMdxFiles(dirPath: string) {
  try {
    return fs.readdirSync(dirPath).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  } catch (error) {
    return []; // Return empty array if directory doesn't exist
  }
}

function parseMdxFile<T>(filePath: string): T {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  return { ...data, content } as T;
}

// --- PRODUCTS API ---
const PRODUCTS_DIR = path.join(CONTENT_PATH, 'products');

export function getAllProducts(): ProductItem[] {
  const files = getMdxFiles(PRODUCTS_DIR);
  return files.map((file) => {
    const filePath = path.join(PRODUCTS_DIR, file);
    return parseMdxFile<ProductItem>(filePath);
  });
}

export function getProductById(id: string): ProductItem | undefined {
  const products = getAllProducts();
  return products.find((product) => product.id === id);
}

// --- PORTFOLIOS API ---
const PORTFOLIOS_DIR = path.join(CONTENT_PATH, 'portfolios');

export function getAllPortfolios(): Portfolio[] {
  const files = getMdxFiles(PORTFOLIOS_DIR);
  return files.map((file) => {
    const filePath = path.join(PORTFOLIOS_DIR, file);
    return parseMdxFile<Portfolio>(filePath);
  });
}

export function getPortfolioBySlug(slug: string): Portfolio | undefined {
  const portfolios = getAllPortfolios();
  return portfolios.find((portfolio) => portfolio.slug === slug);
}

// --- ARTICLES API ---
const ARTICLES_DIR = path.join(CONTENT_PATH, 'articles');

export function getAllArticles(): Article[] {
  const files = getMdxFiles(ARTICLES_DIR);
  return files.map((file) => {
    const filePath = path.join(ARTICLES_DIR, file);
    return parseMdxFile<Article>(filePath);
  });
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug);
}

// --- CREATIVE PROJECTS API ---
const CREATIVE_DIR = path.join(CONTENT_PATH, 'creative');

export function getAllCreativeProjects(): CreativeProject[] {
  const files = getMdxFiles(CREATIVE_DIR);
  return files.map((file) => {
    const filePath = path.join(CREATIVE_DIR, file);
    return parseMdxFile<CreativeProject>(filePath);
  });
}

// --- MARKETING CAMPAIGNS API ---
const MARKETING_DIR = path.join(CONTENT_PATH, 'marketing');

export function getAllMarketingCampaigns(): MarketingCampaign[] {
  const files = getMdxFiles(MARKETING_DIR);
  return files.map((file) => {
    const filePath = path.join(MARKETING_DIR, file);
    return parseMdxFile<MarketingCampaign>(filePath);
  });
}

export function getMarketingCampaignBySlug(slug: string): MarketingCampaign | undefined {
  const campaigns = getAllMarketingCampaigns();
  return campaigns.find((campaign) => campaign.slug === slug);
}
