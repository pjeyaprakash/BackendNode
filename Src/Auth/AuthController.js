import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { createUser, findUserByEmail } from "./AuthModel.js";
import { ServerError } from "../../Utils/ServerError.js";
import {OAuth2Client} from "google-auth-library"

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

dotenv.config()

export const googleAuth = async(req , res) => {
    console.log("called")
    const { credential } = req.body

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()

    console.log("payload", payload)

    let user = await findUserByEmail(payload.email)


    if(!user){
      await createUser(payload)
    }

    const token = jwt.sign(
      {email: payload.email},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    )

    res.status(200).json({
      success: true,
      token
    })
        
}


export const signup = async(req, res) => {
        const data = req.body

        const bcryptedPassword = await bcrypt.hash(data.password, 8)

        const userId = await createUser(data, bcryptedPassword)

        const token = jwt.sign(
            {email: data.email},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.status(201).json({ success: true, userId, token})
}


export const signin = async (req, res) => {

        const data = req.body
        const user = await findUserByEmail(data.email);

        if(!user) throw new ServerError(404, "User Not Found")

        const isPasswordValid = await bcrypt.compare(data.password, user.password)

        if(!isPasswordValid) throw new ServerError(401, "Invalid Password")

        const token = jwt.sign(
            {email:data.email},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            success: true,
            token
        })
}
