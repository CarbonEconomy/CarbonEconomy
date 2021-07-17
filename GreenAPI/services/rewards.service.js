const rewards = {
  5: 10,
  6: 20,
  7: 30,
};

module.exports = {
  findAll: (req, res) => {
    return res.status(200).json({ rewards: rewards });
  },
  findOne: (req, res) => {
    return res.status(200).json({ reward: rewards[req.params.rewardId] });
  },
};
