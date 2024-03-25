import express from "express";
import officeController from "../controllers/officeController/office.controller.js";

const router = express.Router();

router.get("/", officeController.getAll);
router.get("/:id", officeController.getOne);
router.post("/", officeController.create);
router.put("/:id", officeController.update);
router.delete("/:id", officeController.deleteOne);

export default router;
