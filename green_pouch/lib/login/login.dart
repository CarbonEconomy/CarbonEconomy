import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:green_pouch/login/view.dart';
import 'package:green_pouch/my_colours.dart';

class LoginScreen extends StatelessWidget {
  LoginFunction login;
  Function() switchToSignUp;

  LoginScreen(this.login, this.switchToSignUp);

  void onLogin() async {
    await login("caca", "caca");
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.only(left: 20, right: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              "Hello",
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
                color: Color(0xFF36455A),
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Text(
              "Let's get you signed in",
              style: TextStyle(
                fontSize: 16,
                color: Color(0xFF495566),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            TextField(
              cursorColor: MyColours.PRIMARY,
              decoration: InputDecoration(
                labelText: "Username",
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: MyColours.PRIMARY),
                ),
              ),
            ),
            SizedBox(
              height: 20,
            ),
            TextField(
              obscureText: true,
              cursorColor: MyColours.PRIMARY,
              decoration: InputDecoration(
                labelText: "Password",
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: MyColours.PRIMARY),
                ),
              ),
            ),
            SizedBox(
              height: 40,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              height: 50,
              child: ElevatedButton(
                onPressed: onLogin,
                child: Text(
                  "Login".toUpperCase(),
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 15,
                  ),
                ),
              ),
            ),
            SizedBox(
              height: 50,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    "Don't Have Account?",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFF6A6F7D),
                    ),
                  ),
                  TextButton(
                    onPressed: switchToSignUp,
                    child: Text(
                      "Sign Up",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
