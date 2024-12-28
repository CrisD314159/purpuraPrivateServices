import { z } from "zod";


const Artist = z.object({
  name : z.string().min(3).max(20),
  description: z.string().min(10).max(100).optional()
})




export function verifyArtist(artist) {
  return Artist.safeParse(artist)
}