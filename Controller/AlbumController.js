import Album from "../Model/Album";
import { VerifyAlbum } from "../validations/AlbumValidation";



export default class AlbumController{

  create = async (req, res)=>{
      try {
        const {name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl} = req.body
        const validation = VerifyAlbum({name, description,artistId, genreId, releaseDate, writerName, producerName, recordLabel})
        if(validation.error){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        const album = await Album.createAlbum({name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl: imageUrl ?? ""})
        return res.status(201).json({success: true, album})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
    };
  
  
    update = async (req, res)=>{
      try {
        const {id, name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl} = req.body
        const validation = VerifyAlbum({name, description,artistId, genreId, releaseDate, writerName, producerName, recordLabel})
        if(validation.error || !id){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        const album = await Album.updateAlbum({id, name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl: imageUrl ?? ""})
        return res.status(201).json({success: true, album})
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
          const album = await Album.createAlbum(id)
          return res.status(200).json({success: true, album})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };


}