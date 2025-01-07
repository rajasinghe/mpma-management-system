import express from "express";
import { fileURLToPath } from "url";
import errorHandler from "./middleware/error.js";
import logger from "./middleware/logger.js";
import cors from "cors";
import path from "path";
import { backupCronJob } from "./Jobs/mysqldump.js";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
import Test from "./routes/Test.js";
import Notfound from "./middleware/notfound.js";
const app = express();
const port = process.env.PORT;

backupCronJob.start(); //back up the database

app.use(cors());
//process the json to js objects
app.use(express.json());
//the middleware converts form data into json formats
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use(logger); //logger for show route information

//decalare routes here
app.use("/api/test", Test);

//unknown error handler(route not found)
app.use(Notfound);

//error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on " + port);
});
