// Stub type definitions for builds without Convex backend
// This file will be replaced by `npx convex dev` or `npx convex deploy`

import type { GenericId } from "convex/values"

export type Id<TableName extends string> = GenericId<TableName>

export type Doc<TableName extends string> = TableName extends "users"
  ? {
      _id: Id<"users">
      _creationTime: number
      email?: string
      name?: string
    }
  : TableName extends "userProfiles"
    ? {
        _id: Id<"userProfiles">
        _creationTime: number
        userId: Id<"users">
        bio?: string
        avatarUrl?: string
        loginCount?: number
        settings?: {
          theme?: "light" | "dark" | "system"
          notifications?: boolean
        }
        createdAt: string
        updatedAt: string
      }
    : TableName extends "items"
      ? {
          _id: Id<"items">
          _creationTime: number
          userId: Id<"users">
          title: string
          description?: string
          completed: boolean
          createdAt: string
          updatedAt: string
        }
      : never
