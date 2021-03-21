const { Schema, model } = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product name"],
    // maxLength: [100, "Product name cannot exceed 100 characters"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please select a category for this product"],
    enum: {
      values: [
        "Electronics",
        "Camera",
        "Laptop",
        "Accessories",
        "Headphones",
        "Food",
        "Book",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category for your product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please Select Product seller"],
  },
  stock: {
    type: String,
    required: [true, "Please select a product stock"],
    maxLength: [5, "Product Stock cannot exceed ten Thousands"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      ratating: {
        type: Number,
        required: true,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("product", productSchema);
