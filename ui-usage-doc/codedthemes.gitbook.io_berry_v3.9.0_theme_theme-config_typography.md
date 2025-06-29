---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/typography"
title: "Typography | Berry React"
---

#### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/typography\#customize-theme-typography)    Customize Theme Typography

You can customize the typography used in the theme as well from the central place.

For instance, If you want to change `font-weight` of the typography `h5` to `900`. To do that, open `..src\themes\typography.jsx` and update as below:

typography.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
/**
 * Typography used in theme
 */
const Typography = (theme, borderRadius, fontFamily) => ({
    return {
        ...
        h5: {
            ...
            fontWeight: 900 // changed this to make it 900 from 500
        },
        ...
    };
});
```

This will apply to all places where you used Typography variants as `h5`

`<Typography variant="h5"...>`

Last updated 1 year ago

Was this helpful?