import { View, Text, ScrollView } from "react-native"
import { useQuery } from "convex/react"
import { api } from "@vibe/convex/_generated/api"
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@vibe/ui"

export default function HomeScreen() {
  const user = useQuery(api.currentUser.get)

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-6 pt-16">
        <Text className="text-4xl font-bold text-foreground mb-2">Vibe Universal</Text>
        <Text className="text-muted-foreground mb-8">
          Universal React app with Next.js, Expo, and Convex
        </Text>

        <View className="gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Shared Components</CardTitle>
              <CardDescription>Components from @vibe/ui work on web and mobile</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                <Text className="text-primary-foreground font-medium">Shared Button</Text>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shared Backend</CardTitle>
              <CardDescription>Convex backend shared between platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Text className="text-sm text-foreground">
                {user ? `Signed in as ${user.email}` : "Not signed in"}
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  )
}
