import {cleanAllCurrentSizes} from "../database/database.mjs";

export async function sizesCleanup() {
  await cleanAllCurrentSizes()
}