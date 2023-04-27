import {getLastCockSizeUsageByUsername, insertQuery} from "../database/dbnew";
import {config} from "../config";
import {CockNames} from "./cockNames";

export class CockSize {
    async getCockSize() {
        return (Math.random() * (40 - 0.1 + 1) + 0.1).toFixed(3)
    }

    async checkIfCockSizeAllowed(username:string) {
        const lastTime = await getLastCockSizeUsageByUsername(username)
        if (lastTime) {
            if (new Date().valueOf() - lastTime.valueOf() < config.cockSizeUsageCooldown) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    async constructCockMessage(username:string) {
        const cockNames = new CockNames()
        const s = await this.getCockSize()
        await insertQuery(username,parseFloat(s))
        return await cockNames.getRandomCockName() + " у меня " + s.toString() + "см"
    }
}