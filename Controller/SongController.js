import Song from "../Model/Song.js";
import { VerifySong } from "../validations/SongValidation.js";


export default class SongController
{

create = async (req, res)=>{
      try {
        const {name, albumId, lyrics, genres, imageUrl, audioUrl, duration, artists} = req.body
        const validation = VerifySong({name, albumId, lyrics})
        if(validation.error || !genres || !imageUrl || !audioUrl || !artists){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        const song = await Song.createSong({name, albumId, lyrics, genres, imageUrl, audioUrl, duration, artists})
        return res.status(201).json({success: true, song})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
    };
  
  
    update = async (req, res)=>{
      try {
        const {name, duration, albumId, lyrics, genres, imageUrl, audioUrl, artists} = req.body
        const validation = VerifySong({name, albumId, lyrics})
        if(validation.error || !genres || !imageUrl || !audioUrl || !artists || !duration){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        const song = await Song.updateSong({name, albumId, lyrics, genres, imageUrl, audioUrl, duration, artists})
        return res.status(201).json({success: true, song})
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
          const song = await Song.deleteSong(id)
          return res.status(200).json({success: true, song})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };


  

}