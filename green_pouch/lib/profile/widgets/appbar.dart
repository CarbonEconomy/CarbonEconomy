import 'package:flutter/material.dart';

import '../../my_colours.dart';

class ProfileAppBar extends StatelessWidget {
  String title;
  String? backgroundText;
  String? subtitle;

  static const Color _translucentWhite = Color.fromRGBO(255, 255, 255, 0.15);
  ProfileAppBar({required this.title, this.subtitle, this.backgroundText});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 172.0,
      width: MediaQuery.of(context).size.width,
      child: Stack(
        children: [
          Container(
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                  MyColours.APPBAR_TOP_LEFT,
                  MyColours.APPBAR_BOTTOM_RIGHT
                ])),
          ),
          Positioned(
            height: 204,
            width: 204,
            right: -86,
            top: -80,
            child: Container(
              decoration: BoxDecoration(
                  shape: BoxShape.circle, color: _translucentWhite),
            ),
          ),
          Positioned(
            height: 124,
            width: 124,
            right: -62,
            bottom: -20,
            child: Container(
              decoration: BoxDecoration(
                  shape: BoxShape.circle, color: _translucentWhite),
            ),
          ),
          Positioned(
            right: 5,
            bottom: 5,
            child: Container(
              child: Text(
                backgroundText ?? "",
                style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 50,
                    color: _translucentWhite),
              ),
            ),
          ),
          Positioned(
            top: 72,
            left: 20,
            child: Container(
              width: MediaQuery.of(context).size.width - 50,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        title,
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 21,
                            color: Colors.white),
                      ),
                      Text(
                        subtitle ?? "",
                        style: TextStyle(fontSize: 14, color: Colors.white),
                      )
                    ],
                  ),
                  CircleAvatar(backgroundImage: AssetImage("graphics/cat.jpg")),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
