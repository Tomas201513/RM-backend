import express from "express";
import itController from "../controllers/itController/it.controller.js";

const router = express.Router();

router.get("/", itController.getAll);
router.get("/:id", itController.getOne);
router.post("/", itController.create);
router.put("/:id", itController.update);
router.delete("/:id", itController.deleteOne);

export default router;

