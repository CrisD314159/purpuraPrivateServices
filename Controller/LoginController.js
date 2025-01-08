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


  checkAuth = async(req, res)=>{
     try {
        const {authorization} = req.headers
        if (!authorization) throw new Error("Unauthorized")
    
        const token = authorization.split(' ')[1]
        const {tokenData} = jwt.verify(token, process.env.JWT_SECRET)
        if (!tokenData) throw new Error("Unauthorized")
        
        if(!CheckAdmin(tokenData.userId)) throw new Error("You're not authorized to access this resource")
    
        res.status(200).json({success: true, message:"Authorized"})
     
      } catch (error) {
        if (error.name === "TokenExpiredError") return res.status(401).json({success: false, message: "Session expired, please login again"}) 
        res.status(401).json({success: false, message: `${error.message}`})
        
      }
  }
}