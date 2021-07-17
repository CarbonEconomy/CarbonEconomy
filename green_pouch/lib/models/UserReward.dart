/*
* Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License").
* You may not use this file except in compliance with the License.
* A copy of the License is located at
*
*  http://aws.amazon.com/apache2.0
*
* or in the "license" file accompanying this file. This file is distributed
* on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied. See the License for the specific language governing
* permissions and limitations under the License.
*/

import 'package:amplify_datastore_plugin_interface/amplify_datastore_plugin_interface.dart';
import 'package:collection/collection.dart';
import 'package:flutter/foundation.dart';

// ignore_for_file: public_member_api_docs

import 'ModelProvider.dart';

/** This is an auto generated class representing the UserReward type in your schema. */
@immutable
class UserReward extends Model {
  static const classType = const _UserRewardModelType();
  final String id;
  final List<Reward>? _Rewards;
  final String? _userId;
  final int? _treesDonated;

  @override
  getInstanceType() => classType;

  @override
  String getId() {
    return id;
  }

  List<Reward>? get Rewards {
    return _Rewards;
  }

  String get userId {
    try {
      return _userId!;
    } catch (e) {
      throw new DataStoreException(
          DataStoreExceptionMessages
              .codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion: DataStoreExceptionMessages
              .codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString());
    }
  }

  int get treesDonated {
    try {
      return _treesDonated!;
    } catch (e) {
      throw new DataStoreException(
          DataStoreExceptionMessages
              .codeGenRequiredFieldForceCastExceptionMessage,
          recoverySuggestion: DataStoreExceptionMessages
              .codeGenRequiredFieldForceCastRecoverySuggestion,
          underlyingException: e.toString());
    }
  }

  const UserReward._internal(
      {required this.id, Rewards, required userId, required treesDonated})
      : _Rewards = Rewards,
        _userId = userId,
        _treesDonated = treesDonated;

  factory UserReward(
      {String? id,
      List<Reward>? Rewards,
      required String userId,
      required int treesDonated}) {
    return UserReward._internal(
        id: id == null ? UUID.getUUID() : id,
        Rewards: Rewards != null ? List<Reward>.unmodifiable(Rewards) : Rewards,
        userId: userId,
        treesDonated: treesDonated);
  }

  bool equals(Object other) {
    return this == other;
  }

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UserReward &&
        id == other.id &&
        DeepCollectionEquality().equals(_Rewards, other._Rewards) &&
        _userId == other._userId &&
        _treesDonated == other._treesDonated;
  }

  @override
  int get hashCode => toString().hashCode;

  @override
  String toString() {
    var buffer = new StringBuffer();

    buffer.write("UserReward {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("userId=" + "$_userId" + ", ");
    buffer.write("treesDonated=" +
        (_treesDonated != null ? _treesDonated!.toString() : "null"));
    buffer.write("}");

    return buffer.toString();
  }

  UserReward copyWith(
      {String? id, List<Reward>? Rewards, String? userId, int? treesDonated}) {
    return UserReward(
        id: id ?? this.id,
        Rewards: Rewards ?? this.Rewards,
        userId: userId ?? this.userId,
        treesDonated: treesDonated ?? this.treesDonated);
  }

  UserReward.fromJson(Map<String, dynamic> json)
      : id = json['id'],
        _Rewards = json['Rewards'] is List
            ? (json['Rewards'] as List)
                .where((e) => e?['serializedData'] != null)
                .map((e) => Reward.fromJson(
                    new Map<String, dynamic>.from(e['serializedData'])))
                .toList()
            : null,
        _userId = json['userId'],
        _treesDonated = json['treesDonated'];

  Map<String, dynamic> toJson() => {
        'id': id,
        'Rewards': _Rewards?.map((e) => e.toJson())?.toList(),
        'userId': _userId,
        'treesDonated': _treesDonated
      };

  static final QueryField ID = QueryField(fieldName: "userReward.id");
  static final QueryField REWARDS = QueryField(
      fieldName: "Rewards",
      fieldType: ModelFieldType(ModelFieldTypeEnum.model,
          ofModelName: (Reward).toString()));
  static final QueryField USERID = QueryField(fieldName: "userId");
  static final QueryField TREESDONATED = QueryField(fieldName: "treesDonated");
  static var schema =
      Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "UserReward";
    modelSchemaDefinition.pluralName = "UserRewards";

    modelSchemaDefinition.authRules = [
      AuthRule(authStrategy: AuthStrategy.PUBLIC, operations: [
        ModelOperation.CREATE,
        ModelOperation.UPDATE,
        ModelOperation.DELETE,
        ModelOperation.READ
      ])
    ];

    modelSchemaDefinition.addField(ModelFieldDefinition.id());

    modelSchemaDefinition.addField(ModelFieldDefinition.hasMany(
        key: UserReward.REWARDS,
        isRequired: true,
        ofModelName: (Reward).toString(),
        associatedKey: Reward.USERREWARDID));

    modelSchemaDefinition.addField(ModelFieldDefinition.field(
        key: UserReward.USERID,
        isRequired: true,
        ofType: ModelFieldType(ModelFieldTypeEnum.string)));

    modelSchemaDefinition.addField(ModelFieldDefinition.field(
        key: UserReward.TREESDONATED,
        isRequired: true,
        ofType: ModelFieldType(ModelFieldTypeEnum.int)));
  });
}

class _UserRewardModelType extends ModelType<UserReward> {
  const _UserRewardModelType();

  @override
  UserReward fromJson(Map<String, dynamic> jsonData) {
    return UserReward.fromJson(jsonData);
  }
}
