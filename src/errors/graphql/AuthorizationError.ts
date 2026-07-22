import { GraphQLError } from "graphql";

export class AuthorizationError extends GraphQLError {
  override readonly extensions!: {
    code: "UNAUTHORIZED";
    [attributeName: string]: unknown; // GraphQLErrorExtensions
  };

  constructor(message = "Access denied! You don't have permission for this action!") {
      throw new Error("STUB");
  }
}
