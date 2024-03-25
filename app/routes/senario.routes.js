import express from "express";
import senarioController from "../controllers/senarioController/senario.controller.js"
const router = express.Router();    

router.get("/", senarioController.getAll);
router.get("/:id", senarioController.getOne);
router.post("/", senarioController.create);
router.put("/:id", senarioController.update);
router.delete("/:id", senarioController.deleteOne);

export default router;