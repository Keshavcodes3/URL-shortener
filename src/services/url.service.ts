import type { Request, Response } from "express";
import { validateUrl } from "../validators/validateUrl.js";
import { generateShortCode } from "../utils/url.utils.js";
import { deleteUrl, doShortCodeExistInDB, getoriginalUrlByShortCode, isExpired, registerShortcodeWithOriginalcodeinDB } from "../repositories/url.repositary.js";
import { redisClient } from "../config/redis.js";

class urlService {
    shortenUrlService = async (originalUrl: string, length: number) => {
        const result = validateUrl(originalUrl);

        if (!result.valid) {
            throw new Error(result.reason);
        }
        let attempt = 1;
        let shortenCode = "";
        let doShortcodeExist = true;
        while (attempt) {
            let shortcode = generateShortCode(length = 5)
            let doShortcodeExists = await doShortCodeExistInDB(shortcode)
            if (doShortcodeExists) {
                console.warn(`short code already exist in database ,retrying ${attempt} time again`)
                if (attempt >= 10) {
                    console.error(`Error creating short code,try again`)
                    break
                }
            }
            else {
                shortenCode = shortcode
                break
            }
            attempt++
        }
        if (!shortenCode) {
            throw new Error("failed to Generate code")
        }
        const url = await registerShortcodeWithOriginalcodeinDB(originalUrl, shortenCode)
        return url

    }

    getoriginalUrl = async (shortCode: string) => {
        let originalUrl;
        if (!shortCode) throw new Error("no code found")
        originalUrl = await redisClient.get(shortCode)
        if (!originalUrl) {
            originalUrl = await getoriginalUrlByShortCode(shortCode)
            const expire = isExpired(originalUrl.expiresAt)
            if (expire) {
                await deleteUrl(shortCode)
                try {
                    await redisClient.del(shortCode);
                } catch (err) {
                    console.error(err);
                }
                throw new Error("Url is expired")
            }
            await redisClient.set(shortCode, originalUrl.originalUrl, { EX: 60 * 60 * 24 })
        }
        return originalUrl.originalUrl

    }

    deleteUrl = async (shortCode: string) => {
        if (!shortCode) throw new Error("no code found")
        await deleteUrl(shortCode)
    }




}


const urlservice = new urlService()
export default urlservice;