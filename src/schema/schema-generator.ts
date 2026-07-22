import { Repeater, filter, pipe } from "@graphql-yoga/subscription";
import {
  type GraphQLDirective,
  GraphQLEnumType,
  type GraphQLEnumValueConfigMap,
  type GraphQLFieldConfigArgumentMap,
  type GraphQLFieldConfigMap,
  type GraphQLFieldResolver,
  type GraphQLInputFieldConfigMap,
  GraphQLInputObjectType,
  type GraphQLInputType,
  GraphQLInterfaceType,
  type GraphQLNamedType,
  GraphQLObjectType,
  type GraphQLOutputType,
  GraphQLSchema,
  type GraphQLTypeResolver,
  GraphQLUnionType,
  getIntrospectionQuery,
  graphqlSync,
} from "graphql";
import { type TypeOptions, type TypeValue } from "@/decorators/types";
import {
  CannotDetermineGraphQLTypeError,
  ConflictingDefaultValuesError,
  GeneratingSchemaError,
  InterfaceResolveTypeError,
  MissingPubSubError,
  MissingSubscriptionTopicsError,
  UnionResolveTypeError,
} from "@/errors";
import { convertTypeIfScalar, getEnumValuesMap, wrapWithTypeOptions } from "@/helpers/types";
import {
  type ClassMetadata,
  type FieldMetadata,
  type ParamMetadata,
  type ResolverMetadata,
  type SubscriptionResolverMetadata,
} from "@/metadata/definitions";
import { type InterfaceClassMetadata } from "@/metadata/definitions/interface-class-metadata";
import { type ObjectClassMetadata } from "@/metadata/definitions/object-class-metadata";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type MetadataStorage } from "@/metadata/metadata-storage";
import {
  createAdvancedFieldResolver,
  createBasicFieldResolver,
  createHandlerResolver,
  wrapResolverWithAuthChecker,
} from "@/resolvers/create";
import {
  type MaybePromise,
  type SubscribeResolverData,
  type SubscriptionHandlerData,
  type TypeResolver,
} from "@/typings";
import { ensureInstalledCorrectGraphQLPackage } from "@/utils/graphql-version";
import { BuildContext, type BuildContextOptions } from "./build-context";
import {
  getFieldDefinitionNode,
  getInputObjectTypeDefinitionNode,
  getInputValueDefinitionNode,
  getInterfaceTypeDefinitionNode,
  getObjectTypeDefinitionNode,
} from "./definition-node";
import { getFieldMetadataFromInputType, getFieldMetadataFromObjectType } from "./utils";

interface ObjectTypeInfo {
  target: Function;
  type: GraphQLObjectType;
  metadata: ObjectClassMetadata;
}
interface InterfaceTypeInfo {
  target: Function;
  type: GraphQLInterfaceType;
  metadata: InterfaceClassMetadata;
}
interface InputObjectTypeInfo {
  target: Function;
  type: GraphQLInputObjectType;
}
interface EnumTypeInfo {
  enumObj: object;
  type: GraphQLEnumType;
}
interface UnionTypeInfo {
  unionSymbol: symbol;
  type: GraphQLUnionType;
}

export type SchemaGeneratorOptions = {
  /**
   * Array of resolvers classes
   */
  resolvers: Function[];
  /**
   * Array of orphaned type classes that are not used explicitly in GraphQL types definitions
   */
  orphanedTypes?: Function[];
  /**
   * Disable checking on build the correctness of a schema
   */
  skipCheck?: boolean;
  /**
   * Array of graphql directives
   */
  directives?: GraphQLDirective[];
} & BuildContextOptions;

export abstract class SchemaGenerator {
  private static objectTypesInfoMap = new Map<Function, ObjectTypeInfo>();

  private static inputTypesInfoMap = new Map<Function, InputObjectTypeInfo>();

  private static interfaceTypesInfoMap = new Map<Function, InterfaceTypeInfo>();

  private static enumTypesInfoMap = new Map<object, EnumTypeInfo>();

  private static unionTypesInfoMap = new Map<symbol, UnionTypeInfo>();

  private static usedInterfaceTypes = new Set<Function>();

  private static metadataStorage: MetadataStorage;

