---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config"
title: "Style | Berry React"
---

Customize Berry with your theme. You can change the colors, the typography, and much more. Material-UI provides flexibility to change the style of the project in a single place and on top of it, we made it more centralized and consistent by proper file structure.

You might don't need to update anything in `..\src\themes` unless wanted to have separate theming.

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config\#theme-configuration)    Theme configuration

The whole theme can be configured from the folder `..\src\themes` . Theme initialization starts in `index.jsx`, where palette, typography, and component's overridable style exist.

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config#tab-javascript)

Typescript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config#tab-typescript)

palette.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// project import
import useConfig from 'hooks/useConfig';
import Palette from './palette';
import Typography from './typography';
....

export default function ThemeCustomization({ children }) {
  const { borderRadius, fontFamily, mode, outlinedFilled, presetColor, themeDirection } = useConfig();
...
const themeOptions = useMemo(
        () => ({
            direction: themeDirection,
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '16px',
                    '@media (min-width: 600px)': {
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [themeDirection, theme, themeCustomShadows, themeTypography]
    );
....
}
```

palette.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// project import
import useConfig from 'hooks/useConfig';
import Palette from './palette';
import Typography from './typography';
....

export default function ThemeCustomization({ children }: Props) {
...
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(mode, theme), [mode, theme]);

const themeOptions: ThemeOptions = useMemo(
        () => ({
            direction: themeDirection,
            palette: theme.palette,
            mixins: {
                toolbar: {
                    minHeight: '48px',
                    padding: '16px',
                    '@media (min-width: 600px)': {
                        minHeight: '48px'
                    }
                }
            },
            typography: themeTypography,
            customShadows: themeCustomShadows
        }),
        [themeDirection, theme, themeCustomShadows, themeTypography]
    );
....
}

```

As you can see colors for the theme came from the central location `import value from '../assets/scss/_themes-vars.module.scss';`

:themes-vars.module.scss

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config#tab-themes-vars.module.scss)

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// paper & background
$paper: #ffffff;

// primary
$primaryLight: #e3f2fd;
...

// secondary
$secondaryLight: #ede7f6;
...

// success Colors
$successLight: #b9f6ca;
...

// error
$errorLight: #ef9a9a;
...

// orange
$orangeLight: #fbe9e7;
...

// warning
$warningLight: #fff8e1;
...

// grey
$grey50: #fafafa;
...

//-----------------------|| DARK THEME VARIANTS ||-----------------------//

// paper & background
$darkBackground: #1a223f; // level 3
$darkPaper: #111936; // level 4

// dark 800 & 900
$darkLevel1: #29314f; // level 1
$darkLevel2: #212946; // level 2

// primary dark
$darkPrimaryLight: #e3f2fd;
...

// secondary dark
$darkSecondaryLight: #d1c4e9;
...

// text variants
$darkTextTitle: #d7dcec;
...

//-----------------------|| JAVASCRIPT ||-----------------------//

:export {
    // paper & background
    paper: $paper;

    // primary
    primaryLight: $primaryLight;
    primary200: $primary200;
    primaryMain: $primaryMain;
    primaryDark: $primaryDark;
    primary800: $primary800;

    // secondary
    secondaryLight: $secondaryLight;
    secondary200: $secondary200;
    secondaryMain: $secondaryMain;
    secondaryDark: $secondaryDark;
    secondary800: $secondary800;

    // success
    successLight: $successLight;
    success200: $success200;
    successMain: $successMain;
    successDark: $successDark;

    // error
    errorLight: $errorLight;
    errorMain: $errorMain;
    errorDark: $errorDark;

    // orange
    orangeLight: $orangeLight;
    orangeMain: $orangeMain;
    orangeDark: $orangeDark;

    // warning
    warningLight: $warningLight;
    warningMain: $warningMain;
    warningDark: $warningDark;

    // grey
    grey50: $grey50;
    grey100: $grey100;
    grey200: $grey200;
    grey300: $grey300;
    grey500: $grey500;
    grey600: $grey600;
    grey700: $grey700;
    grey900: $grey900;

    //-----------------------|| DARK THEME VARIANTS ||-----------------------//

    // paper & background
    darkPaper: $darkPaper;
    darkBackground: $darkBackground;

    // dark 800 & 900
    darkLevel1: $darkLevel1;
    darkLevel2: $darkLevel2;

    // text variants
    darkTextTitle: $darkTextTitle;
    darkTextPrimary: $darkTextPrimary;
    darkTextSecondary: $darkTextSecondary;

    // primary dark
    darkPrimaryLight: $darkPrimaryLight;
    darkPrimaryMain: $darkPrimaryMain;
    darkPrimaryDark: $darkPrimaryDark;
    darkPrimary200: $darkPrimary200;
    darkPrimary800: $darkPrimary800;

    // secondary dark
    darkSecondaryLight: $darkSecondaryLight;
    darkSecondaryMain: $darkSecondaryMain;
    darkSecondaryDark: $darkSecondaryDark;
    darkSecondary200: $darkSecondary200;
    darkSecondary800: $darkSecondary800;
}
```

You can check other settings like theme typography, palette, and components style override in the same folder. `..src\themes`

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config\#how-to-customize-it)    How to customize it?

You might come across questions like how to change a theme's **primary** color? How to change textbox or other components which can apply to an entire theme? Check below for each of your need:

[Color](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/color) [Typography](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/typography) [Overrides](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/overrides)

Last updated 1 year ago

Was this helpful?