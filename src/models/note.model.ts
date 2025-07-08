import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  type?: 'text' | 'checklist';
  items?: { text: string; done: boolean }[];
  pinned?: boolean;
  archived?: boolean;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['text', 'checklist'],
      default: 'text',
    },
    items: [
      {
        text: { type: String, required: true },
        done: { type: Boolean, default: false },
      },
    ],
    pinned: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model<INote>('Note', noteSchema);
