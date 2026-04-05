/**
 * @file routes/index.ts
 * @description Centralized exports for the routing guard components.
 * - ProtectedRoute: Blocks completely unauthenticated clients from seeing active user-centric views.
 * - AdminProtectedRoute: Blocks ANY non-admin client (even logged-in customers) from accessing staff portals.
 */
export { default as ProtectedRoute } from "./ProtectedRoute";
export { default as AdminProtectedRoute } from "./AdminProtectedRoute";
