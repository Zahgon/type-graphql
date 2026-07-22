/* eslint-disable no-param-reassign */
import { NoExplicitTypeError } from "@/errors";
import { type SchemaGeneratorOptions } from "@/schema/schema-generator";
import { type ClassType } from "@/typings";
import {
  type AuthorizedClassMetadata,
  type AuthorizedMetadata,
  type BaseResolverMetadata,
  type ClassMetadata,
  type EnumMetadata,
  type ExtensionsClassMetadata,
  type ExtensionsFieldMetadata,
  type ExtensionsMetadata,
  type FieldMetadata,
  type FieldResolverMetadata,
  type MiddlewareMetadata,
  type ParamMetadata,
  type ResolverClassMetadata,
  type ResolverMetadata,
  type ResolverMiddlewareMetadata,
  type SubscriptionResolverMetadata,
  type UnionMetadata,
  type UnionMetadataWithSymbol,
} from "./definitions";
import {
  type DirectiveArgumentMetadata,
  type DirectiveClassMetadata,
  type DirectiveFieldMetadata,
} from "./definitions/directive-metadata";
import { type InterfaceClassMetadata } from "./definitions/interface-class-metadata";
import { type ObjectClassMetadata } from "./definitions/object-class-metadata";
import {
  mapMiddlewareMetadataToArray,
  mapSuperFieldResolverHandlers,
  mapSuperResolverHandlers,
} from "./utils";

export class MetadataStorage {
  queries: ResolverMetadata[] = [];

  mutations: ResolverMetadata[] = [];

  subscriptions: SubscriptionResolverMetadata[] = [];

  fieldResolvers: FieldResolverMetadata[] = [];

  objectTypes: ObjectClassMetadata[] = [];

  objectTypesCache = new Map<Function, ObjectClassMetadata>();

  inputTypes: ClassMetadata[] = [];

  argumentTypes: ClassMetadata[] = [];

  interfaceTypes: InterfaceClassMetadata[] = [];

  interfaceTypesCache = new Map<Function, InterfaceClassMetadata>();

  authorizedFields: AuthorizedMetadata[] = [];

  authorizedFieldsByTargetAndFieldCache = new Map<Function, Map<string, AuthorizedMetadata>>();

  authorizedResolver: AuthorizedClassMetadata[] = [];

  authorizedResolverByTargetCache = new Map<Function, AuthorizedClassMetadata>();

  enums: EnumMetadata[] = [];

  unions: UnionMetadataWithSymbol[] = [];

  middlewares: MiddlewareMetadata[] = [];

  middlewaresByTargetAndFieldCache = new Map<Function, Map<string, Set<MiddlewareMetadata>>>();

  resolverMiddlewares: ResolverMiddlewareMetadata[] = [];

  resolverMiddlewaresByTargetCache = new Map<Function, Set<ResolverMiddlewareMetadata>>();

  classDirectives: DirectiveClassMetadata[] = [];

  classDirectivesByTargetCache = new Map<Function, DirectiveClassMetadata[]>();

  fieldDirectives: DirectiveFieldMetadata[] = [];

  fieldDirectivesByTargetAndFieldCache = new Map<Function, Map<string, DirectiveFieldMetadata[]>>();

  argumentDirectives: DirectiveArgumentMetadata[] = [];

  classExtensions: ExtensionsClassMetadata[] = [];

  fieldExtensions: ExtensionsFieldMetadata[] = [];

  resolverClasses: ResolverClassMetadata[] = [];

  resolverClassesCache = new Map<Function, ResolverClassMetadata>();

  fields: FieldMetadata[] = [];

  fieldsCache = new Map<Function, FieldMetadata[]>();

  params: ParamMetadata[] = [];

  paramsCache = new Map<Function, Map<string, ParamMetadata[]>>();

  collectQueryHandlerMetadata(definition: ResolverMetadata) {
      throw new Error("STUB");
  }

  collectMutationHandlerMetadata(definition: ResolverMetadata) {
      throw new Error("STUB");
  }

  collectSubscriptionHandlerMetadata(definition: SubscriptionResolverMetadata) {
      throw new Error("STUB");
  }

  collectFieldResolverMetadata(definition: FieldResolverMetadata) {
      throw new Error("STUB");
  }

  collectObjectMetadata(definition: ObjectClassMetadata) {
      throw new Error("STUB");
  }

  collectInputMetadata(definition: ClassMetadata) {
      throw new Error("STUB");
  }

  collectArgsMetadata(definition: ClassMetadata) {
      throw new Error("STUB");
  }

  collectInterfaceMetadata(definition: InterfaceClassMetadata) {
      throw new Error("STUB");
  }

  collectAuthorizedFieldMetadata(definition: AuthorizedMetadata) {
      throw new Error("STUB");
  }

  collectAuthorizedResolverMetadata(definition: AuthorizedClassMetadata) {
      throw new Error("STUB");
  }

  collectEnumMetadata(definition: EnumMetadata) {
      throw new Error("STUB");
  }

  collectUnionMetadata(definition: UnionMetadata) {
      throw new Error("STUB");
  }

  collectMiddlewareMetadata(definition: MiddlewareMetadata) {
      throw new Error("STUB");
  }

  collectResolverMiddlewareMetadata(definition: ResolverMiddlewareMetadata) {
      throw new Error("STUB");
  }

