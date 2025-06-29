---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/routing/skip-login/vite"
title: "VITE | Berry React"
---

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/routing/skip-login/vite\#disable-authentication-temporary)    **Disable Authentication Temporary**

Disabling authentication temporarily is generally not recommended due to security risks. However, if you have a specific scenario where you need to disable authentication for a short period, here are some steps you can follow:

1. Comment out the AuthGuard wrapper for the routes within the below file `.../src/routes/MainRoutes.tsx`


src/routes/MainRoutes.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// import AuthGuard from 'utils/route-guard/AuthGuard';

...
...
const MainRoutes = {
    path: '/',
    element: (
        // <AuthGuard>
        <MainLayout />
        // </AuthGuard>
    ),
    ...
}

```

In the code snippet above, the `<AuthGuard>` a component is commented out, allowing the routes within the `MainLayout` component to be rendered without authentication protection. To enable the AuthGuard wrapper again, remove the comment markers ( `//`) surrounding the `<AuthGuard>` component.

* * *

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/routing/skip-login/vite\#remove-authentication-permanent)    Remove Authentication Permanent

If you want to permanently remove authentication from a system or application, here are the steps to follow:

1. **Remove below authentication keys from** `.env` **file.**


.env

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
...
## Firebase - Google Auth
VITE_APP_FIREBASE_API_KEY=
VITE_APP_FIREBASE_AUTH_DOMAIN=
VITE_APP_FIREBASE_PROJECT_ID=
VITE_APP_FIREBASE_STORAGE_BUCKET=
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=
VITE_APP_FIREBASE_APP_ID=
VITE_APP_FIREBASE_MEASUREMENT_ID=

## AWS
VITE_APP_AWS_POOL_ID=
VITE_APP_AWS_APP_CLIENT_ID=

## Auth0
VITE_APP_AUTH0_CLIENT_ID=
VITE_APP_AUTH0_DOMAIN=
...
...
```

1. **Removed below list of files and directory.**


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
berry-material-react-ts
..
├── src
│   ├── ui-component\cards
│   │   ├── AuthFooter.tsx
│   ├── context
│   │   ├── Auth0Context.tsx
│   │   ├── AWSCognitoContext.tsx
│   │   ├── FirebaseContext.tsx
│   │   ├── JWTContext.tsx
│   ├── hooks
│   │   ├── useAuth.ts
│   ├── views
│   │   ├── pages
│   │   │   ├── authentication (remove directory with all sub files)
│   ├── routes
│   │   ├── LoginRoutes.tsx
│   │   ├── AuthenticationRoutes.tsx
│   ├── types
│   │    ├── auth.ts
│   ├── utils
│   │   ├── route-guard (remove directory with all sub files)
```

1. **Remove** `LoginRoutes and AuthenticationRoutes`\-
Open file `.../src/routes/index.tsx`, and remove `LoginRoutes`, `AuthenticationRoutes` import.


routes/index.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

// project import
import Loadable from 'ui-component/Loadable';

const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([{ path: '/', element: <PagesLanding /> }, MainRoutes], {
    basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
```

1. **Remove or change** `/login` **routes.**



- **If you want to remove routes** \- remove router component `RouterLink` or `Link` with `to=''` props.

- **If you want to change url** \- set the home page URL like, `to={DASHBOARD_PATH}` , And import `DASHBOARD_PATH` from `config` file.


2. **Remove** `useAuth` **hook**\- Remove the below imports from throughout the project and set static values for user profile props.


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import useAuth from 'hooks/useAuth';
```

1. **Remove axios interceptors response from** _**./src/utils/axios.ts**_ **file. So the final version should be look like below:**


utils/axios.ts

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import axios from 'axios';

const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3010/' });

export default axiosServices;

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosServices.get(url, { ...config });

    return res.data;
};
```

1. **Remove import of** `JWTProvider` **from ./src/App.tsx**

2. **Remove import and usage of** `AuthGuard` **from** `./src/routes/MainRoutes.tsx`


Disabling authentication within the system would render certain applications non-functional, particularly those reliant on backend APIs. These applications require a valid token to access and load data seamlessly.

Last updated 1 year ago

Was this helpful?