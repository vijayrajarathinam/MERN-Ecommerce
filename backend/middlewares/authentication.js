const jwt = require("jsonwebtoken");
const catchAsync = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User");

exports.isAuthenticatedUser = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler("Unauthorized User", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

//handling users roles
exports.authorizeRoles = (...roles) => {
  return (req, _, next) => {
    if (!roles.includes(req.user.roles))
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
    next();
  };
};