  collectResolverClassMetadata(definition: ResolverClassMetadata) {
      throw new Error("STUB");
  }

  collectClassFieldMetadata(definition: FieldMetadata) {
    this.fields.push(definition);
  }

  collectHandlerParamMetadata(definition: ParamMetadata) {
      throw new Error("STUB");
  }

  collectDirectiveClassMetadata(definition: DirectiveClassMetadata) {
      throw new Error("STUB");
  }

  collectDirectiveFieldMetadata(definition: DirectiveFieldMetadata) {
      throw new Error("STUB");
  }

  collectDirectiveArgumentMetadata(definition: DirectiveArgumentMetadata) {
      throw new Error("STUB");
  }

  collectExtensionsClassMetadata(definition: ExtensionsClassMetadata) {
      throw new Error("STUB");
  }

  collectExtensionsFieldMetadata(definition: ExtensionsFieldMetadata) {
      throw new Error("STUB");
  }

  initCache() {
    this.clearMapCaches();

    if (this.resolverClasses?.length) {
      this.resolverClasses.forEach(resolverClass => {
          throw new Error("STUB");
      });
    }

    if (this.params?.length) {
      this.params.forEach(param => {
          throw new Error("STUB");
      });
    }

    if (this.middlewares?.length) {
      this.middlewares.forEach(middleware => {
          throw new Error("STUB");
      });
    }

    if (this.resolverMiddlewares?.length) {
      this.resolverMiddlewares.forEach(middleware => {
          throw new Error("STUB");
      });
    }

    if (this.fieldDirectives?.length) {
      this.fieldDirectives.forEach(directive => {
          throw new Error("STUB");
      });
    }

    if (this.classDirectives?.length) {
      this.classDirectives.forEach(directive => {
          throw new Error("STUB");
      });
    }

    if (this.authorizedFields?.length) {
      this.authorizedFields.forEach(field => {
          throw new Error("STUB");
      });
    }

    if (this.authorizedResolver?.length) {
      this.authorizedResolver.forEach(resolver => {
          throw new Error("STUB");
      });
    }

    if (this.fields?.length) {
      this.fields.forEach(field => {
          throw new Error("STUB");
      });
    }

    if (this.objectTypes?.length) {
      this.objectTypes.forEach(objType => {
          throw new Error("STUB");
      });
    }

    if (this.interfaceTypes?.length) {
      this.interfaceTypes.forEach(interfaceType => {
          throw new Error("STUB");
      });
    }
  }

  build(options: SchemaGeneratorOptions) {
    this.classDirectives.reverse();
    this.fieldDirectives.reverse();
    this.argumentDirectives.reverse();
    this.classExtensions.reverse();
    this.fieldExtensions.reverse();

    this.initCache();

    this.buildClassMetadata(this.objectTypes);
    this.buildClassMetadata(this.inputTypes);
    this.buildClassMetadata(this.argumentTypes);
    this.buildClassMetadata(this.interfaceTypes);

    this.buildFieldResolverMetadata(this.fieldResolvers, options);

    this.buildResolversMetadata(this.queries);
    this.buildResolversMetadata(this.mutations);
    this.buildResolversMetadata(this.subscriptions);

    this.buildExtendedResolversMetadata();
  }

  clear() {
      throw new Error("STUB");
  }

  clone() {
      throw new Error("STUB");
  }

  private clearMapCaches() {
    this.fieldsCache = new Map();
    this.objectTypesCache = new Map();
    this.interfaceTypesCache = new Map();
    this.middlewaresByTargetAndFieldCache = new Map();
    this.resolverMiddlewaresByTargetCache = new Map();
    this.paramsCache = new Map();
    this.fieldDirectivesByTargetAndFieldCache = new Map();
    this.classDirectivesByTargetCache = new Map();
    this.authorizedFieldsByTargetAndFieldCache = new Map();
    this.authorizedResolverByTargetCache = new Map();
    this.resolverClassesCache = new Map();
  }

  private buildClassMetadata(definitions: ClassMetadata[]) {
    definitions.forEach(def => {
        throw new Error("STUB");
    });
  }

  private buildResolversMetadata(definitions: BaseResolverMetadata[]) {
    definitions.forEach(def => {
        throw new Error("STUB");
    });
  }

  private buildFieldResolverMetadata(
    definitions: FieldResolverMetadata[],
    options: SchemaGeneratorOptions,
  ) {
    this.buildResolversMetadata(definitions);
    definitions.forEach(def => {
        throw new Error("STUB");
    });
  }

  private buildExtendedResolversMetadata() {
    this.resolverClasses.forEach(def => {
        throw new Error("STUB");
    });
  }

  private findFieldRoles(target: Function, fieldName: string): any[] | undefined {
    const authorizedField =
      this.authorizedFieldsByTargetAndFieldCache.get(target)?.get(fieldName) ||
      this.authorizedResolverByTargetCache.get(target);
    if (!authorizedField) {
      return undefined;
    }
    return authorizedField.roles;
  }

  private findExtensions(target: Function, fieldName?: string): ExtensionsMetadata {
    const storedExtensions: Array<ExtensionsClassMetadata | ExtensionsFieldMetadata> = fieldName
      ? this.fieldExtensions
      : this.classExtensions;
    return storedExtensions
      .filter(
        entry =>
          { throw new Error("STUB"); },
      )
      .reduce((extensions, entry) => { throw new Error("STUB"); }, {});
  }
}
