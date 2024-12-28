import {z} from 'zod'


const Album = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(100).optional(),
  artistId: z.string(),
  genreId: z.string(),
  releaseDate: z.date(),
  writerName: z.string().min(3).max(20).optional(),
  producerName: z.string().min(3).max(20).optional(),
  recordLabel: z.string().min(3).max(20).optional(),
})



export function VerifyAlbum(album) {
  return Album.safeParse(album)
  
}