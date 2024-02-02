"use strict";

const express = require("express");
const { getLike,createLike } = require("../controller/likesController");
const router = express.Router();

// router.patch("/", PostController.updatePost);

module.exports = function () {
  router.post("/", createLike);
  router.get("/:id?", getLike);
  return router;
};