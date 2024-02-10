import {BaseItem} from "./BaseItem.mjs";

export class Minimizer300 extends BaseItem{
    
    name = "Уменьшатор 3000"
    description = "фуфелшмерц мне похурейтед"
    
    constructor(item) {
        super();
        if (item) {
            this.rarity = item.rarity
            this.type = item.type
            this.subtype = item.subtype
            this.effect = item.effect
            this.icon = item.icon
            this.effectInfo = item.effectInfo
            this.id = item.id
            this.multiplier = item.multiplier
        }
    }
    common() {
        this.rarity = "Common"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.5"],
            alert: "",
            title: ""
        }
        this.icon = "scissorsCommon.png"
        this.multiplier = 0.5
        
        return this
    }
    
    uncommon() {
        this.rarity = "Uncommon"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.4"],
            alert: "",
            title: ""
        }
        this.icon = "scissorsUncommon.png"
        this.multiplier = 0.4
        
        return this
    }
    
    rare() {
        this.rarity = "Rare"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.3"],
            alert: "",
            title: ""
        }
        this.icon = "scissorsRare.png"
        this.multiplier = 0.3
        
        return this
    }
    
    legendary() {
        this.description = "фуфелшмерц мне похурейтед (но легендарно)"
        this.rarity = "Legendary"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.2"],
            alert: "",
            title: ""
        }
        this.icon = "scissorsLegendary.png"
        this.multiplier = 0.2
        
        return this
    }
    
    async activateItem(size) {
        return (size * this.multiplier).toFixed(3)
    }
    
}