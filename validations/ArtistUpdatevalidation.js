import { z } from "zod";


const Artist = z.object({
  id: z.string(),
  name : z.string().min(3).max(20),
  description: z.string().min(10).max(100).optional()
})




export function verifyUpdateArtist(artist) {
  return Artist.safeParse(artist)
}