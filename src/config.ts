import * as dotenv from 'dotenv'
import * as process from "process";
dotenv.config()
export const config = {
    chatId: Number.parseInt(process.env.CHATID!),
    prizeEvery: process.env.PRIZEEVERY,
    cockSizeUsageCooldown: Number.parseInt(process.env.COCKSIZECOOLDOWN!),
    botToken: process.env.TOKEN,
    mongoUrl: "mongodb://127.0.0.1:27017/test"
}