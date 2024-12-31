import { verifyArtist } from "../validations/ArtistValidation.js";
import Artist from "../Model/Artist.js";


export default class ArtistController
{

  defaultImage = "https://res.cloudinary.com/dw43hgf5p/image/upload/v1735614367/tbisvyworts3yaq8jxif.jpg"

  create = async (req, res)=>{
    try {
      const {name, description, imageUrl} = req.body
    const validation = verifyArtist({name, description})
    if(validation.error){
      return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
    }
    await Artist.createArtist({name, description, imageUrl: imageUrl ?? this.defaultImage})
    return res.status(201).json({success: true, message: "Artist created successfully"})
    } catch (error) {
      return res.status(500).json({success: false, message: error.message})
    }
  };


  update = async (req, res)=>{
    try {
      const {id, name, description, imageUrl} = req.body
    const validation = verifyArtist({name, description})
    if(validation.error || !id){
      return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
    }
    await Artist.updateArtist({id, name, description, imageUrl: imageUrl ?? this.defaultImage})
    return res.status(201).json({success: true, message: "Artist updated successfully"})
    } catch (error) {
      return res.status(500).json({success: false, message: error.message})
    }

  };

  delete = async (req,res)=>{
      try {
        const {id} = req.body
        if(!id){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Artist.deleteArtist(id)
        return res.status(200).json({success: true, message: "Artist deleted successfully"})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
  };


}