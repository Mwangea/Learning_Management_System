import express from "express";
import { editCourse, getSingleCourse, uploadCourse } from "../controllers/course_controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";


const courseRouter = express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRole("admin"), uploadCourse);
courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRole("admin"), editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);



export default courseRouter;