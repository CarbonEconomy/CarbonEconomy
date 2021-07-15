import 'package:flutter/material.dart';
import 'package:green_pouch/login/signup.dart';

import 'login.dart';

typedef Future<void> LoginFunction(String username, String password);
typedef Future<void> SignUpFunction(
    String email, String username, String password);

class LoginView extends StatefulWidget {
  LoginFunction login;
  SignUpFunction signUp;

  LoginView({required this.login, required this.signUp});

  @override
  State<StatefulWidget> createState() => LoginViewState(login, signUp);
}

class LoginViewState extends State<LoginView> {
  LoginFunction login;
  SignUpFunction signUp;

  bool showLogin = true;

  LoginViewState(this.login, this.signUp);

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
        ? LoginScreen(login, showSignUpScreen)
        : SignUpScreen(signUp, showLoginScreen);

        
  }
}
