import { generateToken } from "../Config/GenerateToken.js";
import User from "../Models/UserModel.js";
import express from 'express';
import { hashedPassword, matchPassword } from "../helper/Hashpassword.js";










export const GetUserController=async(req,res)=>{
try {
    const allUsers=await User.find();
   
const red=allUsers.map((val,index)=>{
return {...val._doc,"password":'',"token":""}
})
 
/* console.log(allUsers) */
    return  res.status(201).send({
        success: true,
        message: "User login Successfully",
    red,
       
    })
    
} catch (error) {
    return res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
    }); 
}
}





export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validations

        if (!email) {
            return res.status(400).send({ message: "email is required" });
        }
        if (!password) {
            return res.status(400).send({ message: "password is required" });
        }

        const loginUser=await User.findOne({email});
     
if(loginUser && (await matchPassword(password,loginUser.password))){
    
    loginUser.token=await generateToken(loginUser._id);;
   
    loginUser.save();

    res.cookie("UserToken",loginUser.token,{
        httpOnly: true,
           maxAge: 36000000
      })
    
    
      const sendUserData={...loginUser._doc}
    delete sendUserData.token;
    delete sendUserData.password ;

    return  res.status(201).send({
        success: true,
        message: "User login Successfully",
        sendUserData,
       
    })
        
}

else{
   return res.status(400).send({
        success: false,
        message: "user Name and Password is wrong",
      })
}


    } catch (error) {
       return res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        });
    }
}


export const registercontroller = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        //validations
        if (!name) {
            return res.send({ message: "Name is required" });
        }
        if (!email) {
            return res.send({ message: "email is required" });
        }
        if (!password) {
            return res.send({ message: "password is required" });
        }

        //check exsiting User
        const exsitingUser = await User.findOne({ email });
        if (exsitingUser) {
          return  res.status(200).send({
                success: false,
                message: "User already exsit",
                exsitingUser,
            });
        }
        //register user
        const newpass = await hashedPassword(password);
        const newUser = await User.create({ name, email, password: newpass });
        if (newUser) {
           return res.status(201).send({
                success: true,
                message: "User Register Successfully",
                newUser,
            });
        }

        else {
           return res.status(500).send({
                success: false,
                message: "Errro in Registeration",
                error,
            });
        }

    } catch (error) {
      return  res.status(500).send({
            success: false,
            message: "Errrer",
            error,
        });
    }
}