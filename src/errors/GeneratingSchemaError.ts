import { type GraphQLError } from "graphql";

export class GeneratingSchemaError extends Error {
  details: readonly GraphQLError[];

  constructor(details: readonly GraphQLError[]) {
      throw new Error("STUB");
  }
}
