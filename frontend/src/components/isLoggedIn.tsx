import { ReactNode, useEffect, useState } from "react";
import { adminApi, api } from "../utils/api";
import { Navigate } from "react-router-dom";

interface PropsType {
  children: ReactNode;
  role?: string;
}
const IsLoggedIn = ({ children, role }: PropsType) => {
  const [data, setData] = useState<{
    name: string;
    _id: string;
    email: string;
    profile: string;
  } | null>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchMe() {
      try {
        if (role === "admin") {
          const { data } = await adminApi.get("/me");
          setData(data.admin);
          localStorage.setItem("role","admin")
        } else {
          const { data } = await api.get("/me");
         
          setData(data.mechanic);
          localStorage.setItem("role","mechanic")
        }
      } catch (error) {
        setData(null);
        
      } finally {
        setLoading(false);
      }
    }
    fetchMe();
  }, []);



  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (data?._id) {
    return <Navigate to={"/"} />;
  } else {
    return <>{children}</>;
  }
};

export default IsLoggedIn;
