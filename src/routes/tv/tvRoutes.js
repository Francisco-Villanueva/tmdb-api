const express = require("express");
const router = express.Router();
const { getDetails, allTvData, getVideo, getSimilar } = require("./services");

router.get("/", allTvData);
router.get("/details/:tv_id", getDetails);
router.get("/video/:tv_id", getVideo);
router.get("/similar/:tv_id", getSimilar);

module.exports = router;
