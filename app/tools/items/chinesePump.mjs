import {BaseItem} from "./BaseItem.mjs";

export class ChinesePump extends BaseItem{
    
    name = "Китайская помпа"
    description = "Это мягкое, безболезненное растяжение заставляет клетки внутри кавернозных тел оттягиваться и разделяться. Так же, как мышцы buliding, во время процесса заживления клеток, здоровые новые клетки создаются, позволяя ваш пенис, чтобы стать больше. И с большими кавернозными корпусами ваш пенис может удерживать больше крови, а это означает, что вы также будете наслаждаться большими и тяжелыми эрекциями!"
    
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
        }
    }
    
    common() {
        this.rarity = "Common"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 1.5", "умножает размер хуя на 0.5"],
            alert: "",
            title: "Может сработать один из эффектов:"
        }
        this.icon = "chinesepumpCommon.png"
        this.effectInfo = {
            option1: 1.5,
              option2: 0.5
        }
        
        return this
    }
    
    uncommon() {
        this.rarity = "Uncommon"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 1.7", "умножает размер хуя на 0.3"],
            alert: "",
            title: "Может сработать один из эффектов:"
        }
        this.icon = "chinesepumpUncommon.png"
        this.effectInfo = {
            option1: 1.7,
            option2: 0.3
        }
        
        return this
    }
    
    rare() {
        this.rarity = "Rare"
        this.type = "math"
        this.subtype = "multiply"
        this.effect =  {
            descriptions: ["умножает размер хуя на 2.5", "умножает размер хуя на 0.2"],
              alert: "",
              title: "Может сработать один из эффектов:"
            }
        this.icon = "chinesepumpRare.png"
        this.effectInfo = {
            option1: 2.5,
            option2: 0.2
        }
        
        return this
        
    }
    
    legendary() {
        this.rarity = "Legendary"
        this.type = "math"
        this.subtype = "multiply"
        this.effect =  {
            descriptions: ["умножает размер хуя на 3", "умножает размер хуя на 0.1"],
            alert: "",
            title: "Может сработать один из эффектов:"
        }
        this.icon = "chinesepumpLegendary.png"
        this.effectInfo = {
            option1: 3,
            option2: 0.1
        }
        
        return this
        
    }
    
    async activateItem(size) {
        const dice = Math.random()
        if (dice > 0.5) {
            return (size * this.effectInfo.option1).toFixed(3)
        } else {
            return (size * this.effectInfo.option2).toFixed(3)
        }
    }
    
}