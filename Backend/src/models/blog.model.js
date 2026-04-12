import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'category is required'],
    },
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    blogContent: {
      type: String,
      required: [true, 'Blog content is required'],
      trim: true,
    },
    featuredImage: {
      type: String,
      required: [true, 'Features image is required'],
      trime: true,
    },
  },
  { timestamps: true },
);

export const blogModel = mongoose.model('Blog', blogSchema);
