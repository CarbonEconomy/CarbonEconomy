import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';
import 'package:green_pouch/profile/widgets/buttons.dart';
import 'package:green_pouch/profile/widgets/rewards.dart';
import 'package:green_pouch/profile/widgets/savings.dart';

class ProfileView extends StatelessWidget {
  UserReward userReward;
  List<Reward> rewards;
  int credits;

  int _index;
  Function(int) createOnSelect;

  ProfileView(this._index, this.createOnSelect, this.userReward, this.credits,
      this.rewards);

  bool isSavings() {
    return _index == 0;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: MediaQuery.of(context).size.width,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              MyButton(Button(title: "Savings", selected: isSavings()),
                  createOnSelect(0)),
              MyButton(Button(title: "Rewards", selected: !isSavings()),
                  createOnSelect(1)),
            ],
          ),
        ),
        Container(
          padding: EdgeInsets.only(left: 20, right: 20, top: 15),
          width: MediaQuery.of(context).size.width,
          child: isSavings() ? Savings(credits) : Rewards(rewards, userReward),
        ),
      ],
    );
  }
}
