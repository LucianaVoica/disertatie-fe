import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout/layout.tsx';
import Home from '@/pages/home/home.tsx';
import Lista from '@/pages/pacienti/Lista.tsx';
import { DetaliiPacient } from '@/pages/pacienti/detalii/DetaliiPacient.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'pacienti',
        children: [
          {
            index: true,
            element: <Lista />,
          },
          {
            path: ':id',
            element: <DetaliiPacient />,
          },
        ],
      },
    ],
  },
]);
