import {Item} from "../../database/Schemas/Items/Item.mjs";
import {getUserById} from "../../database/database.mjs";
import {Minimizer300} from "../../tools/items/minimizer300.mjs";
import {Gondonfedi} from "../../tools/items/gondonfedi.mjs";
import {ChinesePump} from "../../tools/items/chinesePump.mjs";


export async function addItem(ctx) {
    if (ctx.from.id === 1345426245) {
        let id  = ctx.from.id
        let user = await getUserById(id)
        const generatedItem = getRandomItem(id)
        const item = new Item(generatedItem)
        user.items.push(item)
        await user.save()
        await ctx.reply('Вы получили предмет ' + generatedItem.name + ` [${generatedItem.rarity}]`)
    }
}

function getRandomItem(id) {
    let items = []
    const minimizer = new Minimizer300()
    const condom = new Gondonfedi()
    const pump = new ChinesePump()
    items.push(minimizer.common(id))
    items.push(minimizer.uncommon(id))
    items.push(minimizer.rare(id))
    items.push(minimizer.legendary(id))
    items.push(condom.common())
    items.push(condom.uncommon())
    items.push(condom.rare())
    items.push(condom.legendary())
    items.push(pump.common())
    items.push(pump.uncommon())
    items.push(pump.rare())
    items.push(pump.legendary())
    
    
    return items[Math.floor(Math.random()*items.length)];
}
