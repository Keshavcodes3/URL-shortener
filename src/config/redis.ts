import { createClient } from "redis";

export const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
    },
    password: process.env.REDIS_PASSWORD!,
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

await redisClient.connect();

console.log("✅ Redis Connected");