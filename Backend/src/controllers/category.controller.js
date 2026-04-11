import { handleError } from '../helpers/handleError.js';
import { categoryModel } from '../models/category.model.js';

export const addCategoryController = async (req, res, next) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return next(handleError(400, 'Name & slug is required'));
    }

    const category = await categoryModel.create({
      name,
      slug,
    });

    res.status(200).json({
      success: true,
      message: 'Category added successfully',
      data: category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showCategoryController = async (req, res, next) => {
  try {
    const { categoryid } = req.params;

    const category = await categoryModel.findById(categoryid);
    if (!category) {
      next(handleError(404, 'Data not found.'));
    }

    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateCategoryController = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const { categoryid } = req.params;

    if (!name || !slug) {
      return next(handleError(400, 'Name & slug is required'));
    }

    const category = await categoryModel.findByIdAndUpdate(
      categoryid,
      { name, slug },
      { new: true },
    );

    if (!category) {
      return next(handleError(404, 'Category not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteCategoryController = async (req, res, next) => {
  try {
    const { categoryid } = req.params;

    const category = await categoryModel.findByIdAndDelete(categoryid);

    if (!category) {
      return next(handleError(404, 'Category not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Category Deleted successfully',
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllCategoryController = async (req, res, next) => {
  try {
    const category = await categoryModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return res.status(200).json({
      category,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
