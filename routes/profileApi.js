"use strict";

const express = require("express");
const {
  CreateProfile,
  GetProfile,
} = require("../controller/profileController");
const router = express.Router();

module.exports = function () {
  router.post("/", CreateProfile);
  router.get("/", GetProfile);
  return router;
};
