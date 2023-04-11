# Host your own Setup

You can clone this repository and deploy to services such as Vercel.

```bash
$ gh repo clone amplience/dc-extension-ecomm-toolkit
$ cd dc-extension-ecomm-toolkit
$ vercel deploy
Vercel CLI 24.0.0
? Set up and deploy “~/Workspace/amplience/dc-extension-ecomm-toolkit”? [Y/n] y
? Which scope do you want to deploy to? zzzzz
? Link to existing project? [y/N] n
? What’s your project’s name? dc-extension-ecomm-toolkit
? In which directory is your code located? ./
Auto-detected Project Settings (Next.js):
- Build Command: next build
- Output Directory: Next.js default
- Development Command: next dev --port $PORT
? Want to override the settings? [y/N] n
🔗  Linked to zzzzz/dc-extension-ecomm-toolkit (created .vercel)
🔍  Inspect: https://vercel.com/zzzzz/dc-extension-ecomm-toolkit/xxxxxx [1s]
✅  Production: https://dc-extension-ecomm-toolkit-yyyyy.vercel.app [copied to clipboard] [2m]
📝  Deployed to production. Run `vercel --prod` to overwrite later (https://vercel.link/2F).
💡  To change the domain or build command, go to https://vercel.com/zzzzz/dc-extension-ecomm-toolkit/settings
```

You can then use the new depolyment URL in your extension configuration.
