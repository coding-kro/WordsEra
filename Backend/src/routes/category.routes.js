import { Router } from 'express';
import {
  addCategoryController,
  deleteCategoryController,
  getAllCategoryController,
  showCategoryController,
  updateCategoryController,
} from '../controllers/category.controller.js';

export const router = Router();

router.post('/add', addCategoryController);
router.put('/update/:categoryid', updateCategoryController);
router.get('/show/:categoryid', showCategoryController);
router.delete('/delete/:categoryid', deleteCategoryController);
router.get('/all-category', getAllCategoryController);
