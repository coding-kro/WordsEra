import { Router } from 'express';
import {
  deleteUserController,
  getAllUserController,
  getUserController,
  updateUserController,
} from '../controllers/user.controller.js';
import upload from '../config/multer.js';
import { authenticate } from '../middleware/authenticate.js';

export const router = Router();

router.use(authenticate);

router.get('/get-user/:userId', getUserController);
router.put('/update-user/:userId', upload.single('file'), updateUserController);
router.get('/get-all-user', getAllUserController);
router.delete('/delete/:id', deleteUserController);
