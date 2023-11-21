import { Express } from "express";
import { userRouter } from "./UserRouter";
import { animalRouter } from "./AnimalRouter";

export const routes = (app: Express)=>{
    app.use(userRouter)
    app.use(animalRouter)
}