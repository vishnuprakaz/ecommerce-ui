---
url: "https://codedthemes.gitbook.io/berry/v3.9.0/axios-api-calls"
title: "API Calls | Berry React"
---

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/axios-api-calls\#set-default-axios-base-url-to-call-api)    Set default axios base URL to call API

Open .env file and edit REACT\_APP\_API\_URL to your backend.

.env

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap

## Backend API URL
VITE_APP_API_URL=https://mock-data-api-nextjs.vercel.app/

```

You can configure the same for **next.js** as well.

Axios has been configured in the folder `..src\utils\axios.js`

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/axios-api-calls\#with-baseurl)    With baseUrl

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3010/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('serviceToken');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 && !window.location.href.includes('/login')) {
            window.location.pathname = '/login';
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default axiosServices;

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosServices.get(url, { ...config });

    return res.data;
};
```

### [Direct link to heading](https://codedthemes.gitbook.io/berry/v3.9.0/axios-api-calls\#without-baseurl)    Without baseUrl

You can set the entire URL in Axios request. Do not use common Axios instances `src\utils\axios.js` instead use directly Axios library.

Copy

```inline-grid min-w-full grid-cols-[auto_1fr] [count-reset:line] print:whitespace-pre-wrap
import { useCallback, useState } from 'react';

// third-party
import axios from 'axios';

// project-imports
import { UserProfile } from 'types/users';

// ==============================|| AXIOS - USER ||============================== //

function UserList() {
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('https://www.domain-xyz.com/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <div>
      {users.map((user: UserProfile[], index: number) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
}
```

Last updated 1 year ago

Was this helpful?