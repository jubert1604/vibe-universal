// Stub type definitions for builds without Convex backend
// This file will be replaced by `npx convex dev` or `npx convex deploy`

import type { FunctionReference } from "convex/server"

export declare const api: {
  currentUser: {
    get: FunctionReference<"query", "public">
  }
  items: {
    list: FunctionReference<"query", "public">
    listIncomplete: FunctionReference<"query", "public">
    create: FunctionReference<"mutation", "public">
    update: FunctionReference<"mutation", "public">
    remove: FunctionReference<"mutation", "public">
  }
  auth: {
    signIn: FunctionReference<"action", "public">
    signOut: FunctionReference<"action", "public">
  }
}

export declare const internal: Record<string, never>
