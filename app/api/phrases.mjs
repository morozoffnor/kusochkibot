import express from 'express'
import {tokenChecker} from "./tools/APItokenChecker.mjs";
import {createNewName, getUserById} from "../database/database.mjs";
import {checkIfNameExists} from "../tools/namesChecker.mjs";
import {bot} from "../main.mjs";
import {config} from "../config.mjs";

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
        }).then(async () => {
            res.status(200).send()
            const user = await getUserById(name.addedBy)
            await sendMessage(`@${user.userName} добавил имя: ${name.name}`)
        }).catch(() => {
            res.status(500).send('error')
        })
    }
    
    
})

async function sendMessage(msg) {
    await bot.telegram.sendMessage(config.chatId, msg, {parse_mode: "HTML"})
}

export default PhrasesRouter
