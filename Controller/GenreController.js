import Genre from "../Model/Genre.js";
import { VerifyGenre } from "../validations/GenreVerification.js";


export default class GenreController
{
  create = async (req, res)=>{
       try {
         const {name, description, color} = req.body
         const validation = VerifyGenre({name, description, color})
         if(validation.error){
           return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
         }
         await Genre.createGenre({name, description, color})
         return res.status(200).json({success: true, message: "Genre created successfully"})
       } catch (error) {
         return res.status(500).json({success: false, message: error.message})
       }
  };
   
   
     update = async (req, res)=>{
      try {
        const {id, name, description, color} = req.body
        const validation = VerifyGenre({name, description, color})
        if(validation.error || !id){
          return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
        }
        await Genre.updateGenre({id, name, description, color})
        return res.status(200).json({success: true, message: "Genre updated successfully"})
      } catch (error) {
        return res.status(500).json({success: false, message: error.message})
      }
   
     };
   
     delete = async (req, res)=>{
         try {
           const {id} = req.body
           if(!id){
             return res.status(400).json({success: false, message: "Invalid data, check your input and try again"})
           }
          await Genre.deleteGenre(id)
           return res.status(200).json({success: true, message: "Genre deleted successfully"})
         } catch (error) {
           return res.status(500).json({success: false, message: error.message})
         }
     };
 
}