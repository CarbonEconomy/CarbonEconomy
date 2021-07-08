import 'package:flutter/material.dart';
import 'package:green_pouch/my_colours.dart';
import 'package:green_pouch/navbar.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'GreenPouch',
        theme: ThemeData(
          primaryColor: MyColours.PRIMARY,
        ),
        home: MyNavBar());
  }
}
