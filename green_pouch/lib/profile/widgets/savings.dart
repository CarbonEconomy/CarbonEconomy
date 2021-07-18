import 'package:flutter/material.dart';

import '../../my_colours.dart';

class Savings extends StatelessWidget {
  int credits;

  Savings(this.credits);

  ImageProvider<Object> buildImage(int progress) {
    if (progress <= 33) {
      return AssetImage("graphics/small.png");
    } else if (progress <= 67) {
      return AssetImage("graphics/med.png");
    }

    return AssetImage("graphics/big.png");
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
        Align(
          alignment: Alignment.bottomCenter,
          child: Container(
            height: 240,
            decoration: BoxDecoration(
              image: DecorationImage(
                fit: BoxFit.fitHeight,
                image: buildImage(progress),
              ),
            ),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '0',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: MyColours.HEADER_TEXT_COLOUR),
            ),
            SizedBox(
              width: 10,
            ),
            Container(
              width: MediaQuery.of(context).size.width * 0.7,
              child: LinearProgressIndicator(
                value: progress.toDouble() / 100,
                backgroundColor: MyColours.PRIMARY.withOpacity(0.24),
              ),
            ),
            SizedBox(width: 10),
            Text(
              '100',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: MyColours.HEADER_TEXT_COLOUR),
            )
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(width: 10),
            Container(
                alignment: Alignment.topRight,
                width: MediaQuery.of(context).size.width * 0.7,
                child: Text(
                  "${100 - progress} more to go",
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                      color: MyColours.HEADER_TEXT_COLOUR),
                )),
            SizedBox(width: 35),
          ],
        )
      ],
    );
  }
}
