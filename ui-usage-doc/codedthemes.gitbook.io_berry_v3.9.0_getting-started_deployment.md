---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/deployment"
title: "Deployment | Berry React"
---

Each server has unique functionality and deployment configurations. Ensure proper configuration based on your service provider's instructions.

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/deployment\#build)    Build

To build your app in production use `yarn build` command

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
> yarn build
```

Build will generate `dist` or `build ` folder for VITE and NEXTJS accordingly. you can push that to your server via FTP or CICD.

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/deployment\#deploy-to-subdirectory)    Deploy to subdirectory

If you need to deploy your app to subdirectory like: `www.example.com/test`, you need to make one change in to `.env` and rebuild.

1. Go to `.env` and update:







Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
VITE_APP_BASE_NAME: /test
```


**You’ll need to have Node v18.x.x or later on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

Last updated 1 year ago

Was this helpful?