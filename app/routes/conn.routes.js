import express from "express";
import connController from "../controllers/connController/conn.controller.js";

const router = express.Router();

router.get("/", connController.getAll);
router.get("/:id", connController.getOne);
router.post("/", connController.create);
router.put("/:id", connController.update);
router.delete("/:id", connController.deleteOne);

export default router;

