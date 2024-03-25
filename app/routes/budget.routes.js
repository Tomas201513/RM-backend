import express from "express";
import budgetController from "../controllers/financeController/budget.controller.js";

const router = express.Router();

router.get("/", budgetController.getAll);
router.get("/:id", budgetController.getOne);
router.post("/", budgetController.create);
router.put("/:id", budgetController.update);
router.delete("/:id", budgetController.deleteOne);

export default router;

