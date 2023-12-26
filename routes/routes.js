import express from "express";
import { contacto, getData } from "../controller/controller.js";

const router = express.Router();

router.get("/", getData);
router.post("/contacto", contacto);

export default router;