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

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          buildAppBar(_selectedIndex),
          Positioned(
            child: Center(
              child: _widgetOptions.elementAt(_selectedIndex),
            ),
          )
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Favourites',
            backgroundColor: MyColours.PRIMARY,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.saved_search),
            label: 'Search',
            backgroundColor: MyColours.PRIMARY,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            label: 'Information',
            backgroundColor: MyColours.PRIMARY,
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Profile',
            backgroundColor: MyColours.PRIMARY,
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.white,
        backgroundColor: MyColours.PRIMARY,
        unselectedItemColor: Colors.black,
        onTap: _onItemTapped,
      ),
    );
  }
}
