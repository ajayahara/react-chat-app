require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { userModel } = require("../model/user.model");
const userRouter = express.Router();
// function to create new token for login/register user
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.PRIVATE_KEY, { expiresIn: "3d" });
}
userRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json("All credential missing");
        const user = await userModel.findOne({ email });
        if (user) return res.status(400).json("User already exist with this email");
        if (!validator.isEmail(email)) return res.status(400).json("Not a valid email");
        if (!validator.isStrongPassword(password)) return res.status(400).json("Not a strong password")
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt)
        const newUser = new userModel({ name, email, password: newPassword });
        await newUser.save();
        const token = createToken(newUser._id)
        return res.status(200).json({ _id: newUser._id, name, email, token });
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
});

userRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email||!password) return res.status(400).json("Invalid email or password");
        const user=await userModel.findOne({email});
        if(!user) return res.status(400).json("No user found with this credential");
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid) return res.status(400).json("Wrong password");
        const token = createToken(user._id)
        return res.status(200).json({ _id: user._id, name:user.name, email, token });
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})
userRouter.get("/get/:id",async (req,res)=>{
    const _id=req.params.id;
    try {
        const user=await userModel.findById({_id});
        res.status(200).json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
});
userRouter.get("/",async (req,res)=>{
    try {
        const users=await userModel.find();
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({err})
    }
})

module.exports = { userRouter };
