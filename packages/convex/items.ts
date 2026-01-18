import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { auth } from "./auth"

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) return []

    return await ctx.db
      .query("items")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect()
  },
})

export const listIncomplete = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) return []

    return await ctx.db
      .query("items")
      .withIndex("by_user_completed", (q) => q.eq("userId", userId).eq("completed", false))
      .collect()
  },
})

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const now = new Date().toISOString()

    return await ctx.db.insert("items", {
      userId,
      title: args.title,
      description: args.description,
      completed: false,
      createdAt: now,
      updatedAt: now,
    })
  },
})

export const update = mutation({
  args: {
    id: v.id("items"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const item = await ctx.db.get(args.id)
    if (!item) throw new Error("Item not found")
    if (item.userId !== userId) throw new Error("Not authorized")

    const { id, ...updates } = args
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    )

    return await ctx.db.patch(id, {
      ...filteredUpdates,
      updatedAt: new Date().toISOString(),
    })
  },
})

export const remove = mutation({
  args: {
    id: v.id("items"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const item = await ctx.db.get(args.id)
    if (!item) throw new Error("Item not found")
    if (item.userId !== userId) throw new Error("Not authorized")

    await ctx.db.delete(args.id)
  },
})
