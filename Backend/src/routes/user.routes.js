import { Router } from 'express';
import { getUserController } from '../controllers/user.controller.js';

export const router = Router();

router.get('/get-user/:userId', getUserController);
