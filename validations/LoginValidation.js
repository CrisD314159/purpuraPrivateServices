import {z} from 'zod';

const Login = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export function VerifyLogin(login) {
  return Login.safeParse(login);
}