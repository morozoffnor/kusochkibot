import {getProperties, IncUserStats} from "../database/database.mjs";
import {convertNumberToTimeString} from "./timeConverter.mjs";

const YakuzaMessageCooldown = 1000 * 60 * 60 // 1 hour

/**
 * Updates last time Yakuza was mentioned in db
 */
async function updateYakuza() {
    await getProperties().then(properties => {
        properties.yakuzaMention = Date.now()
        properties.save()
    })
}

export async function detectYakuza(ctx) {
    let yakuzaz = ['якуза', 'якузе', 'якузу', 'якуза', 'якузе', 'якузу', 'якудза', 'якудзе', 'якудзу', 'якудза',
        'якудзе', 'якудзу', 'кирио', 'кирию', 'якузду', 'якузде', 'якузда', 'кабукичо', 'камаручо', 'кирью-чан', 'кирью',
        'йокохама', 'лиюманг', 'тачибана', 'казума']
    if (yakuzaz.some(v => ctx.message.text.toLowerCase().includes(v))) {
        await sendMessage(ctx)
        const inc = new IncUserStats()
        await inc.yakuza(ctx.from.id)
        await updateYakuza()
    }
}

/**
 * Latest Yakuza mention in chat
 * @type {function}
 * @returns Date
 */
async function getLatestYakuza() {
    const props = await getProperties()
    return props.yakuzaMention
}

/**
 * Time difference between now and latest Yakuza mention
 * @type {function}
 * @returns Number - time difference in milliseconds
 */
async function getTimeDifference() {
    const lastYakuza = await getLatestYakuza()
    return (Date.now() - lastYakuza)
}

/**
 * Sends message with time since Yakuza last mention
 * @param {*} ctx - message ctx
 */
async function sendMessage(ctx) {
    const timeDifference = await getTimeDifference()
    if (timeDifference > YakuzaMessageCooldown) {
        
        await ctx.reply(`Времени без упоминания якузы: ${await convertNumberToTimeString(timeDifference)}`)
    }
}