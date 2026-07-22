import {
  type ConstArgumentNode,
  type ConstDirectiveNode,
  type DocumentNode,
  type FieldDefinitionNode,
  type GraphQLInputType,
  type GraphQLOutputType,
  type InputObjectTypeDefinitionNode,
  type InputValueDefinitionNode,
  type InterfaceTypeDefinitionNode,
  Kind,
  type ObjectTypeDefinitionNode,
  parse,
  parseConstValue,
} from "graphql";
import { InvalidDirectiveError } from "@/errors";
import { type DirectiveMetadata } from "@/metadata/definitions";
import { type SetRequired } from "@/typings";

export function getDirectiveNode(directive: DirectiveMetadata): ConstDirectiveNode {
    throw new Error("STUB");
}

export function getObjectTypeDefinitionNode(
  name: string,
  directiveMetadata?: DirectiveMetadata[],
): ObjectTypeDefinitionNode | undefined {
  if (!directiveMetadata || !directiveMetadata.length) {
    return undefined;
  }

  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    name: {
      kind: Kind.NAME,
      // FIXME: use proper AST representation
      value: name,
    },
    directives: directiveMetadata.map(getDirectiveNode),
  };
}

export function getInputObjectTypeDefinitionNode(
  name: string,
  directiveMetadata?: DirectiveMetadata[],
): InputObjectTypeDefinitionNode | undefined {
  if (!directiveMetadata || !directiveMetadata.length) {
    return undefined;
  }

  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    name: {
      kind: Kind.NAME,
      // FIXME: use proper AST representation
      value: name,
    },
    directives: directiveMetadata.map(getDirectiveNode),
  };
}

export function getFieldDefinitionNode(
  name: string,
  type: GraphQLOutputType,
  directiveMetadata?: DirectiveMetadata[],
): FieldDefinitionNode | undefined {
  if (!directiveMetadata || !directiveMetadata.length) {
    return undefined;
  }

  return {
    kind: Kind.FIELD_DEFINITION,
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: type.toString(),
      },
    },
    name: {
      kind: Kind.NAME,
      value: name,
    },
    directives: directiveMetadata.map(getDirectiveNode),
  };
}

export function getInputValueDefinitionNode(
  name: string,
  type: GraphQLInputType,
  directiveMetadata?: DirectiveMetadata[],
): InputValueDefinitionNode | undefined {
  if (!directiveMetadata || !directiveMetadata.length) {
    return undefined;
  }

  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: type.toString(),
      },
    },
    name: {
      kind: Kind.NAME,
      value: name,
    },
    directives: directiveMetadata.map(getDirectiveNode),
  };
}

export function getInterfaceTypeDefinitionNode(
  name: string,
  directiveMetadata?: DirectiveMetadata[],
): InterfaceTypeDefinitionNode | undefined {
  if (!directiveMetadata || !directiveMetadata.length) {
    return undefined;
  }

  return {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    name: {
      kind: Kind.NAME,
      // FIXME: use proper AST representation
      value: name,
    },
    directives: directiveMetadata.map(getDirectiveNode),
  };
}
