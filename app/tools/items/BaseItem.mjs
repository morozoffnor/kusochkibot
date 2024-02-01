import {Item} from "../../database/Schemas/Items/Item.mjs";

export class BaseItem {
    
    createItem() {
        return new Item(this)
    }
}