import { Router } from 'express';
import {
  addCommentController,
  getCommentsController,
  commentCountController,
  getAllCommentsController,
  deleteCommentController,
} from '../controllers/comment.controller.js';
import { authenticate } from '../middleware/authenticate.js';

export const router = Router();

router.post('/add', authenticate, addCommentController);
router.get('/get/:blogid', getCommentsController);
router.get('/get-count/:blogid', commentCountController);
router.get('/get-all-comment', authenticate, getAllCommentsController);
router.delete('/delete/:commentid', authenticate, deleteCommentController);
