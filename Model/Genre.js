import { db } from "../DB/DBConnection.js"


export default class Genre{
  static async verifyGenre(id){
     try {
          const genre = await db`SELECT "Name" FROM "Genres" WHERE "Id" = ${id}`
          if(genre[0]) return true
          return false
        } catch (error) {
          throw error
        }

  }
  static async createGenre({ name, description, color }) {
    try {
        const id = crypto.randomUUID()

        const result = await db.begin(async (db) => {
            await db`INSERT INTO "Genres" ("Id", "Name", "Description", "Color") VALUES 
                (${id}, ${name}, ${description}, ${color})`;
            return true;
        });
        return result;

    } catch (error) {
        throw error; // Propaga el error para que el controlador lo maneje
    }
}
  static async updateGenre({id, name, description, color}){
    try {
      if(!await this.verifyGenre(id)) throw new Error("Genre does not exist")
      const genre = await db.begin(async db =>{
          await db`UPDATE "Genres" SET "Name" = ${name}, "Description" = ${description}, "Color" = ${color} WHERE "Id" = ${id}`
          return true
      })
      return genre
    } catch (error) {
      throw error
      
    }

  }
  static async deleteGenre(id){
    try {
      if(!await this.verifyGenre(id)) throw new Error("Genre does not exist")
      const genre = db.begin(async db =>{
        await db`DELETE FROM "Genres" WHERE "Id" = ${id}`
        return true
      })
      if(genre) return genre
    } catch (error) {
      throw error
    }

  }
}