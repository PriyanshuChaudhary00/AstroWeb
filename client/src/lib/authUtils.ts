export function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof Error) {
    return /^401: .*Unauthorized/.test(error.message);
  }
  return false;
}
