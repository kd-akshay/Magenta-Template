# Publishing Guide for Magenta Template

This guide covers multiple ways to publish and share your template.

## Option 1: Publish as npm Package (Recommended for Templates)

This allows users to create new projects using `npm create` or `npx`.

### Steps:

1. **Update `package.json`**:
   ```json
   {
     "name": "create-magenta-app",
     "version": "1.0.0",
     "description": "A production-ready React + TypeScript + Vite starter template",
     "keywords": ["react", "typescript", "vite", "template", "starter"],
     "bin": {
       "create-magenta-app": "./bin/create.js"
     },
     "files": [
       "template",
       "bin"
     ]
   }
   ```

2. **Create a `bin/create.js` file**:
   ```javascript
   #!/usr/bin/env node
   import { execSync } from 'child_process';
   import { fileURLToPath } from 'url';
   import { dirname, join } from 'path';
   import { existsSync, mkdirSync, cpSync } from 'fs';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);

   const projectName = process.argv[2] || 'my-magenta-app';
   const projectPath = join(process.cwd(), projectName);

   if (existsSync(projectPath)) {
     console.error(`Error: Directory ${projectName} already exists!`);
     process.exit(1);
   }

   mkdirSync(projectPath, { recursive: true });
   cpSync(join(__dirname, '../template'), projectPath, { recursive: true });

   console.log(`\n✅ Created ${projectName}!\n`);
   console.log(`Next steps:`);
   console.log(`  cd ${projectName}`);
   console.log(`  npm install`);
   console.log(`  npm run dev\n`);
   ```

3. **Create a `template` directory** with your project files (excluding `node_modules`, `.git`, etc.)

4. **Create `.npmignore`**:
   ```
   node_modules
   dist
   .git
   .DS_Store
   *.log
   .env
   .env.local
   coverage
   ```

5. **Publish to npm**:
   ```bash
   npm login
   npm publish
   ```

6. **Users can then use it**:
   ```bash
   npm create magenta-app@latest my-app
   # or
   npx create-magenta-app my-app
   ```

---

## Option 2: GitHub Template Repository

Make your repository a template that users can fork or use as a starting point.

### Steps:

1. **Go to your GitHub repository**: `https://github.com/kd-akshay/Magenta-Template`

2. **Click "Settings"** → Scroll to "Template repository"

3. **Check the box** "Template repository"

4. **Add a good description** and topics/tags to your repository

5. **Users can now**:
   - Click "Use this template" button on GitHub
   - Or clone directly: `git clone https://github.com/kd-akshay/Magenta-Template.git`

---

## Option 3: Deploy as Demo/Showcase

Deploy your template to showcase it live.

### Vercel (Recommended):

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Or connect via GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Auto-deploys on every push

### Netlify:

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

3. **Or connect via GitHub**:
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages:

1. **Add deploy script to `package.json`**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Enable GitHub Pages** in repository settings

---

## Option 4: Publish to npm as Regular Package

If you want to publish the template as a regular npm package (not a create script):

### Steps:

1. **Update `package.json`**:
   ```json
   {
     "name": "magenta-template",
     "version": "1.0.0",
     "description": "A production-ready React + TypeScript + Vite starter template",
     "main": "index.js",
     "files": [
       "src",
       "public",
       "*.config.*",
       "package.json",
       "README.md"
     ]
   }
   ```

2. **Remove `"private": true`** from package.json

3. **Create `.npmignore`**:
   ```
   node_modules
   dist
   .git
   .DS_Store
   *.log
   .env
   coverage
   ```

4. **Publish**:
   ```bash
   npm login
   npm publish
   ```

---

## Pre-Publishing Checklist

Before publishing, make sure to:

- [ ] Update version number in `package.json`
- [ ] Update `README.md` with installation instructions
- [ ] Add a `LICENSE` file (MIT is recommended)
- [ ] Remove any sensitive data (API keys, tokens, etc.)
- [ ] Test the build: `npm run build`
- [ ] Test installation in a fresh directory
- [ ] Add keywords and description to `package.json`
- [ ] Create a `.gitignore` if not present
- [ ] Add screenshots/demo to README
- [ ] Document all features and usage

---

## Recommended Approach

For a template like this, I recommend:

1. **Primary**: Make it a **GitHub Template Repository** (easiest, no npm publishing needed)
2. **Secondary**: **Deploy to Vercel** as a live demo
3. **Optional**: Publish to npm if you want `npm create` functionality

---

## Quick Start Commands

### For GitHub Template:
```bash
# Just enable template repository in GitHub settings
# No code changes needed!
```

### For npm Package:
```bash
npm login
npm publish --access public
```

### For Vercel Deployment:
```bash
npm i -g vercel
vercel
```

---

## Need Help?

- npm publishing: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- GitHub templates: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository
- Vercel deployment: https://vercel.com/docs

