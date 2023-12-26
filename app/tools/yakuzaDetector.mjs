import {getProperties} from "../database/database.mjs";

const YakuzaMessageCooldown = 1000 * 60 * 60 // 1 hour

async function updateYakuza() {
    await getProperties().then(properties => {
        properties.yakuzaMention = Date.now()
        properties.save()
    })
}

export async function detectYakuza(ctx){
    let yakuzaz = ['якуза', 'якузе', 'якузу', 'якуза', 'якузе', 'якузу', 'якудза', 'якудзе', 'якудзу', 'якудза', 'якудзе', 'якудзу', 'кирио', 'кирию']
    if (yakuzaz.some(v => ctx.message.text.includes(v))) {
        await sendMessage(ctx)
        await updateYakuza()
    }
}

async function getLatestYakuza() {
    const props = await getProperties()
    return props.yakuzaMention
}

async function getTimeDifference() {
    const lastYakuza = await getLatestYakuza()
    const timeDifference = (Date.now() - lastYakuza)
    console.log(timeDifference)
    return timeDifference
}
async function sendMessage(ctx) {
    const timeDifference = await getTimeDifference()

    if (timeDifference > YakuzaMessageCooldown) {
        await ctx.reply(`Времени без упоминания якузы: ${timeDifference / 1000 / 60 / 60} час(ов)`)
    }
}