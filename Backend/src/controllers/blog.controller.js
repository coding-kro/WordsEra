import { handleError } from '../helpers/handleError.js';
import { blogModel } from '../models/blog.model.js';
import cloudinary from '../config/cloudinary.js';
import { encode } from 'entities';

export const addBlogController = async (req, res, next) => {
  try {
    const data = JSON.parse(req.body.data);
    let featuredImage = '';

    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          folder: 'WordEra',
          resource_type: 'auto',
        })
        .catch((error) => {
          next(handleError(500, error.message));
        });
      featuredImage = uploadResult.secure_url;
    }

    const blog = await blogModel.create({
      author: data.author,
      category: data.category,
      title: data.title,
      slug: data.slug,
      featuredImage: featuredImage,
      blogContent: encode(data.blogContent),
    });

    res.status(200).json({
      success: true,
      message: 'Blog added successfully',
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const editBlogControler = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlogController = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlogController = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlogController = async (req, res, next) => {
  try {
  } catch (error) {
    next(handleError(500, error.message));
  }
};
