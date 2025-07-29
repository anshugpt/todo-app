import { app } from "./app.js";
import connectToDB from "../db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

connectToDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`Error : ${error}`);
    });

    app.listen(process.env.PORT || 5050, () => {
      console.log(`App connected to ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Mongo db connection failed : Error : ${error}`);
  });
