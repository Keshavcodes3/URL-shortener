import 'dotenv/config'

import express from 'express'
import { connectToDB } from './src/config/connectToDb.js'
import urlRouter from './src/routes/url.routes.js'
import { redisClient } from './src/config/redis.js'
const app = express()



app.use(express.json())

connectToDB()


app.use('/api/v1/url', urlRouter)

app.listen(3000, () => {
    console.log(`port is running on port 30000`)
})