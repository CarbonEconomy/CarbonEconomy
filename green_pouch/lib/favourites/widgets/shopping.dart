import 'package:flutter/material.dart';
import 'package:green_pouch/my_colours.dart';

class ShoppingReward {
  String title;
  int rewardsAvailable;
  String url;

  ShoppingReward(
      {required this.title, required this.rewardsAvailable, required this.url});
}

class ShoppingRewardsList extends StatelessWidget {
  final List<ShoppingReward> shoppingRewards;

  ShoppingRewardsList(this.shoppingRewards);

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 160,
        width: MediaQuery.of(context).size.width,
        child: ListView.builder(
            shrinkWrap: true,
            scrollDirection: Axis.horizontal,
            itemCount: shoppingRewards.length,
            itemBuilder: (context, index) {
              return Padding(
                  padding: EdgeInsets.only(right: 10),
                  child: ShoppingRewardsTile(shoppingRewards[index]));
            }));
  }
}

class ShoppingRewardsTile extends StatelessWidget {
  final ShoppingReward shoppingReward;

  ShoppingRewardsTile(this.shoppingReward);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          height: 160,
          width: 240,
          decoration: BoxDecoration(
            image: DecorationImage(
                image: NetworkImage(shoppingReward.url), fit: BoxFit.cover),
            borderRadius: BorderRadius.circular(5.0),
          ),
        ),
        Positioned(
          left: 10,
          bottom: 35,
          child: Text(
            shoppingReward.title,
            style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 18.0),
          ),
        ),
        Positioned(
          left: 10,
          bottom: 15,
          child: Row(
            children: [
              Text(
                "${shoppingReward.rewardsAvailable}",
                style: TextStyle(
                    color: MyColours.PRIMARY, fontWeight: FontWeight.bold),
              ),
              Container(width: 5),
              Text(
                "Rewards available",
                style: TextStyle(
                  color: Colors.white,
                ),
              )
            ],
          ),
        ),
        Material(
            type: MaterialType.transparency,
            child: InkWell(
              splashColor: Color.fromRGBO(255, 255, 255, 0.5),
              onTap: () {},
              child: Container(
                height: 160,
                width: 240,
              ),
            ))
      ],
    );
  }
}
