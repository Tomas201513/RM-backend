import express from "express";
import countryController from "../controllers/countryController/country.controller.js";

const router = express.Router();

router.get("/", countryController.getAll);
router.get("/:id", countryController.getOne);
router.post("/", countryController.create);
router.put("/:id", countryController.update);
router.delete("/:id", countryController.deleteOne);

export default router;

