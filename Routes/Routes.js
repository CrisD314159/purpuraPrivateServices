import { Router } from "express";
import ArtistController from "../Controller/ArtistController.js";
import AlbumController from "../Controller/AlbumController.js";
import SongController from "../Controller/SongController.js";
import multer from "multer";
import ImageUploadController from "../Controller/ImageUploadController.js";
import GenreController from "../Controller/GenreController.js";


export default function Routes ()
{
  const router = Router()
  const artistController = new ArtistController()
  const albumController = new AlbumController()
  const songController = new SongController()
  const genreController = new GenreController()
  const image = new ImageUploadController()
  const uploads = multer({dest:"uploads/"})



  router.post("/createArtist", artistController.create)
  router.put("/updateArtist", artistController.update)
  router.delete("/deleteArtist", artistController.delete)


  router.post("/createAlbum", albumController.create)
  router.put("/updateAlbum", albumController.update)
  router.delete("/deleteAlbum", albumController.delete)


  router.post("/createSong", songController.create)
  router.put("/updateSong", songController.update)
  router.delete("deleteSong", songController.delete)


  router.post("/createGenre", genreController.create)
  router.put("/updateGenre", genreController.update)
  router.delete("/deleteGenre", genreController.delete)

  router.post("/image/upload", uploads.single('image'), image.upload)


  return router

}

