import mongoose from "mongoose"

const messageModel=mongoose.Schema({
    sender:{
        type:String,
    },
    reciver:{
        type:String,
    },
    message:{
        type:String,
    },
    conversationID:{
        type:String,
        required:true
    },
    timestamp: {
        type: String, // Adjust the data type as needed
      },
},
);

const Messages=mongoose.model('Messages',messageModel);

export default Messages;