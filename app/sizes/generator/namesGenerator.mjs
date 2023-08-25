import {Name} from "../../database/Schemas/Name.mjs";
import {migrateNames} from "../../database/migration.mjs";

export async function getRandomName() {
  const count = await Name.count()
  const random = Math.floor(Math.random() * count)
  const query = Name.findOne().skip(random)
  const doc = await query.exec()
  return await doc.title
}

export async function initNames(){
  const count = await Name.count()
  if (count > 0) {
    return
  } else {
    await migrateNames()
  }
}