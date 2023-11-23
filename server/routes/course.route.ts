import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, getAllCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course_controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";


const courseRouter = express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRole("admin"), uploadCourse);
courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRole("admin"), editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/get-course-content/:id",isAuthenticated, getCourseByUser);
courseRouter.put("/add-question/",isAuthenticated, addQuestion);
courseRouter.put("/add-answer/",isAuthenticated, addAnswer);
courseRouter.put("/add-review/:id",isAuthenticated, addReview);
courseRouter.put("/add-reply/",isAuthenticated,authorizeRole("admin"), addReplyToReview);
courseRouter.get("/get-course", isAuthenticated, authorizeRole("admin"), getAllCourse)









export default courseRouter;