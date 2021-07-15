import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';
import 'package:green_pouch/my_colours.dart';

class SignUpScreen extends StatefulWidget {
  Function() loginUser;
  Function() switchToLogIn;

  SignUpScreen(this.loginUser, this.switchToLogIn);
  @override
  State<StatefulWidget> createState() {
    return SignUpScreenState(loginUser, switchToLogIn);
  }
}

class SignUpScreenState extends State<SignUpScreen> {
  Function() loginUser;
  Function() switchToLogIn;

  bool isSignUpComplete = false;

  final controllerUser = TextEditingController();
  final controllerEmail = TextEditingController();
  final controllerPass = TextEditingController();
  final controllerPreferred = TextEditingController();

  final controllerCode = TextEditingController();

  SignUpScreenState(this.loginUser, this.switchToLogIn);

  void onSignUp() async {
    print("${controllerEmail.text.toString()}" +
        "${controllerUser.text.toString()}" +
        "${controllerPass.text.toString()}");
    try {
      Map<String, String> userAttributes = {
        'email': controllerEmail.text.trim(),
        "preferred_username": controllerPreferred.text.trim()
      };
      SignUpResult res = await Amplify.Auth.signUp(
          username: controllerUser.text.trim(),
          password: controllerPass.text.trim(),
          options: CognitoSignUpOptions(userAttributes: userAttributes));
      setState(() {
        isSignUpComplete = res.isSignUpComplete;
      });
    } catch (e) {
      print(e);
    }
  }

  void confirmSignUp() async {
    try {
      SignUpResult res = await Amplify.Auth.confirmSignUp(
          username: controllerUser.text.trim(),
          confirmationCode: controllerCode.text.trim());
      if (res.isSignUpComplete) {
        loginUser();
      }
    } on AuthException catch (e) {
      print(e.message);
    }
  }

  @override
  void dispose() {
    controllerEmail.dispose();
    controllerPass.dispose();
    controllerUser.dispose();
    controllerCode.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: EdgeInsets.only(left: 20, right: 20),
        child: isSignUpComplete
            ? Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Confirm Sign Up",
                    style: TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF36455A),
                    ),
                  ),
                  SizedBox(
                    height: 10,
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: controllerCode,
                    cursorColor: MyColours.PRIMARY,
                    decoration: InputDecoration(
                      labelText: "Code",
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
                      onPressed: confirmSignUp,
                      child: Text(
                        "Confirm".toUpperCase(),
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
              )
            : Column(
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
                    controller: controllerEmail,
                    cursorColor: MyColours.PRIMARY,
                    decoration: InputDecoration(
                      labelText: "Email",
                      focusedBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: MyColours.PRIMARY),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: controllerUser,
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
                    controller: controllerPreferred,
                    cursorColor: MyColours.PRIMARY,
                    decoration: InputDecoration(
                      labelText: "Preferred Name",
                      focusedBorder: UnderlineInputBorder(
                        borderSide: BorderSide(color: MyColours.PRIMARY),
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  TextField(
                    controller: controllerPass,
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
