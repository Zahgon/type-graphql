import { SymbolKeysNotSupportedError } from "@/errors";
import { type ExtensionsMetadata } from "@/metadata/definitions";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type MethodAndPropDecorator } from "./types";

export function Extensions(extensions: ExtensionsMetadata): MethodAndPropDecorator & ClassDecorator;
export function Extensions(
  extensions: ExtensionsMetadata,
): MethodDecorator | PropertyDecorator | ClassDecorator {
  return (targetOrPrototype, propertyKey, _descriptor) => {
      throw new Error("STUB");
  };
}
