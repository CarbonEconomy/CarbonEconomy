import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:green_pouch/my_colours.dart';

class Box extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 78,
      width: 108,
      alignment: Alignment.center,
      decoration: BoxDecoration(
          color: MyColours.PRIMARY,
          borderRadius: BorderRadius.circular(3),
          boxShadow: [
            BoxShadow(
              color: Colors.white.withAlpha(60),
              offset: Offset(0.0, 1.0),
              blurRadius: 6.0,
            )
          ]),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.favorite, color: Colors.white),
          SizedBox(
            height: 7,
          ),
          Text(
            'DONATE',
            style: TextStyle(color: Colors.white),
          )
        ],
      ),
    );
  }
}
