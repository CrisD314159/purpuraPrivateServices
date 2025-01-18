import Album from "./Album.js";
import Artist from "./Artist.js";
import Genre from "./Genre.js";
import { db } from "../DB/DBConnection.js";


export default class Song
{



  defaultPicture = "https://res.cloudinary.com/dw43hgf5p/image/upload/v1735662671/y9fte0emwkkrkgqwlahj.jpg"


  static async verifySong(id){
    try {
      const song = await db`SELECT "Name" FROM "Songs" WHERE "Id" = ${id}`
      if(!song[0])return false
      return true
    } catch (error) {
      throw error
    }
  }

  static async verifySongAlbum(name, albumId){
    try {
      const song = await db`SELECT "Name" FROM "Songs" WHERE "Name" = ${name} AND "AlbumId" =${albumId}`
      if(song[0])return true
      return false
    } catch (error) {
      throw error
    }
  }

  static async createSongSingle({name, lyrics, genres, imageUrl, audioUrl, duration, artists, producerName, writerName, recordLabel, releaseDate}){
    try {
      const songId = crypto.randomUUID()
      const albumId = crypto.randomUUID()
      const song = db.begin(async db =>{

        try {
        if(await Album.verifyAlbumByName(name)) throw new Error("Album already exists")
        //const album_id = await Album.createAlbumSingle({name, artistId: artists[0], genreId: genres[0], releaseDate, writerName: writerName??"", producerName: producerName??"", recordLabel: recordLabel??"", imageUrl: imageUrl ?? this.defaultPicture})
        await db`INSERT INTO "Albums" ("Id", "Name", "Description", "ArtistId", "GenreId", "ReleaseDate", "WriterName", "ProducerName", "RecordLabel", "PictureUrl", "AlbumType") VALUES 
          (${albumId}, ${name}, ${""}, ${artists[0]}, ${genres[0]}, ${releaseDate}, ${writerName}, ${producerName}, ${recordLabel}, ${imageUrl}, ${1})`   

        await db`INSERT INTO "Songs" ("Id", "Name", "AlbumId", "Duration", "Lyrics", "ImageUrl", "AudioUrl") VALUES 
        (${songId}, ${name}, ${albumId}, ${duration}, ${lyrics}, ${imageUrl}, ${audioUrl})`
        
        for (const genre of genres) {
          if(!Genre.verifyGenre(genre)) throw new Error("Genre does not exist")
          await db`INSERT INTO "GenreSong" ("GenresId", "SongsId") VALUES 
          (${genre}, ${songId})`
        }

        for (const artist of artists) {
          if(!Artist.verifyArtist(artist)) throw new Error("Artist does not exist")
          await db`INSERT INTO "ArtistSong" ("ArtistsId", "SongsId") VALUES 
          (${artist}, ${songId})`
        }
          
        } catch (error) {
          throw error
          
        }
        return true
      })

     return song
      
    } catch (error) {
      throw error
      
    }
    
  }

  static async AddSongToAlbum({name, albumId, lyrics, genres, audioUrl, duration, artists}){
    try {
      if(!await Album.verifyAlbum(albumId)) throw new Error("Album does not exist")
      if(await this.verifySongAlbum(name, albumId)) throw new Error("Song already exists in album")
      
      
      const albumImage = await db`SELECT "PictureUrl" FROM "Albums" WHERE "Id" = ${albumId}`
      
      const id = crypto.randomUUID()
      const song = db.begin(async db =>{

        await db`INSERT INTO "Songs" ("Id", "Name", "AlbumId", "Duration", "Lyrics", "ImageUrl", "AudioUrl") VALUES 
        (${id}, ${name}, ${albumId}, ${duration}, ${lyrics}, ${albumImage[0].PictureUrl}, ${audioUrl})`

        for (const genre of genres) {
          if(!Genre.verifyGenre(genre)) throw new Error("Genre does not exist")
          await db`INSERT INTO "GenreSong" ("GenresId", "SongsId") VALUES 
          (${genre}, ${id})`
        }

        for (const artist of artists) {
          if(!Artist.verifyArtist(artist)) throw new Error("Artist does not exist")
          await db`INSERT INTO "ArtistSong" ("ArtistsId", "SongsId") VALUES 
          (${artist}, ${id})`
        }
        
        return true
      })

     return song
      
    } catch (error) {
      throw error
      
    }

  }


  static async updateSong({id, name, lyrics, genres, imageUrl, audioUrl, duration, artists}){
    try {
      if(!await this.verifySong(id)) throw new Error("Song does not exist")
      const song = db.begin(async db =>{
        await db`UPDATE "Songs" SET "Name" = ${name}, "Duration" = ${duration}, "Lyrics" = ${lyrics}, "ImageUrl" = ${imageUrl}, "AudioUrl" = ${audioUrl} WHERE "Id" = ${id}`

        for (const genre of genres) {
          if(!Genre.verifyGenre(genre)) throw new Error("Genre does not exist")
          await db`INSERT INTO "GenreSong" ("GenresId", "SongsId") VALUES 
          (${genre}, ${id})`
        }

        for (const artist of artists) {
          if(!Artist.verifyArtist(artist)) throw new Error("Artist does not exist")
          await db`INSERT INTO "ArtistSong" ("ArtistsId", "SongsId") VALUES 
          (${artist}, ${id})`
        }
        
        return true
      })
      return song
    } catch (error) {
      throw error
      
    }

  }

  static async deleteGenreSong({genreId, songId}){
    try {
      if(!this.verifySong(songId)) throw new Error("Song does not exist")
      if(!Genre.verifyGenre(genreId)) throw new Error("Genre does not exist")
      const song = db.begin(async db =>{
        await db`DELETE FROM "GenreSong" WHERE "GenresId" = ${genreId} AND "SongsId" = ${songId}`
        return true
      })
      return song
    } catch (error) {
      throw error
    }
  }

  static async deleteArtistSong({artistId, songId}){
    try {
      if(!this.verifySong(songId)) throw new Error("Song does not exist")
      if(!Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      const song = db.begin(async db =>{
        await db`DELETE FROM "ArtistSong" WHERE "ArtistsId" = ${artistId} AND "SongsId" = ${songId}`
        return true
      })
      return song
    } catch (error) {
      throw error
    }
  }

  static async deleteSingle(id){
    try {
      if(!await this.verifySong(id)) throw new Error("Song does not exist")
      const song = db.begin(async db =>{
        const albumId = await db`SELECT "AlbumId" FROM "Songs" WHERE "Id" = ${id}`
        await db`DELETE FROM "GenreSong" WHERE "SongsId" = ${id}`
        await db`DELETE FROM "ArtistSong" WHERE "SongsId" = ${id}`
        await db`DELETE FROM "Songs" WHERE "Id" = ${id}`
        await db`DELETE FROM "Albums" WHERE "Id" = ${albumId[0].AlbumId}`
        return true
      })
      if(song) return song
    } catch (error) {
      throw error
    }

  }
  static async removeFromAlbum(id){
    try {
      if(!await this.verifySong(id)) throw new Error("Song does not exist")
      const song = db.begin(async db =>{
        await db`DELETE FROM "GenreSong" WHERE "SongsId" = ${id}`
        await db`DELETE FROM "ArtistSong" WHERE "SongsId" = ${id}`
        await db`DELETE FROM "Songs" WHERE "Id" = ${id}`
        return true
      })
      if(song) return song
    } catch (error) {
      throw error
    }

  }

}