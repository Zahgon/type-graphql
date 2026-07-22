import { MissingSubscriptionTopicsError } from "@/errors";
import { getTypeDecoratorParams } from "@/helpers/decorators";
import { getResolverMetadata } from "@/helpers/resolver-metadata";
import { getMetadataStorage } from "@/metadata/getMetadataStorage";
import { type MergeExclusive } from "@/typings";
import {
  type AdvancedOptions,
  type ReturnTypeFunc,
  type SubscriptionFilterFunc,
  type SubscriptionSubscribeFunc,
  type SubscriptionTopicIdFunc,
  type SubscriptionTopicsFunc,
} from "./types";

interface PubSubOptions {
  topics: string | string[] | SubscriptionTopicsFunc;
  topicId?: SubscriptionTopicIdFunc | undefined;
  filter?: SubscriptionFilterFunc;
}

interface SubscribeOptions {
  subscribe: SubscriptionSubscribeFunc;
}

export type SubscriptionOptions = AdvancedOptions & MergeExclusive<PubSubOptions, SubscribeOptions>;

export function Subscription(options: SubscriptionOptions): MethodDecorator;
export function Subscription(
  returnTypeFunc: ReturnTypeFunc,
  options: SubscriptionOptions,
): MethodDecorator;
export function Subscription(
  returnTypeFuncOrOptions: ReturnTypeFunc | SubscriptionOptions,
  maybeOptions?: SubscriptionOptions,
): MethodDecorator {
  const params = getTypeDecoratorParams(returnTypeFuncOrOptions, maybeOptions);
  const options = params.options as SubscriptionOptions;
  return (prototype, methodName) => {
      throw new Error("STUB");
  };
}
