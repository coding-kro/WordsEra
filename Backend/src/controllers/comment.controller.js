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
      .populate('user', 'name avatar')
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

// export const getAllCommentsController = async (req, res, next) => {
//   try {
//     const user = req.user;
//     let comments;
//     if (user.role === 'admin') {
//       comments = await commentModel.find()
//         .populate('blogid', 'title')
//         .populate('user', 'name');
//     } else {
//       comments = await commentModel.find({ user: user._id })
//         .populate('blogid', 'title')
//         .populate('user', 'name');
//     }

//     res.status(200).json({
//       comments,
//     });
//   } catch (error) {
//     next(handleError(500, error.message));
//   }
// };

// export const deleteCommentController = async (req, res, next) => {
//   try {
//     const { commentid } = req.params;
//     await commentModel.findByIdAndDelete(commentid);

//     res.status(200).json({
//       success: true,
//       message: 'Data deleted',
//     });
//   } catch (error) {
//     next(handleError(500, error.message));
//   }
// };
