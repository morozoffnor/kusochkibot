import {getAllUsers, incrementLvl} from "../../database/database.mjs";


export async function checkLevels(){
    let users = await getAllUsers()
    
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        if (Math.floor(user.lvl.exp / 1000) > user.lvl.lvl) {
            await incrementLvl(user)
        }
    }
}