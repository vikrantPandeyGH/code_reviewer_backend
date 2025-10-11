import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:[true,'project is required']
    },
    text:{
        type:String,
        requierd:[true,'message text is required']
    }
},
{
   timestamps:true
})

const messagemodel = mongoose.model('Message',messageSchema)
export default messagemodel