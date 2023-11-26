import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/Errorhandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";




// create layout
export const createLayout = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    try {
        const {type} = req.body;
        //console.log(type)
        const isTypeExist = await LayoutModel.findOne({ type });
        if(isTypeExist){
            return next(new ErrorHandler(`${type} already exist`, 400));
        }
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
            const categoriesItems = await Promise.all(
                categories.map(async(item:any) => {
                    return {
                        title: item.title
                    };
                })
            );
            await LayoutModel.create({type: "Categories", categories: categoriesItems});
        }

        res.status(200).json({success:true, message: "layout created successfully"});
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
});


//edit layout faq and categories
export const editLayout = CatchAsyncError(async(res:Response, req:Request, next:NextFunction) => {
    try {
        const { type } = req.body;
        //console.log(ty);
        if(type === "Banner"){
            const BannerData:any = await LayoutModel.findOne({ type:"Banner"});
            const {image,title,subTitle} = req.body;
            if(BannerData){
            await cloudinary.v2.uploader.destroy(req.body.public_id);
            }
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            })     
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle
            }
            await LayoutModel.findByIdAndUpdate(BannerData._id,{banner});
        }
        if(type === "FAQ"){
            const {faq} = req.body;
            const FaqItem = await LayoutModel.findOne({ type: "FAQ" });
            const faqItems = await Promise.all(
                faq.map(async(item:any) => {
                    return {
                        question: item.question,
                        answer: item.answer
                    };
                })
            );
            await LayoutModel.findByIdAndUpdate(FaqItem?._id,{type:"FAQ", faq: faqItems});
        }
        if(type === "Categories"){
            const {categories} = req.body;
            const CategoriesData = await LayoutModel.findOne({type: "Categories"});
            const categoriesItems = await Promise.all(
                categories.map(async(item:any) => {
                    return {
                        title: item.title
                    };
                })
            );
            await LayoutModel.findByIdAndUpdate(CategoriesData?._id,{type: "Categories", categories: categoriesItems});
        }

        res.status(200).json({success:true, message: "layout updated successfully"});
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500))
    }
})