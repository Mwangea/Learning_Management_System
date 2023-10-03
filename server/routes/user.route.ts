import express from "express";
import { activateUser, loginUser, logoutUser, registrationUser, updateAccessToken } from "../controllers/user_controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated, authorizeRole("admin"),  logoutUser);
userRouter.get("/refresh", updateAccessToken);



export default userRouter;