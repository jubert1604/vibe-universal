import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        return {
          email: params.email as string,
          name: params.name as string,
        }
      },
    }),
  ],
  callbacks: {
    async afterUserCreatedOrUpdated(ctx, { userId }) {
      // Check if user profile exists
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingProfile = await (ctx.db.query("userProfiles") as any)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .withIndex("by_user", (q: any) => q.eq("userId", userId))
        .first()

      const now = new Date().toISOString()

      if (existingProfile) {
        const currentCount = existingProfile.loginCount ?? 0
        await ctx.db.patch(existingProfile._id, {
          loginCount: currentCount + 1,
          updatedAt: now,
        })
      } else {
        await ctx.db.insert("userProfiles", {
          userId,
          loginCount: 1,
          createdAt: now,
          updatedAt: now,
        })
      }
    },
  },
})