  static generateFromMetadata(options: SchemaGeneratorOptions): GraphQLSchema {
    this.metadataStorage = getMetadataStorage().clone();
    this.metadataStorage.build(options);

    this.checkForErrors(options);
    BuildContext.create(options);

    this.buildTypesInfo(options.resolvers);

    const orphanedTypes = options.orphanedTypes ?? [];
    const prebuiltSchema = new GraphQLSchema({
      query: this.buildRootQueryType(options.resolvers),
      mutation: this.buildRootMutationType(options.resolvers),
      subscription: this.buildRootSubscriptionType(options.resolvers),
      directives: options.directives,
    });
    const finalSchema = new GraphQLSchema({
      ...prebuiltSchema.toConfig(),
      // run after first build to make `usedInterfaceTypes` working
      types: this.buildOtherTypes(orphanedTypes),
    });

    // cleanup after build to prevent memory leaks
    // and to reset state for next possible builds
    BuildContext.reset();
    this.usedInterfaceTypes = new Set<Function>();
    this.objectTypesInfoMap = new Map<Function, ObjectTypeInfo>();
    this.inputTypesInfoMap = new Map<Function, InputObjectTypeInfo>();
    this.interfaceTypesInfoMap = new Map<Function, InterfaceTypeInfo>();
    this.enumTypesInfoMap = new Map<object, EnumTypeInfo>();
    this.unionTypesInfoMap = new Map<symbol, UnionTypeInfo>();

    if (!options.skipCheck) {
      const { errors } = graphqlSync({ schema: finalSchema, source: getIntrospectionQuery() });
      if (errors) {
        throw new GeneratingSchemaError(errors);
      }
    }

    return finalSchema;
  }

  private static checkForErrors(options: SchemaGeneratorOptions) {
    ensureInstalledCorrectGraphQLPackage();
    if (this.metadataStorage.authorizedFields.length !== 0 && options.authChecker === undefined) {
      throw new Error(
        "You need to provide `authChecker` function for `@Authorized` decorator usage!",
      );
    }
  }

  private static getDefaultValue(
    typeInstance: Record<string, unknown>,
    typeOptions: TypeOptions,
    fieldName: string,
    typeName: string,
  ): unknown | undefined {
    const { disableInferringDefaultValues } = BuildContext;
    if (disableInferringDefaultValues) {
      return typeOptions.defaultValue;
    }

    const defaultValueFromInitializer = typeInstance[fieldName];
    if (
      typeOptions.defaultValue !== undefined &&
      defaultValueFromInitializer !== undefined &&
      typeOptions.defaultValue !== defaultValueFromInitializer
    ) {
      throw new ConflictingDefaultValuesError(
        typeName,
        fieldName,
        typeOptions.defaultValue,
        defaultValueFromInitializer,
      );
    }
    return typeOptions.defaultValue !== undefined
      ? typeOptions.defaultValue
      : defaultValueFromInitializer;
  }

  private static buildTypesInfo(resolvers: Function[]) {
    this.unionTypesInfoMap = new Map<symbol, UnionTypeInfo>(
      this.metadataStorage.unions.map(unionMetadata => {
          throw new Error("STUB");
      }),
    );

    this.enumTypesInfoMap = new Map<object, EnumTypeInfo>(
      this.metadataStorage.enums.map(enumMetadata => {
          throw new Error("STUB");
      }),
    );

    this.objectTypesInfoMap = new Map<Function, ObjectTypeInfo>(
      this.metadataStorage.objectTypes.map(objectType => {
          throw new Error("STUB");
      }),
    );

    this.interfaceTypesInfoMap = new Map<Function, InterfaceTypeInfo>(
      this.metadataStorage.interfaceTypes.map(interfaceType => {
          throw new Error("STUB");
      }),
    );

    this.inputTypesInfoMap = new Map<Function, InputObjectTypeInfo>(
      this.metadataStorage.inputTypes.map(inputType => {
          throw new Error("STUB");
      }),
    );
  }

  private static buildRootQueryType(resolvers: Function[]): GraphQLObjectType {
    const queriesHandlers = this.filterHandlersByResolvers(this.metadataStorage.queries, resolvers);

    return new GraphQLObjectType({
      name: "Query",
      fields: this.generateHandlerFields(queriesHandlers),
    });
  }

  private static buildRootMutationType(resolvers: Function[]): GraphQLObjectType | undefined {
    const mutationsHandlers = this.filterHandlersByResolvers(
      this.metadataStorage.mutations,
      resolvers,
    );
    if (mutationsHandlers.length === 0) {
      return undefined;
    }

    return new GraphQLObjectType({
      name: "Mutation",
      fields: this.generateHandlerFields(mutationsHandlers),
    });
  }

  private static buildRootSubscriptionType(resolvers: Function[]): GraphQLObjectType | undefined {
    const subscriptionsHandlers = this.filterHandlersByResolvers(
      this.metadataStorage.subscriptions,
      resolvers,
    );
    if (subscriptionsHandlers.length === 0) {
      return undefined;
    }

    return new GraphQLObjectType({
      name: "Subscription",
      fields: this.generateSubscriptionsFields(subscriptionsHandlers),
    });
  }

  private static buildOtherTypes(orphanedTypes: Function[]): GraphQLNamedType[] {
    const autoRegisteredObjectTypesInfo = [...this.objectTypesInfoMap.values()].filter(typeInfo =>
      { throw new Error("STUB"); },
    );
    return [
      ...this.filterTypesInfoByOrphanedTypesAndExtractType(
        [...this.objectTypesInfoMap.values()],
        orphanedTypes,
      ),
      ...this.filterTypesInfoByOrphanedTypesAndExtractType(
        [...this.interfaceTypesInfoMap.values()],
        orphanedTypes,
      ),
      ...this.filterTypesInfoByOrphanedTypesAndExtractType(
        [...this.inputTypesInfoMap.values()],
        orphanedTypes,
      ),
      ...autoRegisteredObjectTypesInfo.map(typeInfo => { throw new Error("STUB"); }),
    ];
  }

