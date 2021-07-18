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

// ignore_for_file: public_member_api_docs

import 'package:amplify_datastore_plugin_interface/amplify_datastore_plugin_interface.dart';
import 'package:collection/collection.dart';
import 'package:flutter/foundation.dart';


/** This is an auto generated class representing the UserReward type in your schema. */
@immutable
class UserReward extends Model {
  static const classType = const _UserRewardModelType();
  final String id;
  final String? _userId;
  final int? _treesDonated;
  final List<String>? _rewardIds;

  @override
  getInstanceType() => classType;
  
  @override
  String getId() {
    return id;
  }
  
  String get userId {
    try {
      return _userId!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  int get treesDonated {
    try {
      return _treesDonated!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  List<String> get rewardIds {
    try {
      return _rewardIds!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  const UserReward._internal({required this.id, required userId, required treesDonated, required rewardIds}): _userId = userId, _treesDonated = treesDonated, _rewardIds = rewardIds;
  
  factory UserReward({String? id, required String userId, required int treesDonated, required List<String> rewardIds}) {
    return UserReward._internal(
      id: id == null ? UUID.getUUID() : id,
      userId: userId,
      treesDonated: treesDonated,
      rewardIds: rewardIds != null ? List<String>.unmodifiable(rewardIds) : rewardIds);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UserReward &&
      id == other.id &&
      _userId == other._userId &&
      _treesDonated == other._treesDonated &&
      DeepCollectionEquality().equals(_rewardIds, other._rewardIds);
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("UserReward {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("userId=" + "$_userId" + ", ");
    buffer.write("treesDonated=" + (_treesDonated != null ? _treesDonated!.toString() : "null") + ", ");
    buffer.write("rewardIds=" + (_rewardIds != null ? _rewardIds!.toString() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  UserReward copyWith({String? id, String? userId, int? treesDonated, List<String>? rewardIds}) {
    return UserReward(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      treesDonated: treesDonated ?? this.treesDonated,
      rewardIds: rewardIds ?? this.rewardIds);
  }
  
  UserReward.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _userId = json['userId'],
      _treesDonated = json['treesDonated'],
      _rewardIds = json['rewardIds']?.cast<String>();
  
  Map<String, dynamic> toJson() => {
    'id': id, 'userId': _userId, 'treesDonated': _treesDonated, 'rewardIds': _rewardIds
  };

  static final QueryField ID = QueryField(fieldName: "userReward.id");
  static final QueryField USERID = QueryField(fieldName: "userId");
  static final QueryField TREESDONATED = QueryField(fieldName: "treesDonated");
  static final QueryField REWARDIDS = QueryField(fieldName: "rewardIds");
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "UserReward";
    modelSchemaDefinition.pluralName = "UserRewards";
    
    modelSchemaDefinition.authRules = [
      AuthRule(
        authStrategy: AuthStrategy.PUBLIC,
        operations: [
          ModelOperation.CREATE,
          ModelOperation.UPDATE,
          ModelOperation.DELETE,
          ModelOperation.READ
        ])
    ];
    
    modelSchemaDefinition.addField(ModelFieldDefinition.id());
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: UserReward.USERID,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: UserReward.TREESDONATED,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: UserReward.REWARDIDS,
      isRequired: true,
      isArray: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.collection, ofModelName: describeEnum(ModelFieldTypeEnum.string))
    ));
  });
}

class _UserRewardModelType extends ModelType<UserReward> {
  const _UserRewardModelType();
  
  @override
  UserReward fromJson(Map<String, dynamic> jsonData) {
    return UserReward.fromJson(jsonData);
  }
}