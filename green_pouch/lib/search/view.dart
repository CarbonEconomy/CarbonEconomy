import 'package:flutter/material.dart';
import 'package:green_pouch/search/reward.dart';
import 'package:green_pouch/search/widgets/list.dart';

List<Reward> MOCK_REWARDS = [
  Reward(
      title: "\$10 Gift Card",
      pictureUrl: "https://cdn.freebiesupply.com/logos/thumbs/2x/grab-logo.png",
      organisation: "Grab Food",
      treesRequired: 10),
  Reward(
      title: "\$5 Gift Card",
      pictureUrl: "https://www.tekkaplace.sg/wp-content/uploads/2020/01/fairprice-logo-vector-download.jpg",
      organisation: "NTUC Fairprice Online",
      treesRequired: 10),
  Reward(
      title: "10% Off",
      pictureUrl: "https://lumi.com.sg/wp-content/uploads/2018/12/Redmart-logo.jpg",
      organisation: "Red Mart",
      treesRequired: 25),
];

class SearchView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RewardsList(MOCK_REWARDS);
  }
}
