# GitHub Setup Guide - Personal Access Token (PAT)

## Step 1: Create a Personal Access Token on GitHub

1. **Go to GitHub Settings**
   - Click your profile picture (top right)
   - Click **Settings**

2. **Navigate to Developer Settings**
   - Scroll down to **Developer settings** (left sidebar)
   - Click **Personal access tokens**
   - Click **Tokens (classic)** or **Fine-grained tokens**

3. **Generate New Token**
   - Click **Generate new token** → **Generate new token (classic)**
   - Give it a descriptive name: `Magenta-Template-Local`
   - Set expiration (recommended: 90 days or custom)
   - Select scopes (minimum required):
     - ✅ **repo** (Full control of private repositories)
       - This includes: `repo:status`, `repo_deployment`, `public_repo`, `repo:invite`, `security_events`
   - Click **Generate token**

4. **Copy the Token**
   - ⚠️ **IMPORTANT**: Copy the token immediately! You won't be able to see it again.
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

## Step 2: Use the PAT with Git

### Option A: Use PAT in Remote URL (One-time, per repository)

```bash
# Update remote URL with your PAT
git remote set-url origin https://YOUR_PAT@github.com/kd-akshay/Magenta-Template.git

# Example (replace ghp_xxxxx with your actual token):
git remote set-url origin https://ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@github.com/kd-akshay/Magenta-Template.git

# Verify remote URL (it won't show full token, just username)
git remote -v
```

**⚠️ Security Note**: This stores the token in `.git/config`. Consider using credential helper instead.

### Option B: Use Git Credential Helper (Recommended)

**For Windows (Git Credential Manager):**

```bash
# Configure Git Credential Manager to use PAT
git config --global credential.helper manager-core

# When you push, Git will prompt for credentials:
# Username: kd-akshay
# Password: YOUR_PAT (paste the token, not your password)

git push -u origin main
```

**Alternative: Store credentials in Windows Credential Manager:**

1. Open **Windows Credential Manager**
   - Press `Win + R`
   - Type: `control /name Microsoft.CredentialManager`
   - Or search "Credential Manager" in Start Menu

2. Go to **Windows Credentials** tab

3. Click **Add a generic credential**:
   - **Internet or network address**: `git:https://github.com`
   - **User name**: `kd-akshay`
   - **Password**: `YOUR_PAT` (paste your token)
   - Click **OK**

4. Now Git will automatically use these credentials

### Option C: Use Environment Variable (For scripts)

```bash
# Set environment variable (PowerShell)
$env:GITHUB_TOKEN = "YOUR_PAT"

# Or for current session only
$env:GIT_ASKPASS = "echo YOUR_PAT"

# For permanent (System-wide):
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'YOUR_PAT', 'User')
```

Then update remote URL:
```bash
git remote set-url origin https://$env:GITHUB_TOKEN@github.com/kd-akshay/Magenta-Template.git
```

## Step 3: Complete Git Setup Commands

```bash
# Initialize repository (if not already done)
git init

# Add remote (if not already added)
git remote add origin https://github.com/kd-akshay/Magenta-Template.git

# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Magenta Template with React, TypeScript, Tailwind, Redux, and comprehensive UI components"

# Set default branch to main
git branch -M main

# Push to GitHub (will prompt for credentials if using credential helper)
git push -u origin main
```

## Troubleshooting

### If you get "Authentication failed" error:

1. Make sure you're using the PAT as password, not your GitHub password
2. Check if token has `repo` scope enabled
3. Verify token hasn't expired
4. Try using the token in the remote URL directly (Option A)

### If you get "remote origin already exists":

```bash
# Remove existing remote
git remote remove origin

# Add it again
git remote add origin https://github.com/kd-akshay/Magenta-Template.git
```

### To update stored credentials:

```bash
# Windows Credential Manager
# Go to Windows Credentials → Find github.com → Edit → Update password with new PAT
```

## Security Best Practices

1. ✅ Use **Fine-grained tokens** if you only need specific repository access
2. ✅ Set token expiration (don't use "No expiration" unless necessary)
3. ✅ Store tokens securely (use credential helper, not in code)
4. ✅ Rotate tokens periodically
5. ✅ Revoke unused tokens
6. ❌ Never commit tokens to Git
7. ❌ Don't share tokens publicly

## Quick Setup (Copy-Paste Commands)

```bash
# 1. Set your PAT (replace with actual token)
$PAT = "YOUR_PAT_HERE"

# 2. Initialize and configure
git init
git remote add origin https://github.com/kd-akshay/Magenta-Template.git
git remote set-url origin https://$PAT@github.com/kd-akshay/Magenta-Template.git

# 3. Commit and push
git add .
git commit -m "Initial commit: Magenta Template"
git branch -M main
git push -u origin main
```

---

**Note**: Replace `YOUR_PAT` or `YOUR_PAT_HERE` with your actual Personal Access Token from GitHub.

