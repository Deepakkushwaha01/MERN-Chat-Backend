import mongoose from "mongoose"

const MemberModel=mongoose.Schema({
    sender:{
        type:Object,
        required:true 
    },
    reciver:{
        type:Object,
        required:true   
    },
   
},
{
    timeStamp: true,
});

const member=mongoose.model('member',MemberModel);

export default member;

