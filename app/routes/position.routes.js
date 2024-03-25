import express from "express";
import  positionController  from "../controllers/departmentController/positionController.js";

const router = express.Router();

router.get("/", positionController.getAll);
router.get("/:id", positionController.getOne);
router.post("/", positionController.create);
router.put("/:id", positionController.update);
router.delete("/:id", positionController.deleteOne);

export default router;

