import {signUp,logIn ,logOut,refresh} from "../controllers/authController/auth.controller.js";

import { Router } from "express";

const router = Router();

// signup
router.post("/signUp", signUp)

// login
router.post("/logIn", logIn)

// logout
router.delete("/logOut", logOut)

// refresh
router.post("/refresh", refresh)

export default router;