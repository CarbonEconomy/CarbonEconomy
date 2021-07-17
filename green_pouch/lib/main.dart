import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/material.dart';
import 'package:green_pouch/home.dart';
import 'package:green_pouch/login/view.dart';
import 'package:green_pouch/my_colours.dart';

import 'amplifyconfiguration.dart';
import 'models/ModelProvider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => MyAppState();
}

class MyAppState extends State<MyApp> {
  // This widget is the root of your application.

  bool _isLoading = true;
  bool _isLoggedIn = false;
  AuthUser? _user;

  final _amplifyApi = AmplifyAPI();
  final _amplifyDataStore =
      AmplifyDataStore(modelProvider: ModelProvider.instance);
  final _amplifyAuth = AmplifyAuthCognito();

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

    var session = await Amplify.Auth.fetchAuthSession();

    if (session.isSignedIn) {
      await _getUser();
    }

    setState(() {
      _isLoading = false;
      _isLoggedIn = session.isSignedIn;
    });
  }

  Future<void> _getUser() async {
    var user = await Amplify.Auth.getCurrentUser();
    setState(() {
      this._user = user;
    });
  }

  Future<void> _configureAmplify() async {
    try {
      await Amplify.addPlugins([_amplifyDataStore, _amplifyApi, _amplifyAuth]);
      await Amplify.configure(amplifyconfig);
      print("Amplify is configured: ${Amplify.isConfigured}");
    } catch (e) {
      // error handling can be improved for sure!
      // but this will be sufficient for the purposes of this tutorial
      print('An error occurred while configuring Amplify: $e');
    }
  }

  void loginUser() {
    _getUser();
    setState(() {
      this._isLoggedIn = true;
    });
  }

  void logoutUser() {
    print("Logging out");
    Amplify.Auth.signOut().then((value) => setState(() {
          print("Logged out");
          this._isLoggedIn = false;
        }));
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GreenPouch',
      theme: ThemeData(
          primaryColor: MyColours.PRIMARY,
          focusColor: MyColours.PRIMARY,
          colorScheme: ColorScheme.light(primary: MyColours.PRIMARY)),
      home: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : !_isLoggedIn || _user == null
              ? LoginView(loginUser)
              : HomeView(
                  user: _user!,
                  logout: logoutUser,
                ),
    );
  }
}
