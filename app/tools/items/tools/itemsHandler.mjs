import {Minimizer300} from "../minimizer300.mjs";
import {Gondonfedi} from "../gondonfedi.mjs";
import {ChinesePump} from "../chinesePump.mjs";

const minimizer = new Minimizer300()
const condom = new Gondonfedi()
const pump = new ChinesePump()

export async function handleItem(item, size, user) {
    switch (item.name) {
        case "Уменьшатор 3000":
            return minimizer.useItem(item, size)
        case "Гондон Феди":
            return condom.useItem(user, item)
        case "Китайская помпа":
            return pump.useItem(item, size)
    }
}


export async function getRandomItem(place) {
    const items = getItemsByPlace(place)
    const item = items[Math.floor(Math.random() * items.length)]
    return item
}
function getItemsByPlace(place) {
    let items = []
    switch (place) {
        case 1:
            for (let i = 0; i < 3; i++) {
                items.push(getLegendaryItem())
                items.push(getRareItem())
            }
            return items
        case 2:
            for (let i = 0; i < 3; i++) {
                items.push(getRareItem())
                items.push(getUncommonItem())
            }
            return items
        case 3:
            for (let i = 0; i < 3; i++) {
                items.push(getUncommonItem())
                items.push(getCommonItem())
            }
            return items
        default:
            for (let i = 0; i < 3; i++) {
                items.push(getCommonItem())
            }
            return items
    }

}
function getCommonItem() {
    let items = []
    items.push(minimizer.common())
    items.push(condom.common())
    items.push(pump.common())
    return items[Math.floor(Math.random() * items.length)]
}

function getUncommonItem() {
    let items = []
    items.push(minimizer.uncommon())
    items.push(condom.uncommon())
    items.push(pump.uncommon())
    return items[Math.floor(Math.random() * items.length)]
}

function getRareItem() {
    let items = []
    items.push(minimizer.rare())
    items.push(condom.rare())
    items.push(pump.rare())
    return items[Math.floor(Math.random() * items.length)]
}

function getLegendaryItem() {
    let items = []
    items.push(minimizer.legendary())
    items.push(condom.legendary())
    items.push(pump.legendary())
    return items[Math.floor(Math.random() * items.length)]
}