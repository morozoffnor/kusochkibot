import {Item} from "../../database/Schemas/Items/Item.mjs";
import {getUserById} from "../../database/database.mjs";
import {Minimizer300} from "../../tools/items/minimizer300.mjs";
import {Gondonfedi} from "../../tools/items/gondonfedi.mjs";
import {ChinesePump} from "../../tools/items/chinesePump.mjs";
import {Bolt} from "../../tools/items/bolt.mjs";


export async function addItem(ctx) {
    if (ctx.from.id === 1345426245) {
        let id  = ctx.from.id
        let user = await getUserById(id)
        const generatedItem = getRandomItem()
        const item = new Item(generatedItem)
        user.items.push(item)
        await user.save()
        await ctx.reply('Вы получили предмет ' + generatedItem.name + ` [${generatedItem.rarity}]`)
    }
}

function getRandomItem() {
    let items = []
    items.push(new Minimizer300().common())
    items.push(new Minimizer300().uncommon())
    items.push(new Minimizer300().rare())
    items.push(new Minimizer300().legendary())
    items.push(new Gondonfedi().common())
    items.push(new Gondonfedi().uncommon())
    items.push(new Gondonfedi().rare())
    items.push(new Gondonfedi().legendary())
    items.push(new ChinesePump().common())
    items.push(new ChinesePump().uncommon())
    items.push(new ChinesePump().rare())
    items.push(new ChinesePump().legendary())
    items.push(new Bolt().common())
    items.push(new Bolt().uncommon())
    items.push(new Bolt().rare())
    items.push(new Bolt().legendary())
    
    
    
    return items[Math.floor(Math.random()*items.length)];
}
