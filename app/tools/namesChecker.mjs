import {getName} from "../database/database.mjs";

export async function checkIfNameExists(name) {
  const exists = await getName(name)
  if (!exists) {
    return false
  } else {
    return true
  }
}