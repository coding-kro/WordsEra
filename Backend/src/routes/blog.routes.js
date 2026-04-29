import { Router } from 'express';
import {
  showAllBlogController,
  addBlogController,
  deleteBlogController,
  editBlogControler,
  updateBlogController,
  getBlogController,
  getRelatedBlogController,
  getBlogByCategoryController,
  searchController,
  getAllBlogsController,
} from '../controllers/blog.controller.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';

export const router = Router();

router.post('/add', authenticate, upload.single('file'), addBlogController);
router.get('/edit/:blogid', authenticate, editBlogControler);
router.put(
  '/update/:blogid',
  authenticate,
  upload.single('file'),
  updateBlogController,
);
router.delete('/delete/:blogid', authenticate, deleteBlogController);
router.get('/get-all', authenticate, showAllBlogController);

router.get('/get-blog/:slug', getBlogController);
router.get('/get-related-blog/:category/:blog', getRelatedBlogController);
router.get('/get-blog-by-category/:category', getBlogByCategoryController);
router.get('/search', searchController);
router.get('/blogs', getAllBlogsController);
