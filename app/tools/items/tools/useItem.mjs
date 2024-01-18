import {getUserById} from "../../../database/database.mjs";
import {logger} from "../../logger.mjs";
// import "bson-objectid";
import {ObjectId} from "bson";

export async function useItem(usedItem) {
    let user = await getUserById(parseInt(usedItem['userId']))
    // console.log('found user ' + user.userid)
    // console.log('got item id ' + usedItem['itemId'])
    // logger.info(user)
    console.log(user.items.length)
    let i = 0
    for (let i= 0; i < user.items.length; i++) {
        console.log('iterating through item ' + user.items[i]._id)
        if (user.items[i]._id == usedItem['itemId']) {
            // console.log('found item in user ' + user.id)
            user.items.splice(i, 1);
            await user.save()
            return true
        }
    }
    return false
}