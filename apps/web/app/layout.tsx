import type { Metadata } from "next"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import { ConvexClientProvider } from "@/components/ConvexClientProvider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vibe Universal",
  description: "Universal React app with Next.js, Expo, and Convex",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  )
}
