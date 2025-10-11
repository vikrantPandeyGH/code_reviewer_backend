import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'project name is required']//agar requier cheej n dene pe kuchh message dena ho tab 
    },
    code:{
        type:String,
        default:""
    },
    review:{
        type:String,
        default:""
    }       
},
{
    timestamps:true//aisa karne se databse me ye schema kab create hua aur kab isme updation hua ye trace hota rahta hai
})

const projectModel = mongoose.model('Project',projectSchema)
export default projectModel