import process from "process";

export const config = {
    chatId: Number.parseInt(process.env.CHATID),
    prizeEvery: process.env.PRIZEEVERY,
    cockSizeUsageCooldown: Number.parseInt(process.env.COCKSIZECOOLDOWN),
    botToken: process.env.BOTTOKEN,
    mongoUrl: process.env.MONGOURL,
    openAPItoken: process.env.OPENAPITOKEN,
    openAIIntegration: parseBoolFromEnv(),
    apiToken: process.env.APITOKEN,
    apiHost: process.env.APIHOST
}

function parseBoolFromEnv() {
    const option = process.env.ENABLEOPENAI
    
    switch (option) {
        case "true":
        case "True":
            return true
        case "false":
        case "False":
            return false
        default:
            return false
    }
}