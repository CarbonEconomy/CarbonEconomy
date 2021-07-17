import 'package:flutter/material.dart';

import '../../my_colours.dart';

class Savings extends StatelessWidget {
  int credits;

  Savings(this.credits);

  ImageProvider<Object> buildImage(int progress) {
    if (progress <= 33) {
      return AssetImage("graphics/small.png");
    }
    return AssetImage("graphics/med.png");
  }

  @override
  Widget build(BuildContext context) {
    int trees = credits ~/ 100;
    int progress = credits % 100;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          "Total: $trees Trees",
          style: TextStyle(
            color: MyColours.HEADER_TEXT_COLOUR,
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text("$progress")
      ],
    );
  }
}
