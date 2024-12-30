

export default class Genre{
  static async verifyGenre(){
     try {
          const genre = await db`SELECT NAME FROM GENRES WHERE ID = ${id}`
          if(!genre[0])return false
          return true
        } catch (error) {
          throw
        }

  }

  static async createGenre({name, description, color}){
    try {
      const id = crypto.randomUUID()
      const genre = db.begin(async db =>{
        await db`INSERT INTO GENRES (ID, NAME, DESCRIPTION, COLOR) VALUES 
        (${id}, ${name}, ${description}, ${color})`
        return true
      })

      if(genre) return genre

    } catch (error) {
      throw error
      
    }
    
  }
  static async updateGenre({id, name, description, color}){
    try {
      if(!this.verifyGenre(id)) throw new Error("Genre does not exist")
        const genre = db.begin(async db =>{
          await db`UPDATE GENRES SET NAME = ${name}, DESCRIPTION = ${description}, COLOR = ${color} WHERE ID = ${id}`
          return true
        })
        if(genre) return genre
    } catch (error) {
      throw error
      
    }

  }
  static async deleteGenre(id){
    try {
      if(!this.verifyGenre(id)) throw new Error("Genre does not exist")
      const genre = db.begin(async db =>{
        await db`DELETE FROM GENRES WHERE ID = ${id}`
        return true
      })
      if(genre) return genre
    } catch (error) {
      throw error
    }

  }
}