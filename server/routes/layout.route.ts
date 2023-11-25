import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { createLayout } from "../controllers/layout.controller";



const LayoutRouter = express.Router();

LayoutRouter.post("/create-layout", isAuthenticated, authorizeRole("admin"), createLayout);


export default LayoutRouter;