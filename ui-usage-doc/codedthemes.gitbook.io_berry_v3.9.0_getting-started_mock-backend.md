---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/mock-backend"
title: "Mock backend | Berry React"
---

We use a mock backend to provide necessary data and handle JWT authentication as well. This mock backend is shared across various apps for consistent data handling. You can find the mock backend server in the following GitHub repository:

- GitHub Repo: [https://github.com/phoenixcoded20/mock-data-api-nextjs](https://github.com/phoenixcoded20/mock-data-api-nextjs)


The provided code of Berry directly uses a deployed URL. You can verify this by observing the network tab, where you'll see this URL being accessed at multiple points.

- Deployed URL: [https://mock-data-api-nextjs.vercel.app/](https://mock-data-api-nextjs.vercel.app/)


![](https://codedthemes.gitbook.io/berry/~gitbook/image?url=https%3A%2F%2F2078200040-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FflrTH6nspDenn8uPkVTP%252Fuploads%252FNhJag6H93hAeJsxDRawP%252Fimage.png%3Falt%3Dmedia%26token%3Df36c9927-523f-4ed2-a554-281ca0264789&width=768&dpr=4&quality=100&sign=31398216&sv=2)

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/getting-started/mock-backend\#setup-local-backend-server)    Setup Local backend server

If you intend to avoid live server and wanted to use same in local, follow below guidelines.

1. Clone GitHub repo to your machine:







Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
git clone https://github.com/phoenixcoded20/mock-data-api-nextjs.git
```

2. Install and Run:







Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
npm install
npm run dev
```

3. This will start backend in local at 3010 ports.

4. Replace the _API\_URL_ key in `.env` at root location of Berry package:



- VITE:







Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
VITE_APP_API_URL: http://localhost:3010/
```

- NEXTJS:







Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
REACT_APP_API_URL: http://localhost:3010/
```


Last updated 1 year ago

Was this helpful?