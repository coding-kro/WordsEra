import { handleError } from '../helpers/handleError.js';
import { commentModel } from '../models/comment.model.js';

export const addCommentController = async (req, res, next) => {
  try {
    const { user, blogid, comment } = req.body;
    const newComment = new commentModel({
      user: user,
      blogid: blogid,
      comment: comment,
    });

    await newComment.save();
    res.status(200).json({
      success: true,
      message: 'Comment submited.',
      comment: newComment,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getCommentsController = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const comments = await commentModel
      .find({ blogid })
      .populate('user', 'username avatar')
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const commentCountController = async (req, res, next) => {
  try {
    const { blogid } = req.params;
    const commentCount = await commentModel.countDocuments({ blogid });

    res.status(200).json({
      commentCount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const getAllCommentsController = async (req, res, next) => {
  try {
    const user = req.user;

    let comments;
    if (user.role === 'admin') {
      comments = await commentModel
        .find()
        .populate('blogid', 'title')
        .populate('user', 'username');
    } else {
      comments = await commentModel
        .find({ user: user.id })
        .populate('blogid', 'title')
        .populate('user', 'username');
    }

    res.status(200).json({
      comments,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
    const { commentid } = req.params;

    const deletedComment = await commentModel.findByIdAndDelete(commentid);

    if (!deletedComment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Data deleted',
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
