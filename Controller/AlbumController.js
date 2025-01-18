import Album from "../Model/Album.js";
import { VerifyAlbum } from "../validations/AlbumValidation.js";



export default class AlbumController{

  defaultPicture = "https://res.cloudinary.com/dw43hgf5p/image/upload/v1735662671/y9fte0emwkkrkgqwlahj.jpg"



  getAll = async (req, res)=>{
    try {
      const albums = await Album.getAllAlbums()
      return res.status(200).json({success: true, message: "Data fetched", data: albums})
    } catch (error) {
      return res.status(500).json({success: false, message: error.message})
    }
  }

  create = async (req, res)=>{
      try {
        const {name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl} = req.body
        const date = new Date(releaseDate);
        if (isNaN(date)) throw new Error("Cannot convert date");
        const validation = VerifyAlbum({name, imageUrl, description, artistId, genreId, releaseDate:date, writerName, producerName, recordLabel})
        if(validation.error){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Album.createAlbum({name, description, artistId, genreId, releaseDate:date, writerName: writerName?? "", producerName: producerName??"", recordLabel: recordLabel??"", imageUrl: imageUrl ?? this.defaultPicture})
        return res.status(201).json({success: true, message: "Album created successfully"})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
    };
  
  
    update = async (req, res)=>{
      try {
        const {id, name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl} = req.body
        const date = new Date(releaseDate);
        if (isNaN(date)) throw new Error("Cannot convert date");
        const validation = VerifyAlbum({name, description,artistId, genreId, releaseDate: date, writerName, producerName, recordLabel})
        if(validation.error || !id){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Album.updateAlbum({id, name, description, artistId, genreId, releaseDate: date, writerName: writerName??"", producerName: producerName??"", recordLabel: recordLabel??"", imageUrl: imageUrl ?? this.defaultPicture})
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
          await Album.deleteAlbum(id)
          return res.status(200).json({success: true, message: "Album deleted successfully"})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };


}