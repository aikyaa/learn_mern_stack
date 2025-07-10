import express from "express";
import { createUser, checkCredentials } from "../controller/users.controller.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login",checkCredentials);

export default router;