import { Schema, Document, model, models } from 'mongoose';

export interface IProfile extends Document {
  name: string;
  title: string;
  bio: string;
  avatarUrl?: string;
  skills: string[];
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  contactEmail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    avatarUrl: { type: String },
    skills: { type: [String], default: [] },
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
      instagram: { type: String },
    },
    contactEmail: { type: String },
  },
  {
    timestamps: true,
  }
);

// Mencegah OverwriteModelError saat Next.js hot-reloading
const Profile = models.Profile || model<IProfile>('Profile', ProfileSchema);

export default Profile;
