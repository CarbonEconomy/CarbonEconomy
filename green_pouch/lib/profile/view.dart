import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';
import 'package:green_pouch/profile/widgets/buttons.dart';

class ProfileView extends StatelessWidget {
  UserReward userReward;
  List<Reward> rewards;
  int credits;

  ProfileView(this.userReward, this.credits, this.rewards);

  @override
  Widget build(BuildContext context) {
    return Center(child: MyButton());
  }
}
