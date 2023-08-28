import {getUserById} from "../database/database.mjs";


export async function processUserSize(userid, size) {
  let user = await getUserById(userid)
  // console.log(user)
  if (!user.cockStats.currentSize && !user.cockStats.highestSize && !user.cockStats.lowestSize) {
    await initSizes(user, size)
  } else {
    await updateSize(user, size)
  }

}

async function initSizes(user, size) {
  user.cockStats.currentSize = size
  user.cockStats.highestSize = size
  user.cockStats.lowestSize = size

  await user.save()
}

async function updateSize(user, size) {
  if (user.cockStats.currentSize > size) {
    user.cockStats.currentSize = size
  }
  if (size < user.cockStats.lowestSize) {
    user.cockStats.lowestSize = size
  }

  if (size > user.cockStats.highestSize) {
    user.cockStats.highestSize = size
  }

  await user.save()
}