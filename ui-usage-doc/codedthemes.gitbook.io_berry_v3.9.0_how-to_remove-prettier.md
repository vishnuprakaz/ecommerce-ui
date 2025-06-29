---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/how-to/remove-prettier"
title: "Remove prettier | Berry React"
---

To Remove Prettier from formatting your React.js code, you can follow the steps below:

1. Remove Prettier from your project dependencies by running the following command in your terminal:


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
npm uninstall prettier --save
```

1. Remove the below code from file .eslintrc (if eslint is not disabled)


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
.eslintrc
"prettier/prettier": [\
      2,\
      {\
        "bracketSpacing": true,\
        "printWidth": 140,\
        "singleQuote": true,\
        "trailingComma": "none",\
        "tabWidth": 4,\
        "useTabs": false,\
        "endOfLine": "auto"\
      }\
    ]

```

1. Remove Prettier configuration files from your project, such as `.prettierrc` and `.prettierignore`.

2. If you are using a code editor extension for Prettier, disable or uninstall it from your editor.


After completing these steps, Prettier will no longer be used to format your React.js code. However, you may want to use another code formatter or configure your editor to use its built-in formatting features.

Last updated 1 year ago

Was this helpful?