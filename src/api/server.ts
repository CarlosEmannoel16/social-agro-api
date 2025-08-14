import "reflect-metadata";
import dotenv from "dotenv";
import { app } from "./express";
import { routes } from "./routes";
import { ErrorMiddleware } from "./middlewares/ErrorMiddleware";
import { AnimalRepository } from "@/infra/repository/animal/AnimalRepository";
dotenv.config();

const port = Number(process.env.PORT || 3000);
const errorMiddleware = new ErrorMiddleware()
app.use((req, res, next) => {
  console.log(req.method,req.path);
  next()
});
routes(app);
app.use(()=>errorMiddleware)

app.listen(port, () => console.log(`Server runing in port ${port}`))
