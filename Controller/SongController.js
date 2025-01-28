import Song from "../Model/Song.js";
import { VerifySong } from "../validations/SongValidation.js";
import { VerifySongSingle } from "../validations/VerifySingle.js";


export default class SongController
{
  defaultImage = "https://res.cloudinary.com/dw43hgf5p/image/upload/v1735748260/uh7bimgulcqxvdpu91t8.jpg"

createSingle = async (req, res)=>{
      try {
        const {name, lyrics, genres, imageUrl, audioUrl, duration, artists, producerName, writerName, recordLabel, releaseDate} = req.body
        const date = new Date(releaseDate);
        const durationDouble = parseFloat(duration)
        const validation = VerifySongSingle({name, genres, artists, lyrics, audioUrl, releaseDate:date, duration:durationDouble, writerName, producerName, recordLabel})
        if(validation.error){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Song.createSongSingle({name, lyrics, genres, imageUrl: imageUrl ?? this.defaultImage, audioUrl, duration, artists, producerName, writerName, recordLabel, releaseDate: date})
        return res.status(201).json({success: true, message: "Song created successfully"})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
    };

addToAlbum = async (req, res)=>{
      try {
        const {name, albumId, lyrics, genres, audioUrl, duration, artists} = req.body
        const durationDouble = parseFloat(duration)
        const validation = VerifySong({name, albumId, lyrics, duration: durationDouble, genres, artists, audioUrl})
        if(validation.error){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Song.AddSongToAlbum({name, albumId, lyrics, genres, audioUrl, duration:durationDouble, artists})
        return res.status(201).json({success: true, message: "Song added to album successfully"})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
    };
  
  
    update = async (req, res)=>{
      try {
        const {id, name, duration, lyrics, genres, imageUrl, audioUrl, producerName, writerName, recordLabel, releaseDate, albumId} = req.body
        const durationDouble = parseFloat(duration)
        const validation = VerifySong({name, albumId:"", lyrics, duration: durationDouble, genres, audioUrl })
        if(validation.error || !id){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Song.updateSong({id, name, lyrics, genres, imageUrl : imageUrl ?? this.defaultImage, audioUrl, duration ,producerName, writerName, recordLabel, albumId, releaseDate })
        return res.status(201).json({success: true, message: "Song updated successfully"})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
  
    };
  
    deleteSingle = async (req,res)=>{
        try {
          const {id} = req.body
          if(!id){
            return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
          }
          await Song.deleteSingle(id)
          return res.status(200).json({success: true, message: "Song deleted successfully"})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };
  
    removeFromAlbum = async (req,res)=>{
        try {
          const {id} = req.body
          if(!id){
            return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
          }
          await Song.removeFromAlbum(id)
          return res.status(200).json({success: true, message: "Song deleted successfully"})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };
    removeGenreFromSong = async (req,res)=>{
        try {
          const {id, genreId} = req.body
          if(!id || !genreId){
            return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
          }
          await Song.deleteGenreSong({genreId, songId:id})
          return res.status(200).json({success: true, message: "Genre removed successfully"})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };
    removeArtistFromSong = async (req,res)=>{
        try {
          const {id, artistId} = req.body
          if(!id || !artistId){
            return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
          }
          await Song.deleteArtistSong({artistId, songId:id})
          return res.status(200).json({success: true, message: "Artist removed successfully"})
        } catch (error) {
          return res.status(500).json({success: false, message: error.message})
        }
    };


  

}