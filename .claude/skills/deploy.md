# Deploy Skill

## Deployment Overview

| Platform | Service   | Command             |
| -------- | --------- | ------------------- |
| Web      | Vercel    | Auto-deploy on push |
| Native   | EAS Build | `eas build`         |
| Backend  | Convex    | `npx convex deploy` |

## Web Deployment (Vercel)

### Manual Deploy

```bash
cd apps/web
vercel --prod
```

### Vercel Configuration

For monorepo setup in Vercel:

1. **Root Directory**: `apps/web`
2. **Build Command**: `cd ../.. && pnpm build:web`
3. **Install Command**: `cd ../.. && pnpm install`
4. **Output Directory**: `.next`

### Environment Variables

Set in Vercel dashboard:

- `NEXT_PUBLIC_CONVEX_URL` - Convex deployment URL

## Native Deployment (EAS)

### Development Build

```bash
cd apps/native
eas build --platform all --profile development
```

### Preview Build

```bash
cd apps/native
eas build --platform all --profile preview
```

### Production Build

```bash
cd apps/native
eas build --platform all --profile production
```

### Submit to Stores

```bash
# iOS App Store
eas submit --platform ios

# Google Play Store
eas submit --platform android
```

### EAS Configuration (apps/native/eas.json)

- `development` - Dev client builds for local testing
- `preview` - Internal distribution for testing
- `production` - Store-ready builds with auto-increment

## Convex Deployment

### Development

```bash
cd packages/convex
npx convex dev
```

### Production

```bash
cd packages/convex
npx convex deploy
```

### Environment Variables

Create `.env.local` in packages/convex:

```
CONVEX_DEPLOYMENT=your-deployment-name
```

## Pre-Deployment Checklist

1. Run `pnpm lint` and fix issues
2. Run `pnpm typecheck` and fix issues
3. Run `pnpm test:run` and ensure passing
4. Run `pnpm build` to verify builds work
5. Test locally with production Convex URL
6. Verify environment variables are set
