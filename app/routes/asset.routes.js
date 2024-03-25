import express from "express";
import assetController from "../controllers/assetController/asset.controller.js";
const router = express.Router();    

router.get("/", assetController.getAll);
router.get("/:id", assetController.getOne);
router.get("/slm", assetController.getSinceLastMonth);
router.post("/", assetController.create);
router.put("/:id", assetController.update);
router.delete("/:id", assetController.deleteOne);

export default router;