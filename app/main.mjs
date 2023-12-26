import {Telegraf} from "telegraf";
import {createInline} from "./sizes/inlineQuery.mjs"
import {connect} from "./database/database.mjs";
import {createNewDay, initDays} from "./sizes/days/createNewDay.mjs";
import cron from "node-cron";
import {addAttempt} from "./sizes/inlineResult.mjs";
import {config} from "./config.mjs";
import console from "console";
import {getTopThree} from "./sizes/results.mjs";
import {sizesCleanup} from "./sizes/clearUpSizes.mjs";
import {initNames} from "./sizes/generator/namesGenerator.mjs";
import {addName} from "./commands/addName.mjs";
import {help} from "./commands/help.mjs";
import {message} from "telegraf/filters";
import {collectStats} from "./stats/statsCollector.mjs";
import {myStats} from "./commands/myStats.mjs";
import {initProperties} from "./tools/properties.mjs";
import {detectYakuza} from "./tools/yakuzaDetector.mjs";

// connect to DB
await connect()


export const bot = new Telegraf(config.botToken)
await initDays()
await initNames()
await initProperties()
bot.start((ctx) => ctx.reply('Welcome'))

bot.on('inline_query', async ctx => {
    await createInline(ctx)
});

// Bot triggers
bot.on(message('voice'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'voice').then(next())
})
bot.on(message('text'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'text').then(next())
    await detectYakuza(ctx)
    // let yakuzaz = ['якуза', 'якузе', 'якузу']
    // if (yakuzaz.some(v => ctx.message.text.includes(v))) {
    //     await detectYakuza(ctx.message.text)
    // }

})
bot.on(message('video'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'video').then(next())
})
bot.on(message('video_note'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'video_note').then(next())
})
bot.on(message('poll'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'poll').then(next())
})
bot.on(message('via_bot'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'via_bot').then(next())
})
bot.on(message('sticker'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'sticker').then(next())
})
bot.on(message('photo'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'image').then(next())
})

bot.help(async (ctx) =>{
    await help(ctx)
})


bot.on('chosen_inline_result', async ctx => {
    await addAttempt(ctx)
})

bot.hears('Понты', (ctx) => ctx.reply('Точно понты'))

bot.command('addname', async (ctx) => {
    await addName(ctx)
});

bot.command('mystats', async (ctx) => {
    await myStats(ctx)
})


cron.schedule('0 0 0 * * *', async function() {
// prod 0 0 0 * * *
    await getTopThree().then(async () => {
        await sizesCleanup()
        await createNewDay()
    })
})

cron.schedule('0 */15 * * * *', async function() {

})

bot.catch((err) => {
    console.log(`Ooops, encountered an error for `, err)
})

bot.launch()
