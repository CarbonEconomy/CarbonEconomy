class Transaction {
  final String fromID;
  final String toID;
  final int amount;

  Transaction({required this.fromID, required this.toID, required this.amount});

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
        fromID: "${json["fromID"]}",
        toID: "${json["toID"]}",
        amount: json["amount"]);
  }

  Map<String, dynamic> toJson() {
    return {
      "fromID": fromID,
      "toID": toID,
      "amount": amount,
    };
  }
}
