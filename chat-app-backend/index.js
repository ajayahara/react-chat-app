// library import
require("dotenv").config()
const express = require("express");
const cors=require("cors");

// custom import
const { connection } = require("./config/db");
const { userRouter } = require("./router/user.route");
const { chatRouter } = require("./router/chat.route");
const { messageRouter } = require("./router/message.route");
// server
const app = express();
app.use(cors());
app.use(express.json());

app.use('/user',userRouter)
app.use("/chat",chatRouter)
app.use("/message",messageRouter)

app.get("/", async (req, res) => {
    res.json({ msg: "You are at home" })
})
const port=process.env.PORT||5050;
app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to server/db")
    } catch (err) {
        console.log(err)
    }
})