import express from "express";
import { UpdateUserInfo, activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword } from "../controllers/user_controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated,  logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated,getUserInfo);
userRouter.post('/social-auth', socialAuth);
userRouter.put('/update', isAuthenticated, UpdateUserInfo);
userRouter.put('/update-password', isAuthenticated, updatePassword);





export default userRouter;