import { db } from "../DB/DBConnection.js";


export default class Artist
{

  static async verifyArtist(id){
    try {
      const artist = await db`SELECT "Name" FROM "Artists" WHERE "Id" = ${id}`
      if(artist[0])return true
      return false
    } catch (error) {
      throw error
    }
  }

  static async createArtist({name, description, imageUrl}){
    try {
      const id = crypto.randomUUID()
      const artist = db.begin(async db =>{
        await db`INSERT INTO "Artists" ("Id", "Name", "Description", "PictureUrl") VALUES 
        (${id}, ${name}, ${description}, ${imageUrl})`
        return true
      })

      return artist

    } catch (error) {
      throw error
      
    }

  }
  static async updateArtist({id, name, description, imageUrl}){
    try {
      if(!await this.verifyArtist(id)) throw new Error("Artist does not exist")
        const artist = db.begin(async db =>{
          await db`UPDATE "Artists" SET "Name" = ${name}, "Description" = ${description}, "PictureUrl" = ${imageUrl} WHERE "Id" = ${id}`
          return true
        })
        return artist
    } catch (error) {
      throw error
      
    }

  }
  static async deleteArtist(id){
    try {
      if(!await this.verifyArtist(id)) throw new Error("Artist does not exist")
      const artist = db.begin(async db =>{
        await db`DELETE FROM "Artists" WHERE "Id" = ${id}`
        return true
      })
      if(artist) return artist
    } catch (error) {
      throw error
    }

  }
}