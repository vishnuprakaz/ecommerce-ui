---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/authentication"
title: "Authentication | Berry React"
---

Berry offers four authentication methods - JSON Web Token (JWT), Firebase, Auth0 and AWS - for users to choose from and can be changed to match the user's needs.

JWT Authentication is set by default

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/authentication\#how-does-it-work)    How does it work?

Access to dashboard pages is restricted to authenticated users. If a user is not authenticated, they will be redirected to the login page.

We used two guards `GuestGuard` and `AuthGuard.` Guards have been configured in `src\utils\route-guard\` folder.

In the `src/layout/App.js`, we have specified auth provider `JWTProvider` like,

App.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
```

App component wrap with the `<JWTProvider>`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
<ThemeCustomization>
  ...
  <AuthProvider>
    <Routes />
    <Snackbar />
  </AuthProvider>
  ...
</<ThemeCustomization>>
```

Using `<JWTProvider>`, we can use the context directly by importing `useContext` from React and specifying the context `JWTContext` or we can use the custom hook `useAuth` from `src/hooks/useAuth.js`

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/authentication\#for-remix)    For Remix

We used two guards `GuestGuard` and `AuthGuard.` Guards have been configured in `app\utils\route-guard\` folder.

In the `app/root.tsx`, we have specified auth provider `JWTProvider` like,

root.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
```

App component wrap with the `<JWTProvider>`

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
<ThemeCustomization>
  ...
  <AuthProvider>
    <Outlet />
    <Snackbar />
  </AuthProvider>
  ...
</ThemeCustomization>
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/authentication\#auth-configuration)    Auth Configuration:

All configurations related to authentication are stored in .env file. Those configs are like APIKey to connect authentication server, project id, etc.

Berry has a dummy/test credentials to make authentication work. Users have to change API and secret as per their project needs. One should not use those provided keys in their live environment.

.env

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
VITE_APP_VERSION=v3.9.1
GENERATE_SOURCEMAP=false

## Bakeend API URL
VITE_APP_API_URL=https://mock-data-api-nextjs.vercel.app/
VITE_APP_BASE_NAME=

## Map Box
VITE_APP_MAPBOX_ACCESS_TOKEN=

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

```

> The theme provides working an example for Login and Register only. Other flow like reset password, verification have to make it workable by the user himself.

Last updated 1 year ago

Was this helpful?