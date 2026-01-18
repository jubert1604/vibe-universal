import "../global.css"
import { Stack } from "expo-router"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import { ConvexReactClient } from "convex/react"

const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

export default function RootLayout() {
  if (!convex) {
    return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    )
  }

  return (
    <ConvexAuthProvider client={convex}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ConvexAuthProvider>
  )
}
