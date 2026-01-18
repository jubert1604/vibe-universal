import { defineSchema, defineTable } from "convex/server"
import { authTables } from "@convex-dev/auth/server"
import { v } from "convex/values"

export default defineSchema({
  ...authTables,

  userProfiles: defineTable({
    userId: v.id("users"),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    loginCount: v.optional(v.number()),
    settings: v.optional(
      v.object({
        theme: v.optional(v.union(v.literal("light"), v.literal("dark"), v.literal("system"))),
        notifications: v.optional(v.boolean()),
      })
    ),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_user", ["userId"]),

  items: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    completed: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_user_completed", ["userId", "completed"]),
})
