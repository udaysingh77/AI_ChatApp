import express from "express"
import connectDB from './db/db.js'
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js"
const app = express()

connectDB()
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users',userRoutes);

app.get("/",(req,res)=>{
    res.json("Hello World travel, girls slayer, Millionear - Uday Singh🤑😎😋")
})

export default app;
