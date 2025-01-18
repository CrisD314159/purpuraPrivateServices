import SongService from "../services/SongService.js"


export default class SongUploadController
{
  upload = async (req, res) =>
  {
    try
    {
      const song = req.file.path
      const result = await SongService.uploadSong(song)
      res.status(200).json({success:true, message:"Image uploaded", url:result})
    } catch (error)
    {
      res.status(500).json({success:false, message:"Image upload failed"})
    }
  }
}