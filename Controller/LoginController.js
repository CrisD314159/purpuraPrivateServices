import LoginServices from "../services/loginServices.js"
import { VerifyLogin } from "../validations/LoginValidation.js"


export default class LoginController
{
  login = async (req, res)=>{

    try {
      const {email, password} = req.body
      const validation = VerifyLogin({email, password})
      if (!validation.success) throw new Error("Check your input and try again")
      const ip = req.ip
      const userAgent = req.headers['user-agent']
      const {token, refreshToken} = await LoginServices.login({email, password, ip, userAgent})
      res.status(200).json({success: true, message:"Logged in successfully", token, refreshToken})
    } catch (error) {
      res.status(500).json({success: false, message:`${error.message}`})
    }
  }

  logout = async (req, res)=> {
    try {
      const {refreshToken} = req.body
      await LoginServices.logout(refreshToken)
      res.status(200).json({success: true, message:"Logged out successfully"})
      
    } catch (error) {
      res.status(500).json({success: false, message:`${error.message}`})
      
    }

  }

  refreshToken = async (req, res)=>{
    try {
      const {refreshToken} = req.body
      if(!refreshToken) throw new Error("Invalid refresh token")
      const token = await LoginServices.refreshToken(refreshToken)
      res.status(200).json({success: true, message:"Token refreshed", token})
      
    } catch (error) {
      res.status(500).json({success: false, message:`${error.message}`})
      
    }
  }
}