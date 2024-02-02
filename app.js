"use strict";

const express = require("express");
const { connect } = require("./connection/connection");
const bodyParser = require("body-parser");
const { initSeed } = require("./controller/profileController");
const app = express();
const port = process.env.PORT || 8080;

// set the view engine to ejs
app.set("view engine", "ejs");

// set bodyParser for JSON requests
app.use(bodyParser.json());

// routes
app.use("/", require("./routes/profile")());
app.use("/api/profile", require("./routes/profileApi")());
app.use("/api/comment", require("./routes/commentsRoutes")());
app.use("/api/likes",require("./routes/likeRoute")())

connect()
  .then(function () {
    try {
      // start server
      const server = app.listen(port);
      initSeed();
      console.log("Express started. Listening on %s", port);
    } catch {
      console.log("can't start server");
    }
  })
  .catch(function (err) {
    console.error("invalid database connection");
  });