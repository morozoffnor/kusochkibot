import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {createNewName} from "../database/database.mjs";
import {checkIfNameExists} from "../tools/namesChecker.mjs";

let PhrasesRouter = new express.Router()

PhrasesRouter.use(tokenChecker)

PhrasesRouter.post('/names', express.json({type: 'application/json'}), async (req, res) => {
    const name = req.body
    res.setHeader('Content-Type', 'application/json');
    if (await checkIfNameExists(name.name)) {
        res.status(500).send('error')
    } else {
        await createNewName({
            title: name.name,
            date: Date.now(),
            addedBy: name.addedBy
        }).then(() => {
            res.status(200).send()
        }).catch(() => {
            res.status(500).send('error')
        })
    }
    
    
})

export default PhrasesRouter
