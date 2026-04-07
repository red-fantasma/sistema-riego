import express from "express";
import { createBackup } from "../controllers/backupController.js";

const router = express.Router();

router.post("/", createBackup);

export default router;