import 'package:flutter/material.dart';
import 'package:green_pouch/login/signup.dart';

import 'login.dart';

class LoginView extends StatefulWidget {
  Function() loginUser;

  LoginView(this.loginUser);

  @override
  State<StatefulWidget> createState() => LoginViewState(loginUser);
}

class LoginViewState extends State<LoginView> {
  Function() loginUser;
  bool showLogin = true;

  LoginViewState(this.loginUser);

  void showLoginScreen() {
    setState(() {
      showLogin = true;
    });
  }

  void showSignUpScreen() {
    setState(() {
      showLogin = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return showLogin
        ? LoginScreen(loginUser, showSignUpScreen)
        : SignUpScreen(loginUser, showLoginScreen);
  }
}
