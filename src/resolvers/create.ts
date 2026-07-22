import { type GraphQLFieldResolver } from "graphql";
import { AuthMiddleware } from "@/helpers/auth-middleware";
import { convertToType } from "@/helpers/types";
import {
  type BaseResolverMetadata,
  type FieldMetadata,
  type FieldResolverMetadata,
} from "@/metadata/definitions";
import { BuildContext } from "@/schema/build-context";
import { type ResolverData } from "@/typings";
import { type IOCContainer } from "@/utils/container";
import { isPromiseLike } from "@/utils/isPromiseLike";
import { applyAuthChecker, applyMiddlewares, getParams } from "./helpers";

export function createHandlerResolver(
  resolverMetadata: BaseResolverMetadata,
): GraphQLFieldResolver<any, any, any> {
  const {
    validate: globalValidate,
    validateFn,
    authChecker,
    authMode,
    globalMiddlewares,
    container,
  } = BuildContext;
  const middlewares = globalMiddlewares.concat(resolverMetadata.middlewares!);
  applyAuthChecker(middlewares, authChecker, container, authMode, resolverMetadata.roles);

  return (root, args, context, info) => {
      throw new Error("STUB");
  };
}

export function createAdvancedFieldResolver(
  fieldResolverMetadata: FieldResolverMetadata,
): GraphQLFieldResolver<any, any, any> {
  if (fieldResolverMetadata.kind === "external") {
    return createHandlerResolver(fieldResolverMetadata);
  }

  const targetType = fieldResolverMetadata.getObjectType!();
  const {
    validate: globalValidate,
    validateFn,
    authChecker,
    authMode,
    globalMiddlewares,
    container,
  } = BuildContext;
  const middlewares = globalMiddlewares.concat(fieldResolverMetadata.middlewares!);
  applyAuthChecker(middlewares, authChecker, container, authMode, fieldResolverMetadata.roles);

  return (root, args, context, info) => {
      throw new Error("STUB");
  };
}

export function createBasicFieldResolver(
  fieldMetadata: FieldMetadata,
): GraphQLFieldResolver<any, any, any> {
  const { authChecker, authMode, globalMiddlewares, container } = BuildContext;
  const middlewares = globalMiddlewares.concat(fieldMetadata.middlewares!);
  applyAuthChecker(middlewares, authChecker, container, authMode, fieldMetadata.roles);

  return (root, args, context, info) => {
      throw new Error("STUB");
  };
}

export function wrapResolverWithAuthChecker(
  resolver: GraphQLFieldResolver<any, any>,
  container: IOCContainer,
  roles: any[] | undefined,
): GraphQLFieldResolver<any, any> {
  const { authChecker, authMode } = BuildContext;
  if (!authChecker || !roles) {
    return resolver;
  }

  return (root, args, context, info) => {
      throw new Error("STUB");
  };
}
