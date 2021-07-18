import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';
import 'package:green_pouch/my_colours.dart';

class Rewards extends StatelessWidget {
  late List<Reward> rewards;

  Rewards(List<Reward> rewards, UserReward userReward) {
    Map<String, Reward> idToReward =
        rewards.fold(Map(), (previousValue, element) {
      previousValue[element.id] = element;
      return previousValue;
    });

    this.rewards = userReward.rewardIds
        .map<Reward?>((e) => idToReward[e])
        .where((element) => element != null)
        .map<Reward>((e) => e!)
        .toList();
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      physics: ScrollPhysics(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Your vouchers",
            style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.bold,
                color: MyColours.HEADER_TEXT_COLOUR),
          ),
          ListView.builder(
              physics: NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              itemCount: this.rewards.length,
              itemBuilder: (context, index) => RewardTile(rewards[index]))
        ],
      ),
    );
  }
}

class RewardTile extends StatelessWidget {
  Reward reward;

  RewardTile(this.reward);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 10),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
            height: 13,
            width: 13,
            decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: Colors.blue, width: 4)),
          ),
          SizedBox(
            width: 10,
          ),
          Column(
            children: [
              Text(
                reward.title,
                style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: MyColours.HEADER_TEXT_COLOUR),
              ),
            ],
          )
        ],
      ),
    );
  }
}
