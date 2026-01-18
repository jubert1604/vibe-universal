# Commit Skill

When creating commits for this monorepo:

## Commit Message Format

Follow conventional commits with scope indicating the affected package:

```
<type>(<scope>): <description>

[optional body]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Formatting, no code change
- `refactor` - Code change that neither fixes a bug nor adds a feature
- `test` - Adding or updating tests
- `chore` - Updating build tasks, dependencies, etc.

### Scopes

- `web` - apps/web changes
- `native` - apps/native changes
- `ui` - packages/ui changes
- `convex` - packages/convex changes
- `config` - packages/config changes
- `root` - Root-level changes (turbo, pnpm, etc.)

### Examples

```
feat(ui): add Avatar component

fix(convex): correct user query return type

chore(root): update turbo to v2.5

feat(web,native): add profile screen
```

## Pre-Commit Checks

Before committing, ensure:

1. `pnpm lint` passes
2. `pnpm typecheck` passes
3. `pnpm test:run` passes (if tests exist)
4. `pnpm format:check` passes

## Monorepo-Specific Guidelines

- When changing shared packages (ui, convex, config), test both web and native apps
- Use `turbo` for building affected packages before commit if needed
- Reference turborepo filtering: `turbo build --filter=@vibe/ui...`
