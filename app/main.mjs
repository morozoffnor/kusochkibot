import {Telegraf} from "telegraf";
import {createInline} from "./sizes/inlineQuery.mjs"
import {connect} from "./database/database.mjs";
import {createNewDay, initDays} from "./sizes/days/createNewDay.mjs";
import cron from "node-cron";
import {addAttempt} from "./sizes/inlineResult.mjs";
import {config} from "./config.mjs";
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
import {logger} from "./tools/logger.mjs";
import express from "express";
import {tokenChecker} from "./api/tools/APItokenChecker.mjs";
import {apiGetAllUsers, apiGetUserById} from "./api/users.mjs";
import {sendPatchnotes} from "./tools/sendPatchnotes.mjs";
import {ensureStats} from "./database/migration.mjs";
import {textTriggersHandler} from "./tools/phraseTrigger.mjs";
import ItemsRouter from "./api/items.mjs"
import {addItem} from "./commands/test/addItem.mjs";
import {items} from "./commands/items.mjs";
import {topUsers} from "./commands/top.mjs";
import StatsRouter from "./api/stats.mjs";
import PhrasesRouter from "./api/phrases.mjs";

// connect to DB
await connect()

// API
export const api = express()
const port = 80

api.listen(port, () => {
    logger.info('API is listening on port ' + port)
})
api.use(tokenChecker)
api.use('/items/', ItemsRouter)
api.use('/stats/', StatsRouter)
api.use('/phrases/', PhrasesRouter)

api.get('/user/:id', async (req, res) => {
    await apiGetUserById(req, res)
})

api.get('/users/', async (req, res) => {
    await apiGetAllUsers(req, res)
})

api.post('/github/webhook/release/', express.json({type: 'application/json'}), async (req, res) => {
    res.status(200).send('OK')
    if (req.body['action'] !== 'published') {
        return
    }
    await sendPatchnotes(req.body['release'])
})

// Bot
export const bot = new Telegraf(config.botToken)
await initDays()
await initNames()
await initProperties()
await ensureStats()
bot.start((ctx) => ctx.reply('Welcome'))

bot.on('inline_query', async ctx => {
    await createInline(ctx)
});

// Bot triggers
bot.on(message('voice'), async (ctx, next) => {
    await collectStats(ctx.from.id, 'voice').then(next())
})
bot.on(message('text'), async (ctx, next) => {
    if (!ctx.message.via_bot) {
        await collectStats(ctx.from.id, 'text').then(next())
        await detectYakuza(ctx)
        await textTriggersHandler(ctx)
    } else {
        next()
    }
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

bot.help(async (ctx) => {
    await help(ctx)
})


bot.on('chosen_inline_result', async ctx => {
    await addAttempt(ctx)
})


bot.command('addname', async (ctx) => {
    await addName(ctx)
});

bot.command('mystats', async (ctx) => {
    await myStats(ctx)
})

bot.command('additem', async (ctx) => {
    logger.error('additem')
    await addItem(ctx)
})

bot.command('items', async (ctx) => {
    await items(ctx)
})

bot.command('top', async (ctx) => {
    await topUsers(ctx)
})


cron.schedule('0 0 0 * * *', async function () {
// prod 0 0 0 * * *
    await getTopThree().then(async () => {
        await sizesCleanup()
        await createNewDay()
    })
})

cron.schedule('0 */5 * * * *', async function () {

})

bot.catch((err) => {
    logger.error(`Ooops, encountered an error for `, err)
})

bot.launch()
