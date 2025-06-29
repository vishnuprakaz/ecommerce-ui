---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets"
title: "Presets | Berry React"
---

Berry has several color themes to choose from, including 6+ preset options. To change the color theme, you can follow these steps:

Color Preset files are available in `src\assets\scss\` directory.

src\\assets\\scss\

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets#tab-src-assets-scss)

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
..
├── _theme1.module.scss
├── _theme2.module.scss
├── ..
├── ..
├── ..
├── _theme6.module.scss
```

Edit & Choose your desire preset color setting in `src\config.js` file. Change the `presetColor` value to `theme1, theme2 to theme6`

`presetColor: theme1`

javaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets#tab-javascript)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets#tab-typescript)

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
const config = {
    ...
    presetColor: 'default', // default, theme1, theme2 to theme6 available
    ...
    ...
    ...
}
```

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
const config = {
    ...
    presetColor: 'default', // default, theme1, theme2 to theme6 available
    ...
    ...
    ...
}
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets\#for-remix)    For Remix

Color Preset files are available in `app\assets\scss\` directory.

app\\assets\\scss\

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets#tab-app-assets-scss)

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
..
├── _theme1.module.scss
├── _theme2.module.scss
├── ..
├── ..
├── ..
├── _theme6.module.scss
```

Edit & Choose your desire preset color setting in `app\config.js` file. Change the `presetColor` value to `theme1, theme2 to theme6`

`presetColor: theme1`

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/color-presets#tab-typescript-1)

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import type { ConfigProps } from 'types/config';
...

const config: ConfigProps = {
    ...
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    ...
};
```

Last updated 1 year ago

Was this helpful?