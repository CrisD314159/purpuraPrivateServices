import {v2 as cloudinary} from 'cloudinary'

import fs from 'fs'
export default class SongService{

  static async uploadSong(file) {
    try {
       cloudinary.config({
              cloud_name: process.env.CLOUD_NAME, 
              api_key: process.env.API_KEY, 
              api_secret: process.env.API_SECRET
            })
    const id = crypto.randomUUID()
    const result = await cloudinary.uploader.upload(file, {resource_type:"video", folder:"purpuraSongs", public_id:id, chunk_size:5000000})
    if(!result) throw new Error("Image upload failed")
      fs.unlinkSync(file)
      return result.secure_url
      
    } catch (error) {
      throw error  
    }
  }


}