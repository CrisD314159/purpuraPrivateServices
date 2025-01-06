

export default class ImageUploadController
{
  upload = async (req, res) =>
  {
    try
    {
      const img = req.file.path
      const result = await ImageService.uploadImage(img)
      res.status(200).json({message:"Image uploaded", url:result})
    } catch (error)
    {
      res.status(500).json({message:"Image upload failed", error:error.message})
    }
  }
}