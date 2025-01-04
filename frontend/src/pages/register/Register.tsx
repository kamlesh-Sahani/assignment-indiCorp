import { ChangeEvent, FormEvent, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/api";
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  mobile: string;
  experience:string;
}
const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    mobile: "",
    experience:""
  });
  const [profile, setProfile] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/register", {
        profile,
        ...registerData,
      });
      if (data.success) {
        alert(data.message);
        navigate("/");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "some went wrong");
    }
  };

  const profileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files![0];
    setProfile(file);
  };
  return (
    <div className="register">
      <form onSubmit={submitHandler}  encType="multipart/form-data">
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
            value={registerData.name}
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
            value={registerData.email}
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
            value={registerData.mobile}
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
            value={registerData.password}
            required
          />
        </div>

        <div className="inputBox">
          <select
            name="experience"
            onChange={handleChange}
            value={registerData.experience}
          >
            <option value="expert">Expert</option>
            <option value={"medium"}>Medium</option>
            <option value={"new-recuit"}>New Recruit</option>
            <option value={"trainee"}>Trainee</option>
          </select>
        </div>

        <div className="inputBox">
          <p>Your Profile Pic</p>
          <input type="file" name="profile" onChange={profileHandler} />
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
