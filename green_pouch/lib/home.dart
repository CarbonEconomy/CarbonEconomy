import 'package:flutter/material.dart';
import 'package:green_pouch/appbar.dart';
import 'package:green_pouch/favourites/view.dart';
import 'package:green_pouch/information/view.dart';
import 'package:green_pouch/my_colours.dart';
import 'package:green_pouch/profile/view.dart';
import 'package:green_pouch/search/view.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 0;
  static const TextStyle optionStyle =
      TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static List<Widget> _widgetOptions = <Widget>[
    FavouritesView(),
    SearchView(),
    InformationView(),
    ProfileView(),
  ];

  Widget buildAppBar(int index) {
    switch (index) {
      case 0:
        return MyAppBar(
            title: "Hello Anny,",
            subtitle: "Let's save the earth today!",
            backgroundText: "Home");
      case 1:
        return MyAppBar(title: "Shopping", backgroundText: "Shopping");
      case 2:
        return MyAppBar(title: "Articles", backgroundText: "Articles");
      default:
        return MyAppBar(title: "Profile", backgroundText: "Profile");
    }
  }

  Widget buildSearchBar() {
    return Positioned(
      top: 150,
      left: 0.0,
      right: 0.0,
      child: Padding(
        padding: EdgeInsets.only(left: 23, right: 23),
        child: SizedBox(
          height: 50,
          child: Container(
            decoration: BoxDecoration(boxShadow: [
              BoxShadow(
                  color: Color.fromRGBO(182, 182, 182, 0.15),
                  offset: Offset(3, 5),
                  blurRadius: 20.0,
                  spreadRadius: 0.0)
            ], borderRadius: BorderRadius.circular(30.0)),
            child: TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(30.0),
                    borderSide: BorderSide(
                      width: 0,
                      style: BorderStyle.none,
                    )),
                filled: true,
                fillColor: Colors.white,
                contentPadding: EdgeInsets.all(16),
                hintText: "Search",
                hintStyle: TextStyle(fontSize: 16),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget buildBody() {
    return Positioned(
      top: 205.0,
      child: _widgetOptions[_selectedIndex],
    );
  }

  List<Widget> buildStackChildren(int index) {
    List<Widget> widgets = [buildAppBar(index)];

    if (index < 3) {
      widgets.add(buildSearchBar());
    }

    widgets.add(buildBody());
    return widgets;
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        height: MediaQuery.of(context).size.height,
        child: Stack(children: buildStackChildren(_selectedIndex)),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Favourites',
            backgroundColor: MyColours.PRIMARY,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.business),
            label: 'Search',
            backgroundColor: Colors.green,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            label: 'Information',
            backgroundColor: Colors.purple,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Profile',
            backgroundColor: Colors.pink,
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.white,
        onTap: _onItemTapped,
      ),
    );
  }
}
