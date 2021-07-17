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
import 'package:flutter/foundation.dart';


/** This is an auto generated class representing the Reward type in your schema. */
@immutable
class Reward extends Model {
  static const classType = const _RewardModelType();
  final String id;
  final String? _title;
  final String? _pictureUrl;
  final String? _organisation;
  final int? _treesRequired;

  @override
  getInstanceType() => classType;
  
  @override
  String getId() {
    return id;
  }
  
  String get title {
    try {
      return _title!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  String get pictureUrl {
    try {
      return _pictureUrl!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  String get organisation {
    try {
      return _organisation!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  int get treesRequired {
    try {
      return _treesRequired!;
    } catch(e) {
      throw new DataStoreException(DataStoreExceptionMessages.codeGenRequiredFieldForceCastExceptionMessage, recoverySuggestion: DataStoreExceptionMessages.codeGenRequiredFieldForceCastRecoverySuggestion, underlyingException: e.toString());
    }
  }
  
  const Reward._internal({required this.id, required title, required pictureUrl, required organisation, required treesRequired}): _title = title, _pictureUrl = pictureUrl, _organisation = organisation, _treesRequired = treesRequired;
  
  factory Reward({String? id, required String title, required String pictureUrl, required String organisation, required int treesRequired}) {
    return Reward._internal(
      id: id == null ? UUID.getUUID() : id,
      title: title,
      pictureUrl: pictureUrl,
      organisation: organisation,
      treesRequired: treesRequired);
  }
  
  bool equals(Object other) {
    return this == other;
  }
  
  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is Reward &&
      id == other.id &&
      _title == other._title &&
      _pictureUrl == other._pictureUrl &&
      _organisation == other._organisation &&
      _treesRequired == other._treesRequired;
  }
  
  @override
  int get hashCode => toString().hashCode;
  
  @override
  String toString() {
    var buffer = new StringBuffer();
    
    buffer.write("Reward {");
    buffer.write("id=" + "$id" + ", ");
    buffer.write("title=" + "$_title" + ", ");
    buffer.write("pictureUrl=" + "$_pictureUrl" + ", ");
    buffer.write("organisation=" + "$_organisation" + ", ");
    buffer.write("treesRequired=" + (_treesRequired != null ? _treesRequired!.toString() : "null"));
    buffer.write("}");
    
    return buffer.toString();
  }
  
  Reward copyWith({String? id, String? title, String? pictureUrl, String? organisation, int? treesRequired}) {
    return Reward(
      id: id ?? this.id,
      title: title ?? this.title,
      pictureUrl: pictureUrl ?? this.pictureUrl,
      organisation: organisation ?? this.organisation,
      treesRequired: treesRequired ?? this.treesRequired);
  }
  
  Reward.fromJson(Map<String, dynamic> json)  
    : id = json['id'],
      _title = json['title'],
      _pictureUrl = json['pictureUrl'],
      _organisation = json['organisation'],
      _treesRequired = json['treesRequired'];
  
  Map<String, dynamic> toJson() => {
    'id': id, 'title': _title, 'pictureUrl': _pictureUrl, 'organisation': _organisation, 'treesRequired': _treesRequired
  };

  static final QueryField ID = QueryField(fieldName: "reward.id");
  static final QueryField TITLE = QueryField(fieldName: "title");
  static final QueryField PICTUREURL = QueryField(fieldName: "pictureUrl");
  static final QueryField ORGANISATION = QueryField(fieldName: "organisation");
  static final QueryField TREESREQUIRED = QueryField(fieldName: "treesRequired");
  static var schema = Model.defineSchema(define: (ModelSchemaDefinition modelSchemaDefinition) {
    modelSchemaDefinition.name = "Reward";
    modelSchemaDefinition.pluralName = "Rewards";
    
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
      key: Reward.TITLE,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Reward.PICTUREURL,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Reward.ORGANISATION,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.string)
    ));
    
    modelSchemaDefinition.addField(ModelFieldDefinition.field(
      key: Reward.TREESREQUIRED,
      isRequired: true,
      ofType: ModelFieldType(ModelFieldTypeEnum.int)
    ));
  });
}

class _RewardModelType extends ModelType<Reward> {
  const _RewardModelType();
  
  @override
  Reward fromJson(Map<String, dynamic> jsonData) {
    return Reward.fromJson(jsonData);
  }
}