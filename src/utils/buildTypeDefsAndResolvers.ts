import { type GraphQLSchema, printSchema } from "graphql";
import { type BuildSchemaOptions, buildSchema, buildSchemaSync } from "./buildSchema";
import { createResolversMap } from "./createResolversMap";

function createTypeDefsAndResolversMap(schema: GraphQLSchema) {
    throw new Error("STUB");
}

export async function buildTypeDefsAndResolvers(options: BuildSchemaOptions) {
    throw new Error("STUB");
}

export function buildTypeDefsAndResolversSync(options: BuildSchemaOptions) {
    throw new Error("STUB");
}
