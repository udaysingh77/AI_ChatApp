import "dotenv/config"
import http from "http"
import app from "./app.js"
import { Server } from "socket.io";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import Project from "./models/project.model.js";



const server = http.createServer(app);
const io = new Server(server,{
  cors:"*"
});


io.use(async(socket,next)=>{
  try {
    const token = socket.handshake.auth?.token || socket.handshake.headers.autherization?.split(" ")[1];
    const projectId = socket.handshake.query.projectId;

    if(!mongoose.Types.ObjectId.isValid(projectId)){
      return next(new Error("Invalid project"))
    }

    socket.project = await Project.findById(projectId)


    if(!token){
      return next (new Error("Authentication Error - token"))
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    if(!decoded){
      return next(new Error("Authentication Error - decoded"))
    }

    socket.user = decoded;
    next()
  } catch (error) {
   next(error)
  }
})

io.on('connection', socket => {
    console.log("socket Connected")

    socket.roomId = socket.project._id.toString();

    socket.join(socket.roomId)
    //here
    console.log("THIS hiittttttts 2");

    socket.on('project-message',data=>{
      console.log("THIS hiittttttts 3");
      console.log("data====>",data)
      socket.broadcast.to(socket.roomId).emit('project',data)
    })

  socket.on('event', data => console.log("socket Connected"));
  socket.on('disconnect', () => console.log("socket Connected"));
});




const PORT =process.env.PORT || 3000


server.listen(PORT,()=>console.log(`Server is runnng on http:localhost:${PORT}`))
