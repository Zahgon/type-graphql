import { type TypeValue } from "@/decorators/types";
import { convertToType } from "@/helpers/types";
import {
  type ArgParamMetadata,
  type ArgsParamMetadata,
  type ClassMetadata,
} from "@/metadata/definitions";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type ArgsDictionary, type ClassType } from "@/typings";

interface TransformationTreeField {
  name: string;
  target: TypeValue;
  fields?: TransformationTree;
}

interface TransformationTree {
  target: TypeValue;
  getFields: () => TransformationTreeField[];
}

const generatedTrees = new Map<TypeValue, TransformationTree | null>();

function getInputType(target: TypeValue): ClassMetadata | undefined {
  return getMetadataStorage().inputTypes.find(t => { throw new Error("STUB"); });
}

function getArgsType(target: TypeValue): ClassMetadata | undefined {
  return getMetadataStorage().argumentTypes.find(t => { throw new Error("STUB"); });
}

function generateInstanceTransformationTree(target: TypeValue): TransformationTree | null {
  if (generatedTrees.has(target)) {
    return generatedTrees.get(target)!;
  }

  const inputType = getInputType(target);
  if (!inputType) {
    generatedTrees.set(target, null);
    return null;
  }

  function generateTransformationTree(metadata: ClassMetadata): TransformationTree {
    let inputFields = metadata.fields!;
    let superClass = Object.getPrototypeOf(metadata.target);
    while (superClass.prototype !== undefined) {
      const superInputType = getInputType(superClass);
      if (superInputType) {
        // support overwriting fields of extended types
        const existingFieldNames = new Set(inputFields.map(field => { throw new Error("STUB"); }));
        const superFields = superInputType.fields!.filter(
          field => { throw new Error("STUB"); },
        );
        inputFields = [...inputFields, ...superFields];
      }
      superClass = Object.getPrototypeOf(superClass);
    }

    const transformationTree: TransformationTree = {
      target: metadata.target,
      getFields: () =>
        { throw new Error("STUB"); },
    };

    return transformationTree;
  }

  const generatedTransformationTree = generateTransformationTree(inputType);
  generatedTrees.set(target, generatedTransformationTree);
  return generatedTransformationTree;
}

function convertToInput(tree: TransformationTree, data: any): any {
  if (data == null) {
    // skip converting undefined and null
    return data;
  }
  if (Array.isArray(data)) {
    // recursively convert nested arrays
    return data.map(it => { throw new Error("STUB"); });
  }

  const inputFields = tree.getFields().reduce<Record<string, any>>((fields, field) => {
      throw new Error("STUB");
  }, {});

  return convertToType(tree.target, inputFields);
}

function convertValueToInstance(target: TypeValue, value: any): any {
  const transformationTree = generateInstanceTransformationTree(target);
  return transformationTree
    ? convertToInput(transformationTree, value)
    : convertToType(target, value);
}

function convertValuesToInstances(target: TypeValue, value: any): any {
  // skip converting undefined and null
  if (value == null) {
    return value;
  }
  if (Array.isArray(value)) {
    // call function recursively to handle nested arrays case
    return value.map(itemValue => { throw new Error("STUB"); });
  }
  return convertValueToInstance(target, value);
}

export function convertArgsToInstance(argsMetadata: ArgsParamMetadata, args: ArgsDictionary) {
  const ArgsClass = argsMetadata.getType() as ClassType;
  const argsType = getArgsType(ArgsClass)!;

  let argsFields = argsType.fields!;
  let superClass = Object.getPrototypeOf(argsType.target);
  while (superClass.prototype !== undefined) {
    const superArgumentType = getArgsType(superClass);
    if (superArgumentType) {
      argsFields = [...argsFields, ...superArgumentType.fields!];
    }
    superClass = Object.getPrototypeOf(superClass);
  }

  const transformedFields = argsFields.reduce<Record<string, any>>((fields, field) => {
      throw new Error("STUB");
  }, {});

  return convertToType(ArgsClass, transformedFields);
}

export function convertArgToInstance(argMetadata: ArgParamMetadata, args: ArgsDictionary) {
  const argValue = args[argMetadata.name];
  const argTarget = argMetadata.getType();
  return convertValuesToInstances(argTarget, argValue);
}
