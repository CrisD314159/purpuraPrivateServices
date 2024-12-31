import 'dotenv/config'
import postgres from 'postgres'

export const db = postgres(
  {
    host:process.env.DB_HOST,
    port:5432,
    username: process.env.USERNAME,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    ssl:'require'
  }
)