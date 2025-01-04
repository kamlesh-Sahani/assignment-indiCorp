import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { Link ,useNavigate} from "react-router-dom";
import { api } from "../../utils/api";

export interface loginData {
    email:string;
    password:string;
}
const Login = () => {
    const [loginData,setLoginData] = useState<loginData>({
      email:"",
    password:""
    });
    const [loading,setLoading] = useState(false);
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
        console.log(loginData)
        setLoading(true)
        try {
          const {data} = await api.post("/login",loginData,{
            headers:{
              "Content-Type":"application/json"
            }
          });
         
          if(data.success){
            alert(data.message)
            setLoginData({
              email:"",
              password:""
            })
            navigate("/")
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
          <span className="mainText">Mechanic</span> Login Form
        </h1>
        <div className="inputBox">
          <p>Enter your Email</p>
          <input type="email" name="email" placeholder="eg. kamleshbca2005@gmail.com"  value={loginData.email} onChange={handleChange}/>
        </div>

      
        <div className="inputBox">
          <p>Enter the passowrd</p>
          <input type="password" name="password" placeholder="eg. ****@****" value={loginData.password} onChange={handleChange}/>
        </div>

        <Link to={"/register"} className="mainText">
          Create new Account
        </Link>
        <button type="submit" className="mainBg">{loading ? "loading":"login"}</button>
      </form>
    </div>
  );
};

export default Login;
