import mongoose from "mongoose";

const roomSchema = mongoose.Schema({

    roomId:{
        type:String,
        require:true,
        unique:true,
    },

    createdAt:{
        type:Date,
        require:true,
        default:Date.now
    },

    lastActivity:{
        type:Date,
        require:true,
        default:Date.now
    },

     drawingData: {
    type: Array,
    default: []
  }
})


const Room = mongoose.model("Room", roomSchema)

export default Room
