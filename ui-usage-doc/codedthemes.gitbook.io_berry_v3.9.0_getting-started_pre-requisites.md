---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/pre-requisites"
title: "Pre-requisites | Berry React"
---

No need to set up or configure tools such as Webpack or Babel - they are already configured, allowing you to focus on the code.

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/pre-requisites\#pre-requisites)    **Pre-requisites**

1. [Node JS](https://nodejs.org/en/) \- Version 20.x.x recommended

2. [Yarn](https://yarnpkg.com/)/ [NPM](https://www.npmjs.com/) package manager

3. When copying folders, include hidden files like `.env`. This file contains important theme settings. **Do not delete** the `.env` file. Update its **values** according to your organization’s needs, but **do not change the keys**.

4. The theme includes two lock files: `yarn.lock` (for Yarn) and `package-lock.json` (for npm). Each of these files corresponds to a different package manager. To ensure consistency and avoid potential conflicts:



1. **Choose a Package Manager**: Decide whether you will use Yarn or npm for managing dependencies in your project.



- **If using Yarn**: Retain `yarn.lock` and delete `package-lock.json`.

- **If using npm**: Retain `package-lock.json` and delete `yarn.lock`.


2. **Do Not Modify Lock Files Manually**: Avoid editing the contents of `yarn.lock` or `package-lock.json` directly. Manually changing these files can lead to dependency issues and inconsistencies. Always use the appropriate package manager commands ( `yarn` or `npm`) to update or regenerate these files.


You can check your current version using following commands:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
c:\> node -v
c:\> yarn -v
c:\> npm -v
```

This documentation primarily uses Yarn. You can replace Yarn commands with npm if needed.

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/pre-requisites\#troubleshooting)    **Troubleshooting**

If you face the following error in your terminal, it means **Yarn** is not installed in your system.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
c:\> yarn -v
'yarn' is not recognized as an internal or external command,
operable program or batch file.
```

Please install it using this [link](https://yarnpkg.com/getting-started/install) as it does not come with **Node** automatically.

Last updated 1 year ago

Was this helpful?