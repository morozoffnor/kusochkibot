import {getActiveUsers, IncUserStats} from "../database/database.mjs";
import {bot} from "../main.mjs";
import {config} from "../config.mjs";
import {ChinesePump} from "../tools/items/chinesePump.mjs";
import {Gondonfedi} from "../tools/items/gondonfedi.mjs";
import {Minimizer300} from "../tools/items/minimizer300.mjs";
import {Monolith} from "../tools/items/monolith.mjs";
import {Bolt} from "../tools/items/bolt.mjs";
import {collectStats} from "../stats/statsCollector.mjs";

export class ItemsHandler {
    
    stats = new IncUserStats()
    constructor(info) {
        if (info.user) {
            this.user = info.user
        }
        if(info.target) {
            this.target = info.target
        }
        if (info.size) {
            this.size = info.size
        }
        if (info.itemId) {
            this.itemId = info.itemId
        }
        if (info.item) {
            this.item = info.item
        }
    }
    
    async #sendMessage(message) {
        await bot.telegram.sendMessage(config.chatId, message, {parse_mode: "HTML"})
    }

    /**
     * Activates item
     * @returns {Boolean} - True if item is activated
     */
    async activateItem() {
        // console.log(this.user)
        console.log(this.item)
        for (let i = 0; i < this.user.items.length; i++) {
            if (this.user.items[i]._id == this.itemId) {
                this.item = this.user.items[i]
                // detecting random monolith
                if (this.item.name === "Монолит" && this.item.effectInfo.randomize) {
                    console.log('activating instant monolith')
                    if (await this.#activateMonolith()) {
                        // save user and collect stats if ok
                        this.user.items.splice(i, 1);
                        await collectStats(this.user.userid, "item")
                        this.user.save()
                        return true
                    } else {
                        return false
                    }
                } else {
                    // base item activation flow
                    console.log('setting activate item for user')
                    this.user.activatedItem = this.user.items[i]
                    const message = `@${this.user.userName} использовал ${this.user.items[i].name} [${this.user.items[i].rarity}]`
                    this.user.items.splice(i, 1);
                    await this.user.save()
                    await collectStats(this.user.userid, "item")
                    await this.#sendMessage(message)
                    return true
                }
                
            }
        }
    }
    
    async useItem() {
        switch (this.item.name) {
            case "Уменьшатор 3000":
                return await new Minimizer300(this.item).activateItem(this.size)
            case "Гондон Феди":
                return await new Gondonfedi(this.item).activateItem(this.user)
            case "Китайская помпа":
                return await new ChinesePump(this.item).activateItem(this.size)
            case "Монолит":
                return await new Monolith(this.item).activateItem(this.size)
            case "Болтище":
                return await new Bolt(this.item).activateItem(this.size)
        }
    }
    
    async debuffUser() {
        for (let i = 0; i < this.user.items.length; i++) {
            if (this.user.items[i]._id == this.itemId) {
                this.item = this.user.items[i]
                this.size = this.target.cockStats.currentSize
                console.log('using bolt')
                this.target.cockStats.currentSize = await this.useItem()
                const message = `@${this.user.userName} использовал ${this.user.items[i].name} [${this.user.items[i].rarity}] на @${this.target.userName}!\nТеперь его хуй равен ${this.target.cockStats.currentSize}`
                await this.target.save()
                this.user.items.splice(i, 1);
                await this.user.save()
                await collectStats(this.user.userid, "item")
                await this.#sendMessage(message)
                return true
            }
        }
    }
    /**
     * Activates monolith item
     * @returns {Boolean} - True if success
     */
    async #activateMonolith() {
        const activeUsers = await getActiveUsers()
        if (activeUsers.length < 1) {
            return false
        } else {
            let randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)]
            this.size = randomUser.cockStats.currentSize
            randomUser.cockStats.currentSize = await this.useItem()
            await randomUser.save()
            const message = `@${this.user.userName} использовал <b>${this.item.name} [${this.item.rarity}]</b>! Боги рандома выбрали целью @${randomUser.userName}. Теперь его хуй - ${randomUser.cockStats.currentSize}см`
            await this.#sendMessage(message)
            return true
        }
       
        
    }
    
}