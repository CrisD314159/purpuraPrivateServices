import express from "express"
import "dotenv/config"
import cors from 'cors'
import Routes from "./Routes/Routes.js"
import helmet from "helmet"
import bcrypt from "bcrypt"
const app = express()


const port = process.env.PORT ?? 3030

app.use(express.json())


const whitelist = ['https://purpuramusic.vercel.app', 'http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors())
app.use(helmet())

app.use("/apiprivate", Routes())


app.listen(port, ()=>{
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
})
