import 'package:flutter/material.dart';

class Button {
  bool selected;
  String title;

  Button({required this.title, required this.selected});
}

class MyButton extends StatelessWidget {
  Button button;
  Function() onPress;

  MyButton(this.button, this.onPress);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(30),
      child: SizedBox(
        width: 110,
        height: 40,
        child: TextButton(
          style: TextButton.styleFrom(
            primary: button.selected ? Colors.white : Color(0xFFC5C5C5),
            textStyle:
                const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            backgroundColor: button.selected ? Colors.blue : Colors.transparent,
          ),
          onPressed: onPress,
          child: Text(button.title),
        ),
      ),
    );
  }
}
