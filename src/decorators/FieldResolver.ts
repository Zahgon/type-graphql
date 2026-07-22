import { SymbolKeysNotSupportedError } from "@/errors";
import { getTypeDecoratorParams } from "@/helpers/decorators";
import { findType } from "@/helpers/findType";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import {
  type AdvancedOptions,
  type ReturnTypeFunc,
  type TypeOptions,
  type TypeValueThunk,
} from "./types";

export function FieldResolver(): MethodDecorator;
export function FieldResolver(options: AdvancedOptions): MethodDecorator;
export function FieldResolver(
  returnTypeFunction?: ReturnTypeFunc,
  options?: AdvancedOptions,
): MethodDecorator;
export function FieldResolver(
  returnTypeFuncOrOptions?: ReturnTypeFunc | AdvancedOptions,
  maybeOptions?: AdvancedOptions,
): MethodDecorator {
  return (prototype, propertyKey) => {
      throw new Error("STUB");
  };
}
