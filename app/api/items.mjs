import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {logger} from "../tools/logger.mjs";
import {useDebuffItem, useItem} from "../tools/items/tools/useItem.mjs";
import {getActiveUsers} from "../database/database.mjs";

let ItemsRouter = express.Router()

// ItemsRouter.use((req, res, next) => {
//     console.log('got item request')
//     next()
// })

ItemsRouter.use(tokenChecker)
ItemsRouter.post('/use', express.json({type: 'application/json'}), async (req, res) => {
    const usedItem = req.body
    
    if (await useItem(usedItem)) {
        res.status(200).send('Hello World!');
        return
    }
    res.status(500).send('ЧТО-ТО ПОШЛО НЕ ТАК БЛЯТЬ');
});

ItemsRouter.post('/use/debuff', express.json({type: 'application/json'}), async (req, res) => {
    const usedItem = req.body
    if (await useDebuffItem(usedItem)) {
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

export default ItemsRouter