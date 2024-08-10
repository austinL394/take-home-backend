import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Reports } from 'features/reports';

import './App.css';
import 'draft-js/dist/Draft.css';
import '@heartsciencesecgcloud/insights-ui-kit/dist/index.css';
import AppLayout from 'components/Layout/AppLayout';

// Create a client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        loader: () => redirect('/reports'),
      },
      {
        path: '/reports',
        element: <Reports />,
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
