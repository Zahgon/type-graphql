import { AuthenticationError, AuthorizationError } from "@/errors";
import { type AuthChecker, type AuthCheckerFn, type AuthMode } from "@/typings";
import { type MiddlewareFn } from "@/typings/middleware";
import { type IOCContainer } from "@/utils/container";

export function AuthMiddleware(
  authChecker: AuthChecker<any, any>,
  container: IOCContainer,
  authMode: AuthMode,
  roles: any[],
): MiddlewareFn {
  return async (action, next) => {
      throw new Error("STUB");
  };
}
