---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/color"
title: "Color | Berry React"
---

#### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/color\#customize-theme-colors)    Customize Theme Colors

To change the color of the theme, you can either apply color directly to `..src\theme\palatte.jsx` **or** defines a new variable in `..src\assets\scss\_themes-vars.module.scss` and replace it in `palatte.jsx`

For instance, if you want to change color where `theme.palette.primary.light` is being used in a theme then, update following in `..src\themes\palatte.jsx`

palatte.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import value from '../assets/scss/_themes-vars.module.scss';

/**
 * Color intention that you want to used in your theme
 */
export function themePalatte(theme) {
    return {
        ...
        primary: {
            light: '#fff000', // change this to your desired color
            ...
        },
        ...
        ...

    };
}
```

Last updated 1 year ago

Was this helpful?