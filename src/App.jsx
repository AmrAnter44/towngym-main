import './App.css'
import '/node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import Manage from './manage'
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import Home from './Home'
import ProjectContextProvider from './Context/ProjectContext'
import Layout from './Layout'
import Coaches from './Coaches';
import Classes from './Classes';


function App() {
  let router = createHashRouter([
    {
      path: "/",
      element: <Layout/>, children :
        [
          {
            path: "/manage",
            element: <Manage/>,
          },
          {
            index: true,
            element: <Home/>,
          },
        ]
      
    },
,
  ]);





 


  return <>
  <ProjectContextProvider>
  <RouterProvider router={router} >
   </RouterProvider>
   </ProjectContextProvider>
    </>

}

export default App
