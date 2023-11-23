import express from "express";
import { UpdateProfile, UpdateUserInfo, activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateUserRole } from "../controllers/user_controller";
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
userRouter.put('/update-avatar', isAuthenticated, UpdateProfile);
userRouter.get('/get-users', isAuthenticated, authorizeRole("admin"), getAllUsers);
userRouter.put('/update-user', isAuthenticated, authorizeRole("admin"), updateUserRole);
userRouter.delete('/delete-user/:id', isAuthenticated, authorizeRole("admin"), deleteUser);









export default userRouter;