import express from "express";
import { verifyToken } from "../../Middleware/VerifyToken.js";
import { getAllUser } from "./UserController.js";

const userRouter = express.Router();

userRouter.get('/allUser', verifyToken, getAllUser)

export default userRouter