import { type NullableListOptions } from "@/decorators/types";

export class WrongNullableListOptionError extends Error {
  constructor(
    targetName: string,
    propertyName: string,
    nullable: boolean | NullableListOptions | undefined,
  ) {
      throw new Error("STUB");
  }
}
