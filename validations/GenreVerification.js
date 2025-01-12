
import {z} from 'zod'

const Genre = z.object({
  name: z.string().min(2).max(20),
  description: z.string().min(3).max(300).optional(),
  color: z.string().min(3).max(10),
})




export function VerifyGenre(genre) {
  return Genre.safeParse(genre)
}