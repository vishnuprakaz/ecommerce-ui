---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/authentication/aws-cognito"
title: "AWS Cognito | Berry React"
---

At present, AWS uses a dummy config, so we don't need to change anything, but in actual implementation, you need to set poolId and appClientId in the following file. For more detail refer to AWS here: [https://aws.amazon.com/cognito/](https://aws.amazon.com/cognito/)

1. **Set AWS Config in .env**


.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
###
## AWS

VITE_APP_AWS_POOL_ID=
VITE_APP_AWS_APP_CLIENT_ID=
###
```

1. **Change AuthProvider**


..\\src\\App.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
```

1. **Change auth Hooks**


Comment another context in the following file and uncomment AWSCognito one.

..\\src\\hooks\\useAuth.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import AuthContext from 'contexts/AWSCognitoContext';
```

1. **Replace Login Code**


It's super simple. We have provided a code that just needs to be replaced.

- **VITE**:



- From: `src\views\pages\authentication\login\AWSCognitoLogin`

- To: `src\views\pages\authentication\auth-forms\AuthLogin.jsx`


- **NEXTJS**:



- From: `src\components\Authentication\login\AWSCongnitoLogin`

- To: `src\components\Authentication\auth-forms\AuthLogin.jsx`


1. **Replace Register Code**


- **VITE**:



- From: `src\views\pages\authentication\register\AWSCognitoRegister`

- To: `src\views\pages\authentication\auth-forms\AuthRegister.jsx`


- **NEXTJS**:



- From: `src\components\Authentication\register\AWSCognitoRegister`

- To: `src\components\Authentication\auth-forms\AuthRegister.jsx`


Last updated 1 year ago

Was this helpful?