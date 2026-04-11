import { Router } from 'express';
import {
  getUserController,
  updateUserController,
} from '../controllers/user.controller.js';
import upload from '../config/multer.js';

export const router = Router();

router.get('/get-user/:userId', getUserController);
router.put('/update-user/:userId', upload.single('file'), updateUserController);
