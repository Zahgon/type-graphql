import { SymbolKeysNotSupportedError } from "@/errors";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type ParameterDecorator } from "@/typings";

export function Ctx(propertyName?: string): ParameterDecorator {
    throw new Error("STUB");
}
