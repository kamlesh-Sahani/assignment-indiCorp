import axios from "axios";
export  const api = axios.create({
    baseURL: "http://localhost:4000/api/mechanic",
    withCredentials:true,
    headers:{
      "Content-Type":"multipart/form-data"
    },
  });

  export  const adminApi = axios.create({
    baseURL: "http://localhost:4000/api/admin",
    withCredentials:true
  });

  export  const toolApi = axios.create({
    baseURL: "http://localhost:4000/api/tool",
    withCredentials:true,
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });



