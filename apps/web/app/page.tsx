"use client"

import { useQuery } from "convex/react"
import { api } from "@vibe/convex/_generated/api"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@vibe/ui"

export default function Home() {
  const user = useQuery(api.currentUser.get)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Vibe Universal</h1>
        <p className="text-muted-foreground mb-8">
          Universal React app with Next.js, Expo, and Convex
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shared Components</CardTitle>
              <CardDescription>Components from @vibe/ui work on web and mobile</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Shared Button</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shared Backend</CardTitle>
              <CardDescription>Convex backend shared between platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{user ? `Signed in as ${user.email}` : "Not signed in"}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
