import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type ClassType } from "@/typings";
import { type ClassTypeResolver } from "./types";

export function Resolver(): ClassDecorator;
export function Resolver(typeFunc: ClassTypeResolver): ClassDecorator;
export function Resolver(objectType: ClassType): ClassDecorator;
export function Resolver(objectTypeOrTypeFunc?: Function): ClassDecorator {
  return target => {
      throw new Error("STUB");
  };
}
