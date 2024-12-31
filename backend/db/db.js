import mongoose from "mongoose";



const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("DataBase Connected"))
    .catch((e)=>console.log(e));
}

export default connectDB;