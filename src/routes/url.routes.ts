import express from 'express'
import { urlcontroller } from '../Controllers/url.controller.js'

const urlRouter = express.Router()

urlRouter.post('/shorten', urlcontroller.shortenUrl)

urlRouter.get('/:shortCode', urlcontroller.getUrl)

urlRouter.delete("/", urlcontroller.deleteUrl)

export default urlRouter