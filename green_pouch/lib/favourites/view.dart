import 'package:flutter/material.dart';
import 'package:green_pouch/favourites/widgets/fav_box.dart';


class FavouritesView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(15.0),
      child: Column(
        children: [
          Container(
            height: 20,
          ),
          Box(),
        ],
      ),
    );
  }
}
