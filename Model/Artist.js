import { db } from "../DB/DBConnection";


export default class Artist
{

  static async verifyArtist(id){
    try {
      const artist = await db`SELECT NAME FROM ARTISTS WHERE ID = ${id}`
      if(!artist[0])return false
      return true
    } catch (error) {
      throw
    }
  }

  static async createArtist({name, description, imageUrl}){
    try {
      const id = crypto.randomUUID()
      const artist = db.begin(async db =>{
        await db`INSERT INTO ARTISTS (ID, NAME, DESCRIPTION, PICTUREURL) VALUES 
        (${id}, ${name}, ${description}, ${imageUrl})`
        return true
      })

      if(artist) return artist

    } catch (error) {
      throw error
      
    }

  }
  static async updateArtist({id, name, description, imageUrl}){
    try {
      if(!this.verifyArtist(id)) throw new Error("Artist does not exist")
        const artist = db.begin(async db =>{
          await db`UPDATE ARTISTS SET NAME = ${name}, DESCRIPTION = ${description}, PICTUREURL = ${imageUrl} WHERE ID = ${id}`
          return true
        })
        if(artist) return artist
    } catch (error) {
      throw error
      
    }

  }
  static async deleteArtist(id){
    try {
      if(!this.verifyArtist(id)) throw new Error("Artist does not exist")
      const artist = db.begin(async db =>{
        await db`DELETE FROM ARTISTS WHERE ID = ${id}`
        return true
      })
      if(artist) return artist
    } catch (error) {
      throw error
    }

  }
}