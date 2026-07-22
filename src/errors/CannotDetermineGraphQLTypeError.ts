export class CannotDetermineGraphQLTypeError extends Error {
  constructor(
    typeKind: "input" | "output",
    typeName: string,
    propertyKey: string,
    parameterIndex?: number,
    argName?: string,
  ) {
      throw new Error("STUB");
  }
}
