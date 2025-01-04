import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { Link ,useNavigate} from "react-router-dom";
import { adminApi } from "../../../utils/api";

export interface loginData {
    email:string;
    password:string;
}
const AdminLogin = () => {
    const [loginData,setLoginData] = useState<loginData|{}>({});
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value,name} =e.target;
        setLoginData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true)
        try {
          const {data} = await adminApi.post("/login",loginData);
    
          if(data.success){
            alert(data.message)
            navigate("/tool")
          }
        } catch (error:any) {
          alert(error?.response?.data?.message || "some went wrong")
        }finally{
          setLoading(false)
        }
    }
  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1>
          <span className="mainText">Admin</span> Login Form
        </h1>
        <div className="inputBox">
          <p>Enter your Email</p>
          <input type="email" name="email" placeholder="eg. kamleshbca2005@gmail.com" onChange={handleChange}/>
        </div>

      
        <div className="inputBox">
          <p>Enter the passowrd</p>
          <input type="password" name="password" placeholder="eg. ****@****"  onChange={handleChange}/>
        </div>

        <Link to={"/admin/register"} className="mainText">
          Create new Account
        </Link>
        <button type="submit" className="mainBg">{loading?"loading":"Login"}</button>
      </form>
    </div>
  );
};

export default AdminLogin;
