require("dotenv").config("./.env");

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const mongodb = require("./config/db").MONGOURL;
const bodyparser = require("body-parser");
const passport = require("passport");
const path = require('path')

// database connection
mongoose
  .connect(mongodb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
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

//  server static assests if in production
if(process.env.NODE_ENV ==="production"){
  // set static folders
  app.use(express.static('client/build'))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.listen(port, (req, res) => {
  console.log(`express server started at port ${port}`);
});
