import { ReactNode, useEffect, useState } from "react"
import { adminApi } from "../utils/api";
import {Navigate} from "react-router-dom"
const IsAdmin = ({children}:{children:ReactNode}) => {
    const [loading,setLoading] = useState<boolean>(true)
    const [admin,setAdmin] = useState<{
        name:string;
        _id:string;
        email:string;
        profile:string;
    }|null>();
    useEffect(()=>{
        async function fetchMe(){
            try {
                setLoading(true)
                const {data} =await adminApi.get("/me");
                setAdmin(data.admin)
                
            } catch (error) {
               setAdmin(null)
            }finally{
                setLoading(false)
            }
          
        }
        fetchMe()
    },[])
    if (loading) {
        return <h1>Loading...</h1>;
      }
    
      if (admin && admin.email) {
        return <>{children}</>; 
      }
    
      return <Navigate to="/admin/login" />; 
}

export default IsAdmin
