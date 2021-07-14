import 'package:flutter/cupertino.dart';
import "package:flutter/material.dart";
import 'package:green_pouch/models/Reward.dart';
import 'package:green_pouch/my_colours.dart';

class RewardsList extends StatelessWidget {
  List<Reward> rewards;

  RewardsList(this.rewards);

  @override
  Widget build(BuildContext context) {
    var size = MediaQuery.of(context).size;

    return Container(
        height: size.height - 255,
        width: size.width,
        child: ListView.builder(
          scrollDirection: Axis.vertical,
          shrinkWrap: true,
          itemCount: rewards.length,
          itemBuilder: (context, index) {
            return Container(
              height: (size.height - 205) / 3,
              width: size.width,
              color:
                  index % 2 == 0 ? Color(0XFFC4C4C4).withOpacity(0.07) : null,
              child: RewardsTile(rewards[index]),
            );
          },
        ));
  }
}

class RewardsTile extends StatelessWidget {
  Reward reward;

  RewardsTile(this.reward);
  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 20),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                      color: Color.fromRGBO(0, 0, 0, 0.05),
                      offset: Offset(2, 6),
                      blurRadius: 15,
                      spreadRadius: 0)
                ],
              ),
              child: Image(
                  height: 125,
                  width: 125,
                  image: NetworkImage(reward.pictureUrl)),
            ),
            SizedBox(
              width: 20,
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: 10,
                ),
                Text(
                  reward.title,
                  style: TextStyle(
                      fontSize: 17,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF36455A)),
                ),
                SizedBox(
                  height: 15,
                ),
                Text(
                  reward.organisation,
                  style: TextStyle(
                      fontSize: 12,
                      color: Color(0xFFA1A8B9),
                      fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 30),
                Text(
                  "TREES",
                  style: TextStyle(
                      fontSize: 12,
                      color: MyColours.PRIMARY,
                      fontWeight: FontWeight.w600),
                ),
                Text(
                  "${reward.treesRequired}",
                  style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF495566)),
                )
              ],
            )
          ],
        ));
  }
}
