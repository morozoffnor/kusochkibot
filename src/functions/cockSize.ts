import {dbh} from '../database/db'
import {CockNames} from './cockNames'
import {Row} from "./row";
import {subsTime} from "./timeHelper";
import {getLastCockSizeUsageByUsername} from "../database/dbnew";
import console from "console";
import {config} from "../config";

export class CockSize {
    async getCockSize() {
        let size = (Math.random() * (40 - 0.1 + 1) + 0.1).toFixed(3)
        return size
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