import {Link,useNavigate} from "react-router-dom"
import "./navbar.css"
import { adminApi, api } from "../../utils/api"
import {useEffect, useState } from "react"
const Navbar = () => {

  const [data, setData] = useState<{
    name: string;
    _id: string;
    email: string;
    picture: string;
  } | null>();
  const role = localStorage.getItem("role")
  const navigate = useNavigate();
  const logoutHandler = async()=>{
    try {
    if(role==="admin"){
      const {data}= await adminApi.get("/logout");
      alert(data.message);
    }else{
      const {data}= await api.get("/logout");
      alert(data.message);
    }

    setData(null);
    localStorage.removeItem("role")
    navigate("/")
    } catch (error:any) {
      alert(error.response.data.message)
    }
  }

  useEffect(() => {
    async function fetchMe() {
      try {
        if (role === "admin") {
          const { data } = await adminApi.get("/me");
          setData(data.admin);
          localStorage.setItem("role","admin")
        } else if(role==="mechanic") {
          const { data } = await api.get("/me");
          setData(data.mechanic);
          localStorage.setItem("role","mechanic")
        }
      } catch (error) {
        setData(null);
        console.log(error)
      }
    }
    fetchMe();
  }, [role]);



  return (
    <div className="navbar">
      <Link to={'/'}>
      <h1 className="mainText">Tool Managment</h1>
      </Link>
      
        <div className="navbar-left">
          {
            data && data.picture &&   <img src={`${import.meta.env.VITE_BACKEND_URL}upload/${data.picture}`} alt="" />
          }
        
          <Link to={"/tool"}>
          <button className="mainBg">Add Tool</button></Link>
         {
          data && data._id ? <button className="mainBg" onClick={logoutHandler}>Logout</button>:<Link to={"/login"}><button className="mainBg">Login</button></Link>
         }
        </div>
    </div>
  )
}

export default Navbar
