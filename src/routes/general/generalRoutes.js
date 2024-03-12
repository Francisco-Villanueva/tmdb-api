const express = require("express");
const router = express.Router();

const { search } = require("./services");

router.get("/search/s=:toSearch", search);
module.exports = router;
