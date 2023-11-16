import member from "../Models/MemberModel.js";



export const GetSingleController=async(req,res)=>{
    const {id}=req.params;

    try {
        const allUsers=await member.findOne({_id:id});
       
 
        return  res.status(201).send({
            success: true,
            message: "User login Successfully",
            allUsers,
           
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Errro in Registeration",
            error,
        }); 
    }
    }






export const GetMemberController=async(req,res)=>{

  

try {
  const senderId=req.query.sender; 


  const query = {
    $or: [
      { "sender._id": senderId },
      { "reciver._id": senderId },
    ],
  };

 const get=await member.find(query);
 


 return res.status(200).send({
    success: true,
    message: " Member",
    get,
});


} catch (error) {
    return res.status(500).send({
        success: false,
        message: "Errro in Getting Member",
        error,
    });
}

}





export const AddMemberDataController=async(req,res)=>{
    try {
        const {sender,reciver}=req.body;
       
        const check= await member.find({sender,reciver});
if(check.length==0){

    const newMember=new member({sender,reciver});

    newMember.save();

  return  res.status(200).send({
        success:true,
        message:"Added Successfully",
newMember        
    })

}
else if (check.length>0){
    return  res.status(200).send({
        success:false,
        message:"All Ready Exsit",
      
    }) 
}

return res.status(400).send({
    success:false,
    message:"Error",
})

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Errro in Adding Member",
            error,
        });
    }
}