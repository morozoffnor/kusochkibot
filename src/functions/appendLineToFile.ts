import * as fs from "fs";

export async function appendLineToFile(line:string, filename:string) {

    let name = line + "\n"
    console.log(name)
    await fs.appendFile(filename, name, (err) => {
        if (err){throw err}
    })
}