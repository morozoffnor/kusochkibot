import {Minimizer300} from "../minimizer300.mjs";
import {Gondonfedi} from "../gondonfedi.mjs";
import {ChinesePump} from "../chinesePump.mjs";
import {Bolt} from "../bolt.mjs";


export async function handleItem(item, size, user) {
    switch (item.name) {
        case "Уменьшатор 3000":
            return await new Minimizer300(item).useItem(size)
        case "Гондон Феди":
            return await new Gondonfedi(item).useItem(user)
        case "Китайская помпа":
            return await new ChinesePump(item).useItem(size)
        case "Болтище":
            return await new Bolt(item).useItem(size)
    }
}

// export async function handleDebuffItems(item, user, target, size) {
//     switch (item.name) {
//         case "Болтище":
//             return await bolt.useItem(item, target,)
//     }
// }




export async function getRandomItem(place) {
    const items = getItemsByPlace(place)
    return items[Math.floor(Math.random() * items.length)]
}

function getItemsByPlace(place) {
    
    switch (place) {
        case 1:
            let items = []
            for (let i = 0; i < 3; i++) {
                items.push(getRareItem())
            }
            items.push(getLegendaryItem())
            return items
        case 2:
            let items2 = []
            for (let i = 0; i < 3; i++) {
                items2.push(getRareItem())
                items2.push(getUncommonItem())
            }
            return items2
        case 3:
            let items3 = []
            for (let i = 0; i < 3; i++) {
                items3.push(getUncommonItem())
                items3.push(getCommonItem())
            }
            return items3
        default:
            let items4 = []
            for (let i = 0; i < 3; i++) {
                items4.push(getCommonItem())
            }
            return items4
    }
    
}

function getCommonItem() {
    let items = []
    items.push(new Minimizer300().common())
    items.push(new Gondonfedi().common())
    items.push(new ChinesePump().common())
    items.push(new Bolt().common())
    return items[Math.floor(Math.random() * items.length)]
}

function getUncommonItem() {
    let items = []
    items.push(new Minimizer300().uncommon())
    items.push(new Gondonfedi().uncommon())
    items.push(new ChinesePump().uncommon())
    items.push(new Bolt().uncommon())
    return items[Math.floor(Math.random() * items.length)]
}

function getRareItem() {
    let items = []
    items.push(new Minimizer300().rare())
    items.push(new Gondonfedi().rare())
    items.push(new ChinesePump().rare())
    items.push(new Bolt().rare())
    return items[Math.floor(Math.random() * items.length)]
}

function getLegendaryItem() {
    let items = []
    items.push(new Minimizer300().legendary())
    items.push(new Gondonfedi().legendary())
    items.push(new ChinesePump().legendary())
    items.push(new Bolt().legendary())
    return items[Math.floor(Math.random() * items.length)]
}

export async function getLvlUpItem(){
    let items = []
    items.push(new Minimizer300().rare())
    items.push(new Gondonfedi().rare())
    items.push(new ChinesePump().rare())
    items.push(new Minimizer300().legendary())
    items.push(new Gondonfedi().legendary())
    items.push(new ChinesePump().legendary())
    items.push(new Bolt().rare())
    items.push(new Bolt().legendary())
    return items[Math.floor(Math.random() * items.length)]
}

export async function getAllItemObjects() {
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
    return items
}