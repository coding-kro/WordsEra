import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { router as authRoutes } from './routes/auth.routes.js';
import { router as userRoutes } from './routes/user.routes.js';
import { router as categoryRoutes } from './routes/category.routes.js';
import { router as blogRoutes } from './routes/blog.routes.js';
import { router as commentRoutes } from './routes/comment.routes.js';

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Test route
// app.get('/', (req, res) => {
//   res.send('API is running ');
// });

// route setup
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
