/**
 * Configuration for dashboard routes that require authentication.
 *
 * To add a new protected route, simply add the path to this array.
 * To remove protection from a route, remove it from this array.
 *
 * Routes are matched using prefix matching, so nested routes under
 * a protected path will also be protected (e.g., /dashboard/projects/123
 * is protected if /dashboard/projects is in this array).
 */
export const PROTECTED_DASHBOARD_ROUTES = [
  "/dashboard/projects",
  "/dashboard/sheet",
] as const;
