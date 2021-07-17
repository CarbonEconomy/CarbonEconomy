import 'package:flutter/material.dart';

import '../../my_colours.dart';

class ProfileAppBar extends StatelessWidget {
  String name;
  int treesDonated;
  int credits;
  dynamic logout;

  static const Color _translucentWhite = Color.fromRGBO(255, 255, 255, 0.15);
  ProfileAppBar(
      {required this.name,
      required this.treesDonated,
      required this.credits,
      required this.logout});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 232.0,
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
            height: 293,
            width: 293,
            right: -36,
            top: -80,
            child: Container(
              decoration: BoxDecoration(
                  shape: BoxShape.circle, color: _translucentWhite),
            ),
          ),
          Positioned(
            height: 179,
            width: 179,
            right: -62,
            bottom: -100,
            child: Container(
              decoration: BoxDecoration(
                  shape: BoxShape.circle, color: _translucentWhite),
            ),
          ),
          Container(
            alignment: Alignment.center,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                InkWell(
                  onTap: logout,
                  child: CircleAvatar(
                    radius: 30,
                    backgroundImage: AssetImage("graphics/cat.jpg"),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Text(
                  name,
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 23,
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image(
                      image: AssetImage("graphics/flower.png"),
                      height: 24,
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Text(
                      "$treesDonated Trees donated",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                      ),
                    )
                  ],
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
