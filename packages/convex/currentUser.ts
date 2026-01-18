import { query } from "./_generated/server"
import { auth } from "./auth"

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) return null

    const user = await ctx.db.get(userId)
    if (!user) return null

    // Get user profile
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first()

    return {
      ...user,
      profile,
    }
  },
})
