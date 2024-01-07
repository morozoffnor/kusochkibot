import {createDay, getCurrentDay} from "../../database/database.mjs";
import {logger} from "../../tools/logger.mjs";

/**
 * Creates a new day with the current date
 * @returns {Promise<void>}
 */
export async function createNewDay() {
    const dayData = {
        date: Date.now(),
        attempts: []
    }
    await createDay(dayData)
}

/**
 * Inits days. Compares time between now and last Day's creation time. Creates new Day if necessary
 * @returns {Promise<void>}
 */
export async function initDays() {
    const day = await getCurrentDay()
    if (day != null) {
        const date = day.date
        const currentTime = Date.now()
        if ((currentTime - date) > 86400000) {
            logger.info('Creating a new day')
            await createNewDay()
        } else {
            logger.info('Day is up to date')
        }
    } else {
        logger.info('No days found. Creating a new one')
        await createNewDay()
    }
}

