import { type ReturnTypeFunc, type TypeOptions, type ValidateOptions } from "@/decorators/types";
import { SymbolKeysNotSupportedError } from "@/errors";
import { type CommonArgMetadata } from "@/metadata/definitions";
import { findType } from "./findType";

export interface ParamInfo {
  prototype: Object;
  propertyKey: string | symbol;
  parameterIndex: number;
  argName?: string;
  returnTypeFunc?: ReturnTypeFunc;
  options?: TypeOptions & ValidateOptions;
}
export function getParamInfo({
  prototype,
  propertyKey,
  parameterIndex,
  argName,
  returnTypeFunc,
  options = {},
}: ParamInfo): CommonArgMetadata {
    throw new Error("STUB");
}
