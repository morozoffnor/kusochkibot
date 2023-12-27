import fs from "fs";
import {createNewName} from "./database.mjs";
import {logger} from "../tools/logger.mjs";

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
