import { getAllUserModel } from "./UserModel.js"


export const getAllUser = async (req, res) => {
        const result = await getAllUserModel();
        res.status(200).json({success: true, data: result})
}