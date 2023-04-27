import fs from "fs";
import {insertName} from "../database/dbnew";

export async function importNames(filename:string) {
    const file = fs.readFileSync(filename)
    const str = file.toString()
    const lines = str.split('\n')

    for (let i in lines) {
        await insertName(lines[i]!, "admin")
    }
}