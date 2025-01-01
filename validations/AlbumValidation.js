import {z} from 'zod'


const Album = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(300).optional(),
  artistId: z.string(),
  genreId: z.string(),
  releaseDate: z.date(),
  writerName: z.string().min(3).max(80).optional(),
  producerName: z.string().min(3).max(80).optional(),
  recordLabel: z.string().min(3).max(80).optional(),
})



export function VerifyAlbum(album) {
  return Album.safeParse(album)
  
}