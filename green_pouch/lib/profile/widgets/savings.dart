import 'package:flutter/material.dart';

import '../../my_colours.dart';

class Savings extends StatefulWidget {
  int credits;

  Savings(this.credits);

  @override
  State<StatefulWidget> createState() => SavingsState();
}

class SavingsState extends State<Savings> with TickerProviderStateMixin {
  int credits = 0;

  late AnimationController controller;
  late Animation<int> creditsAnimation;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
        vsync: this, duration: Duration(milliseconds: 1000));
    creditsAnimation =
        IntTween(begin: (widget.credits ~/ 100) * 100, end: widget.credits)
            .animate(controller)
              ..addListener(() {
                setState(() {});
              });
    controller.forward();
    updateCredits();
  }

  @override
  void didUpdateWidget(Savings oldWidget) {
    if (oldWidget.credits != widget.credits) {
      controller.reset();

      creditsAnimation = IntTween(begin: oldWidget.credits, end: widget.credits)
          .animate(controller)
            ..addListener(() {
              setState(() {});
            });
      controller.forward();

      updateCredits();
    }
  }

  void updateCredits() {
    setState(() {
      credits = widget.credits;
    });
  }

  ImageProvider<Object> buildImage(int progress) {
    if (progress <= 33) {
      return AssetImage("graphics/small.png");
    } else if (progress <= 67) {
      return AssetImage("graphics/med.png");
    }

    return AssetImage("graphics/big.png");
  }

  @override
  void dispose() {
    controller.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    int trees = credits ~/ 100;
    int progress = credits % 100;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text(
          "Total: $trees Trees",
          style: TextStyle(
            color: MyColours.HEADER_TEXT_COLOUR,
            fontSize: 15,
            fontWeight: FontWeight.bold,
          ),
        ),
        AnimatedSwitcher(
          duration: const Duration(milliseconds: 1000),
          transitionBuilder: (Widget child, Animation<double> animation) {
            return FadeTransition(child: child, opacity: animation);
          },
          child: Container(
            key: ValueKey<int>(credits),
            height: 240,
            decoration: BoxDecoration(
              image: DecorationImage(
                fit: BoxFit.fitHeight,
                image: buildImage(credits % 100),
              ),
            ),
          ),
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '0',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: MyColours.HEADER_TEXT_COLOUR),
            ),
            SizedBox(
              width: 10,
            ),
            Container(
              width: MediaQuery.of(context).size.width * 0.7,
              child: LinearProgressIndicator(
                value: (creditsAnimation.value % 100) / 100,
                backgroundColor: MyColours.PRIMARY.withOpacity(0.24),
              ),
            ),
            SizedBox(width: 10),
            Text(
              '100',
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 15,
                  color: MyColours.HEADER_TEXT_COLOUR),
            )
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(width: 10),
            Container(
                alignment: Alignment.topRight,
                width: MediaQuery.of(context).size.width * 0.7,
                child: Text(
                  "${100 - progress} more to go",
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                      color: MyColours.HEADER_TEXT_COLOUR),
                )),
            SizedBox(width: 35),
          ],
        )
      ],
    );
  }
}
