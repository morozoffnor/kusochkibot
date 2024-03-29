import fs from "fs";
import {createNewName, getAllUsers} from "./database.mjs";
import {logger} from "../tools/logger.mjs";
import {getRandomItem} from "../tools/items/tools/itemsHandler.mjs";
import {Item} from "./Schemas/Items/Item.mjs";

export async function migrateNames() {
    logger.info('Migrating names...')
    const file = fs.readFileSync('resources/cocknames.txt')
    const str = file.toString()
    const lines = str.split('\n')
    for (let i = 0; i < lines.length; i++) {
        await createNewName({
            title: lines[i],
            addedAt: Date.now(),
            addedBy: 0
        })
        logger.info('Migrated "' + lines[i] + '"')
    }
}

export async function ensureStats() {
    logger.info('Ensuring stats exist in all users...')
    const users = await getAllUsers()
    // iterate through all users
    let counter = 0;
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        let statKeys = Object.keys(user.stats);
        // if stats don't exist, create them
        for (let j = 0; j < statKeys.length; j++) {
            const stat = statKeys[j]
            if (!user.stats[stat]) {
                user.stats[stat] = 0
                counter++
            } else if (user.stats === null) {
                user.stats[stat] = 0
            }
        }
        await user.save()
    }
    logger.info(`Found ${users.length} users, created ${counter} stats`)
}

export async function backupSizes() {
    logger.info('Backing up sizes...')
    const users = await getAllUsers()
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        console.log(user.userName)
        user.cockStatsBackup = user.cockStats
        await user.save()
    }
    logger.info('Backed up sizes')
}

export async function giveItems() {
    let users = await getAllUsers()
    for (let i = 0; i < users.length; i++) {
        const user = users[i]
        user.items = []
        user.items.push(new Item(await getRandomItem(1)))
        user.items.push(new Item(await getRandomItem(2)))
        user.items.push(new Item(await getRandomItem(3)))
        console.log(user.items)
        await user.save()
        
    }
}