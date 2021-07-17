import 'package:flutter/material.dart';

class Button {
  bool selected;
  String title;

  Button({required this.title, required this.selected});
}

class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ClipRRect(
        borderRadius: BorderRadius.circular(30),
        child: TextButton(
          style: TextButton.styleFrom(
            padding: const EdgeInsets.all(16.0),
            primary: Colors.black,
            textStyle: const TextStyle(fontSize: 20),
            backgroundColor: Colors.blue,
          ),
          onPressed: () {},
          child: const Text('Rewards'),
        ));
  }
}
