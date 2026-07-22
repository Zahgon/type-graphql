import { type UnionMetadata } from "@/metadata/definitions";

export class UnionResolveTypeError extends Error {
  constructor(unionMetadata: UnionMetadata) {
      throw new Error("STUB");
  }
}
