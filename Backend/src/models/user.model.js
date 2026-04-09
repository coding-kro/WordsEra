import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      minlength: [4, 'Username must be at least 4 characters'],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, 'Email must be unique'],
      required: [true, 'Email is rerquired'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true },
);

export const userModel = mongoose.model('User', userSchema);
