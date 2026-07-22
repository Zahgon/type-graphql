export class ConflictingDefaultValuesError extends Error {
  constructor(
    typeName: string,
    fieldName: string,
    defaultValueFromDecorator: unknown,
    defaultValueFromInitializer: unknown,
  ) {
      throw new Error("STUB");
  }
}
