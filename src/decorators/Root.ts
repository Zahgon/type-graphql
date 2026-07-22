import { SymbolKeysNotSupportedError } from "@/errors";
import { findType } from "@/helpers/findType";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type ParameterDecorator } from "@/typings";
import { type TypeValueThunk } from "./types";

export function Root(propertyName?: string): ParameterDecorator {
    throw new Error("STUB");
}
