import Messages from "../Models/messageModel.js";
import moment from 'moment';
import { io, users } from "../index.js";




export const GetMessage=async(req,res)=>{
    try {
        const conversationID=req.query.id;

        const query= {
            conversationID
        }

        const get=await Messages.find(query);

res.status(200).send({
    success:true,
    get
})

        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Errro in Adding Message",
            error,
        });
    }
}


export const AddMessage=async(req,res)=>{
try {

    const {conversationID,sender,message,reciver}=req.body;

    if (!conversationID) {
        return res.status(400).send({ message: "conversationID is required" });
    }
    if (!sender) {
        return res.status(400).send({ message: "sender is required" });
    }
    if (!message || message.length<=0) {
        return res.status(400).send({ message: "message is required" });
    }
    if (!reciver) {
        return res.status(400).send({ message: "reciver is required" });
    }

    const timestamp=moment().format("HH:mm");


   const OnlineUser=await users.find(user=>user.id==reciver);

   const online=await users.find(user=>user.id==sender)


   OnlineUser && io.to(OnlineUser.socketID).emit('chat',{conversationID,sender,message,reciver,timestamp})

online && io.to(online.socketID).emit('chat',{conversationID,sender,message,reciver,timestamp})



    const setmessage=new Messages({
        conversationID,
        sender,
        message,
        reciver,
        timestamp
    })
setmessage.save();

return  res.status(201).send({
    success: true,
    message: "Message Added Successfully",
})

    
} catch (error) {
    return res.status(500).send({
        success: false,
        message: "Errro in Adding Message",
        error,
    });
}
}