import 'package:flutter/material.dart';
import 'package:green_pouch/my_colours.dart';

class FoodList extends StatelessWidget {
  List<Food> MOCK_FOOD;
  FoodList(this.MOCK_FOOD);
  @override
  Widget build(BuildContext context) {
    return Container(
        height: 144,
        width: MediaQuery.of(context).size.width,
        child: ListView.builder(
            shrinkWrap: true,
            scrollDirection: Axis.horizontal,
            itemCount: MOCK_FOOD.length,
            itemBuilder: (context, index) {
              return Padding(
                  padding: EdgeInsets.only(right: 17),
                  child: FoodTile(MOCK_FOOD[index]));
            }));
  }
}

class Food {
  String title;
  String url;

  Food({required this.title, required this.url});
}

class FoodTile extends StatelessWidget {
  final Food food;

  FoodTile(this.food);

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          height: 144,
          width: 126,
          decoration: BoxDecoration(
              image: DecorationImage(
                image: NetworkImage(food.url),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.circular(3),
              color: MyColours.PRIMARY),
        ),
        Positioned(
          bottom: 20,
          child: Container(
            padding: const EdgeInsets.fromLTRB(4, 0, 4, 0),
            constraints: BoxConstraints(
                minWidth: 20, maxWidth: 126, maxHeight: 20, minHeight: 20),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.6),
              borderRadius: BorderRadius.only(
                  topRight: Radius.circular(3),
                  bottomRight: Radius.circular(3)),
            ),
            child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    food.title,
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF36455A),
                    ),
                    textAlign: TextAlign.left,
                  ),
                ]),
          ),
        )
      ],
    );
  }
}
