import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // تم تعديل الاستيراد
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Layout from './Layout';

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
      ],
    },
  ]); // تم إزالة الفاصلة الزائدة

  return <RouterProvider router={router} />;
}

export default App;
