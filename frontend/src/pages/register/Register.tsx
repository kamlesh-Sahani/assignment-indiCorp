import { ChangeEvent, FormEvent, useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
import { api } from "../../utils/api";
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  profile: string;
  mobile: string;
}
const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData | {}>({});
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data} = await api.post("/register",registerData);
      console.log(data);
      if(data.success){
        alert(data.message)
      }
    } catch (error:any) {
      alert(error?.response?.data?.message || "some went wrong")
    }
 
    

  };
  return (
    <div className="register">
      <form onSubmit={submitHandler}>
        <h1>
          <span className="mainText">Mechanic</span> Register Form
        </h1>

        <div className="inputBox">
          <p>Enter your name</p>
          <input
            type="text"
            name="name"
            placeholder="eg. Kamlesh sahani"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputBox">
          <p>Enter your Email</p>
          <input
            type="email"
            name="email"
            placeholder="eg. kamleshbca2005@gmail.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputBox">
          <p>Enter your Mobile no</p>
          <input
            type="text"
            name="mobile"
            placeholder="eg. 9667760692"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputBox">
          <p>Enter the passowrd</p>
          <input
            type="password"
            name="password"
            placeholder="eg. ****@****"
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputBox">
          <select name="experience" onChange={handleChange}>
            <option value="expert">Expert</option>
            <option value={"medium"}>Medium</option>
            <option value={"new-recuit"}>New Recruit</option>
            <option value={"trainee"}>Trainee</option>
          </select>
        </div>

        <div className="inputBox">
          <p>Your Profile Pic</p>
          <input type="file" name="profile" onChange={handleChange} />
        </div>

        <Link to={"/login"} className="mainText">
          Already have an Account ?
        </Link>
        <button type="submit" className="mainBg">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
