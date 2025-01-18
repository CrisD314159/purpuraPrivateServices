import {z} from 'zod'


const Album = z.object({
  name: z.string().min(3).max(20),
  description: z.string().min(3).max(300),
  imageUrl: z.string().url().default("https://res.cloudinary.com/dw43hgf5p/image/upload/v1735662671/y9fte0emwkkrkgqwlahj.jpg"),
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