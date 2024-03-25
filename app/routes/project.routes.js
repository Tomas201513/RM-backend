import express from "express";
import projectController from "../controllers/financeController/project.controller.js";

const router = express.Router();

router.get("/", projectController.getAll);
router.get("/:id", projectController.getOne);
router.post("/", projectController.create);
router.put("/:id", projectController.update);
router.delete("/:id", projectController.deleteOne);

export default router;
