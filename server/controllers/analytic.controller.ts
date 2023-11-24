import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/user_model";
import ErrorHandler from "../utils/Errorhandler";
import CourseModel from "../models/course.model";
import OrderModel from "../models/orderModel";




//user data analytics  --only admin can access
export const getUserAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
       try {
        const users = await generateLast12MonthsData(userModel);

        res.status(200).json({success:true, users,});
       } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
       }
});

//course data analytics  --only admin can access
export const getCoursesAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
     const courses = await generateLast12MonthsData(CourseModel);

     res.status(200).json({success:true, courses,});
    } catch (error: any) {
     return next(new ErrorHandler(error.message, 500));
    }
});

//order data analytics  --only admin can access
export const getOrderAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
     const orders = await generateLast12MonthsData(OrderModel);

     res.status(200).json({success:true, orders,});
    } catch (error: any) {
     return next(new ErrorHandler(error.message, 500));
    }
});