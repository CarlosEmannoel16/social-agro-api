import { Express } from "express";
import { userRouter } from "./UserRouter";

export const routes = (app: Express)=>{
    app.use(userRouter)
}