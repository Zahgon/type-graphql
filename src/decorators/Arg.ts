import { getTypeDecoratorParams } from "@/helpers/decorators";
import { getParamInfo } from "@/helpers/params";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type ParameterDecorator } from "@/typings";
import {
  type DecoratorTypeOptions,
  type DeprecationOptions,
  type DescriptionOptions,
  type ReturnTypeFunc,
  type ValidateOptions,
} from "./types";

export type ArgOptions = DecoratorTypeOptions &
  DescriptionOptions &
  ValidateOptions &
  DeprecationOptions;

export function Arg(name: string, options?: ArgOptions): ParameterDecorator;
export function Arg(
  name: string,
  returnTypeFunc: ReturnTypeFunc,
  options?: ArgOptions,
): ParameterDecorator;
export function Arg(
  name: string,
  returnTypeFuncOrOptions?: ReturnTypeFunc | ArgOptions,
  maybeOptions?: ArgOptions,
): ParameterDecorator {
    throw new Error("STUB");
}
