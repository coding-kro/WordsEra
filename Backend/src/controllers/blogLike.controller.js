import { handleError } from '../helpers/handleError.js';
import { likeModel } from '../models/bloglike.model.js';

export const doLikeController = async (req, res, next) => {
  try {
    const { user, blogid } = req.body;

    let like;
    like = await likeModel.findOne({ user, blogid });

    if (!like) {
      const saveLike = new likeModel({
        user,
        blogid,
      });
      like = await saveLike.save();
    } else {
      await likeModel.findByIdAndDelete(like._id);
    }

    const likecount = await likeModel.countDocuments({ blogid });

    res.status(200).json({
      likecount,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const likeCountController = async (req, res, next) => {
  try {
    const { blogid, userid } = req.params;

    const likecount = await likeModel.countDocuments({
      blog: blogid,
    });

    let isUserLiked = false;

    if (userid) {
      const getuserlike = await likeModel.exists({
        blog: blogid,
        user: userid,
      });

      isUserLiked = !!getuserlike;
    }

    res.status(200).json({
      likecount,
      isUserLiked,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
