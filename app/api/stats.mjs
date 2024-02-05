import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {getMostUsedNames} from "../database/database.mjs";

let StatsRouter = new express.Router()

StatsRouter.use(tokenChecker)

StatsRouter.get('/names', express.json({type: 'application/json'}), async (req, res) => {
    const names = await getMostUsedNames()
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send({names: names})
})

export default StatsRouter
