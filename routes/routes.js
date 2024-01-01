import express from "express";
import { contacto, getData } from "../controller/controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Lista los usuarios
 *     description: Lista los usuarios de mongo (falta conectar a mongo xd)
 *     tags:
 *         - Inicio
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get("/", getData);


router.post("/contacto", contacto);

export default router;