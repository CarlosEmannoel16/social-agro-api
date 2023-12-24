import express, {Express} from "express";
import cors from "cors";

export const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(__dirname +'/../uploads'))





