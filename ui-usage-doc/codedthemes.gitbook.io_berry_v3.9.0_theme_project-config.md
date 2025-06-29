---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/project-config"
title: "Configuration | Berry React"
---

Berry makes it easy for you to manage your settings all in one place, this will help you to keep everything organized and make it easier to add new settings in the future. You can change things like font, border, theme layout, language, and more. You can find all of these settings in the `..src/config.js` file.

Option

Default

Data Type

Description

**layout**

Vertical

string

Horizontal or vertical layout

**fontFamily**

'Roboto', sans-serif

String

set font family

**borderRadius**

8

number

border-radius for card and textboxes

**outlinedFilled**

true

boolean

defines backfill color for textboxes. setting it false will show transparent background for outline textboxes

**dashboardPath**

/dashboard/default

string

default path once login success

mode

light

String

`light, dark`

**presetColor**

default

string

`theme color`

**i18n**

en

String

`en` \- English

`fr` \- français

`ro` \- Română

`zh` \- 中国人

**themeDirection**

false

boolean

set layout from right to left.

**container**

true

boolean

set container layout

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/project-config#tab-javascript)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/project-config#tab-typescript)

// src/config.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
export const DASHBOARD_PATH = '/dashboard/default';
export const HORIZONTAL_MAX_ITEM = 7;

export const MenuOrientation = {
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal'
};

export const ThemeMode = {
    LIGHT: 'light',
    DARK: 'dark'
};

export const ThemeDirection = {
    LTR: 'ltr',
    RTL: 'rtl'
};

const config = {
    menuOrientation: MenuOrientation.VERTICAL,
    miniDrawer: false,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    mode: ThemeMode.LIGHT,
    presetColor: 'default',
    i18n: 'en',
    themeDirection: ThemeDirection.LTR,
    container: false
};

export default config;
```

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// src/config.ts
import { ConfigProps, MenuOrientation, ThemeDirection, ThemeMode } from 'types/config';

export const DASHBOARD_PATH = '/dashboard/default';
export const HORIZONTAL_MAX_ITEM = 7;

const config: ConfigProps = {
    menuOrientation: MenuOrientation.VERTICAL,
    miniDrawer: false,
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    mode: ThemeMode.LIGHT,
    presetColor: 'default',
    i18n: 'en',
    themeDirection: ThemeDirection.LTR,
    container: true
};

export default config;
```

Last updated 1 year ago

Was this helpful?