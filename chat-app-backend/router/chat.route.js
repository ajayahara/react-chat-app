const express=require("express");
const {chatModel} =require("../model/chat.model.js")
const chatRouter=express.Router();


chatRouter.post("/",async (req,res)=>{
    const {firstId,secondId}=req.body;
    try {
        const chat=await chatModel.findOne({
            members:{$all:[firstId,secondId]}
        })
        if(chat) return res.status(200).json(chat);
        const newChat=new chatModel({
            members:[firstId,secondId]
        })
        const response=await newChat.save();
        return res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})
chatRouter.get("/:id",async (req,res)=>{
    const id=req.params.id
    try {
        const chats=await chatModel.find({
            members:{$in:[id]}
        })
        return res.status(200).json(chats)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})
chatRouter.get("/:firstId/:secondId",async (req,res)=>{
    const {firstId,secondId}=req.params;
    try {
        const chat=await chatModel.findOne({
            members:{$all:[firstId,secondId]}
        })
        return res.status(200).json(chat)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})
module.exports={chatRouter}
