import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';

class ProfileView extends StatelessWidget {
  UserReward userReward;
  List<Reward> rewards;
  int credits;

  ProfileView(this.userReward, this.credits, this.rewards);

  @override
  Widget build(BuildContext context) {
    return Text('Index 3: Profile');
  }
}
