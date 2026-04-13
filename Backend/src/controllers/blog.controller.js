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
    const { blogid } = req.params;

    const blog = await blogModel.findById(blogid).populate('category', 'name');
    if (!blog) {
      next(handleError(404, 'Data not found.'));
    }

    return res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateBlogController = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const data = JSON.parse(req.body.data);

    const blog = await blogModel.findById(blogid);

    blog.category = data.category;
    blog.title = data.title;
    blog.slug = data.slug;
    blog.blogContent = encode(data.blogContent);

    let featuredImage = blog.featuredImage;

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

    blog.featuredImage = featuredImage;

    await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteBlogController = async (req, res, next) => {
  try {
    const { blogid } = req.params;

    const blog = await blogModel.findByIdAndDelete(blogid);

    if (!blog) {
      return next(handleError(404, 'Blog not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Blog Deleted successfully',
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const showAllBlogController = async (req, res, next) => {
  try {
    const blog = await blogModel
      .find()
      .populate('author', 'username')
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      blog,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
