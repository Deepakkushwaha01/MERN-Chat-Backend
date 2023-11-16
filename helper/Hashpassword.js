import bcrypt from 'bcrypt';

export const hashedPassword=async(pass)=>{
    try {
        const saltRounds=10;
        const hash=await bcrypt.hash(pass,saltRounds);
        return hash;        
    } catch (error) {
        console.log(error);
    }

}


export const matchPassword=async(password,Hashpassword)=>{
return await bcrypt.compare(password,Hashpassword);
}