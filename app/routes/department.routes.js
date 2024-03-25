import express from "express";
import departmentController from "../controllers/departmentController/department.controller.js";

const router = express.Router();

router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getOne);
router.post("/", departmentController.create);
router.put("/:id", departmentController.update);    
router.delete("/:id", departmentController.deleteOne);

export default router;
