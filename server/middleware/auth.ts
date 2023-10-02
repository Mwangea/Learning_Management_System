import { Request,Response, NextFunction} from "express";
import { CatchAsyncError } from "./CatchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

// authenticated user 
export const isAuthenticated = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if(!access_token) {
        return next(new ErrorHandler("Please login to access this resource", 400));
    }

    const decoded = jwt.verify(access_token,process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!decoded) {
        return next(new ErrorHandler("access token is not valid", 400));
    }

    const user = await redis.get(decoded.id);

    if(!user){
        return next(new ErrorHandler("user doe's not exist", 400));
    }

    req.user = JSON.parse(user);

    next();
});