---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/routing/new-menu"
title: "New Menu | Berry React"
---

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/routing/new-menu\#add-new-menu-route-in-the-main-layout)    Add New menu/route in the main layout

To add one more menu item in `<MainRoutes />`, update the following file at the same location `...\src\routes\MainRoutes.jsx`

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/routing/new-menu#tab-javascript)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/routing/new-menu#tab-typescript)

MainRoutes.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
...
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// import new view and save it in constant. for e.g
const NewMenu = Loadable(lazy(() => import('views/new-menu')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [\
        {\
            path: '/sample-page',\
            element: <SamplePage />\
        },\
        {\
            path: '/newmenu',\
            element: <NewMenu />\
        }\
    ]
};

export default MainRoutes;
```

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
...
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// import new view and save it in constant. for e.g
const NewMenu = Loadable(lazy(() => import('views/new-menu')));

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [\
        {\
            path: '/sample-page',\
            element: <SamplePage />\
        },\
        {\
            path: '/newmenu',\
            element: <NewMenu />\
        }\
    ]
};

export default MainRoutes;
```

Any route added in `<MainLayout>` will automatically go through **<AuthGuard>**

Last updated 1 year ago

Was this helpful?