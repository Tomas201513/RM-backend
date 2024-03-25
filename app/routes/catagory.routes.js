import express from "express";
import categoryController from "../controllers/catagoryController/catagory.controller.js";
const router = express.Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.post("/", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.deleteOne);

export default router;