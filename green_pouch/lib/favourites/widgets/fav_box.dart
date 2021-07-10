import 'package:flutter/material.dart';
import 'package:green_pouch/my_colours.dart';

class BoxList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return BoxListState();
  }
}

class BoxListState extends State<BoxList> {
  int index = 0;

  Function() createOnTapFn(int idx) {
    return () {
      setState(() {
        index = idx;
      });
    };
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        width: MediaQuery.of(context).size.width - 30,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            ToggleBox(
                icon: Icons.favorite,
                text: 'DONATE',
                selected: index == 0,
                onTap: createOnTapFn(0)),
            ToggleBox(
              icon: Icons.attach_money,
              text: 'SHOPPING',
              selected: index == 1,
              onTap: createOnTapFn(1),
            ),
            ToggleBox(
              icon: Icons.fastfood,
              text: 'FOOD',
              selected: index == 2,
              onTap: createOnTapFn(2),
            ),
          ],
        ));
  }
}

class ToggleBox extends StatelessWidget {
  IconData icon;
  String text;
  bool selected;
  Function() onTap;

  ToggleBox(
      {required this.icon,
      required this.text,
      required this.selected,
      required this.onTap});
  @override
  Widget build(BuildContext context) {
    return Container(
        decoration: BoxDecoration(
          color: selected ? MyColours.PRIMARY : Colors.white,
          borderRadius: BorderRadius.circular(5),
          boxShadow: [
            selected
                ? BoxShadow(
                    color: Color(0xFF33E49B).withAlpha(60).withOpacity(0.7),
                    offset: Offset(4, 4),
                    blurRadius: 20.0,
                    spreadRadius: 0,
                  )
                : BoxShadow(
                    color: Color(0xFF8D8D8D).withOpacity(0.15),
                    offset: Offset(4, 6),
                    blurRadius: 19,
                  )
          ],
        ),
        child: Material(
          type: MaterialType.transparency,
          child: InkWell(
            splashColor: Color.fromRGBO(255, 255, 255, 0.5),
            highlightColor: Colors.transparent,
            onTap: onTap,
            child: Container(
              height: 76,
              width: 108,
              alignment: Alignment.center,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    icon,
                    color: selected ? Colors.white : MyColours.PRIMARY,
                  ),
                  SizedBox(
                    height: 7,
                  ),
                  Text(
                    text,
                    style: TextStyle(
                        color: selected
                            ? Colors.white
                            : MyColours.SECONDARY_TEXT_COLOUR,
                        fontWeight: FontWeight.bold,
                        fontSize: 10),
                  )
                ],
              ),
            ),
          ),
        ));
  }
}
