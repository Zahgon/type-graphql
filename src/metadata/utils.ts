import { ReflectMetadataMissingError } from "@/errors";
import { isThrowing } from "@/helpers/isThrowing";
import { type Middleware } from "@/typings/middleware";
import {
  type BaseResolverMetadata,
  type FieldResolverMetadata,
  type ResolverClassMetadata,
  type ResolverMiddlewareMetadata,
} from "./definitions";

export function mapSuperResolverHandlers<T extends BaseResolverMetadata>(
  definitions: T[],
  superResolver: Function,
  resolverMetadata: ResolverClassMetadata,
): T[] {
  return definitions.map(metadata =>
    { throw new Error("STUB"); },
  );
}

export function mapSuperFieldResolverHandlers(
  definitions: FieldResolverMetadata[],
  superResolver: Function,
  resolverMetadata: ResolverClassMetadata,
) {
  const superMetadata = mapSuperResolverHandlers(definitions, superResolver, resolverMetadata);

  return superMetadata.map(metadata =>
    { throw new Error("STUB"); },
  );
}

export function mapMiddlewareMetadataToArray(
  metadata: ResolverMiddlewareMetadata[],
): Array<Middleware<any>> {
  return metadata
    .map(m => { throw new Error("STUB"); })
    .reduce<
      Array<Middleware<any>>
    >((middlewares, resultArray) => { throw new Error("STUB"); }, []);
}

export function ensureReflectMetadataExists() {
  if (typeof Reflect !== "object" || typeof Reflect.getMetadata !== "function") {
    throw new ReflectMetadataMissingError();
  }
}
