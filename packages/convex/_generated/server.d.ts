// Stub type definitions for builds without Convex backend
// This file will be replaced by `npx convex dev` or `npx convex deploy`

export {
  query,
  mutation,
  action,
  internalQuery,
  internalMutation,
  internalAction,
  httpAction,
} from "convex/server"

export type { QueryCtx, MutationCtx, ActionCtx } from "convex/server"
