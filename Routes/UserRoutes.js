import express  from "express";
import {  GetUserController, logincontroller, registercontroller } from "../Controller/UserController.js";
import { AddMemberDataController, GetMemberController, GetSingleController } from "../Controller/MemberController.js";
import { AddMessage, GetMessage } from "../Controller/MessageController.js";


const router=express.Router();

router.post('/login',logincontroller);
router.post('/register',registercontroller);
router.get('/getusers',GetUserController)
router.get('/singlecontroller/:id',GetSingleController)
router.post('/addMember',AddMemberDataController);
router.get('/getmember',GetMemberController);

router.post('/addMessage',AddMessage);
router.get('/getmessage',GetMessage)

export default router;