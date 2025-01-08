import { Router } from "express";
import ArtistController from "../Controller/ArtistController.js";
import AlbumController from "../Controller/AlbumController.js";
import SongController from "../Controller/SongController.js";
import multer from "multer";
import ImageUploadController from "../Controller/ImageUploadController.js";
import GenreController from "../Controller/GenreController.js";
import LoginController from "../Controller/loginController.js";
import { CheckAuth } from "../middleware/AuthMiddleware.js";


export default function Routes ()
{
  const router = Router()
  const artistController = new ArtistController()
  const albumController = new AlbumController()
  const songController = new SongController()
  const genreController = new GenreController()
  const loginController = new LoginController()
  const image = new ImageUploadController()
  const uploads = multer({dest:"uploads/"})



  router.post("/createArtist",CheckAuth, artistController.create)
  router.put("/updateArtist",CheckAuth, artistController.update)
  router.delete("/deleteArtist", CheckAuth, artistController.delete)


  router.post("/createAlbum", albumController.create)
  router.put("/updateAlbum", albumController.update)
  router.delete("/deleteAlbum", albumController.delete)


  router.post("/createSongSingle", songController.createSingle)
  router.post("/addSongToAlbum", songController.addToAlbum)
  router.put("/updateSong", songController.update)
  router.delete("/deleteSong", songController.deleteSingle)
  router.delete("/removeSongFromAlbum", songController.removeFromAlbum)
  router.put("/removeGenreFromSong", songController.removeGenreFromSong)
  router.put("/removeArtistFromSong", songController.removeArtistFromSong)


  router.post("/createGenre", genreController.create)
  router.put("/updateGenre", genreController.update)
  router.delete("/deleteGenre", genreController.delete)

  router.post("/image/upload", uploads.single('image'), image.upload)


  router.post("/login/admin", loginController.login)
  router.post("/logout/admin", loginController.logout)
  router.put("/refresh/admin", loginController.refreshToken)
  router.put("/login/checkToken", loginController.checkAuth)


  return router

}

