import { db } from "../DB/DBConnection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export default class LoginServices{
  static async handleSession({sessionId, userId, fingerprint}){
    try {
      await db.begin(async db =>{
        try {
          await db`DELETE FROM "AdminSessions" WHERE "UserId" = ${userId}`
          await db`INSERT INTO "AdminSessions" ("Id", "UserId", "FingerPrint", "CreatedAt") VALUES (${sessionId}, ${userId}, ${fingerprint}, ${Date.now()})`
          return true
          
        } catch (error) {
          db.rollback()
          throw error 
        }
      })
    } catch (error) {
      throw error
      
    }
  }
  static async login({email, password, ip, userAgent}){
    try{
      const user = await db`SELECT * FROM "Admins" WHERE "Email" = ${email}`
      if (!user[0]) throw new Error("Invalid email or password")
      const passwordMatch = await bcrypt.compare(password, user[0].Password)
      if (!passwordMatch) throw new Error("Invalid email or password")
      const fingerprint = await bcrypt.hash(`${ip}${userAgent}`, 10)
      const sessionId = crypto.randomUUID()
      await this.handleSession({sessionId, userId: user[0].Id, fingerprint})

      const tokenData = {
        userId: user[0].Id,
        email: user[0].Email,
      }
      const refreshTokenData = {
        userId: user[0].Id,
        email: user[0].Email,
        sessionId        
      }
      const token = jwt.sign({tokenData}, process.env.JWT_SECRET, {expiresIn: "1h"})
      const refreshToken = jwt.sign({refreshTokenData}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"})

      return {token, refreshToken}
      

    } catch (error){
      throw error;
    }
  }

  static async logout(refreshToken){
    try {
      const {refreshTokenData} = jwt.decode(refreshToken, process.env.JWT_REFRESH_SECRET)
      if(!refreshTokenData) throw new Error("Invalid refresh token")
      await db`DELETE FROM "AdminSessions" WHERE "Id" = ${refreshTokenData.sessionId}`
      return true
      
    } catch (error) {
      if(error.name === "TokenExpiredError"){
        throw new Error("Session expired, please login again")
      }
      throw error
      
    }
  }


  static async refreshToken(refreshToken){
    try {
      const {refreshTokenData} = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      if(!refreshTokenData) throw new Error("Invalid refresh token")
      const session = await db`SELECT "Id" from "AdminSessions" WHERE "Id" = ${refreshTokenData.sessionId}` 
      if(!session[0]) throw new Error("Invalid refresh token")
      const tokenData = {
        ...refreshTokenData
      }
      const token = jwt.sign({tokenData}, process.env.JWT_SECRET, {expiresIn: "1h"})
      return token

    } catch (error) {
      if(error.name === "TokenExpiredError") throw new Error("Session expired, please login again")
      throw error
      
    }

  }

}