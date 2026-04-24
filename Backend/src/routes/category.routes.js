import { Router } from 'express';
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  showCategoryController,
  updateCategoryController,
} from '../controllers/category.controller.js';
import { onlyAdmin } from '../middleware/onlyAdmin.js';

export const router = Router();

router.post('/add', onlyAdmin, addCategoryController);
router.put('/update/:categoryid', onlyAdmin, updateCategoryController);
router.get('/show/:categoryid', onlyAdmin, showCategoryController);
router.delete('/delete/:categoryid', onlyAdmin, deleteCategoryController);
router.get('/all-category', getAllCategoryController);
