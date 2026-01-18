# Test Skill

## Running Tests

```bash
# Run all tests once
pnpm test:run

# Run tests in watch mode
pnpm test

# Run tests for specific package
pnpm --filter @vibe/native test:run
```

## Native App Tests

The native app uses Jest with jest-expo preset. Key configuration:

### Jest Config (apps/native/jest.config.js)

- Uses `jest-expo` preset for React Native
- `transformIgnorePatterns` configured for pnpm monorepo compatibility
- Module aliases map `@vibe/*` packages to source files

### Jest Setup (apps/native/jest.setup.js)

Mocks for:

- `expo-router` - Navigation mocks
- `expo-splash-screen` - Splash screen methods
- `@convex-dev/auth/react` - Auth provider and hooks
- `convex/react` - Convex client and hooks
- `expo-secure-store` - Secure storage methods
- `nativewind` - Styled component wrapper

## Writing Tests

### Component Tests

```tsx
// apps/native/__tests__/Button.test.tsx
import { render, fireEvent } from "@testing-library/react-native"
import { Button } from "@vibe/ui"

describe("Button", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Button>Click me</Button>)
    expect(getByText("Click me")).toBeTruthy()
  })

  it("calls onPress when pressed", () => {
    const onPress = jest.fn()
    const { getByText } = render(<Button onPress={onPress}>Click</Button>)
    fireEvent.press(getByText("Click"))
    expect(onPress).toHaveBeenCalled()
  })
})
```

### Mocking Convex

```tsx
import { useQuery } from "convex/react"

jest.mocked(useQuery).mockReturnValue({ id: "123", email: "test@example.com" })
```

## CI Integration

Tests run in GitHub Actions CI:

- Triggered on push to main and pull requests
- Uses pnpm with frozen lockfile
- Runs after lint job passes
