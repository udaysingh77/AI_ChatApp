import express from "express"
import connectDB from './db/db.js'
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js"
import projectRoutes from "./routes/project.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express()


connectDB()
app.use(cors("*"))
app.use(morgan("dev"))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoutes);
app.use('/project',projectRoutes);

app.get("/",(req,res)=>{
    res.json("Hello World travel, girls slayer, Millionear - Uday Singh🤑😎😋")
})

export default app;
