# GitHub Pages Deployment Architecture

## 📐 Deployment Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Workflow                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Push to 'main'  │
                    └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions Workflow                         │
│  (.github/workflows/deploy.yml)                             │
├─────────────────────────────────────────────────────────────┤
│  1. Checkout code                                           │
│  2. Setup Node.js 20                                        │
│  3. Install dependencies (npm ci)                           │
│  4. Build project (npm run build)                           │
│  5. Upload dist/ as artifact                                │
│  6. Deploy to GitHub Pages                                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   GitHub Pages   │
                    │   CDN & Hosting  │
                    └──────────────────┘
                              │
                              ▼
                   ┌───────────────────┐
                   │  Live Website     │
                   │  syed-reza98.     │
                   │  github.io/       │
                   │  gourmet-hub-     │
                   │  catering/        │
                   └───────────────────┘
```

## 🔧 Configuration Components

### 1. Vite Configuration (`vite.config.ts`)
```typescript
export default defineConfig({
  base: '/gourmet-hub-catering/', // ← Critical for GitHub Pages
  plugins: [...],
  resolve: {...}
});
```

**Purpose:** Ensures all asset paths are prefixed with the repository name.

### 2. Build Output Structure
```
dist/
├── .nojekyll              # Prevents Jekyll processing
├── index.html             # Entry point with correct asset paths
└── assets/
    ├── index-*.css        # Hashed CSS bundle
    └── index-*.js         # Hashed JavaScript bundle
```

### 3. Asset Path Resolution

**Development:**
```html
<script src="/src/main.tsx"></script>
```

**Production (GitHub Pages):**
```html
<script src="/gourmet-hub-catering/assets/index-*.js"></script>
<link href="/gourmet-hub-catering/assets/index-*.css">
```

## 🚀 Deployment Strategies

### Strategy 1: GitHub Actions (Current Implementation)
✅ **Automated deployment on every push to main**

**Pros:**
- Fully automated
- No manual intervention needed
- Consistent deployment process
- Built-in retry and error handling
- Deployment logs available in Actions tab

**Cons:**
- Requires GitHub Actions to be enabled
- Uses GitHub Actions minutes (free for public repos)

**Setup:**
1. Settings → Pages → Source: "GitHub Actions"
2. Push to main triggers deployment automatically

---

### Strategy 2: Manual Deployment (Backup Option)
📦 **Manual deployment using gh-pages package**

**Pros:**
- Full control over deployment timing
- Can deploy from any branch
- Useful for testing before main merge

**Cons:**
- Requires manual intervention
- Needs Git credentials configured
- More prone to human error

**Setup:**
1. Run `npm run build && npm run deploy`
2. Settings → Pages → Source: "gh-pages branch"

## 🔐 Permissions & Security

### GitHub Actions Permissions
```yaml
permissions:
  contents: read      # Read repository code
  pages: write        # Write to GitHub Pages
  id-token: write     # Required for Pages deployment
```

### Workflow Concurrency
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: false
```
Ensures only one deployment runs at a time.

## 🌐 URL Structure

### Repository Information
- **Owner:** syed-reza98
- **Repository:** gourmet-hub-catering
- **Base URL:** https://syed-reza98.github.io/gourmet-hub-catering/

### Asset URL Examples
```
CSS:  https://syed-reza98.github.io/gourmet-hub-catering/assets/index-*.css
JS:   https://syed-reza98.github.io/gourmet-hub-catering/assets/index-*.js
HTML: https://syed-reza98.github.io/gourmet-hub-catering/
```

## 📊 Build & Deploy Timeline

```
[Developer] → [Git Push] → [Actions Trigger]
                               ↓
                           [Checkout: ~5s]
                               ↓
                           [Setup Node: ~10s]
                               ↓
                           [Install deps: ~20s]
                               ↓
                           [Build: ~7s]
                               ↓
                           [Upload artifact: ~5s]
                               ↓
                           [Deploy: ~30s]
                               ↓
                        [Live on GitHub Pages]

Total Time: ~77 seconds (1.3 minutes)
```

## 🔍 Monitoring & Debugging

### Where to Check Deployment Status
1. **Actions Tab** → Latest workflow run
2. **Settings → Pages** → Current deployment status
3. **Deployments** section in repo sidebar

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 on assets | Incorrect base path | Verify `vite.config.ts` base setting |
| Blank page | JavaScript error | Check browser console logs |
| Workflow fails | Build error | Check Actions logs for error details |
| Styles not loading | CSS path issue | Verify base path in built HTML |

## 📈 Performance Optimization

### Current Build Output
```
index.html:     0.77 kB  (gzip: 0.43 kB)  ⚡ Excellent
index.css:    356.35 kB  (gzip: 66.74 kB)  ⚠️ Could optimize
index.js:     458.00 kB  (gzip: 137.61 kB) ⚠️ Could optimize
```

### Optimization Opportunities
- Code splitting for JavaScript bundles
- CSS purging for unused styles
- Image optimization (if applicable)
- Lazy loading for routes/components

## 🎯 Success Criteria

✅ All criteria met:
- [x] Build completes without errors
- [x] Assets have correct base path
- [x] .nojekyll file present
- [x] GitHub Actions workflow configured
- [x] README updated with live link
- [x] Documentation provided

---

**Last Updated:** 2024  
**Architecture Version:** 1.0  
**Deployment Platform:** GitHub Pages
