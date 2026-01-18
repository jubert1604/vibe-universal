const base = require("./eslint-base")

module.exports = {
  ...base,
  extends: ["expo", ...base.extends],
  rules: {
    ...base.rules,
    "import/no-unresolved": "off",
  },
  ignorePatterns: [...base.ignorePatterns, ".expo/"],
  overrides: [
    {
      files: ["*.config.js", "babel.config.js", "metro.config.js", "tailwind.config.js"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx", "jest.setup.js", "tests/**/*"],
      env: {
        jest: true,
      },
    },
  ],
}
