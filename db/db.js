import mongoose from "mongoose";

const db = async()=>{

let user=process.env.USER;
let pass=process.env.PASSWORD;    

let url=`mongodb+srv://${user}:${pass}@cluster0.md4x7ja.mongodb.net/chat`

try {
    await mongoose.connect(url);
console.log("Connetion Established......")
} catch (error) {
    console.log("Failed to connect")
}

}


export default db;