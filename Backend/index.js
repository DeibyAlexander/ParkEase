import express from "express";
import dotenv from "dotenv";

import routesBases from "./routes/routes.js"

const app = express();

dotenv.config();
const port = process.env.PORT46

app.use(express.json())

app.listen(port, ()=>{
    console.log(`Server online`);
})

app.use("/parkease", routesBases)