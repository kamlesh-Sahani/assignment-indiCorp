import mongoose from "mongoose"

export  async function dbConnect (){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL,{
          dbName:"tool-managment"
        });
        console.log("database connect succesfuly");
      } catch (error) {
        console.log("database connection error",error);
    
      }

}
