import { userModel } from '../models/user.model.js';
import { handleError } from '../helpers/handleError.js';

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
