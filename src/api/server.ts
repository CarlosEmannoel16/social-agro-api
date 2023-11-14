import dotenv from 'dotenv'
import {app} from "./express";

dotenv.config()

const port = Number(process.env.PORT || 3000)
app.listen(port, ()=> console.log(`Server runing in port ${port}`))