import {getLastCockSizeUsageByUsername} from "../database/dbnew";
import {config} from "../config";

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
}