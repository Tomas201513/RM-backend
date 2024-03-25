import express from "express";
import subCatagoryController from "../controllers/catagoryController/subcatagory.controller.js";

const router = express.Router();

router.get("/", subCatagoryController.getAll);
router.get("/some", subCatagoryController.getSome);
router.get("/:id", subCatagoryController.getOne);
router.post("/", subCatagoryController.create);
router.put("/:id", subCatagoryController.update);
router.delete("/:id", subCatagoryController.deleteOne);

export default router;
