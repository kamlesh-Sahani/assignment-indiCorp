import { ChangeEvent, FormEvent, useState } from "react";
import "./tool.css";
import { toolApi } from "../../utils/api";


interface toolDataType{
    name:string;
    category:string;
    quantity:number;
}

const Tool = () => {
    const [toolData,setToolData] =  useState<toolDataType>({
        name:"",
        category:"",
        quantity:0,
    })
    const [image,setImage] = useState<File | null>(null)
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setToolData((prev)=>({
        ...prev,
        [name]:value
    }))
  };



  const imgaeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
    const file = e.target?.files![0];
    setImage(file);
  }
  const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {

      
      const {data} = await toolApi.post("/new",{image,...toolData});
     
      if(data.success){
        alert(data.message)
      }
    } catch (error:any) {
      alert(error?.response?.data?.message || "some went wrong")
    }
  }
  return (
    <div className="tool">
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <h1 className="mainText">Add new Tool</h1>
        <div className="inputBox">
          <p>Tool Title</p>
          <input type="text" name="name" value={toolData.name} onChange={changeHandler} required/>
        </div>

        <div className="inputBox">
          <p>Tool Category</p>
          <input type="text" name="category" value={toolData.category} onChange={changeHandler} required/>
        </div>

        <div className="inputBox">
          <p>Total quantity</p>
          <input type="number" name="quantity" value={toolData.quantity} onChange={changeHandler} required />
        </div>

        <div className="inputBox">
          <p>Tool Image</p>
          <input type="file" name="image" onChange={imgaeHandler}   accept="image/*" required />
        </div>

        <button type="submit" className="mainBg submitBtn">
          Add Tool
        </button>


      </form>
    </div>
  );
};

export default Tool;
