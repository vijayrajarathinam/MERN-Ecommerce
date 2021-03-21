const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((con) => console.log(`Mongodb is connected to host ${con.connection.host}`));
};

module.exports = connectDB;
