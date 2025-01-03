import { ReactNode, useEffect, useState } from "react"
import { adminApi } from "../utils/api";
import {Navigate} from "react-router-dom"
const Protected = ({children}:{children:ReactNode}) => {
    const [admin,setAdmin] = useState<{
        name:string;
        _id:string;
        email:string;
        profile:string;
    }>();
    const [loading,setLoading] = useState<boolean>(false)
    useEffect(()=>{
        async function fetchMe(){
            try {
                setLoading(true)
                const {data} =await adminApi.get("/me");
                console.log(data.admin);
                setAdmin(data.admin)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
          
        }
        fetchMe()
    },[])
    console.log(admin && admin._id && !admin.name,"admin")
    if(loading){
        return <h1>Loading......</h1>
    }
    if(admin && admin._id && admin.name){
        return (
            <>
              {children}
            </>
          )
    }else{
       return <Navigate  to={"/login"}/>
    }
 
     
}

export default Protected
