# What is React Query?

`React Query` is a library built for `React` and `Next.js` codebases that comes baked in with all the best practices you should follow while making network requests:

- Caching
- Devtools
- Automatic data invaldation
- Stale while revalidate
- And much more

No more hacking around with fetch and useEffect all day long. React query provides a standard way of performing API requests in your app. Moreover, with react-query, it is possible that you can get rid of your central state management like Redux or Context API because react query can cache and make your data available across multiple components automatically. It is a production-level ready library and the benefits are endless.

---

# Installation and Setup

**Install:**

```
npm i react-query
```

**Setup:**

1. Import `QueryClient` and `QueryClientProvider` from `react-query` in `index.js`.
2. Wrap the `App` with the `QueryClientProvider` that takes in a prop `client` which is a new instance of QueryClient. The `QueryClient` simply gives the app the access to modify the query cache in React.
3. We'll also import the `ReactQueryDevtools` from `react-query/devtools` and add it just below the main `App` component. The devtools, help us debug any network requests we make with react-query.

In `index.js`,

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
        <App />
        <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

# Using React Query

To use React Query we must import a hook called `useQuery`.

At the fundamental level, React Query does two things with `useQuery`,

- It takes in a `key:string` argument, which maybe used later to invalidate or re-use the request from the cache or refetch again.
- The `request` function that returns a promise.

It returns the response as an object that contains the `data`, `status` and `error`.

**Syntax:**

```
import { useQuery } from 'react-query';

function App() {
    const { data, status, error } = useQuery(key, request);
}
```

In `App.js`,

```
import { useQuery } from 'react-query';

function App() {
    const { data, status, error } = useQuery("hello-world", () => {
        return Promise.resolve("Hello World");
    })
}
```

---

# React Query States

---

# References

- React Query | [Official](https://react-query.tanstack.com/)
- React Query Guide | [Codedamn](https://codedamn.com/learn/react-query)
