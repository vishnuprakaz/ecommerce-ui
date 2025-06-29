---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/routing/login-as-first-page"
title: "Login as First Page | Berry React"
---

This section explains how to set the Login page as the default starting page, skipping the landing page, for cases where it is not needed.

1. Update Route start: _**full-version\\src\\routes\\index.jsx**_


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // return useRoutes([{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, MainRoutes]);
    return useRoutes([LoginRoutes, AuthenticationRoutes, MainRoutes]);
}

```

1. Add default Login route: _**full-version\\src\\routes\\LoginRoutes.jsx**_


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/authentication3/ForgotPassword3')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [\
        {\
            path: '/',\
            element: <AuthLogin />\
        },\
        {\
            path: '/login',\
            element: <AuthLogin />\
        },\
        {\
            path: '/register',\
            element: <AuthRegister />\
        },\
        {\
            path: '/forgot',\
            element: <AuthForgotPassword />\
        }\
    ]
};

export default LoginRoutes;
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/routing/login-as-first-page\#for-remix)    For Remix

Remix has file based routing structure. when path is `/login` then navigate to login page behalf on AuthGuard.

_**full-version\\app\\layout\\index.tsx**_

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// project import
import LAYOUT from 'constant';
import AuthGuard from 'utils/route-guard/AuthGuard';
import GuestGuard from 'utils/route-guard/GuestGuard';
import MainLayout from './MainLayout';
import MinimalLayout from './MinimalLayout';

// types
import type { Props } from 'constant';

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = LAYOUT.main, children }: Props) {
    switch (variant) {
        case LAYOUT.minimal:
            return <MinimalLayout>{children}</MinimalLayout>;

        case LAYOUT.noauth:
            return (
                <GuestGuard>
                    <MinimalLayout>{children}</MinimalLayout>
                </GuestGuard>
            );

        default:
            return (
                <AuthGuard>
                    <MainLayout>{children}</MainLayout>
                </AuthGuard>
            );
    }
}
```

We can set `<layout>` in _**full-version\\app\\routes\\login\\index.tsx**_

login/index.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...

// project imports
import Layout from 'layout';
import LAYOUT from 'constant';
import AuthWrapper1 from 'components/authentication/AuthWrapper1';

...

// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    ...
    return (
        <Layout variant={LAYOUT.noauth}>
            <AuthWrapper1>
                ...
            </AuthWrapper1>
        </Layout>
    );
};

export default Login;
```

Last updated 1 year ago

Was this helpful?