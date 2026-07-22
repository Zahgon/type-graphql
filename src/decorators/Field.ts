import { SymbolKeysNotSupportedError } from "@/errors";
import { getTypeDecoratorParams } from "@/helpers/decorators";
import { findType } from "@/helpers/findType";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type AdvancedOptions, type MethodAndPropDecorator, type ReturnTypeFunc } from "./types";

export type FieldOptions = AdvancedOptions & {
  /** Set to `true` to disable auth and all middlewares stack for this field resolver */
  simple?: boolean;
};

export function Field(): MethodAndPropDecorator;
export function Field(options: FieldOptions): MethodAndPropDecorator;
export function Field(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FieldOptions,
): MethodAndPropDecorator;
export function Field(
  returnTypeFuncOrOptions?: ReturnTypeFunc | FieldOptions,
  maybeOptions?: FieldOptions,
): MethodDecorator | PropertyDecorator {
  return (prototype, propertyKey, descriptor) => {
      throw new Error("STUB");
  };
}
