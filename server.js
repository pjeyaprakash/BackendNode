import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
// import db from "./Config/db.js"

import { errorHandler } from "./Middleware/ErrorHandler.js";
import authRouter from "./Src/Auth/AuthRouter.js";
import userRouter from "./Src/User/UserRouter.js";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())

const logPath = path.join("./Logs/access.log")
const accessLogStream = fs.createWriteStream(logPath, {flags: 'a'})

//For Production
app.use(morgan("tiny", {stream: accessLogStream }))

//For Development
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send("Server Working Fine!..")
})

app.use('/api/auth', authRouter)
app.use('/user', userRouter)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    })
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is Running on Port :", PORT)
})
