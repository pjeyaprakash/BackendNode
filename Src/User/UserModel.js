import db from "../../Config/db.js"

export const getAllUserModel = async() => {
    return (await db.query(`select name, email from users`))[0]
}