---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/how-to/remove-eslint"
title: "Remove eslint | Berry React"
---

To remove ESLint, you can follow the steps below:

1. Remove ESLint from your project dependencies by running the following command in your terminal:


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
npm uninstall eslint --save

also removed below packages
"@typescript-eslint/eslint-plugin": "^5.48.0",
"@typescript-eslint/parser": "^5.48.0",
"babel-eslint": "^10.1.0",
"eslint": "^8.31.0",
"eslint-config-airbnb-typescript": "^17.0.0",
"eslint-config-prettier": "^8.6.0",
"eslint-config-react-app": "^7.0.1",
"eslint-import-resolver-typescript": "^3.5.2",
"eslint-plugin-flowtype": "^8.0.3",
"eslint-plugin-import": "^2.26.0",
"eslint-plugin-jsx-a11y": "^6.6.1",
"eslint-plugin-prettier": "^4.2.1",
"eslint-plugin-react": "^7.31.11",
"eslint-plugin-react-hooks": "^4.6.0",
```

1. Remove the ESLint configuration files from your project, such as `.eslintrc` or `.eslintignore`.

2. If you are using a code editor extension for ESLint, disable or uninstall it from your editor.


After completing these steps, ESLint will no longer be used to lint your code. However, you may want to use another linter or configure your editor to use its built-in linting features.

Last updated 1 year ago

Was this helpful?