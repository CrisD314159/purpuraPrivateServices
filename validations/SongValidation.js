import {z} from "zod"


const Song = z.object({
  name:z.string().min(2).max(25),
  albumId: z.string(),
  lyrics:z.string().optional(),
  duration: z.number(),
  genres: z.array(z.string()),
  artists: z.array(z.string()),
  audioUrl: z.string()
})



export function VerifySong(song) {
  return Song.safeParse(song)
}