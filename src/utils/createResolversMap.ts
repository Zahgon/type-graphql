/* eslint-disable no-param-reassign */
import {
  type GraphQLAbstractType,
  GraphQLEnumType,
  type GraphQLFieldMap,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  type GraphQLSchema,
  type GraphQLTypeResolver,
  GraphQLUnionType,
} from "graphql";
import { type EnumResolver, type ResolverObject, type ResolversMap } from "@/typings";

function generateTypeResolver(
  abstractType: GraphQLAbstractType,
  schema: GraphQLSchema,
): GraphQLTypeResolver<any, any> {
  if (abstractType.resolveType) {
    return abstractType.resolveType;
  }

  const possibleObjectTypes = schema.getPossibleTypes(abstractType);
  return async (source, context, info) => {
      throw new Error("STUB");
  };
}

function generateFieldsResolvers(fields: GraphQLFieldMap<any, any>): ResolverObject {
  return Object.keys(fields).reduce<ResolverObject>((fieldsMap, fieldName) => {
      throw new Error("STUB");
  }, {});
}

export function createResolversMap(schema: GraphQLSchema): ResolversMap {
  const typeMap = schema.getTypeMap();
  return Object.keys(typeMap)
    .filter(typeName => { throw new Error("STUB"); })
    .reduce<ResolversMap>((resolversMap, typeName) => {
        throw new Error("STUB");
    }, {});
}
