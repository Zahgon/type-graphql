export class NoExplicitTypeError extends Error {
  constructor(typeName: string, propertyKey: string, parameterIndex?: number, argName?: string) {
      throw new Error("STUB");
  }
}
