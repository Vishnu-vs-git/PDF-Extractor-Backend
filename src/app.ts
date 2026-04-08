import express from "express";
import authRoutes from "./routes/authRoutes.js";
import { MongoDbConnect } from "./config/mongoDb.js";
import pdfRoutes from "./routes/pdfRoutes.js"
import dotenv from "dotenv";
import { ErrorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware.js";
import cors from"cors";
import cookieParser from "cookie-parser"
dotenv.config()

const app = express();
MongoDbConnect.connect();
app.use(express.json());
const frontendUrl = process.env.FRONT_END_URL ?? ""
const corsOptions = {
  origin: frontendUrl,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/pdf",pdfRoutes);
const port = process.env.PORT||4002
app.use(ErrorHandlingMiddleware.handleError)
app.listen(port,() => {
  console.log("server is running")
})
