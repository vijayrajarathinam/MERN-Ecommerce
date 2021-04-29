const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

//Handle uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({ path: "backend/dev.env" });

const app = require("./app");
const connectDB = require("./models/db");

//connection to db
connectDB();

//setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = app.listen(process.env.PORT, () =>
  console.log(`${process.env.NODE_ENV} server is running in port ${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise rejection`);
  server.close(() => process.exit(1));
});
