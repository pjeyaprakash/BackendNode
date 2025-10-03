import db from "../../Config/db.js"

export const createUser = async (data, bcryptedPassword = null) => {
    const [result] = await db.query(`insert into users(name, email, password) values(?,?,?)`, [data.name, data.email, bcryptedPassword])
    return result.insertId
};

export const findUserByEmail = async (email) => {
    return (await db.query(`select * from users where email = ?`, email))[0][0];
}