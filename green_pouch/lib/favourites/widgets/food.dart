import 'package:flutter/material.dart';
import 'package:green_pouch/my_colours.dart';

class Food {
  String title;
  String url;

  Food({required this.title, required this.url});
}

class foodTile extends StatelessWidget {
  // final Food food;

  // foodTile(this.food);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          height: 144,
          width: 126,
          decoration: BoxDecoration(
              // image: DecorationImage(fit: BoxFit.cover),
              borderRadius: BorderRadius.circular(3),
              color: MyColours.PRIMARY),
        ),
        Positioned(
          bottom: 20,
          child: Container(
            height: 20,
            width: 94,
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.6),
              borderRadius: BorderRadius.only(
                  topRight: Radius.circular(3),
                  bottomRight: Radius.circular(3)),
            ),
            child: Center(
              child: Text(
                '#Salted and Hung',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF36455A),
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        )
      ],
    );
  }
}
