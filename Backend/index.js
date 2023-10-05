import express from "express";
import dotenv from "dotenv";
import cors from 'cors'

import routesBases from "./routes/routes.js"

import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./SwaggerConfig.js";

const app = express();

app.use(cors());

dotenv.config();
const port = process.env.PORT46

app.use(express.json())

app.listen(port, ()=>{
    console.log(`Server online`);
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/parkease", routesBases)