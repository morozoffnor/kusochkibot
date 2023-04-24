import * as fs from "fs";
import * as process from "process";

export async function getRandomLineFromFile(filename:string) {
    const file = fs.readFileSync(filename)
    const str = file.toString()
    const lines = str.split('\n')

    let randomNum = Math.floor(Math.random() * lines.length)
    return lines[randomNum]
}