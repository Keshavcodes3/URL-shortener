import mongoose, { Document, Schema, model } from "mongoose";

export interface urlInterface {
    originalUrl: string,
    shortCode: string,
    clickCount: number,
    expiresAt?: Date,
}


const urlSchema = new Schema<urlInterface>({
    originalUrl: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true
    },
    clickCount: {
        type: Number,
        default: 0
    },
    expiresAt: {
        type: Date
    }
}, {
    timestamps: true
})


urlSchema.index({ originalUrl: 1, shortCode: 1 }, { unique: true })

const urlModel = model<urlInterface>("Url", urlSchema)

export default urlModel