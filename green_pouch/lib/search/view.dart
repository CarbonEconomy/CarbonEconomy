import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';
import 'package:green_pouch/models/Reward.dart';
import 'package:green_pouch/search/widgets/list.dart';

class SearchView extends StatelessWidget {
  final List<Reward> _rewards;

  SearchView(this._rewards);

  @override
  Widget build(BuildContext context) {
    return RewardsList(_rewards);
  }
}
