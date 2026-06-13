import { Schema, Document, model, models } from 'mongoose';

export interface IPortfolio extends Document {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription?: string;
  startDate?: Date;
  completedDate?: Date;
  isOngoing: boolean;
  isFeatured: boolean;
  role?: string;
  techStack: string[];
  cloudinaryUrl: string;
  galleryUrls?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  figmaUrl?: string;
  youtubeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolio>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String },
    startDate: { type: Date },
    completedDate: { type: Date },
    isOngoing: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    role: { type: String },
    techStack: { type: [String], required: true },
    cloudinaryUrl: { type: String, required: true },
    galleryUrls: { type: [String], default: [] },
    githubUrl: { type: String },
    liveDemoUrl: { type: String },
    figmaUrl: { type: String },
    youtubeUrl: { type: String },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Mencegah OverwriteModelError saat Next.js hot-reloading
const Portfolio = models.Portfolio || model<IPortfolio>('Portfolio', PortfolioSchema);

export default Portfolio;
