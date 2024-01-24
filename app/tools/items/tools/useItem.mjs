import {getUserById, IncUserStats} from "../../../database/database.mjs";
import {bot} from "../../../main.mjs";
import {config} from "../../../config.mjs";

export async function useItem(usedItem) {
    let user = await getUserById(parseInt(usedItem['userId']))
    const stats = new IncUserStats()
    console.log(user.items.length)
    for (let i = 0; i < user.items.length; i++) {
        console.log('iterating through item ' + user.items[i]._id)
        if (user.items[i]._id == usedItem['itemId']) {
            // console.log('found item in user ' + user.id)
            console.log('setting activate item for user')
            user.activatedItem = user.items[i]
            const message = `@${user.userName} использовал ${user.items[i].name} [${user.items[i].rarity}]`
            user.items.splice(i, 1);
            await user.save()
            await stats.items(user.userid)
            await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
            return true
        }
    }
    return false
}

export async function useDebuffItem(usedItem) {
    let user = await getUserById(parseInt(usedItem['userId']))
    let target = await getUserById(parseInt(usedItem['target']))
    const stats = new IncUserStats()
    console.log(user.items.length)
    for (let i = 0; i < user.items.length; i++) {
        console.log('iterating through item ' + user.items[i]._id)
        if (user.items[i]._id == usedItem['itemId']) {
            // console.log('found item in user ' + user.id)
            console.log('debuffing other user')
            target.activatedItem = user.items[i]
            const message = `@${user.userName} использовал ${user.items[i].name} [${user.items[i].rarity}] на @${target.userName}`
            user.items.splice(i, 1);
            await user.save()
            await target.save()
            await stats.items(user.userid)
            await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
            return true
        }
    }
    return false
}