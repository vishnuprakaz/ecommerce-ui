---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/routing"
title: "Routing | Berry React"
---

Berry routing system is based on [react-router](https://reacttraining.com/react-router/) and its package [react-router-dom,](https://reacttraining.com/react-router/web/guides/quick-start) it's also using code splitting for better performance.

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/routing\#configure-route)    Configure route

Open `...\src\routes\index.jsx` You will find the below example code. In the below code we have shown four different routes. `<MainRoutes/>` is the main layout routing you see after login.

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/routing#tab-javascript)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/routing#tab-typescript)

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
...

// ===============|| ROUTING RENDER ||=================== //

export default function ThemeRoutes() {
    return useRoutes([\
        { path: '/', element: <PagesLanding /> },\
        AuthenticationRoutes,\
        LoginRoutes,\
        MainRoutes]);
}
```

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
...

// ===============|| ROUTING RENDER ||=================== //

export default function ThemeRoutes() {
    return useRoutes([\
        { path: '/', element: <PagesLanding /> },\
        AuthenticationRoutes,\
        LoginRoutes,\
        MainRoutes]);
}
```

For **Remix,** we do not need to create `<MainRoutes/>`,

please refer: [https://remix.run/docs/en/1.14.3/guides/routing#defining-routes](https://remix.run/docs/en/1.14.3/guides/routing#defining-routes)

For **NextJS**, it does not need any extra documentation since it is available [here](https://nextjs.org/docs/app/building-your-application/routing)

Last updated 1 year ago

Was this helpful?