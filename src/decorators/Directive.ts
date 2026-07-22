import { SymbolKeysNotSupportedError } from "@/errors";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type MethodAndPropDecorator } from "./types";

export function Directive(
  sdl: string,
): MethodAndPropDecorator & ClassDecorator & ParameterDecorator;
export function Directive(
  nameOrDefinition: string,
): MethodDecorator | PropertyDecorator | ClassDecorator | ParameterDecorator {
  return (
    targetOrPrototype: Object,
    propertyKey: string | symbol | undefined,
    parameterIndexOrDescriptor: number | TypedPropertyDescriptor<Object>,
  ) => {
      throw new Error("STUB");
  };
}
