const express = require("express");
const router = express.Router();

const rewardsService = require("../services/rewards.service");

router.get("/rewards", rewardsService.findAll);
router.get("/rewards/:rewardId", rewardsService.findOne);

module.exports = router;
