import { getRandomLineFromFile } from "./getRandomLineFromFile"
import {appendLineToFile} from "./appendLineToFile";
export class CockNames {
    async getRandomCockName() {
        return await getRandomLineFromFile(process.cwd() + "/resources/cocknames.txt");
    }

    async addCockName(name:string) {

        await appendLineToFile(name, process.cwd() + "/resources/cocknames.txt")
    }
}