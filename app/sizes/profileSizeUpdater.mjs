import {getUserById} from "../database/database.mjs";

/**
 * Processes user's size. Updates size stats or inits them if necessary
 * @param {Number} userid - User's telegram ID
 * @param {Number} size - User's size returned from an attempt
 */
export async function processUserSize(userid, size) {
    let user = await getUserById(userid)
    if (!user.cockStats.currentSize && !user.cockStats.highestSize && !user.cockStats.lowestSize) {
        await initSizes(user, size)
    } else {
        await updateSize(user, size)
    }
    
}

/**
 * Inits user's sizes stats and saves them
 * @param user - mongoose User object
 * @param size - User's size returned from an attempt
 */
async function initSizes(user, size) {
    user.cockStats.currentSize = size
    user.cockStats.highestSize = size
    user.cockStats.lowestSize = size
    
    await user.save()
}

/**
 * Compares and updates user's size stats
 * @param user - mongoose User object
 * @param size - User's size returned from an attempt
 */
async function updateSize(user, size) {
    if (!user.cockStats.currentSize) {
        user.cockStats.currentSize = size
    } else {
        if (user.cockStats.currentSize > size) {
            user.cockStats.currentSize = size
        }
    }
    if (size < user.cockStats.lowestSize) {
        user.cockStats.lowestSize = size
    }
    
    if (size > user.cockStats.highestSize) {
        user.cockStats.highestSize = size
    }
    
    await user.save()
}