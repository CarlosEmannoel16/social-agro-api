import dotenv from "dotenv";
import { app } from "./express";
import { routes } from "./routes";

dotenv.config();

const port = Number(process.env.PORT || 3000);
routes(app);
app.listen(port, () => console.log(`Server runing in port ${port}`));
