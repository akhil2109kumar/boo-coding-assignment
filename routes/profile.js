"use strict";

const express = require("express");
const profileModel = require("../model/profileModel");
const router = express.Router();

module.exports = function () {
  router.get("/:id?", async function (req, res, next) {
    const id = req.params.id;
    let profile;
    if (!id) {
      profile = await profileModel
        .find({})
        .then((data) => data[0])
        .catch((error) => res.json({ error: error }));
    } else {
      profile = await profileModel
        .findById({ _id: req.params.id })
        .then((data) => data)
        .catch((error) => res.json({ error: error }));
    }
    res.render("profile_template", {
      profile: profile,
    });
  });

  return router;
};