// Jest matchers are now built into @testing-library/react-native v12.4+

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  Link: ({ children }) => children,
  Stack: {
    Screen: () => null,
  },
  Tabs: {
    Screen: () => null,
  },
}))

// Mock expo-splash-screen
jest.mock("expo-splash-screen", () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(),
}))

// Mock @convex-dev/auth
jest.mock("@convex-dev/auth/react", () => ({
  ConvexAuthProvider: ({ children }) => children,
  useAuthActions: () => ({
    signIn: jest.fn(),
    signOut: jest.fn(),
  }),
}))

// Mock convex/react
jest.mock("convex/react", () => ({
  ConvexReactClient: jest.fn().mockImplementation(() => ({})),
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue(jest.fn()),
  useConvex: jest.fn(),
}))

// Mock secure store
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}))

// Mock NativeWind
jest.mock("nativewind", () => ({
  styled: (component) => component,
}))
