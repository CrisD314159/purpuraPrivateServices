import { Router } from "express";
import ArtistController from "../Controller/ArtistController.js";
import AlbumController from "../Controller/AlbumController.js";
import SongController from "../Controller/SongController.js";
import multer from "multer";
import ImageUploadController from "../Controller/ImageUploadController.js";
import GenreController from "../Controller/GenreController.js";
import LoginController from "../Controller/LoginController.js";
import { CheckAuth } from "../middleware/AuthMiddleware.js";
import SongUploadController from "../Controller/SongUploadController.js";


export default function Routes ()
{
  const router = Router()
  const artistController = new ArtistController()
  const albumController = new AlbumController()
  const songController = new SongController()
  const genreController = new GenreController()
  const loginController = new LoginController()
  const image = new ImageUploadController()
  const song = new SongUploadController()
  const uploads = multer({dest:"uploads/"})



  router.post("/createArtist",CheckAuth, artistController.create)
  router.put("/updateArtist",CheckAuth, artistController.update)
  router.delete("/deleteArtist", CheckAuth, artistController.delete)
  router.get("/getMinimalArtists/artist", artistController.getMinimal)


  router.post("/createAlbum", CheckAuth, albumController.create)
  router.put("/updateAlbum",CheckAuth, albumController.update)
  router.delete("/deleteAlbum",CheckAuth, albumController.delete)


  router.post("/createSongSingle",CheckAuth, songController.createSingle)
  router.post("/addSongToAlbum",CheckAuth, songController.addToAlbum)
  router.put("/updateSong", CheckAuth, songController.update)
  router.delete("/deleteSong",CheckAuth, songController.deleteSingle)
  router.delete("/removeSongFromAlbum",CheckAuth, songController.removeFromAlbum)
  router.put("/removeGenreFromSong",CheckAuth, songController.removeGenreFromSong)
  router.put("/removeArtistFromSong",CheckAuth, songController.removeArtistFromSong)


  router.post("/createGenre",CheckAuth, genreController.create)
  router.put("/updateGenre",CheckAuth, genreController.update)
  router.delete("/deleteGenre",CheckAuth, genreController.delete)
  router.get("/getMinGenres",CheckAuth, genreController.getMin)

  router.post("/image/upload",CheckAuth, uploads.single('image'), image.upload)
  router.post("/song/upload",CheckAuth, uploads.single('song'), song.upload)


  router.post("/login/admin", loginController.login)
  router.post("/logout/admin", loginController.logout)
  router.put("/refresh/admin", loginController.refreshToken)
  router.put("/login/checkToken", loginController.checkAuth)


  return router

}

