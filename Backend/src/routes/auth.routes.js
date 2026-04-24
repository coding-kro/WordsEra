import { Router } from 'express';
import {
  registerController,
  loginController,
  GoogleLoginController,
  logoutController,
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';

export const router = Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/google-login', GoogleLoginController);

router.get('/logout', authenticate, logoutController);
