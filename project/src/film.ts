import { AuthorizationStatus } from './const';

export const isAuthStatusUnknown = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;
