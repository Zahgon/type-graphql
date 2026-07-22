import { type ClassMetadata } from "@/metadata/definitions";

export class InterfaceResolveTypeError extends Error {
  constructor(interfaceMetadata: ClassMetadata) {
      throw new Error("STUB");
  }
}
