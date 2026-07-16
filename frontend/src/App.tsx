// App.tsx ou main.tsx
import { createBrowserRouter, RouterProvider } from 'react-router';
import { LayoutPrincipal } from './layouts/LayoutPrincipal';
import Dashboard from './pages/Dashboard';
import { Categorias } from './pages/Categorias';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPrincipal />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/categorias',
        element: <Categorias />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}