import {Name} from "../../database/Schemas/Name.mjs";
import {migrateNames} from "../../database/migration.mjs";
import {getNames} from "../../database/database.mjs";

/**
 * Gets random name from database
 * @returns {Promise<String>}
 */
export async function getRandomName() {
    const count = await Name.count()
    const random = Math.floor(Math.random() * count)
    const query = Name.findOne().skip(random)
    const doc = await query.exec()
    return await doc.title
}

/**
 * Inits names. Migrates them to database from the file if necessary
 * @returns {Promise<void>}
 */
export async function initNames() {
    const count = await Name.count()
    if (await getNames() == null) {
        await migrateNames()
    } else {
    
    }
}