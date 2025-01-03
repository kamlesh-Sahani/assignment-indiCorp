import { ChangeEvent, FormEvent, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { adminApi } from "../../../utils/api";
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
const AdminRegister = () => {
  const [registerData, setRegisterData] = useState<RegisterData | {}>({});
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
      const { data } = await adminApi.post("/register", registerData);
      console.log(data);
      if (data.success) {
        alert(data.message);
        navigate("/tool")
      }

      setRegisterData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error: any) {
      alert(error?.response?.data?.message || "some went wrong");
    }
  };
  return (
    <div className="adminRegister">
      <form onSubmit={submitHandler}>
        <h1>
          <span className="mainText">Admin</span> Register Form
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
          <p>Enter the passowrd</p>
          <input
            type="password"
            name="password"
            placeholder="eg. ****@****"
            onChange={handleChange}
            required
          />
        </div>

        <Link to={"/admin/login"} className="mainText">
          Already have an Account ?
        </Link>
        <button type="submit" className="mainBg">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
