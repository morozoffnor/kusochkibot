import {CockNames} from './cockNames'
import {CockSize} from "./cockSize";
import {insertQuery} from "../database/dbnew";

export async function constructCockMessage(username:string) {
    const cockNames = new CockNames()
    const cockSize = new CockSize()
    const s = await cockSize.getCockSize()
    await insertQuery(username,parseFloat(s))
    return await cockNames.getRandomCockName() + " у меня " + s.toString() + "см"
}