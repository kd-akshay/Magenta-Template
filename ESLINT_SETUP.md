# ESLint Configuration

ESLint has been configured for this project with the following setup:

## Configuration

- **Config File**: `eslint.config.js` (Flat Config format)
- **TypeScript Support**: Enabled via `typescript-eslint`
- **React Support**: Enabled via `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`

## Features

- ✅ TypeScript linting
- ✅ React Hooks rules
- ✅ React Refresh rules
- ✅ Unused variable detection (with `_` prefix exception)
- ✅ No explicit `any` warnings

## Scripts

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

## Rules

- Unused variables/parameters prefixed with `_` are ignored
- `any` types will show warnings
- React components must be exported properly
- React Hooks rules are enforced

## Ignored Files

- `dist/` - Build output
- `node_modules/` - Dependencies
- `coverage/` - Test coverage
- `*.config.js` - Config files
- `vite.config.ts` - Vite config
- `tsconfig*.json` - TypeScript configs

## Troubleshooting

If you encounter errors, try:

1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check ESLint version:
   ```bash
   npx eslint --version
   ```

3. Run ESLint on a specific file:
   ```bash
   npx eslint src/main.tsx
   ```

