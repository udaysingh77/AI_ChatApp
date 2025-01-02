import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"Project name must be unique"],
        lowecase:true,
        trim:true,
        required:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ] 
})

const Project = mongoose.model("Project",projectSchema);

export default Project;