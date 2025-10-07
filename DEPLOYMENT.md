# GitHub Pages Deployment Guide

This document provides instructions for deploying the Gourmet Hub Catering application to GitHub Pages.

## Automated Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys the application to GitHub Pages when changes are pushed to the `main` branch.

### Setup Steps

1. **Enable GitHub Pages in Repository Settings**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under "Build and deployment" > "Source", select **GitHub Actions**
   - Save the changes

2. **Trigger Deployment**
   - The workflow will automatically run when you:
     - Push changes to the `main` branch
     - Manually trigger it from the Actions tab
   - After the workflow completes successfully, your site will be available at:
     `https://syed-reza98.github.io/gourmet-hub-catering/`

3. **Monitor Deployment**
   - Go to the **Actions** tab in your repository
   - You can see the deployment status and logs
   - The deployment typically takes 2-3 minutes

## Manual Deployment (Alternative)

If you prefer to deploy manually using the `gh-pages` package:

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Deploy to gh-pages Branch**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**
   - Go to **Settings** > **Pages**
   - Under "Source", select the `gh-pages` branch
   - Select `/ (root)` as the folder
   - Save the changes

## Configuration Details

### Vite Base Path
The project is configured with a base path in `vite.config.ts`:
```typescript
base: '/gourmet-hub-catering/'
```

This ensures all assets are correctly referenced when deployed to GitHub Pages.

### Jekyll Processing
A `.nojekyll` file is included in the `public` directory to prevent GitHub Pages from processing files through Jekyll, which can interfere with certain file names (like those starting with underscores).

## Troubleshooting

### Assets Not Loading
- Verify the base path in `vite.config.ts` matches your repository name
- Ensure GitHub Pages is enabled in repository settings
- Check that the deployment workflow completed successfully

### 404 Errors
- Make sure the source is set to "GitHub Actions" (for automated deployment) or "gh-pages branch" (for manual deployment)
- Verify the site URL is correct: `https://USERNAME.github.io/REPOSITORY-NAME/`

### Workflow Failures
- Check the Actions tab for error logs
- Ensure all dependencies are correctly specified in `package.json`
- Verify Node.js version compatibility (currently using Node 20)

## Custom Domain (Optional)

If you want to use a custom domain:
1. Add a `CNAME` file to the `public` directory with your domain name
2. Configure DNS settings with your domain provider
3. Update the GitHub Pages settings with your custom domain

## Local Testing

To test the production build locally:
```bash
npm run build
npm run preview
```

This will serve the built files at `http://localhost:4173` (or another port if 4173 is in use).
