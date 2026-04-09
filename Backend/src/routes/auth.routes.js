import { Router } from 'express';
import {
  registerController,
  loginController,
  GoogleLoginController,
} from '../controllers/auth.controller.js';

export const router = Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/google-login', GoogleLoginController);
