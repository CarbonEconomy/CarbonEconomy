import 'dart:async';
import 'dart:convert';

import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/material.dart';
import 'package:green_pouch/appbar.dart';
import 'package:green_pouch/favourites/view.dart';
import 'package:green_pouch/information/view.dart';
import 'package:green_pouch/my_colours.dart';
import 'package:green_pouch/profile/model.dart';
import 'package:green_pouch/profile/view.dart';
import 'package:green_pouch/profile/widgets/appbar.dart';
import 'package:green_pouch/search/view.dart';
import 'package:http/http.dart' as http;

import 'models/ModelProvider.dart';

class HomeView extends StatefulWidget {
  AuthUser user;
  Function logout;

  HomeView({Key? key, required this.user, required this.logout})
      : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState(user, logout);
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 0;
  bool _isLoading = true;

  AuthUser _user;
  Function logout;

  List<Reward> _rewards = [];
  int credits = 0;
  UserReward? userReward;
  late StreamSubscription _subscription;

  _HomeViewState(this._user, this.logout);

  @override
  void initState() {
    _initializeApp();
    super.initState();
  }

  @override
  void dispose() {
    _subscription.cancel();
    super.dispose();
  }

  Future<void> _initializeApp() async {
    await _fetchRewards();
    await _fetchCredits();

    _subscription =
        Amplify.DataStore.observe(UserReward.classType).listen((event) {
      _fetchUserReward();
    });

    await _fetchUserReward();

    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _fetchRewards() async {
    try {
      List<Reward> updatedTodos =
          await Amplify.DataStore.query(Reward.classType);
      setState(() {
        _rewards = updatedTodos;
      });
    } catch (e) {
      print('An error occurred while querying Rewards: $e');
    }
  }

  Future<void> _fetchCredits() async {
    var res = await http.get(Uri.parse(
        'https://fv1au9jx9a.execute-api.us-east-1.amazonaws.com/dev/transaction'));

    List<Transaction> transactions = jsonDecode(res.body)
        .map<Transaction>((x) => Transaction.fromJson(x))
        .toList();

    int received = transactions
        .where((element) => element.toID == _user.username)
        .map<int>((e) => e.amount)
        .fold(0, (value, element) => value + element);

    int used = transactions
        .where((element) => element.fromID == _user.username)
        .map<int>((e) => e.amount)
        .fold(0, (value, element) => value + element);

    setState(() {
      credits = received - used;
    });
  }

  Future<void> _fetchUserReward() async {
    List<UserReward> userRewards = await Amplify.DataStore.query(
        UserReward.classType,
        where: UserReward.USERID.eq(_user.username));

    if (userRewards.length == 0) {
      UserReward userReward =
          UserReward(userId: _user.username, treesDonated: 0, Rewards: []);
      await Amplify.DataStore.save(userReward);

      setState(() {
        this.userReward = userReward;
      });
    } else {
      setState(() {
        this.userReward = userRewards[0];
      });
    }
  }

  Widget buildAppBar(int index) {
    switch (index) {
      case 0:
        return MyAppBar(
            title: "Hello ${_user.username},",
            subtitle: "Let's save the earth today!",
            backgroundText: "Home");
      case 1:
        return MyAppBar(title: "Shopping", backgroundText: "Shopping");
      case 2:
        return MyAppBar(title: "Articles", backgroundText: "Articles");
      default:
        return ProfileAppBar(
          name: _user.username,
          logout: logout,
          treesDonated: userReward?.treesDonated ?? 0,
          credits: this.credits,
        );
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

  Widget buildBody(BuildContext context) {
    var height = MediaQuery.of(context).size.height;
    switch (_selectedIndex) {
      case 0:
        return Positioned(
          top: 205.0,
          child: ConstrainedBox(
            child: SingleChildScrollView(
              child: FavouritesView(),
            ),
            constraints: BoxConstraints(maxHeight: height - 255),
          ),
        );
      case 1:
        return Positioned(
          top: 205.0,
          child: ConstrainedBox(
            child: SingleChildScrollView(
              child: SearchView(_rewards),
            ),
            constraints: BoxConstraints(maxHeight: height - 255),
          ),
        );
      case 2:
        return Positioned(
          top: 205.0,
          child: ConstrainedBox(
            child: SingleChildScrollView(
              child: InformationView(),
            ),
            constraints: BoxConstraints(maxHeight: height - 255),
          ),
        );
      default:
        return Positioned(
          top: 245.0,
          child: ConstrainedBox(
            child: SingleChildScrollView(
              child: ProfileView(),
            ),
            constraints: BoxConstraints(maxHeight: height - 295),
          ),
        );
    }
  }

  List<Widget> buildStackChildren(int index, BuildContext context) {
    List<Widget> widgets = [buildAppBar(index)];

    if (index < 3) {
      widgets.add(buildSearchBar());
    }

    widgets.add(buildBody(context));
    return widgets;
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? Center(
            child: CircularProgressIndicator(),
          )
        : Scaffold(
            backgroundColor: MyColours.BACKGROUND,
            body: Container(
              height: MediaQuery.of(context).size.height,
              child:
                  Stack(children: buildStackChildren(_selectedIndex, context)),
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
