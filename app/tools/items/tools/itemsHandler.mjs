import {Minimizer300} from "../minimizer300.mjs";
import {Gondonfedi} from "../gondonfedi.mjs";
import {ChinesePump} from "../chinesePump.mjs";

const minimizer = new Minimizer300()
const condom = new Gondonfedi()
const pump = new ChinesePump()

export async function handleItem(item, size, user) {
    switch (item.name) {
        case "Уменьшатор 3000":
            return await minimizer.useItem(item, size)
        case "Гондон Феди":
            return await condom.useItem(user, item)
        case "Китайская помпа":
            return await pump.useItem(item, size)
    }
}


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

export async function getLvlUpItem(){
    let items = []
    items.push(minimizer.rare())
    items.push(condom.rare())
    items.push(pump.rare())
    items.push(minimizer.legendary())
    items.push(condom.legendary())
    items.push(pump.legendary())
    return items[Math.floor(Math.random() * items.length)]
}