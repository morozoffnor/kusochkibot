import {getUserById} from "../database/database.mjs";


export async function processUserSize(userid, size) {
  let user = await getUserById(userid)
  console.log(user)
  if (!user.cockStats.currentSize) {
    user.cockStats.currentSize = size
    user.cockStats.lowestSize = size
    user.cockStats.highestSize = size
    await user.save()
  } else {
    if (user.cockStats.currentSize > size) {
      user.cockStats.currentSize = size
    }
    if (user.cockStats.currentSize < user.cockStats.lowestSize) {
      user.cockStats.lowestSize = user.cockStats.currentSize
    }

    if (size > user.cockStats.highestSize) {
      user.cockStats.highestSize = size
    }

    await user.save()
  }

}