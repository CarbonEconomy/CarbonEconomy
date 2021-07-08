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
      ),
    );
  }
}
