// Stub file for builds without Convex backend
// This file will be replaced by `npx convex dev` or `npx convex deploy`

export const api = {
  currentUser: { get: "currentUser:get" },
  items: {
    list: "items:list",
    listIncomplete: "items:listIncomplete",
    create: "items:create",
    update: "items:update",
    remove: "items:remove",
  },
  auth: {
    signIn: "auth:signIn",
    signOut: "auth:signOut",
  },
}

export const internal = {}
