import {z} from "zod"


const Song = z.object({
  name:z.string().min(2).max(25),
  lyrics:z.string().optional(),
  releaseDate: z.date(),
  duration: z.number().min(1).max(1000).optional(),
  writerName: z.string().min(3).max(80).optional(),
  producerName: z.string().min(3).max(80).optional(),
  recordLabel: z.string().min(3).max(80).optional(),
  audioUrl: z.string().url(),
  genres: z.array(z.string()),
  artists: z.array(z.string())
})



export function VerifySongSingle(song) {
  return Song.safeParse(song)
}