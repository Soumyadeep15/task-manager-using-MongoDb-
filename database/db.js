const mongoose = require("mongoose");
require('dotenv').config
mongoose
  .connect("mongodb://localhost:27017/task-manager", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("not connect to database", err);
  });