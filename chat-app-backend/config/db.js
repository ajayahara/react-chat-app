require('dotenv').config();
const mongoose=require('mongoose');
const uri=`mongodb+srv://abak00350:${process.env.PASSWORD}@cluster0.p6fzoka.mongodb.net/react-chat?retryWrites=true&w=majority`
const connection=mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true});
module.exports={connection}