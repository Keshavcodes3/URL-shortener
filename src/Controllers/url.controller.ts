import type { Request, Response } from "express";
import urlservice from "../services/url.service.js";
import { redisClient } from "../config/redis.js";
import urlModel from "../Models/url.model.js";
import { deleteUrl } from "../repositories/url.repositary.js";

class urlControllerClass {
    shortenUrl = async (req: Request, res: Response) => {
        const { originalUrl, length } = req.body
        const url = await urlservice.shortenUrlService(originalUrl, length)
        return res.status(201).json({
            data: {
                originalUrl: url.originalUrl,
                shortUrl: `${process.env.SITEURL}/${url.shortCode}`,
                clickcount: url.clickCount
            }
        })
    }

    getUrl = async (req: Request, res: Response) => {
        const { shortCode } = req.params
        if (!shortCode) throw new Error("No short code found")
        let originalUrl: string | null = await redisClient.get(shortCode as string)
        if (originalUrl) {
            return res.redirect(originalUrl)
            // return res.status(200).json(originalUrl)
        }
        originalUrl = await urlservice.getoriginalUrl(shortCode as string)
        try {
            await redisClient.set(shortCode as string, originalUrl as string, {
                EX: 3600
            });
        } catch (err) {
            console.error("Failed to cache:", err);
        }

        return res.redirect(originalUrl as string)
        // return res.status(200).json(originalUrl)
    }

    deleteUrl = async (req: Request, res: Response) => {
        const { shortCode } = req.params;

        await urlservice.deleteUrl(shortCode as string);

        try {
            await redisClient.del(shortCode as string);
        } catch (err) {
            console.error("Failed to delete cache:", err);
        }

        return res.status(200).json({
            message: "URL deleted successfully"
        });
    }
}

export const urlcontroller = new urlControllerClass()
