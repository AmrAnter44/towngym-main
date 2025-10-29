import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './comp/Home';
import Layout from './Layout';
import Coaches from './comp/Coaches';
import Classes from './comp/Classes';
import Men from './comp/Map/Men';
import Ladies from './comp/Map/Ladies';
import Cardio from './comp/Map/Cardio';
import Weight from './comp/Map/Weight';
import Leg from './comp/Map/Leg';
import Fitness from './comp/Map/Fitness';
import Spa from './comp/Map/Spa';
import Caples from './comp/Map/Cables';
import Machines from './comp/Map/Machines';
import Bar from './comp/Map/Bar';
import SignOnline from './comp/SignOnline';
import Map from './comp/Map';
import Gold from './comp/vip/Gold';
import Shop from './comp/Shop';
import { Analytics } from "@vercel/analytics/react"
import AdminLogin from './comp/admin/AdminLogin';
import AdminDashboard from './comp/admin/AdminDashboard';
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,   // هنا حاطين الـ Layout فيه Footer و Outlet
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

        { path: "/sign", element: <SignOnline /> },
          { path: "/gold", element: <Gold/> },
          { path: "/shop", element: <Shop/> },
                { path: "/admin-login", element: <AdminLogin /> },
      { path: "/admin-dashboard", element: <AdminDashboard /> },
      ],
    },
  ]);

  return     <>
      <RouterProvider router={router} />
      <Analytics />   {/* ✅ هنا هيتسجل الترافيك */}
    </>
}

export default App;
