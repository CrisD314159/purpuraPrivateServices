
import jwt from 'jsonwebtoken'
import { db } from '../DB/DBConnection.js'
export const CheckAuth = async (req, res, next) =>{
  try {
    const {authorization} = req.headers
    if (!authorization) throw new Error("Unauthorized")

    const token = authorization.split(' ')[1]
    const {tokenData} = jwt.verify(token, process.env.JWT_SECRET)
    if (!tokenData) throw new Error("Unauthorized")
    
    if(!await CheckAdmin(tokenData.userId)) throw new Error("You're not authorized to access this resource")

    req.session = tokenData.userId
    next()
  } catch (error) {
    if (error.name === "TokenExpiredError") return res.status(401).json({success: false, message: "Session expired, please login again"}) 
    res.status(401).json({success: false, message: `${error.message}`})
    
  }
}


export const CheckAdmin = async (userId) =>{
  try {
    const admin = await db`SELECT "Id" FROM "Admins" WHERE "Id" = ${userId}`
    if (!admin[0]) throw new Error("Unauthorized")
    return true
  } catch (error) {
    throw error
    
  }
}
