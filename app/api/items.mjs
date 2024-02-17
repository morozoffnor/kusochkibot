import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {logger} from "../tools/logger.mjs";
import {getActiveUsers, getUserById} from "../database/database.mjs";
import {getAllItemObjects} from "../tools/items/tools/itemsHandler.mjs";
import {ItemsHandler} from "../items/ItemsHandler.mjs";

let ItemsRouter = express.Router()

// ItemsRouter.use((req, res, next) => {
//     console.log('got item request')
//     next()
// })

ItemsRouter.use(tokenChecker)
ItemsRouter.post('/use', express.json({type: 'application/json'}), async (req, res) => {
    const usedItem = req.body
    let handler = new ItemsHandler({
        user: await getUserById(usedItem['userId']),
        itemId: usedItem['itemId']
    })
    if (await handler.activateItem()) {
        res.status(200).send('Hello World!');
        return
    } else {
        res.status(500).send('ЧТО-ТО ПОШЛО НЕ ТАК БЛЯТЬ');
    }
});

ItemsRouter.post('/use/debuff', express.json({type: 'application/json'}), async (req, res) => {
    const usedItem = req.body
    const handler = new ItemsHandler({
        user: await getUserById(parseInt(usedItem['userId'])),
        target: await getUserById(parseInt(usedItem['target'])),
        itemId: usedItem['itemId']
    })
    if (await handler.debuffUser()) {
        res.status(200).send('Hello World!');
        return
    }
    res.status(500).send('ЧТО-ТО ПОШЛО НЕ ТАК БЛЯТЬ');
})

ItemsRouter.get('/activeUsers', express.json({type: 'application/json'}), async (req, res) => {
    const users = await getActiveUsers()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({users: users})
})

ItemsRouter.get('/list', express.json({type: 'application/json'}), async (req, res) => {
    const items = await getAllItemObjects()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({items: items})
})

export default ItemsRouter