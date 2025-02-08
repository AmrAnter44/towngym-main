import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
export let ProjectContext = createContext(0);

export default function ProjectContextProvider(props) {

  const [isLogin, setisLogin] = useState(false)
    const [offers, setoffers] = useState([])
    const [loading, setloading] = useState()
 const [Deleting, setDeleting] = useState()
const [IsLogin, setIsLogin] = useState(null)
    const [loadingdel, setloadingdel] = useState(false);
    const [Delid, setDelid] = useState();
    const [userToken, setUserToken] = useState(null);
    // !!!!coaches
    const [coaches, setCoaches] = useState([]);
    const [DeletingCoaches, setDeletingCoaches] = useState();
    const [DelIdCoache, setDelIdCoache] = useState();
    //  !!!! Classes
    const [classes, setClasses] = useState([]);
    const [DeletingClasses, setDeletingclasses] = useState();
    const [DelIdclasses, setDelIdclasses] = useState();

    async function getdata () {
      setloading(true);
      try {
        const response = await fetch('http://41.38.207.186/Offers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setoffers(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setloading(false);
      }
    
    };

















// !!!!!coaches
    async function getCoaches () {
      setloading(true);
      try {
        const response = await fetch('http://41.38.207.186/Coaches');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCoaches(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching Coaches:', error);
      } finally {
        setloading(false);
      }
    
    };
    // !!!!!!!delCoaches
    async function deleteCoaches(id) {
      setDelIdCoache(id)
      setDeletingCoaches(true)
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://41.38.207.186/deleteCoaches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, token }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result);
    
        // Optionally, refresh the offers list
        await getCoaches();
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setDeletingCoaches(null)
      }
    }















// !!!!!Classes
async function getClasses () {
  setloading(true);
  try {
    const response = await fetch('http://41.38.207.186/Classes');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setClasses(data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching Coaches:', error);
  } finally {
    setloading(false);
  }

};
    // !!!!!!!delclasses
    async function deleteClasses(id) {
      setDelIdclasses(id)
      setDeletingclasses(true)
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://41.38.207.186/deleteCoaches', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, token }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result);
    
        // Optionally, refresh the offers list
        await getClasses();
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setDeletingCoaches(null)
      }
    }


























    async function deleteprod(id) {
      setDelid(id)
      setDeleting(true)
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://41.38.207.186/deleteOffer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, token }),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result);
    
        // Optionally, refresh the offers list
        await getdata();
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setDeleting(null)
      }
    }
  
  
    
    
    useEffect(()=>{getdata(), setDeleting() },[setDeleting])
  


    
  
    return (
      <ProjectContext.Provider value={{ deleteprod ,
       offers,
        setoffers ,
            userToken,
             setUserToken ,
              getdata ,
               isLogin,
                setisLogin,
                IsLogin, setIsLogin,
                Deleting, setDeleting,
                loadingdel,
                setloadingdel,
                loading,
                 setloading,
                 Delid, setDelid,
                 coaches,
                 DeletingCoaches,
                 setDeletingCoaches,
                 DelIdCoache,
                 setDelIdCoache,
                 classes,
                 setDeletingclasses,
                 DelIdclasses,
                 setDelIdclasses,
                 getCoaches,
                 deleteCoaches,
                 getClasses,
                 deleteClasses,
                 DeletingClasses,







                
                }}>
        {props.children}
      </ProjectContext.Provider>
    );
  }