import mongoose from "mongoose";

const UserModel=mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true 
    },
    password:{
        type:String,
        requried:true
    },
    token:{
        type:String,
        requried:true
    }
},
{
    timeStamp: true,
});


const User=mongoose.model('User',UserModel);

export default User;