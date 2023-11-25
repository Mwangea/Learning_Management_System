import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";




// create layout
export const createLayout = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {type} = req.body;
        if(type === "Banner"){
            const {image,title,subTitle} = req.body;
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "Layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle
            }
            await LayoutModel.create(banner);
        }
        if(type === "FAQ"){
            const {faq} = req.body;
            const faqItems = await Promise.all(
                faq.map(async(item:any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    };
                })
            );
            await LayoutModel.create({type:"FAQ", faq: faqItems});
        }
        if(type === "Categories"){
            const {categories} = req.body;
            await LayoutModel.create(categories);
        }

        res.status(200).json({success:true, message: "layout created successfully"});
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})