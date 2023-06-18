const express = require("express");
const { getAll, create, createValidation } = require("../controllers/dog.js");

const router = express.Router();

router.get("/dogs", getAll);

router.post("/dog", createValidation, create);

module.exports = router;
