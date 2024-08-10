import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './App.css';
import 'draft-js/dist/Draft.css';
import AppLayout from 'components/Layout/AppLayout';
import { Home } from 'features/home';

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        loader: () => redirect('/home'),
      },
      {
        path: '/home',
        element: <Home />,
      },
      // {
      //   path: '/admin',
      //   element: <Admin />,
      // },
      // {
      //   path: '/login',
      //   element: <Login />,
      // },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