  private static generateHandlerFields<T = any, U = any>(
    handlers: ResolverMetadata[],
  ): GraphQLFieldConfigMap<T, U> {
    return handlers.reduce<GraphQLFieldConfigMap<T, U>>((fields, handler) => {
        throw new Error("STUB");
    }, {});
  }

  private static generateSubscriptionsFields<
    TSource extends object = any,
    TContext extends object = any,
  >(
    subscriptionsHandlers: SubscriptionResolverMetadata[],
  ): GraphQLFieldConfigMap<TSource, TContext> {
    if (!subscriptionsHandlers.length) {
      return {};
    }
    const { pubSub, container } = BuildContext;
    if (!pubSub) {
      throw new MissingPubSubError();
    }
    const basicFields = this.generateHandlerFields(subscriptionsHandlers);
    return subscriptionsHandlers.reduce<GraphQLFieldConfigMap<TSource, TContext>>(
      (fields, handler) => {
            throw new Error("STUB");
        },
      basicFields,
    );
  }

  private static generateHandlerArgs(
    target: Function,
    propertyName: string,
    params: ParamMetadata[],
  ): GraphQLFieldConfigArgumentMap {
    return params!.reduce<GraphQLFieldConfigArgumentMap>((args, param) => {
        throw new Error("STUB");
    }, {});
  }

  private static mapArgFields(
    argumentType: ClassMetadata,
    args: GraphQLFieldConfigArgumentMap = {},
  ) {
    const argumentInstance = new (argumentType.target as any)();
    argumentType.fields!.forEach(field => {
        throw new Error("STUB");
    });
  }

  private static getGraphQLOutputType(
    target: Function,
    propertyName: string,
    type: TypeValue,
    typeOptions: TypeOptions = {},
  ): GraphQLOutputType {
    let gqlType: GraphQLOutputType | undefined;
    gqlType = convertTypeIfScalar(type);
    if (!gqlType) {
      const objectType = this.objectTypesInfoMap.get(type as Function);
      if (objectType) {
        gqlType = objectType.type;
      }
    }
    if (!gqlType) {
      const interfaceType = this.interfaceTypesInfoMap.get(type as Function);
      if (interfaceType) {
        this.usedInterfaceTypes.add(interfaceType.target);
        gqlType = interfaceType.type;
      }
    }
    if (!gqlType) {
      const enumType = this.enumTypesInfoMap.get(type as object);
      if (enumType) {
        gqlType = enumType.type;
      }
    }
    if (!gqlType) {
      const unionType = this.unionTypesInfoMap.get(type as symbol);
      if (unionType) {
        gqlType = unionType.type;
      }
    }
    if (!gqlType) {
      throw new CannotDetermineGraphQLTypeError("output", target.name, propertyName);
    }

    const { nullableByDefault } = BuildContext;
    return wrapWithTypeOptions(target, propertyName, gqlType, typeOptions, nullableByDefault);
  }

  private static getGraphQLInputType(
    target: Function,
    propertyName: string,
    type: TypeValue,
    typeOptions: TypeOptions = {},
    parameterIndex?: number,
    argName?: string,
  ): GraphQLInputType {
    let gqlType: GraphQLInputType | undefined;
    gqlType = convertTypeIfScalar(type);
    if (!gqlType) {
      const inputType = this.inputTypesInfoMap.get(type as Function);
      if (inputType) {
        gqlType = inputType.type;
      }
    }
    if (!gqlType) {
      const enumType = this.enumTypesInfoMap.get(type as object);
      if (enumType) {
        gqlType = enumType.type;
      }
    }
    if (!gqlType) {
      throw new CannotDetermineGraphQLTypeError(
        "input",
        target.name,
        propertyName,
        parameterIndex,
        argName,
      );
    }

    const { nullableByDefault } = BuildContext;
    return wrapWithTypeOptions(target, propertyName, gqlType, typeOptions, nullableByDefault);
  }

  private static getResolveTypeFunction<TSource = any, TContext = any>(
    resolveType: TypeResolver<TSource, TContext>,
    possibleObjectTypesInfo: ObjectTypeInfo[],
  ): GraphQLTypeResolver<TSource, TContext> {
    return async (...args) => {
        throw new Error("STUB");
    };
  }

  private static filterHandlersByResolvers<T extends ResolverMetadata>(
    handlers: T[],
    resolvers: Function[],
  ) {
    return handlers.filter(query => { throw new Error("STUB"); });
  }

  private static filterTypesInfoByOrphanedTypesAndExtractType(
    typesInfo: Array<ObjectTypeInfo | InterfaceTypeInfo | InputObjectTypeInfo>,
    orphanedTypes: Function[],
  ) {
    return typesInfo.filter(it => { throw new Error("STUB"); }).map(it => { throw new Error("STUB"); });
  }
}
