import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
    blogid: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Blogid is required'],
      ref: 'Blog',
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
    },
  },
  { timestamps: true },
);

export const commentModel = mongoose.model('Comment', commentSchema);
