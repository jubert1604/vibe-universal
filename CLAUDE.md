# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Root commands (runs across all packages via Turborepo)
pnpm dev              # Start all dev servers
pnpm dev:web          # Start web app only
pnpm dev:native       # Start Expo app only
pnpm build            # Build all packages
pnpm build:web        # Build web app only
pnpm lint             # Lint all packages
pnpm lint:fix         # Fix lint issues
pnpm format           # Format all files with Prettier
pnpm format:check     # Check formatting
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm typecheck        # Type check all packages
pnpm clean            # Clean all build artifacts

# Native app specific (run from apps/native)
pnpm start            # Start with dev client
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
eas build             # Build with EAS

# Convex (run from packages/convex or root)
npx convex dev        # Start Convex dev server
npx convex deploy     # Deploy to production
```

## Architecture Overview

This is a **universal React monorepo** using Turborepo, combining Next.js for web and Expo for mobile with a shared Convex backend.

### Monorepo Structure

```
vibe-universal/
├── apps/
│   ├── web/          # Next.js 15 web app
│   └── native/       # Expo SDK 54 mobile app
├── packages/
│   ├── convex/       # Shared Convex backend (auth, queries, mutations)
│   ├── ui/           # Shared React Native components (work on web via react-native-web)
│   └── config/       # Shared ESLint, TypeScript, Tailwind configs
└── turbo.json        # Turborepo task configuration
```

### Core Tech Stack

- **Turborepo** - Monorepo build system
- **Next.js 15** - Web app with App Router, React 19
- **Expo SDK 54** - Mobile app with expo-router
- **Convex** - Backend (database, auth, real-time)
- **Convex Auth** - Password-based authentication
- **NativeWind v4** - Tailwind CSS for React Native
- **react-native-web** - Enables shared components on web

### Shared Packages

**@vibe/ui** - Universal UI components

- Built with React Native primitives (View, Text, Pressable)
- Works on both web (via react-native-web) and native
- Uses NativeWind for styling with Tailwind classes
- Includes: Button, Input, Card components

**@vibe/convex** - Shared backend

- Schema with users table and auth
- Convex Auth with password provider
- Shared queries and mutations
- Import as: `import { api } from "@vibe/convex/_generated/api"`

**@vibe/config** - Shared configurations

- ESLint configs: `@vibe/config/eslint-base`, `@vibe/config/eslint-next`, `@vibe/config/eslint-expo`
- TypeScript base config
- Tailwind preset

### Convex Auth Pattern

Authentication is handled by Convex Auth with password provider:

```typescript
// packages/convex/auth.ts
import { Password } from "@convex-dev/auth/providers/Password"
import { convexAuth } from "@convex-dev/auth/server"

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password()],
})
```

**Web (Next.js):**

```typescript
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs"
```

**Native (Expo):**

```typescript
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import * as SecureStore from "expo-secure-store"
```

### Environment Variables

**Web (apps/web/.env.local):**

```
NEXT_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
```

**Native (apps/native/.env):**

```
EXPO_PUBLIC_CONVEX_URL=https://your-convex-url.convex.cloud
```

**Convex (packages/convex/.env.local):**

```
CONVEX_DEPLOYMENT=your-deployment-name
```

## Development Guidelines

### Universal Component Pattern

Components in @vibe/ui use React Native primitives that work everywhere:

```tsx
// packages/ui/src/Button.tsx
import { Pressable, Text } from "react-native"
import { cn } from "./utils"

export function Button({ children, className, ...props }) {
  return (
    <Pressable className={cn("bg-primary rounded-lg px-4 py-3", className)} {...props}>
      <Text className="text-primary-foreground font-medium">{children}</Text>
    </Pressable>
  )
}
```

### Using Shared Components

```tsx
// In apps/web or apps/native
import { Button, Card, Input } from "@vibe/ui"
import { api } from "@vibe/convex/_generated/api"
import { useQuery } from "convex/react"

export default function Screen() {
  const user = useQuery(api.currentUser.get)
  return <Button>Click me</Button>
}
```

### NativeWind Configuration

Both apps use NativeWind v4 with consistent Tailwind configuration:

```javascript
// apps/*/tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "../../packages/ui/src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("@vibe/config/tailwind")],
}
```

### Metro Monorepo Configuration

The native app's Metro config is set up for monorepo support:

```javascript
// apps/native/metro.config.js
config.watchFolders = [monorepoRoot]
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
]
```

### File Organization

- Prefer editing existing files over creating new ones
- Shared code goes in packages/
- Platform-specific code stays in apps/
- Use TypeScript path aliases for imports
- Run `pnpm turbo build` before deploying

### Testing

- Native app uses Jest with jest-expo preset
- Run `pnpm test:run` from root to test all packages
- transformIgnorePatterns configured for pnpm monorepo

### Security Requirements

- Never expose Convex tokens client-side
- Use Convex Auth for authentication
- Validate all user inputs in Convex functions

## Available Claude Skills

### Install via Claude Code Plugin Marketplace

**Expo Skills** (by Expo team) - for `apps/native`:

```bash
/plugin marketplace add expo/skills
/plugin install expo-app-design      # UI/UX patterns for Expo apps
/plugin install expo-deployment      # EAS Build and Update workflows
/plugin install upgrading-expo       # SDK upgrade guidance
```

**React Native Best Practices** (by Callstack) - for `apps/native`:

```bash
# Reference: https://github.com/callstackincubator/agent-skills
# Covers: FPS, re-renders, bundle size, TTI, native profiling, memory, animations
```

**Vercel React Best Practices** - for `apps/web`:

```bash
# Reference: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
# 40+ rules covering waterfalls, bundle size, server rendering, re-renders
```
