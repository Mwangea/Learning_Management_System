import  cloudinary  from 'cloudinary';
import { NextFunction,Request,Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/Errorhandler";


//upload course
export const uploadCourse = CatchAsyncError(async (req:Request,res:Response,next:NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;

        if(thumbnail){
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "course"
            });

            data.thumbnail = {
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});