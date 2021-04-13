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
  res.status(200).json({ success: true, total, count: products.length, data: products, resPerPage: RESULT_PER_PAGE });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product not Found", 404));
  res.status(200).json({ success: true, data: product });
});

exports.update = catchAsync(async (req, res) => {
  const { params, body } = req;
  const product = await Product.findById(params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not Found" });

  const updated = await Product.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, data: updated });
});

exports.remove = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ success: false, message: "Product not Found" });

  await product.remove();
  res.status(200).json({ success: true, message: "Product Deleted Successfully!!..." });
});

// review section
exports.createReview = catchAsync(async (req, res) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());

  if (isReviewed)
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

exports.getReviews = catchAsync(async (req, res) => {
  const { reviews } = await Product.findById(req.query.id);
  res.status(200).json({ status: true, reviews });
});

exports.deleteReview = catchAsync(async (req, res) => {
  const product = await Product.findById(req.query.productId);

  const reviews = product.reviews.filter((review) => review._id.toString() === req.query.id.toString());
  const numOfReviews = reviews.length;
  const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  await Product.findByIdAndUpdate(
    req.query.id,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true });
});
