import { Router } from 'express';
import {
  addCommentController,
  getCommentsController,
  commentCountController,
} from '../controllers/comment.controller.js';

export const router = Router();

router.post('/add', addCommentController);
router.get('/get/:blogid', getCommentsController);
router.get('/get-count/:blogid', commentCountController);
