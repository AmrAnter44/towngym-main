
import React, { useContext, useState } from 'react';
import { Field, useFormik } from 'formik';
import { ProjectContext } from './Context/ProjectContext';
import Login from './Login';

export default function Manage() {
  const [loadingadd, setloadingadd] = useState(false)
  let { IsLogin, setIsLogin } = useContext(ProjectContext);
  const [token, settoken] = useState(null);

  // Function to add an offer
  async function addOffer(formValues,token) {
    setloadingadd(true); // Get token directly from session storage
    console.log(token);
    console.log(formValues);
  
    try {
      const response = await fetch('http://197.134.255.154:3000/addOffer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formValues:formValues , token:token }), // Send both formValues and token
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Offer added:', data);
    } catch (error) {
      console.error('Error adding offer:', error);
    } finally {
      setloadingadd(false);
    }
  }

  async function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Convert to Base64 Data URL
        reader.onload = () => resolve(reader.result); 
        reader.onerror = (error) => reject(error);
    });
}


  async function addCoach(formValues, token) {
    setloadingadd(true);
    console.log("Token:", token);
    console.log("Form Values:", formValues);
    
    try {
        const response = await fetch('http://197.134.255.154:3000/addCoach', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formValues, token }), // Send formValues with token
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Coach added:', data);
    } catch (error) {
        console.error('Error adding coach:', error);
    } finally {
        setloadingadd(false);
    }
}





//  add !!!!!!!!!!class
  async function addClass(formValues,token) {
    setloadingadd(true); // Get token directly from session storage
    console.log(token);
    console.log(formValues);
  
    try {
      const response = await fetch('http://197.134.255.154:3000/addClass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formValues:formValues , token:token }), // Send both formValues and token
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Class added:', data);
    } catch (error) {
      console.error('Error adding offer:', error);
    } finally {
      setloadingadd(false);
    }
  }








  

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      duration: '',
      price: '',
      priceNew: '', // Added new field for priceNew
      invite: '',
      private: '',
      inbody: ''
    },
    onSubmit: (values) => {
      addOffer(values,sessionStorage.getItem('token'));
    },
  });


  const coachesformik = useFormik({
    initialValues: {
        name: '',
        title: '',
        img: '', // Will store the Base64 string
    },
    onSubmit: async (values) => {
        addCoach(values, sessionStorage.getItem('token'));
    },
});









  // FormikClasses!!!!!!!!
  const classesformik = useFormik({
    initialValues: {
      className: '',
      day: '',
      time1: '',
      time2: '',

    },
    onSubmit: (values) => {
      addClass(values,sessionStorage.getItem('token'));
    },
  });





  return (
    <>
    {IsLogin == null ?  <Login /> : null}
     
    {IsLogin ?  <><h2 className='text-xl font-bold pt-9'>Add Now :</h2><form className="max-w-md mx-auto p-5" onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="duration"
            id="floating_duration"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <label
            htmlFor="floating_duration"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Duration
          </label>
        </div>

        {/* Price Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="price"
            id="floating_price"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <label
            htmlFor="floating_price"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Price
          </label>
        </div>

        {/* Price New Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="priceNew"
            id="floating_priceNew"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.priceNew}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <label
            htmlFor="floating_priceNew"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter New Price
          </label>
        </div>

        {/* Invite Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="invite"
            id="floating_invite"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.invite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <label
            htmlFor="floating_invite"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Invite
          </label>
        </div>

        {/* Private Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="private"
            id="floating_private"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.private}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <label
            htmlFor="floating_private"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Private
          </label>
        </div>

        {/* Inbody Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="inbody"
            id="floating_inbody"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={formik.values.inbody}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />
          <label
            htmlFor="floating_inbody"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Inbody
          </label>
        </div>

        <button type="submit" className="text-white bg-blue-400
         p-2 rounded">
        {loadingadd ? <span><i className='fas fa-spinner fa-spin'></i></span> : 'Add'}
        </button>
      </form></>
      : null}
      {IsLogin? <button className="text-white bg-blue-400
       p-2 rounded" onClick={()=>{sessionStorage.clear}} >Logout</button> : null}



       {/* start coatch add !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}

       {IsLogin ?  <><h2 className='text-xl font-bold pt-9'>Add Coach Now :</h2><form className="max-w-md mx-auto p-5" onSubmit={coachesformik.handleSubmit}>

       <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="floating_name"
            className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={coachesformik.values.name}
            onChange={coachesformik.handleChange}
            onBlur={coachesformik.handleBlur} />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium absolute text-sm text-gray-400
             dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
             peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter name
          </label>
        </div>



       

<div className="relative z-0 w-full mb-5 group">
   <input
     type="text"
     name="title"
     id="floating_title"
     className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
     placeholder=" "
     value={coachesformik.values.title}
     onChange={coachesformik.handleChange}
     onBlur={coachesformik.handleBlur} />
   <label
     htmlFor="floating_title"
     className="peer-focus:font-medium absolute text-sm text-gray-400
      dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-400
      peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
   >
     Enter title
   </label>
 </div>




 <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="file"
                        name="img"
                        id="floating_img"
                        className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        onChange={async (event) => {
                            const file = event.currentTarget.files[0];
                            if (file) {
                                const base64 = await convertImageToBase64(file);
                                coachesformik.setFieldValue("img", base64); // Store Base64
                            }
                        }}
                        onBlur={coachesformik.handleBlur}
                    />
                    <label htmlFor="floating_img" className="absolute text-sm text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Upload Image
                    </label>
                </div>




 <button type="submit" className="text-white bg-blue-400
         p-2 rounded">
        {loadingadd ? <span><i className='fas fa-spinner fa-spin'></i></span> : 'Add'}
        </button>
       </form></>
      : null}
    








           {/* start Class add !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
           {IsLogin ? (
  <>
    <h2 className="text-xl font-bold pt-9">Add Class Now :</h2>
    <form className="max-w-md mx-auto p-5" onSubmit={classesformik.handleSubmit}>

      {/* Class Name */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="className"
          id="floating_className"
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={classesformik.values.className}
          onChange={classesformik.handleChange}
          onBlur={classesformik.handleBlur}
        />
        <label
          htmlFor="floating_className"
          className="absolute text-sm text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter class
        </label>
      </div>

      {/* Duration (Day) */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="duration"
          id="floating_duration"
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={classesformik.values.duration}
          onChange={classesformik.handleChange}
          onBlur={classesformik.handleBlur}
        />
        <label
          htmlFor="floating_duration"
          className="absolute text-sm text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter day
        </label>
      </div>

      {/* Start Time */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="time1"
          id="floating_time1"
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={classesformik.values.time1}
          onChange={classesformik.handleChange}
          onBlur={classesformik.handleBlur}
        />
        <label
          htmlFor="floating_time1"
          className="absolute text-sm text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter start time
        </label>
      </div>

      {/* End Time */}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="time2"
          id="floating_time2"
          className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={classesformik.values.time2}
          onChange={classesformik.handleChange}
          onBlur={classesformik.handleBlur}
        />
        <label
          htmlFor="floating_time2"
          className="absolute text-sm text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter end time
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="text-white bg-blue-400 p-2 rounded">
        {loadingadd ? <i className="fas fa-spinner fa-spin"></i> : "Add"}
      </button>
    </form>
  </>
) : null}

    </>
  );
}
