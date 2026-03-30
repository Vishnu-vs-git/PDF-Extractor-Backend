import express from "express"
import {upload} from "../middlewares/uploadMiddleware.js"
import { pdfController } from "../di/pdf.js";
import { AuthMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.post("/upload", AuthMiddleware.authenticate,  upload.single("file"), pdfController.upload);
router.post("/extract",AuthMiddleware.authenticate,pdfController.extractPages);
export default router;
