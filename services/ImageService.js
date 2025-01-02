import {v2 as cloudinary} from 'cloudinary'


export default class ImageService{

  static async uploadImage(img) {
    try {
      const result = await cloudinary.uploader.upload_large(img, {resource_type:"image", folder:"purpuraImages", eager:[{width: 400, height: 400, crop: "fill"}]})
      return result.secure_url
      
    } catch (error) {
      throw error  
    }
  }


}