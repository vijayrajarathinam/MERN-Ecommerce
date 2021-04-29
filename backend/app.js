const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//import all reoutes
const errorMiddleware = require("./middlewares/errors");
const products = require("./routes/productRoute");
const order = require("./routes/orderRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", products);
app.use("/api/v1", order);
app.use("/api/v1", user);

//middleware to handle errors
app.use(errorMiddleware);
module.exports = app;
