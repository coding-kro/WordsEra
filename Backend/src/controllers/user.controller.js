import { userModel } from '../models/user.model.js';
import { handleError } from '../helpers/handleError.js';
import bcryptjs from 'bcryptjs';
import cloudinary from '../config/cloudinary.js';

export const getUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findOne({ _id: userId }).lean().exec();

    if (!user) {
      next(handleError(404, 'User not found'));
    }

    res.status(200).json({
      success: true,
      message: 'User data found',
      user,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const updateUserController = async (req, res, next) => {
  try {
    // console.log(req.file);
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    user.username = data.username;
    user.email = data.email;
    user.bio = data.bio;

    if (data.password && data.password.length >= 6) {
      const hashedPassword = await bcryptjs(data.password, 10);
      user.password = hashedPassword;
    }

    if (req.file) {
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, { folder: 'WordsEra', resource_type: 'auto' })
        .catch((error) => {
          next(handleError(500, error.message));
        });

      user.avatar = uploadResult.secure_url;
    }

    await user.save();

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      message: 'Data updated',
      user: newUser,
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
