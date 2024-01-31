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
            // TODO rewrite this custom thing for Bolt
            
            
            if (user.items[i].effectInfo.v === 2) {
                switch (user.items[i].rarity) {
                    case 'Rare':
                        target.cockStats.currentSize = (target.cockStats.currentSize + user.items[i].effectInfo.option1).toFixed(3)
                        const message = `@${user.userName} использовал ${user.items[i].name} [${user.items[i].rarity}] на @${target.userName}!\nТеперь его хуй равен ${target.cockStats.currentSize}`
                        await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
                        break
                    case 'Legendary':
                        target.cockStats.currentSize = (target.cockStats.currentSize * user.items[i].effectInfo.option1).toFixed(3)
                        const message1 = `@${user.userName} использовал ${user.items[i].name} [${user.items[i].rarity}] на @${target.userName}!\nТеперь его хуй равен ${target.cockStats.currentSize}`
                        await bot.telegram.sendMessage(config.chatId, message1, {parse_mode: "HTML"})
                        break
                }
                
                
                
                
            } else {
                target.activatedItem = user.items[i]
                const message = `@${user.userName} использовал ${user.items[i].name} [${user.items[i].rarity}] на @${target.userName}`
                await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
            }
            user.items.splice(i, 1);
            await user.save()
            await target.save()
            await stats.items(user.userid)
            return true
            
        }
    }
    return false
}