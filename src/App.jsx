import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // تم تعديل الاستيراد
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './comp/Home';
import Layout from './Layout';
import Coaches from './comp/Coaches';
import Classes from './comp/Classes';
import Map from './comp/Map';
import Men from './comp/map/Men';
import Ladies from './comp/map/Ladies';
import Cardio from './comp/map/Cardio';
import Weight from './comp/map/Weight';
import Leg from './comp/map/Leg';
import Fitness from './comp/map/Fitness';
import Spa from './comp/map/Spa';
import Caples from './comp/Map/Cables';
import Machines from './comp/map/Machines';
import Bar from './comp/map/Bar';
import Online from './comp/Online';
import SignOnline from './comp/SignOnline';


function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/coaches",
          element: <Coaches />,
        },
        {
          path: "/classes",
          element: <Classes />,
        },
        {
          path: "/map",
          element: <Map />,
        },
        {
          path: "/Men",
          element: <Men/>,
        },
        {
          path: "/Ladies",
          element: <Ladies/>,
        },
        {
          path: "/Cardio",
          element: <Cardio/>,
        },
        {
          path: "/Weight",
          element: <Weight/>,
        },
        {
          path: "/Leg",
          element: <Leg/>,
        },
        {
          path: "/Fitness",
          element: <Fitness/>,
        },
        {
          path: "/Spa",
          element: <Spa/>,
        },
        {
          path: "/Caples",
          element: <Caples/>,
        },
        {
          path: "/Machines",
          element: <Machines/>,
        },
        {
          path: "/Bar",
          element: <Bar/>,
        },
        {
          path: "/online",
          element: <Online/>,
        },
        {
          path: "/sign",
          element: <  SignOnline/>,
        },
      ],
    },
  ]); // تم إزالة الفاصلة الزائدة

  return <RouterProvider router={router} />;
}

export default App;
