import { db } from "../DB/DBConnection.js";
import Artist from "./Artist.js";
import Genre from "./Genre.js";



export default class Album
{
  static async verifyAlbum(){
    try {
      const album = await db`SELECT NAME FROM ALBUMS WHERE ID = ${id}`
      if(!album[0])return false
      return true
    } catch (error) {
      throw error
    }
  }


  static async createAlbum({name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl}){
    try {
      if(!Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      if(!Genre.verifyGenre(genreId)) throw new Error("Artist does not exist")
        const id = crypto.randomUUID()
        const album = db.begin(async db =>{
          await db`INSERT INTO ALBUMS (ID, NAME, DESCRIPTION, ARTISTID, GENREID, RELEASEDATE, WRITERNAME, PRODUCERNAME, RECORDLABEL, PICTUREURL) VALUES 
          (${id}, ${name}, ${description}, ${artistId}, ${genreId}, ${releaseDate}, ${writerName}, ${producerName}, ${recordLabel}, ${imageUrl})`
          return true
        })

        if(album) return album

    } catch (error) {
      throw error
      
    }

  }

  static async updateAlbum({id, name, description, artistId, genreId, releaseDate, writerName, producerName, recordLabel, imageUrl}){
    try {
      if(!this.verifyAlbum(id)) throw new Error("Album does not exist")
      if(!Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      if(!Genre.verifyGenre(genreId)) throw new Error("Genre does not exist")
        const album = db.begin(async db =>{
          await db`UPDATE ALBUMS SET NAME = ${name}, DESCRIPTION = ${description}, ARTISTID = ${artistId}, GENREID = ${genreId}, RELEASEDATE = ${releaseDate}, WRITERNAME = ${writerName}, PRODUCERNAME = ${producerName}, RECORDLABEL = ${recordLabel}, PICTUREURL = ${imageUrl} WHERE ID = ${id}`
          return true
        })
        if(album) return album
    } catch (error) {
      throw error
      
    }
    
  }

  static async deleteAlbum(id){
    try {
      if(!this.verifyAlbum(id)) throw new Error("Album does not exist")
      const album = db.begin(async db =>{
        await db`DELETE FROM ALBUMS WHERE ID = ${id}`
        return true
      })
      if(album) return album
    } catch (error) {
      throw error
    }

  }


}