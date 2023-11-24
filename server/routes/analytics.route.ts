import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import { getCoursesAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analytic.controller";
const analyticsRouter = express.Router();

analyticsRouter.get("/get-user-analytics", isAuthenticated, authorizeRole("admin"), getUserAnalytics);
analyticsRouter.get("/get-courses-analytics", isAuthenticated, authorizeRole("admin"), getCoursesAnalytics);
analyticsRouter.get("/get-orders-analytics", isAuthenticated, authorizeRole("admin"), getOrderAnalytics);




export default analyticsRouter;