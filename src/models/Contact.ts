import { Schema, Document, model, models } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// Mencegah OverwriteModelError saat Next.js hot-reloading
const Contact = models.Contact || model<IContact>('Contact', ContactSchema);

export default Contact;
