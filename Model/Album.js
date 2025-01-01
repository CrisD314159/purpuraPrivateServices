import { db } from "../DB/DBConnection.js";
import Artist from "./Artist.js";
import Genre from "./Genre.js";



export default class Album
{


  static async verifyAlbum(id){
    try {
      const album = await db`SELECT "Name" FROM "Albums" WHERE "Id" = ${id}`
      if(!album[0])return false
      return true
    } catch (error) {
      throw error
    }
  }

  static async verifyAlbumByName(name){
    try {
      const album = await db`SELECT "Name" FROM "Albums" WHERE "Name" = ${name}`
      if(album[0])return true
      return false
    } catch (error) {
      throw error
    }
  }



  static async createAlbum({name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl}){
    try {
      if(await this.verifyAlbumByName(name)) throw new Error("Album already exists")
      if(!await Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      if(!await Genre.verifyGenre(genreId)) throw new Error("Artist does not exist")
        const id = crypto.randomUUID()
        const album = db.begin(async db =>{
          await db`INSERT INTO "Albums" ("Id", "Name", "Description", "ArtistId", "GenreId", "ReleaseDate", "WriterName", "ProducerName", "RecordLabel", "PictureUrl") VALUES 
          (${id}, ${name}, ${description}, ${artistId}, ${genreId}, ${releaseDate}, ${writerName}, ${producerName}, ${recordLabel}, ${imageUrl})`
          return true
        })
        if(album) return album

    } catch (error) {
      throw error
      
    }

  }
  static async createAlbumSingle({name, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl}){
    try {
      if(await this.verifyAlbumByName(name)) throw new Error("Album already exists")
      if(!await Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      if(!await Genre.verifyGenre(genreId)) throw new Error("Artist does not exist")
        const id = crypto.randomUUID()
        const album = db.begin(async db =>{
          await db`INSERT INTO "Albums" ("Id", "Name", "Description", "ArtistId", "GenreId", "ReleaseDate", "WriterName", "ProducerName", "RecordLabel", "PictureUrl") VALUES 
          (${id}, ${name}, ${""}, ${artistId}, ${genreId}, ${releaseDate}, ${writerName}, ${producerName}, ${recordLabel}, ${imageUrl})`
          return true
        })
        if(album) return id

    } catch (error) {
      throw error
      
    }

  }

  static async updateAlbum({id, name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl}){
    try {
      if(!await this.verifyAlbum(id)) throw new Error("Album does not exist")
      if(!await Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      if(!await Genre.verifyGenre(genreId)) throw new Error("Genre does not exist")
        const album = db.begin(async db =>{
          await db`UPDATE "Albums" SET "Name" = ${name}, "Description" = ${description}, "ArtistId" = ${artistId}, "GenreId" = ${genreId}, "ReleaseDate" = ${releaseDate}, "WriterName" = ${writerName}, "ProducerName" = ${producerName}, "RecordLabel" = ${recordLabel}, "PictureUrl" = ${imageUrl} WHERE "Id" = ${id}`
          return true
        })
        if(album) return album
    } catch (error) {
      throw error
      
    }
    
  }

  static async deleteAlbum(id){
    try {
      if(!await this.verifyAlbum(id)) throw new Error("Album does not exist")
      const album = db.begin(async db =>{
        await db`DELETE FROM "Songs" WHERE "AlbumId" = ${id}`
        await db`DELETE FROM "Albums" WHERE "Id" = ${id}`
        return true
      })
      if(album) return album
    } catch (error) {
      throw error
    }

  }


}