---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/routing/menu-from-the-backend"
title: "Menu from the backend | Berry React"
---

Berry is already loading few menus from backend for sample purpose. You can refer following area to check how its working:

1. Open the file menu.ts _(src/store/slices/menu.ts)_, and check API URL in the getMenu function.


`const response = await axios.get(` `'/api/menu/widget'` `);`

1. Open the file App.tsx _(src/App.tsx),_ and check the below code of the line.


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { useEffect, useState } from 'react';

import Loader from 'ui-component/Loader';

import { dispatch } from 'store';
import { getMenu } from 'store/slices/menu';

const App = () => {
    ...
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getMenu()).then(() => {
            setLoading(true);
        });
    }, []);

    if (!loading) return <Loader />;
    ...
}

```

1. Check code in _src/menu-items/_ widget.tsx. Icons and locale have been set according to API response in that.

2. Open the file _src/layout/MainLayout/MenuList/index.tsx_, and check the below code of the line.


Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { memo, useEffect } from 'react';

import { Menu } from 'menu-items/menu';

const MenuList = () => {
    ...
    useEffect(() => {
        handlerMenuItem();
        // eslint-disable-next-line
    }, []);

    let getMenu = Menu();
    const handlerMenuItem = () => {
        const isFound = menuItem.items.some((element) => {
            // use root parent id according to response instead of 'menu'
            if (element.id === 'menu') {
                return true;
            }
            return false;
        });

        if (getMenu?.id !== undefined && !isFound) {
            menuItem.items.splice(1, 0, getMenu);
        }
    };
    ...
}
```

Last updated 1 year ago

Was this helpful?