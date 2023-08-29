const express=require("express");
const { messageModel } = require("../model/message.model");
const messageRouter=express.Router();
messageRouter.post("/",async (req,res)=>{
    const {senderId,chatId,text}=req.body;
    try {
        const newMessage=new messageModel({senderId,chatId,text})
        const response=await newMessage.save();
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})
messageRouter.get("/:chatId",async (req,res)=>{
    const {chatId}=req.params;
    try {
        const messages=await messageModel.find({chatId})
        res.status(200).json(messages)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})
module.exports={messageRouter}

