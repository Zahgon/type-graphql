import { GraphQLError } from "graphql";

export class AuthenticationError extends GraphQLError {
  override readonly extensions!: {
    code: "UNAUTHENTICATED";
    [attributeName: string]: unknown; // GraphQLErrorExtensions
  };

  constructor(message = "Access denied! You need to be authenticated to perform this action!") {
      throw new Error("STUB");
  }
}
