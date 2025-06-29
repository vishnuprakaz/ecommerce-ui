---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/state-management"
title: "State Management | Berry React"
---

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/state-management\#context-api)    Context API

We are using context for login methods - `Auth0, JWT, Firebase.`

Javascript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/state-management#tab-javascript)

Typescript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/state-management#tab-typescript)

src/contexts/configContext.jsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
....
// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';
....

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

function ConfigProvider({ children }) {

....
    const onChangeMenuOrientation = (menuOrientation) => {
        setConfig({
            ...config,
            menuOrientation
        });
    };

    const onChangeMiniDrawer = (miniDrawer) => {
        setConfig({
            ...config,
            miniDrawer
        });
    };

    const onChangeMode = (mode) => {
        setConfig({
            ...config,
            mode
        });
    };
....

 return (
        <ConfigContext.Provider
            value={{
                ...config,
                onChangeMenuOrientation,
                onChangeMiniDrawer,
                onChangeMode,
                onChangePresetColor,
                onChangeLocale,
                onChangeDirection,
                onChangeContainer,
                onChangeFontFamily,
                onChangeBorderRadius,
                onChangeOutlinedField,
                onReset
            }}
        >
            {children}
        </ConfigContext.Provider>
    );
}

ConfigProvider.propTypes = {
    children: PropTypes.node
};

export { ConfigProvider, ConfigContext };
```

src/contexts/configContext.tsx

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
....

// project import
import defaultConfig from 'config';
import useLocalStorage from 'hooks/useLocalStorage';

...

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
    children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
const [config, setConfig] = useLocalStorage('berry-config-vite-ts', {
        menuOrientation: initialState.menuOrientation,
        miniDrawer: initialState.miniDrawer,
        fontFamily: initialState.fontFamily,
        borderRadius: initialState.borderRadius,
        outlinedFilled: initialState.outlinedFilled,
        mode: initialState.mode,
        presetColor: initialState.presetColor,
        i18n: initialState.i18n,
        themeDirection: initialState.themeDirection,
        container: initialState.container
    });

    const onChangeMenuOrientation = (menuOrientation: MenuOrientation) => {
        setConfig({
            ...config,
            menuOrientation
        });
    };

    ....

    return (
            <ConfigContext.Provider
                value={{
                    ...config,
                    onChangeMenuOrientation,
                    onChangeMiniDrawer,
                    onChangeMode,
                    onChangePresetColor,
                    onChangeLocale,
                    onChangeDirection,
                    onChangeContainer,
                    onChangeFontFamily,
                    onChangeBorderRadius,
                    onChangeOutlinedField,
                    onReset
                }}
            >
                {children}
            </ConfigContext.Provider>
        );
    }

export { ConfigProvider, ConfigContext };
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/state-management\#state)    State

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
export const initialState = {
    isOpen: 'dashboard', //for active default menu
    navType: config.theme,
    locale: config.i18n,
    rtlLayout: false, // rtlLayout: config.rtlLayout,
    opened: true
};
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/state-management\#designing-actions)    Designing Actions

We designed the state structure based on the app's requirements.

Based on that list of things that can happen, we created list of actions that our application will use:

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const FIREBASE_STATE_CHANGED = 'FIREBASE_STATE_CHANGED';
```

## [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/state-management\#writing-reducers)    **Writing Reducers**

Creating the Root Reducer - A Redux app really only has one reducer function: the "root reducer" function

JavaScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/state-management#tab-javascript-1)

TypeScript

[Direct link to tab](https://codedthemes.gitbook.io/berry/v3.9.0/state-management#tab-typescript-1)

src/store/slice/contact.js

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
...

...
const slice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CONTACTS
        getContactsSuccess(state, action) {
            state.contacts = action.payload;
        },

        // MODIFY CONTACT
        modifyContactSuccess(state, action) {
            state.contacts = action.payload;
        }
    }
});
...

export function getContacts() {
    return async () => {
        try {
            const response = await axios.get('/api/contact/list');
            dispatch(slice.actions.getContactsSuccess(response.data.contacts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function modifyContact(contact) {
    return async () => {
        try {
            const response = await axios.post('/api/contact/modify', contact);
            dispatch(slice.actions.modifyContactSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
```

src/store/slice/contact.ts

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
...
// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
...

...
// Reducer
export default slice.reducer;
...

export function getContacts() {
    return async () => {
        try {
            const response = await axios.get('/api/contact/list');
            dispatch(slice.actions.getContactsSuccess(response.data.contacts));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function modifyContact(contact: UserProfile) {
    return async () => {
        try {
            const response = await axios.post('/api/contact/modify', contact);
            dispatch(slice.actions.modifyContactSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
```

Last updated 1 year ago

Was this helpful?