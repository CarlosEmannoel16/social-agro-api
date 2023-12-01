import dotenv from "dotenv";
import { app } from "./express";
import { routes } from "./routes";
import os from "os";
dotenv.config();
const networkInfo = os.networkInterfaces();
const port = Number(process.env.PORT || 3000);
routes(app);
app.listen(port, () => console.log(`Server runing in port ${port}`));
