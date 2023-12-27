import {getUserById} from "../database/database.mjs";
import {logger} from "../tools/logger.mjs";

export async function apiGetUserById(req, res) {
  const userId = req.params['id']
  const user = await getUserById(userId)
  try {
    res.send(user)
  } catch (e) {
    logger.error('User not found', e)
    res.status(404).send('User not found')
  }
}