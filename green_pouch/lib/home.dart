import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/material.dart';
import 'package:green_pouch/appbar.dart';
import 'package:green_pouch/favourites/view.dart';
import 'package:green_pouch/information/view.dart';
import 'package:green_pouch/login/view.dart';
import 'package:green_pouch/my_colours.dart';
import 'package:green_pouch/profile/view.dart';
import 'package:green_pouch/profile/widgets/appbar.dart';
import 'package:green_pouch/search/view.dart';

import 'amplifyconfiguration.dart';
import 'models/ModelProvider.dart';
import 'models/Reward.dart';

class HomeView extends StatefulWidget {
  const HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  int _selectedIndex = 0;
  bool _isLoading = true;
  bool _isLoggedIn = false;

  List<Reward> _rewards = [];

  final AmplifyDataStore _dataStorePlugin =
      AmplifyDataStore(modelProvider: ModelProvider.instance);

  final AmplifyAPI _apiPlugin = AmplifyAPI();

  final AmplifyAuthCognito _authPlugin = AmplifyAuthCognito();

  @override
  void initState() {
    _initializeApp();
    super.initState();
  }

  @override
  void dispose() {
    // to be filled in a later step
    super.dispose();
  }

  Future<void> _initializeApp() async {
    // configure Amplify
    if (!Amplify.isConfigured) {
      await _configureAmplify();
    }

    await _fetchRewards();

    // after configuring Amplify, update loading ui state to loaded state
    setState(() {
      _isLoading = false;
    });
  }

  Future<void> _configureAmplify() async {
    try {
      // add Amplify plugins
      await Amplify.addPlugins([_dataStorePlugin, _apiPlugin, _authPlugin]);

      // configure Amplify
      //
      // note that Amplify cannot be configured more than once!
      await Amplify.configure(amplifyconfig);
    } catch (e) {
      // error handling can be improved for sure!
      // but this will be sufficient for the purposes of this tutorial
      print('An error occurred while configuring Amplify: $e');
    }
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

  Future<void> _login(String username, String password) async {
    print("$username logged in with $password");
    // setState(() {
    //   this._isLoggedIn = true;
    // });
  }

  Future<void> _signUp(String email, String username, String password) async {
    print("$username signing up with $email and $password");
    // setState(() {
    //   this._isLoggedIn = true;
    // });
  }

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
        return ProfileAppBar(
          name: "Anny Boi",
          treesDonated: 10649,
          credits: 465,
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
        : _isLoggedIn
            ? Scaffold(
                backgroundColor: MyColours.BACKGROUND,
                body: Container(
                  height: MediaQuery.of(context).size.height,
                  child: Stack(
                      children: buildStackChildren(_selectedIndex, context)),
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
              )
            : Scaffold(
                backgroundColor: MyColours.BACKGROUND,
                body: LoginView(
                  login: _login,
                  signUp: _signUp,
                ),
              );
  }
}
