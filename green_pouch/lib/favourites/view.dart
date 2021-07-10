import 'package:flutter/material.dart';
import 'package:green_pouch/favourites/widgets/fav_box.dart';
import 'package:green_pouch/favourites/widgets/shopping.dart';

List<ShoppingReward> MOCK_SHOPPING_REWARDS = [
  ShoppingReward(
      title: "Changi Jewel",
      rewardsAvailable: 73,
      url:
          "https://www.jewelchangiairport.com/en/attractions/rain-vortex/_jcr_content/image/file.img.png"),
  ShoppingReward(
      title: "innisfree",
      rewardsAvailable: 103,
      url:
          "https://www.capitaland.com/content/dam/capitaland-media-library/retail/Singapore/Singapore/Junction%208/tenant_storefront/innisfree-sf.png.transform/cap-lowres/image.png"),
  ShoppingReward(
      title: "The Body Shop",
      rewardsAvailable: 43,
      url:
          "https://shopsinsg.com/wp-content/uploads/2016/06/the-body-shop-tiong-bahru-plaza-singapore-001.jpg")
];

class FavouritesView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(15.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          VerticalPad(20),
          BoxList(),
          VerticalPad(20),
          Title("Shopping"),
          VerticalPad(16.0),
          ShoppingRewardsList(MOCK_SHOPPING_REWARDS)
        ],
      ),
    );
  }
}

class VerticalPad extends StatelessWidget {
  double height;
  VerticalPad(this.height);

  @override
  Widget build(BuildContext context) {
    return Container(height: height);
  }
}

class Title extends StatelessWidget {
  String text;

  Title(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: TextStyle(
        fontSize: 17,
        fontWeight: FontWeight.bold,
        letterSpacing: 0.7,
      ),
      textAlign: TextAlign.left,
    );
  }
}
