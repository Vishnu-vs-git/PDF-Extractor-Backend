import express from "express";
import authRoutes from "../src/routes/authRoutes.js"
import { MongoDbConnect } from "./config/mongoDb.js";
import dotenv from "dotenv";
import { ErrorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";
dotenv.config()

const app = express();
MongoDbConnect.connect()
app.use("/api/auth",authRoutes)

const port = process.env.PORT||4002
app.use(ErrorHandlingMiddleware.handleError)
app.listen(port,() => {
  console.log("server is running")
})
