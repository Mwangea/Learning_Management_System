import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { createLayout, editLayout } from "../controllers/layout.controller";



const LayoutRouter = express.Router();

LayoutRouter.post("/create-layout", isAuthenticated, authorizeRole("admin"), createLayout);
LayoutRouter.put("/edit-layout", isAuthenticated, authorizeRole("admin"), editLayout);



export default LayoutRouter;
