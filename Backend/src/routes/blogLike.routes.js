import { Router } from 'express';
import {
  doLikeController,
  likeCountController,
} from '../controllers/blogLike.controller.js';
import { authenticate } from '../middleware/authenticate.js';

export const router = Router();

router.post('/do-like', authenticate, doLikeController);
router.get('/get-like/:blogid', likeCountController);
router.get('/get-like/:blogid/:userid', likeCountController);
