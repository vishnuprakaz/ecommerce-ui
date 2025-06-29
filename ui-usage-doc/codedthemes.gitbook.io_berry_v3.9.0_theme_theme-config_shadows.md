---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/shadows"
title: "Shadows | Berry React"
---

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/shadows\#mui-core-shadows)    Mui core shadows

We used core shadows as provided by MUI. Refer: [https://mui.com/system/shadows/](https://mui.com/system/shadows/)

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/shadows\#customized-customshadows)    Customized `customShadows`

There are few shadows that we customized as per theme's need. check here: `src\themes\shadows.tsx`.

**Demo**: [https://berrydashboard.io/utils/util-shadow](https://berrydashboard.io/utils/util-shadow)

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/theme/theme-config/shadows\#how-to-use)    How to use

1. Import MUI theme

2. Use shadow with an element.


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import {useTheme} from '@mui/material/style';

function YourComponent() {
 const theme = useTheme();

 return (
  <>
   ...
   ...
    // normal shadow
    <Box sx={{ boxShadow: theme.customShadows.z1 }}>....</Box>

    // shadows according to palette
    <Box sx={{ boxShadow: theme.customShadows.primary }}>....</Box>
   ...
   ...
  </>
 )
}
```

Last updated 1 year ago

Was this helpful?