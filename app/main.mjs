import {Telegraf} from "telegraf";
// const {createInline} = require('app/sizes/inlineQuery.mjs')
import {createInline} from "./sizes/inlineQuery.mjs"

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.on('inline_query', async ctx => {
    await createInline(ctx)
});

bot.on('chosen_inline_result', async ctx => {

})
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()
