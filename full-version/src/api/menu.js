import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// Project-imports
import { fetcher } from 'utils/axios';

const initialState = {
    isDashboardDrawerOpened: false
};

export const endpoints = {
    key: 'api/menu',
    master: 'master',
    // widget: '/widget' // Disabled for E-commerce AI Agent POC
};

export function useGetMenu() {
    // Disabled for E-commerce AI Agent POC - return empty menu instead of API call
    // const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.widget, fetcher, {
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    //     revalidateOnReconnect: false
    // });

    const memoizedValue = useMemo(
        () => ({
            menu: null, // No widget menu for POC
            menuLoading: false,
            menuError: null,
            menuValidating: false,
            menuEmpty: true
        }),
        []
    );

    return memoizedValue;
}

export function useGetMenuMaster() {
    const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const memoizedValue = useMemo(
        () => ({
            menuMaster: data,
            menuMasterLoading: isLoading
        }),
        [data, isLoading]
    );

    return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
    // to update local state based on key

    mutate(
        endpoints.key + endpoints.master,
        (currentMenuMaster) => {
            return { ...currentMenuMaster, isDashboardDrawerOpened };
        },
        false
    );
}
