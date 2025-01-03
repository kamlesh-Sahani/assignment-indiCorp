import { ToolDataType } from "../../pages/home/Home";
import "./toolCard.css";
const ToolCard = ({title,image,quantity,category}:ToolDataType) => {
  return (
    <div className="toolCard">
      <img src={`${import.meta.env.VITE_BACKEND_URL}upload/${image}`} alt="" />
      <div className="toolText">
        <h1 className="mainText">{title}</h1>
        <p>{category}</p>
        <p>Quantity : {quantity}</p>
      </div>
    </div>
  )
}

export default ToolCard
