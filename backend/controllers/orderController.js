const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
// const ApiUtils = require("../utils/ApiUtils");
const catchAsync = require("../middlewares/catchAsyncErrors");

exports.create = catchAsync(async (req, res) => {
  const { orderItems, shippingInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paymaneInfo } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymaneInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({ success: true, order });
});

exports.getOneOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) next(new ErrorHandler(`No Order found with ID `, 404));

  res.status(200).json({ success: true, order });
});

exports.myOrder = catchAsync(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({ success: true, orders });
});

exports.getAll = catchAsync(async (req, res) => {
  const orders = await Order.find();
  // let totalAmount = 0;

  // orders.forEach(order => totalAmount+= order.totalPrice);
  const totalAmount = orders.reduce((total, curr) => total + curr.totalPrice, 0);

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
