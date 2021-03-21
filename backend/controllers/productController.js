const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const ApiUtils = require("../utils/ApiUtils");
const catchAsync = require("../middlewares/catchAsyncErrors");

const RESULT_PER_PAGE = 10;

exports.create = catchAsync(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

exports.all = catchAsync(async (req, res) => {
  const total = await Product.countDocuments();
  const apiResponse = new ApiUtils(Product.find(), req.query).search().filter().pagination(RESULT_PER_PAGE);
  const products = await apiResponse.query;
  res.status(200).json({ success: true, total, count: products.length, data: products });
});

exports.getOne = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not Found", 404));
  res.status(200).json({ success: true, data: product });
};

exports.update = async (req, res) => {
  const { params, body } = req;
  const product = await Product.findById(params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not Found" });

  const updated = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, data: updated });
};

exports.remove = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not Found" });

  await product.remove();
  res.status(200).json({ success: true, message: "Product Deleted Successfully!!..." });
};
