---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/overrides"
title: "Overrides | Berry React"
---

We have overridden many MUI components and those style will be applied globally.

#### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/overrides\#customize-mui-component-style)    Customize MUI Component style

We have provided a central location to override any default style of any component. All the overrides' styles exist in `src\themes\compStyleOverride.jsx`

compStyleOverride.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// material-ui
import { alpha } from '@mui/material/styles';

// project imports
import { ThemeMode } from 'config';

/**
 * MUI Componets whose styles are overrided as per theme
 */
export default function componentStyleOverrides(theme, borderRadius, outlinedFilled) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    textTransform: 'capitalize',
                    borderRadius: '4px'
                }
            }
        },
        ...
        ...
         MuiAlert: {
            styleOverrides: {
                root: {
                    alignItems: 'center'
                },
                outlined: {
                    border: '1px dashed'
                }
            }
        },
    };
}
```

You can add default property for any MUI component, and it will be applied everywhere. We emitted lines to view it better in the above code block, but you can see many controls' styles override in the same file. Feel free to change it as per your need.

Last updated 1 year ago

Was this helpful?