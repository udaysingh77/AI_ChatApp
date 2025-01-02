import mongoose from "mongoose";



const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI,{dbName:"chatAppWithAI"})
    .then(()=>console.log("DataBase Connected"))
    .catch((e)=>console.log(e));
}

export default connectDB;