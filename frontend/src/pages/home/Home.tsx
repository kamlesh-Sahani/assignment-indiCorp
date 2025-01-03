import { useEffect, useState } from "react";
import ToolCard from "../../components/toolcard/ToolCard"
import "./home.css";
import { toolApi } from "../../utils/api";
export interface ToolDataType{
  _id:string;
  title:string;
  quantity:number;
  category:string;
  image:string
}
const Home = () => {
  const [toolData,setToolData] = useState<ToolDataType[]|[]>([]);
  useEffect(()=>{
    async function fetchTool(){
      const {data} = await toolApi.get("/all");
      setToolData(data.tools)
    }
    fetchTool();
  },[])
  return (
    <div className="home">
        <div className="cardBox">
            <h1>Tools</h1>
            <div className="cardContainer">
              {
                toolData && toolData.map((tool)=>(
                  <ToolCard key={tool._id} 
                  {...tool}
                  />
                ))
              }
         
            </div>
            
        </div>
    </div>
  )
}

export default Home
