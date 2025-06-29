---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/authentication/auth0"
title: "Auth0 | Berry React"
---

At present, Auth0 uses a dummy client id and domain, so we don't need to change anything, but in actual implementation, you need to set client id and domain in the following file. For more detail refer to Auth0 here: [https://auth0.com/docs/get-started/auth0-overview](https://auth0.com/docs/get-started/auth0-overview)

1. **Set Auth0 Config in .env**


.env

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
###
## Auth0

VITE_APP_AUTH0_CLIENT_ID=
VITE_APP_AUTH0_DOMAIN=
###
```

1. **Change AuthProvider**


..\\src\\App.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';
```

1. **Change auth Hooks**


Comment another context in the following file and uncomment Auth0 one.

..\\src\\hooks\\useAuth.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import AuthContext from 'contexts/Auth0Context';
```

1. **Replace Login Code**


It's super simple. We have provided a code that just needs to be replaced.

- **VITE**:



- From: `src\views\pages\authentication\login\Auth0Login`

- To: `src\views\pages\authentication\auth-forms\AuthLogin.jsx`


- **NEXTJS**:



- From: `src\components\Authentication\login\Auth0Login`

- To: `src\components\Authentication\auth-forms\AuthLogin.jsx`


1. **Replace Register Code**


- **VITE**:



- From: `src\views\pages\authentication\register\Auth0Register`

- To: `src\views\pages\authentication\auth-forms\AuthRegister.jsx`


- **NEXTJS**:



- From: `src\components\Authentication\register\Auth0Register`

- To: `src\components\Authentication\auth-forms\AuthRegister.jsx`


Last updated 1 year ago

Was this helpful?