import express from "express";
import { activateUser, registrationUser } from "../controllers/user_controller";

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate', activateUser);


export default userRouter;