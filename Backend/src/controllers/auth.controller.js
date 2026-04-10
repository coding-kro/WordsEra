import { handleError } from '../helpers/handleError.js';
import { userModel } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(handleError(401, 'Username, Email and Password is required'));
    }

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return next(handleError(409, 'User already registered'));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'User register successfully',
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(handleError(400, 'Email and password is required'));
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(handleError(401, 'Invalid login credentials.'));
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return next(handleError(401, 'Invalid login credentials.'));
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      path: '/',
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: 'Login successfully',
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

export const GoogleLoginController = async (req, res, next) => {
  try {
    const { username, email, avatar } = req.body;

    if (!username || !email || !avatar) {
      return next(
        handleError(400, 'Username , email and password is required'),
      );
    }
    let user;
    user = await userModel.findOne({ email });

    if (!user) {
      // create new user
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        avatar,
      });

      user = await newUser.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      path: '/',
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: 'Login successfully',
    });
  } catch (err) {
    next(handleError(500, err.message));
  }
};

export const logoutController = async (req, res, next) => {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      path: '/',
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful.',
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};
