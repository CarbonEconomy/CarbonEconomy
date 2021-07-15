import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:green_pouch/login/view.dart';
import 'package:green_pouch/my_colours.dart';

class SignUpScreen extends StatelessWidget {
  SignUpFunction signUp;
  Function() switchToLogIn;

  SignUpScreen(this.signUp, this.switchToLogIn);

  void onSignUp() async {
    await signUp("email", "usernane", "password");
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
              "Sign Up",
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
              "Let's get you an account",
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
                labelText: "Email",
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: MyColours.PRIMARY),
                ),
              ),
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
              height: 20,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              height: 50,
              child: ElevatedButton(
                onPressed: onSignUp,
                child: Text(
                  "Sign Up".toUpperCase(),
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
                    "Already have an account?",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFF6A6F7D),
                    ),
                  ),
                  TextButton(
                    onPressed: switchToLogIn,
                    child: Text(
                      "Log In",
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
