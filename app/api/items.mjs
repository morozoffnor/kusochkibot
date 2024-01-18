import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {logger} from "../tools/logger.mjs";
import {useItem} from "../tools/items/tools/useItem.mjs";

let ItemsRouter = express.Router()

ItemsRouter.use((req, res, next) => {
    console.log('got item request')
    next()
})

ItemsRouter.use(tokenChecker)
ItemsRouter.post('/use', express.json({type: 'application/json'}), async (req, res) => {
    const usedItem = req.body
    logger.info(usedItem)
    
    if (await useItem(usedItem)) {
        res.status(200).send('Hello World!');
        return
    }
    res.status(500).send('ЧТО-ТО ПОШЛО НЕ ТАК БЛЯТЬ');
    
    
    
    
});

export default ItemsRouter