import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";

export interface loginData {
    email:string;
    password:string;
}
const Login = () => {
    const [loginData,setLoginData] = useState<loginData|{}>({});

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {value,name} =e.target;
        setLoginData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
          const {data} = await api.post("/login",loginData);
          console.log(data);
          if(data.success){
            alert(data.message)
          }
        } catch (error:any) {
          alert(error?.response?.data?.message || "some went wrong")
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
          <input type="email" name="email" placeholder="eg. kamleshbca2005@gmail.com" onChange={handleChange}/>
        </div>

      
        <div className="inputBox">
          <p>Enter the passowrd</p>
          <input type="password" name="password" placeholder="eg. ****@****"  onChange={handleChange}/>
        </div>

        <Link to={"/register"} className="mainText">
          Create new Account
        </Link>
        <button type="submit" className="mainBg">login</button>
      </form>
    </div>
  );
};

export default Login;
