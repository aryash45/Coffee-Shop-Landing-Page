# Coffee Landing Page — Vercel Deploy

Quick instructions to deploy the coffee landing page to Vercel.

Quick (CLI) deploy

1. Install Vercel CLI (PowerShell or cmd):

```powershell
npm install -g vercel
cd "%USERPROFILE%\Downloads\Demos"
vercel
# For a production deploy:
vercel --prod
```

Follow the interactive prompts. `vercel` will link or create a project and deploy the static site.

Deploy from Git (recommended for continuous deploys)

1. Initialize git and push to GitHub if you haven't:

```powershell
cd "%USERPROFILE%\Downloads\Demos"
git init
git add .
git commit -m "Initial coffee landing page"
# create remote repo on GitHub and push
git remote add origin <your-git-remote-url>
git push -u origin main
```

2. On vercel.com → Import Project → select the GitHub repo → Deploy.

Notes
- Vercel serves static HTML/CSS/JS automatically; no build step required for this repo.
- If you want me to run a local deploy now, tell me and I'll attempt to deploy via the Vercel CLI.

Files added here: `.vercelignore` (to exclude unnecessary files from deploy).
