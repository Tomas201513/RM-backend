import { Router } from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser,getMe } from "../controllers/userController/user.controller.js";
import auth from "../middleware/auth.middleware.js";
import roleCheck from "../middleware/roleCheck.middleware.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.get("/details", getMe )
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
