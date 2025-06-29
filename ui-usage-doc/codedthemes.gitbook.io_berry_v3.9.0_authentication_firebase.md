---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/authentication/firebase"
title: "Firebase | Berry React"
---

At present, firebase uses you need to set a secret in the following file. For more detail refer to firebase here: [https://firebase.google.com/docs/reference/rest/auth](https://firebase.google.com/docs/reference/rest/auth)

1. **Set Firebase Config in .env**


.env

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
###
## Firebase - Google Auth

VITE_APP_FIREBASE_API_KEY=
VITE_APP_FIREBASE_AUTH_DOMAIN=
VITE_APP_FIREBASE_PROJECT_ID=
VITE_APP_FIREBASE_STORAGE_BUCKET=
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=
VITE_APP_FIREBASE_APP_ID=
VITE_APP_FIREBASE_MEASUREMENT_ID=
###
```

1. **Change AuthProvider**


..\\src\\App.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
// Replace at line 17
import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
```

1. **Change auth Hooks**


Comment another context in the following file and uncomment Firebase one.

..\\src\\hooks\\useAuth.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import AuthContext from 'contexts/FirebaseContext';
```

1. **Replace Login Code**


It's super simple. We have provided a code that just needs to be replaced.

- **VITE**:



- From: `src\views\pages\authentication\login\FirebaseLogin`

- To: `src\views\pages\authentication\auth-forms\AuthLogin.tsx`


- **NEXTJS**:



- From: `src\components\Authentication\login\FirebaseLogin`

- To: `src\components\Authentication\auth-forms\AuthLogin.jsx`


1. **Replace Register Code**


- **VITE**:



- From: `src\views\pages\authentication\register\FirebaseRegister`

- To: `src\views\pages\authentication\auth-forms\AuthRegister.jsx`


- **NEXTJS**:



- From: `src\components\Authentication\register\FirebaseRegister`

- To: `src\components\Authentication\auth-forms\AuthRegister.jsx`


Last updated 1 year ago

Was this helpful?