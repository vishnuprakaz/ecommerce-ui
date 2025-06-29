---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/internationalization"
title: "Multi Language | Berry React"
---

Berry supports four languages ('en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese) and can be easily switched from the header bar. The main menu is also internationalized for all four languages. If you wish to add an additional language or set a default language, please continue reading below...

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization\#how-does-it-work)    How does it work?

Data for locale files exist at `src\utils\locales`

.json file

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
{
    "dashboard": "Dashboard",
    "default": "Default",
    "analytics": "Analytics",
    ...
    ...
}
```

To change Locale, open file `src\config.js` file and set language

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization#tab-javascript)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization#tab-typescript)

config.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
const config = {
    ...
    i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    ...
}
```

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { PaletteMode } from '@material-ui/core';

const config: {
    ...
    i18n: string;
    ...
    };
} = {
    ...
    // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    i18n: 'en',
    ...
};

export default config;
```

Open file `App.jsx` and apply **IntlProvider**

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization#tab-javascript-1)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization#tab-typescript-1)

App.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Notistack>
                                    <RouterProvider router={router} />
                                    <Snackbar />
                                </Notistack>
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
```

App.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { RouterProvider } from 'react-router-dom';

// routing
import router from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Notistack from 'ui-component/third-party/Notistack';

import ThemeCustomization from 'themes';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Notistack>
                                    <RouterProvider router={router} />
                                    <Snackbar />
                                </Notistack>
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization\#for-remix)    For Remix

Open file `Root.tsx` and apply **IntlProvider**

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/internationalization#tab-typescript-2)

Root.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// project imports
import ThemeCustomization from 'themes';
import Locales from 'ui-component/Locales';
...
...

// ==============================|| APP ||============================== //

export default function App() {
    return (
        ...
            <Index />
        ...
    );
}

export const Index = () => {
    return (
        <ThemeCustomization>
            ...
                <Locales>
                    ...
                </Locales>
            ...
        </ThemeCustomization>
      );
};
```

Last updated 1 year ago

Was this helpful?