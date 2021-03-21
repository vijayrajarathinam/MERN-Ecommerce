const crypto = require("crypto");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const catchAsync = require("../middlewares/catchAsyncErrors");
const { send } = require("process");

exports.register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "i.stack.imgur.com/l60Hf", url: "https://i.stack.imgur.com/l60Hf.png" },
  });

  sendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next(new ErrorHandler("Please enter email & password", 400));

  // finding user in database
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Email or Password", 401));

  // check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) return next(new ErrorHandler("Invalid Email or Password", 401));

  sendToken(user, 200, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHandler(`User Not Found`, 404));

  //get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // create reset password url
  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message =
    `your password reset token is as follow:\n\n${resetUrl}\n\n ` +
    `If you have not requested this email, then please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({ success: true, message: `Email sent to: ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
  if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("password doesnot match", 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({ success: true, message: "Logged Out" });
});

exports.changePassword = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");

  // check previous user password
  const isMatched = user.comparePassword(req.body.oldPassword);

  if (!isMatched) next(new ErrorHandler("Old password is incorrect"));

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ succes: true, user });
});

exports.updateProfile = catchAsync(async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

exports.getUserDetails = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler(`User does not found with id : ${req.params.id}`));

  res.status(200).json({ success: true, user });
});

exports.updateUser = catchAsync(async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUser, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });

  res.status(200).json({ success: true });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new ErrorHandler(`User does not found with id : ${req.params.id}`));
  await user.remove();

  res.status(200).json({ success: true, user });
});
