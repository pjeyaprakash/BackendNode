import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ServerError } from "../Utils/ServerError.js";

dotenv.config()

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if(!authHeader) throw new ServerError(401, "No Token Provided")

        const token = authHeader.split(" ")[1]

        if(!token) throw new ServerError(401, "Invalid Token format")

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) throw new ServerError(401, "Invalid or expired Token")
            req.used = decoded
            next()
        })

    } catch (error) {
        next(error)
    }
}