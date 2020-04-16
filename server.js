const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const mongodb = require("./config/db").MONGOURL;
const bodyparser = require("body-parser");
const passport = require("passport");

// database connection
mongoose
  .connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(`database connection failed ${err}`);
  });

// bodyparser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// passport middleware
app.use(passport.initialize());

// passport congfiguration
require("./config/passport")(passport);

const userRoute = require("./routes/api/users");
const profileRoute = require("./routes/api/profile");
const postRoute = require("./routes/api/post");

// route handling
app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postRoute);

app.listen(port, (req, res) => {
  console.log(`express server started at port ${port}`);
});
