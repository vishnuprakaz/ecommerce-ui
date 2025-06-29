---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/routing/remove-menu-render-via-backend"
title: "Remove menu render via backend | Berry React"
---

In the Berry React admin, few **widget menus (i.e. Statistics, Data, Chart)** load from our mock API ( [GitHub repository](https://github.com/phoenixcoded20/mock-data-api-nextjs)). If you want to remove it from your admin panel, follow the steps below and remove/edit the suggested line of code.

1. **Delete menu-items file** widget.tsx \[../src/menu-items\]

2. **Open file**../src/layout/MainLayout/MenuList/index.tsx **and edit the below line of code.**


**Form:**

../src/layout/MainLayout/MenuList/index.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { Fragment, useLayoutEffect, useState } from 'react';
...
import menuItem from 'menu-items';
import { useGetMenu, useGetMenuMaster } from 'api/menu';
```

**To:**

../src/layout/MainLayout/MenuList/index.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { Fragment, useState } from 'react';
...
import menuItems from 'menu-items';
import { useGetMenuMaster } from 'api/menu';
```

1. **Open file**../src/layout/MainLayout/MenuList/index.tsx **and remove below line of code.**


../src/layout/MainLayout/MenuList/index.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { Menu } from 'menu-items/widget'

const MenuList = () => {
    ...
    const { menuLoading } = useGetMenu();
    ...
    const [menuItems, setMenuItems] = useState<{ items: NavItemType[] }>({ items: [] });

    let widgetMenu = Menu();

    useLayoutEffect(() => {
            const isFound = menuItem.items.some((element) => {
                if (element.id === 'group-widget') {
                    return true;
                }
                return false;
            });
            if (menuLoading) {
                menuItem.items.splice(1, 0, widgetMenu);
                setMenuItems({ items: [...menuItem.items] });
            } else if (!menuLoading && widgetMenu?.id !== undefined && !isFound) {
                menuItem.items.splice(1, 1, widgetMenu);
                setMenuItems({ items: [...menuItem.items] });
            } else {
                setMenuItems({ items: [...menuItem.items] });
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [menuLoading]);
}
```

1. **Open file** `src\api\menu.ts` **and edit below line of code.**


**From:**

src\\api\\menu.ts

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { MenuProps } from 'types/menu';
import { NavItemType } from 'types';
```

**To:**

src\\api\\menu.ts

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { MenuProps } from 'types/menu';
```

1. **Open the file** `src\api\menu.ts` **and remove the code below.**


src\\api\\menu.ts

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { fetcher } from 'utils/axios';

export const endpoints = {
  ...
  widget: '/widget' // server URL
};

export function useGetMenu() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.widget, fetcher, {
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
	() => ({
	  menu: data?.widgetas NavItemType,
	  menuLoading: isLoading,
	  menuError: error,
	  menuValidating: isValidating,
	  menuEmpty: !isLoading && !data?.length
	}),
	[data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
```

Last updated 11 months ago

Was this helpful?