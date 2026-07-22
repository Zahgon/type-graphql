import {
  type GraphQLFieldConfigArgumentMap,
  type GraphQLFieldConfigMap,
  type GraphQLInputFieldConfigMap,
  type GraphQLInputObjectType,
  type GraphQLInterfaceType,
  type GraphQLObjectType,
} from "graphql";

export function getFieldMetadataFromInputType(type: GraphQLInputObjectType) {
  const fieldInfo = type.getFields();
  const typeFields = Object.keys(fieldInfo).reduce<GraphQLInputFieldConfigMap>(
    (fieldsMap, fieldName) => {
          throw new Error("STUB");
      },
    {},
  );
  return typeFields;
}

export function getFieldMetadataFromObjectType(type: GraphQLObjectType | GraphQLInterfaceType) {
  const fieldInfo = type.getFields();
  const typeFields = Object.keys(fieldInfo).reduce<GraphQLFieldConfigMap<any, any>>(
    (fieldsMap, fieldName) => {
          throw new Error("STUB");
      },
    {},
  );
  return typeFields;
}
