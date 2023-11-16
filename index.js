        import express  from "express";
        import dotenv from "dotenv";
        import db from "./db/db.js";
        import router from "./Routes/UserRoutes.js";
        import cors from 'cors';
        import cookieParser from "cookie-parser";
        import { Socket } from "socket.io";
        import { Server } from "socket.io";
        import http from 'http';


        dotenv.config();

        const app=express();

        const server = http.createServer(app);

      export const io = new Server(server,{
            cors:{
                origin:"http://localhost:5173",
            }
        });

        app.use(express.json());
        app.use(cors())
        app.use(cookieParser())
    


        /* -------------------------------------------------- Socket.io ---------------------------------------------------------------- */

       export let users=[];

        io.on('connection',(socket)=>{
        
            
        socket.on('login',(data)=>{
            users.push({...data,socketID:socket.id,status:"online"});
            io.emit('updateUsers', users);
            console.log("added",users) 
           
        })
       
    


    socket.on('disconnect',()=>{
        const index=users.findIndex(user=>user.socketID === socket.id);
    if(index !==-1){
        users.splice(index,1);

    }
    io.emit('updateUsers', users);
    console.log("up",users)
    })


        })
        /* ------------------------------------------------------------------------------------------------------------------------------ */


        app.use(router);

        const port=process.env.PORT||7000;

        db();

        server.listen(port,()=>{
            console.log(`Working ${port}`)
        })