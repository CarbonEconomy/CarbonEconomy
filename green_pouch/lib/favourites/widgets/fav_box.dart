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
              color: Color(0xFF33E49B).withAlpha(60).withOpacity(0.7),
              offset: Offset(4, 4),
              blurRadius: 20.0,
              spreadRadius: 0,
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
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          )
        ],
      ),
    );
  }
}
