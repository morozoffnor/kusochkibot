import {getName} from "../database/database.mjs";

/**
 * Checks if name already exists in the database
 * @type {function}
 * @returns Boolean
 */
export async function checkIfNameExists(name) {
    const exists = await getName(name)
    if (!exists) {
        return false
    } else {
        return true
    }
}