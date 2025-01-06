import {v2 as cloudinary} from 'cloudinary'


export default class SongService{

  static async uploadSong(file) {
    try {
      const result = await cloudinary.uploader.upload_large(file, {resource_type:"video", folder:"purpuraSongs"})
      return result.secure_url
      
    } catch (error) {
      throw error  
    }
  }


}