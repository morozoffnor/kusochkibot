import {cleanAllCurrentSizes} from "../database/database.mjs";

/**
 * Cleans (nulls) current size for all the users
 * @returns {Promise<void>}
 */
export async function sizesCleanup() {
  await cleanAllCurrentSizes()
}