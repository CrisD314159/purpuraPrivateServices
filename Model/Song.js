import Album from "./Album.js";
import Artist from "./Artist.js";


export default class Song
{
  static async createSong({name, albumId, lyrics, genres, imageUrl, audioUrl, duration, artists}){
    try {
      if(!Album.verifyAlbum(albumId)) throw new Error("Album does not exist")
      
      const id = crypto.randomUUID()
      const song = db.begin(async db =>{
        
        for (const genre of genres) {
          if(!Artist.verifyArtist(genre)) throw new Error("Genre does not exist")
          await db`INSERT INTO GenreSong (GenresId, SongsId) VALUES 
          (${genre}, ${id})`
        }

        for (const artist of artists) {
          if(!Artist.verifyArtist(artist)) throw new Error("Artist does not exist")
          await db`INSERT INTO ArtistSong (ArtistsId, SongsId) VALUES 
          (${artist}, ${id})`
        }
        await db`INSERT INTO SONGS (ID, NAME, ALBUMID, DURATION, LYRICS, PICTUREURL, AUDIOURL) VALUES 
        (${id}, ${name}, ${albumId}, ${duration}, ${lyrics}, ${imageUrl}, ${audioUrl})`
        return true
      })

      if(song) return song
      
    } catch (error) {
      throw error
      
    }
    
  }
  static async updateSong({name, albumId, lyrics, genres, imageUrl, audioUrl, duration, artists}){
    try {
      if(!Album.verifyAlbum(albumId)) throw new Error("Album does not exist")
      const song = db.begin(async db =>{
        for (const genre of genres) {
          if(!Artist.verifyArtist(genre)) throw new Error("Genre does not exist")
          await db`INSERT INTO GenreSong (GenresId, SongsId) VALUES 
          (${genre}, ${id})`
        }

        for (const artist of artists) {
          if(!Artist.verifyArtist(artist)) throw new Error("Artist does not exist")
          await db`INSERT INTO ArtistSong (ArtistsId, SongsId) VALUES 
          (${artist}, ${id})`
        }
        await db`UPDATE SONGS SET NAME = ${name}, ALBUMID = ${albumId}, DURATION = ${duration}, LYRICS = ${lyrics}, PICTUREURL = ${imageUrl}, AUDIOURL = ${audioUrl} WHERE ID = ${id}`
        return true
      })
      if(song) return song
    } catch (error) {
      throw error
      
    }

  }

  static async deleteGenreSong({genreId, songId}){
    try {
      if(!this.verifySong(songId)) throw new Error("Song does not exist")
      if(!Artist.verifyArtist(genreId)) throw new Error("Genre does not exist")
      const song = db.begin(async db =>{
        await db`DELETE FROM GenreSong WHERE GenresId = ${genreId} AND SongsId = ${songId}`
        return true
      })
      if(song) return song
    } catch (error) {
      throw error
    }
  }

  static async deleteArtistSong({artistId, songId}){
    try {
      if(!this.verifySong(songId)) throw new Error("Song does not exist")
      if(!Artist.verifyArtist(artistId)) throw new Error("Artist does not exist")
      const song = db.begin(async db =>{
        await db`DELETE FROM ArtistSong WHERE ArtistsId = ${artistId} AND SongsId = ${songId}`
        return true
      })
      if(song) return song
    } catch (error) {
      throw error
    }
  }

  static async deleteSong(id){
    try {
      if(!this.verifySong(id)) throw new Error("Song does not exist")
      const song = db.begin(async db =>{
        await db`DELETE FROM GenreSong WHERE SongsId = ${id}`
        await db`DELETE FROM ArtistSong WHERE SongsId = ${id}`
        await db`DELETE FROM SONGS WHERE ID = ${id}`
        return true
      })
      if(song) return song
    } catch (error) {
      throw error
    }

  }

}