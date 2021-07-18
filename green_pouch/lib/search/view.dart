import 'package:flutter/material.dart';
import 'package:green_pouch/models/ModelProvider.dart';
import 'package:green_pouch/models/Reward.dart';
import 'package:green_pouch/search/widgets/list.dart';

class SearchView extends StatelessWidget {
  final List<Reward> _rewards;
  int credits;
  Function(Reward) onClaim;

  SearchView(this._rewards, this.credits, this.onClaim);

  @override
  Widget build(BuildContext context) {
    return RewardsList(_rewards, this.credits, this.onClaim);
  }
}
