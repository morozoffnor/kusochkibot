import {getAllUsers, getUserById} from "../database/database.mjs";
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

export async function apiGetAllUsers(req, res) {
    const users = await getAllUsers()
    try {
        res.send(users)
    } catch (e) {
        logger.error('Users not found', e)
        res.status(404).send('Users not found')
    }
}