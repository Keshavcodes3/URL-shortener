import mongoose from "mongoose";
import urlModel from "../Models/url.model.js";

export const doShortCodeExistInDB = async (shortcode: string) => {
    const exist = await urlModel.findOne({ shortCode: shortcode })
    if (exist) return true
    return false
}


export const registerShortcodeWithOriginalcodeinDB = async (originalUrl: string, shortCode: string) => {
    const url = await urlModel.create({
        originalUrl,
        shortCode,
        clickCount: 0
    })
    return url
}


export const getoriginalUrlByShortCode = async (shortCode: string) => {
    const originalUrl = await urlModel.findOne({ shortCode: shortCode }).select('+originalUrl')
    let clicks = originalUrl?.clickCount || 0;
    clicks++;
    await urlModel.findOneAndUpdate({ shortCode: shortCode }, { clickCount: clicks })
    if (!originalUrl) throw new Error("No url found")
    return originalUrl
}



export const deleteUrl = async (shortCode: string) => {
    const exist = await urlModel.findOne({ shortCode: shortCode })
    if (exist) {
        await urlModel.findOneAndDelete({ shortCode: shortCode })
    } else throw new Error("No such url found with proper short code")

}



export const isExpired = (expiresAt?: Date) => {
    if (!expiresAt) return false;

    return Date.now() > expiresAt.getTime();
};