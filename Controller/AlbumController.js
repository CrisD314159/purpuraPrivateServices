import Album from "../Model/Album.js";
import { VerifyAlbum } from "../validations/AlbumValidation.js";



export default class AlbumController{

  defaultPicture = "https://console.cloudinary.com/pm/c-cc22b9bae206c03a5dc8d149c7bc5e/media-explorer?assetId=9a3fa2fc024ca257b75b077807302a86"

  create = async (req, res)=>{
      try {
        const {name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl} = req.body
        const validation = VerifyAlbum({name, description,artistId, genreId, releaseDate, writerName, producerName, recordLabel})
        if(validation.error){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Album.createAlbum({name, description, artistId, genreId, releaseDate, writerName: writerName??"", producerName: producerName??"", recordLabel: recordLabel??"", imageUrl: imageUrl ?? this.defaultPicture})
        return res.status(201).json({success: true, message: "Album created successfully"})
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
        await Album.updateAlbum({id, name, description, artistId, genreId, releaseDate, writerName: writerName??"", producerName: producerName??"", recordLabel: recordLabel??"", imageUrl: imageUrl ?? this.defaultPicture})
        return res.status(201).json({success: true, message: "Album updated successfully"})
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
          await Album.createAlbum(id)
          return res.status(200).json({success: true, message: "Album deleted successfully"})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };


}