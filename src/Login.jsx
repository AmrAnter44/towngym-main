// import axios from 'axios';
// import React, { useContext, useState } from 'react';

// import { ProjectContext } from './Context/ProjectContext';
// export default function Login() {
//   const [loadinglog, setloadinglog] = useState()
//   let { deleteprod ,
//     offers,
//      setoffers ,
//          userToken,
//           setUserToken ,
//            getdata ,
//             isLogin,
//              setisLogin,
//              loadingadd,
//              setloadingadd,
//              loadingdel,
//              setloadingdel,} = useContext(ProjectContext)
    //
//   // Function to add an offer
//   async function getLogin(formValues) {
//     setloadinglog(true); // Set loading state before making the request
//     try {
//       const response = await fetch('https://town-server-production.up.railway.app/Login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formValues),
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log('Login data:', data);
  
//       // Ensure the server returns a 'token' property
//       if (data.token) {
//         sessionStorage.setItem('token', data.token);
//         console.log('Token:', sessionStorage.getItem('token'));
//         setloadinglog('Success Login'); // Consider changing this based on your app's state handling
//       } else {
//         throw new Error('No token received from server');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       // Optionally set loading state to indicate an error
//     } finally {
//       setloadinglog(false); // Reset loading state after request completes
//     }
//   }
  
//   // Formik configuration
//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//     },
//     onSubmit: (values) => {
//       getLogin(values);
//     },
//   });
  

//   return <>
//   <h2 className='text-xl'> <i className="fa-solid fa-bell  text-blue-500  px-2"></i> LOGIN FIRST !!!!!!!!!</h2>
//       <form className="max-w-md mx-auto p-5 " onSubmit={formik.handleSubmit}>

//         <div className="relative z-0 w-full mb-5 group  ">
//           <input
//             type="text"
//             name="username"
//             id="floating_username"
//             className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             placeholder=" "
//             value={formik.values.username}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           <label
//             htmlFor="floating_username"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Enter username
//           </label>
//         </div>

//         <div className="relative z-0 w-full mb-5 group">
//           <input
//             type="text"
//             name="password"
//             id="floating_password"
//             className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//             placeholder=" "
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           <label
//             htmlFor="floating_password"
//             className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 password-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//           >
//             Enter Duration
//           </label>
//         </div>

     

//         <button type="submit" className="text-white bg-blue-500 p-2 rounded">
//           { <span>Login</span>  }
          
//         </button>
        
//       </form>
//       {loadinglog ? <span>{loadinglog}</span> : null}
//     </>
// }

import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { ProjectContext } from './Context/ProjectContext';

export default function Login() {
  const [loadinglog, setloadinglog] = useState(false); // Changed to boolean
  let {  setUserToken, IsLogin, setIsLogin } = useContext(ProjectContext);

  // Function to handle login
  async function getLogin(formValues) {
    setloadinglog(true); // Set loading state before making the request
    try {
      const response = await fetch('https://xgym.website/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
     
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Log the raw response text
      const responseText = await response.text();
      console.log('Response Text:', responseText);
      sessionStorage.setItem('token', responseText);
      setUserToken(responseText);
      setIsLogin(true)
      // Check if the response is JSON before parsing
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = JSON.parse(responseText);
        console.log('Login data:', data);
  
        // Ensure the server returns a 'token' property
        if (responseText) {
          sessionStorage.setItem('token', responseText);
          console.log('Token:', sessionStorage.getItem('token'));
          setUserToken(responseText); // Set user token in context if needed
          console.log(responseText);
          
           // Update login state
          setloadinglog(false); // Reset loading state
        } else {
          throw new Error('No token received from server');
        }
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Error:', error);
      setloadinglog(false); // Reset loading state in case of error
    }
  }
  

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      getLogin(values);
    },
  });

  return (
    <>
      <h2 className='text-xl'>
        <i className="fa-solid fa-bell text-blue-500 px-2"></i> LOGIN FIRST!
      </h2>
      <form className="max-w-md mx-auto p-5" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            id="floating_username"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="floating_username"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter username
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password" // Changed from 'text' to 'password'
            name="password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter password
          </label>
        </div>

        <button type="submit" className="text-white bg-blue-500 p-2 rounded">
        {loadinglog ? <span><i className='fas fa-spinner fa-spin'></i></span> : 'Login'}
        </button>
        
      </form>

    </>
  );
}
