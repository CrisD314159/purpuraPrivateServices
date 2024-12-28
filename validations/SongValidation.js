import {z} from "zod"


const Song = z.object({
  name:z.string().min(2).max(25),
  albumId: z.string(),
  lyrics:z.string().optional(),
})



export function ValidateSongs(song) {
  return Song.safeParse(song)
}