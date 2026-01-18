# Vibe Universal

A universal React monorepo combining Next.js for web and Expo for mobile with a shared Convex backend and UI components.

## Features

- **Universal UI** - Shared React Native components that work on web and mobile
- **Shared Backend** - Single Convex backend for all platforms
- **Type Safety** - Full TypeScript with shared types
- **Modern Stack** - Next.js 15, Expo SDK 54, React 19
- **Styling** - Tailwind CSS via NativeWind on all platforms

## Tech Stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Monorepo | Turborepo                   |
| Web      | Next.js 15, React 19        |
| Mobile   | Expo SDK 54, React Native   |
| Backend  | Convex                      |
| Auth     | Convex Auth (Password)      |
| Styling  | NativeWind v4, Tailwind CSS |
| Testing  | Jest, Testing Library       |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- Convex account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/vibe-universal.git
cd vibe-universal

# Install dependencies
pnpm install

# Set up Convex
cd packages/convex
npx convex dev
```

### Environment Setup

Create environment files:

```bash
# Web app
echo "NEXT_PUBLIC_CONVEX_URL=<your-convex-url>" > apps/web/.env.local

# Native app
echo "EXPO_PUBLIC_CONVEX_URL=<your-convex-url>" > apps/native/.env
```

### Development

```bash
# Start all dev servers
pnpm dev

# Start web only
pnpm dev:web

# Start native only
pnpm dev:native
```

## Project Structure

```
vibe-universal/
├── apps/
│   ├── web/              # Next.js 15 web application
│   │   ├── app/          # App Router pages
│   │   └── components/   # Web-specific components
│   └── native/           # Expo mobile application
│       └── app/          # Expo Router screens
├── packages/
│   ├── convex/           # Shared Convex backend
│   │   ├── schema.ts     # Database schema
│   │   ├── auth.ts       # Authentication config
│   │   └── *.ts          # Queries & mutations
│   ├── ui/               # Shared UI components
│   │   └── src/          # Button, Input, Card, etc.
│   └── config/           # Shared configurations
│       ├── eslint-*.js   # ESLint configs
│       └── tailwind.js   # Tailwind preset
├── turbo.json            # Turborepo config
└── package.json          # Root package.json
```

## Commands

| Command           | Description             |
| ----------------- | ----------------------- |
| `pnpm dev`        | Start all dev servers   |
| `pnpm dev:web`    | Start web app only      |
| `pnpm dev:native` | Start mobile app only   |
| `pnpm build`      | Build all packages      |
| `pnpm lint`       | Lint all packages       |
| `pnpm test:run`   | Run all tests           |
| `pnpm typecheck`  | Type check all packages |

## Shared Components

Components in `@vibe/ui` are built with React Native primitives and work on both platforms:

```tsx
import { Button, Card, Input } from "@vibe/ui"

// Works in both Next.js and Expo
;<Card>
  <Input placeholder="Email" />
  <Button>Submit</Button>
</Card>
```

## Convex Backend

The shared Convex backend in `@vibe/convex` provides:

- User authentication with Convex Auth
- Real-time queries and mutations
- Type-safe API with auto-generated types

```tsx
import { api } from "@vibe/convex/_generated/api"
import { useQuery } from "convex/react"

function Profile() {
  const user = useQuery(api.currentUser.get)
  return <Text>{user?.email}</Text>
}
```

## Mobile Development

### iOS Simulator

```bash
cd apps/native
pnpm ios
```

### Android Emulator

```bash
cd apps/native
pnpm android
```

### EAS Build

```bash
cd apps/native
eas build --platform all --profile preview
```

## Deployment

### Web (Vercel)

The web app can be deployed to Vercel with the following settings:

- Root Directory: `apps/web`
- Build Command: `cd ../.. && pnpm build:web`
- Install Command: `cd ../.. && pnpm install`

### Mobile (EAS)

Use EAS Build for mobile deployments:

```bash
cd apps/native
eas build --platform all --profile production
eas submit --platform all
```

### Convex

```bash
cd packages/convex
npx convex deploy
```

## License

MIT
