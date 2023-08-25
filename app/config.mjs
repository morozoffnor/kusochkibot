import process from "process";

export const config = {
  chatId: Number.parseInt(process.env.CHATID),
  prizeEvery: process.env.PRIZEEVERY,
  cockSizeUsageCooldown: Number.parseInt(process.env.COCKSIZECOOLDOWN),
  botToken: process.env.BOTTOKEN,
  mongoUrl: process.env.MONGOURL,
  openAPItoken: process.env.OPENAPITOKEN
}