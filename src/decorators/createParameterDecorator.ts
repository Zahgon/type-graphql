import { SymbolKeysNotSupportedError } from "@/errors";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type ParameterDecorator, type ResolverData } from "@/typings";
import { type ArgOptions } from "./Arg";
import { type ReturnTypeFunc } from "./types";
import { getParamInfo } from "../helpers/params";
import { type CustomParamOptions } from "../metadata/definitions";

export interface CustomParameterOptions {
  arg?: {
    name: string;
    typeFunc: ReturnTypeFunc;
    options?: ArgOptions;
  };
}

export type ParameterResolver<TContextType extends object = object> = (
  resolverData: ResolverData<TContextType>,
) => any;

export function createParameterDecorator<TContextType extends object = object>(
  resolver: ParameterResolver<TContextType>,
  paramOptions: CustomParameterOptions = {},
): ParameterDecorator {
    throw new Error("STUB");
}
