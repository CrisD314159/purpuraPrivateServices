import e from "express";
import { verifyUpdateArtist } from "../validations/ArtistUpdatevalidation";
import { verifyArtist } from "../validations/ArtistValidation";
import Artist from "../Model/Artist";


export default class ArtistController
{

  create = async (req, res)=>{
    try {
      const {name, description, imageUrl} = req.body
    const validation = verifyArtist({name, description})
    if(validation.error){
      return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
    }
    const artist = await Artist.createArtist({name, description, imageUrl: imageUrl ?? ""})
    return res.status(201).json({success: true, artist})
    } catch (error) {
      return res.status(500).json({success: false, message: error.message})
    }
  };


  update = async (req, res)=>{
    try {
      const {id, name, description, imageUrl} = req.body
    const validation = verifyUpdateArtist({id, name, description})
    if(validation.error){
      return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
    }
    const artist = await Artist.updateArtist({id, name, description, imageUrl: imageUrl ?? ""})
    return res.status(201).json({success: true, artist})
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
        const artist = await Artist.deleteArtist(id)
        return res.status(200).json({success: true, artist})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
  };


}