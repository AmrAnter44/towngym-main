import { lazy, Suspense } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import LoadingSpinner from './components/LoadingSpinner';

// Eager load critical components
import Layout from './Layout';

// Lazy load route components for code splitting
const Home = lazy(() => import('./comp/Home'));
const Coaches = lazy(() => import('./comp/Coaches'));
const Classes = lazy(() => import('./comp/Classes'));
const Map = lazy(() => import('./comp/Map'));
const Men = lazy(() => import('./comp/Map/Men'));
const Ladies = lazy(() => import('./comp/Map/Ladies'));
const Cardio = lazy(() => import('./comp/Map/Cardio'));
const Weight = lazy(() => import('./comp/Map/Weight'));
const Leg = lazy(() => import('./comp/Map/Leg'));
const Fitness = lazy(() => import('./comp/Map/Fitness'));
const Spa = lazy(() => import('./comp/Map/Spa'));
const Caples = lazy(() => import('./comp/Map/Cables'));
const Machines = lazy(() => import('./comp/Map/Machines'));
const Bar = lazy(() => import('./comp/Map/Bar'));
const Gold = lazy(() => import('./comp/vip/Gold'));
const Shop = lazy(() => import('./comp/Shop'));

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/coaches", element: <Coaches /> },
        { path: "/classes", element: <Classes /> },
        { path: "/map", element: <Map /> },
        { path: "/Men", element: <Men /> },
        { path: "/Ladies", element: <Ladies /> },
        { path: "/Cardio", element: <Cardio /> },
        { path: "/Weight", element: <Weight /> },
        { path: "/Leg", element: <Leg /> },
        { path: "/Fitness", element: <Fitness /> },
        { path: "/Spa", element: <Spa /> },
        { path: "/Caples", element: <Caples /> },
        { path: "/Machines", element: <Machines /> },
        { path: "/Bar", element: <Bar /> },
        { path: "/gold", element: <Gold/> },
        { path: "/shop", element: <Shop/> },
        // ✅ شلنا Admin routes
      ],
    },
  ]);

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
      <Analytics />
    </>
  );
}

export default App;
