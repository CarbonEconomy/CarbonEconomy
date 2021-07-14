import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_datastore/amplify_datastore.dart';
import 'package:amplify_flutter/amplify.dart';
import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';
import 'package:green_pouch/models/Reward.dart';
import 'package:green_pouch/search/widgets/list.dart';

import '../amplifyconfiguration.dart';

class SearchView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => SearchViewState();
}

class SearchViewState extends State<SearchView> {
  bool _isLoading = true;

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
      // query for all Todo entries by passing the Todo classType to
      // Amplify.DataStore.query()
      List<Reward> updatedTodos =
          await Amplify.DataStore.query(Reward.classType);
      print(updatedTodos);
      // update the ui state to reflect fetched todos
      setState(() {
        _rewards = updatedTodos;
      });
    } catch (e) {
      print('An error occurred while querying Todos: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? Center(child: CircularProgressIndicator())
        : RewardsList(_rewards);
  }
}
