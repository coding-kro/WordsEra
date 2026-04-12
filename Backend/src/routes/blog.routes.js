import { Router } from 'express';
import {
  showAllBlogController,
  addBlogController,
  deleteBlogController,
  editBlogControler,
  updateBlogController,
} from '../controllers/blog.controller.js';
import upload from '../config/multer.js'


export const router = Router();

router.post('/add', upload.single('file'), addBlogController);
router.get('/edit/:blogid', editBlogControler);
router.put('/update/:blogid', upload.single('file'), updateBlogController);
router.delete('/delete/:blogid', deleteBlogController);
router.get('/get-all', showAllBlogController);
