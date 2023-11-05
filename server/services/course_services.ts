import { Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/CatchAsyncError";


//create course
export const createCourse = CatchAsyncError(async(data:))