import './App.css'
import '/node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from './Home'
import Layout from './Layout'



function App() {
  let router = createHashRouter([
    {
      path: "/",
      element: <Layout/>, children :
        [
          {
            index: true,
            element: <Home/>,
          },
        ]
      
    },
,
  ]);





 


  return <>

<Home></Home>

    </>

}

export default App
