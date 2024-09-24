import dotenv from "dotenv"
dotenv.config()
import { createClient } from "redis"
let redisClient = createClient()

redisClient.on("error", () => {
    console.log("err");
})

redisClient.connect().catch((err) => {
    console.log(`redis connected: ${err}`);

})

export { redisClient }