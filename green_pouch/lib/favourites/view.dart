import 'package:flutter/material.dart';
import 'package:green_pouch/favourites/widgets/fav_box.dart';

class FavouritesView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(15.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 20,
          ),
          Box(),
          Container(
            height: 20,
          ),
          Title("Shopping"),
        ],
      ),
    );
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
