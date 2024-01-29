export class Bolt {
    
    name = "Болтище"
    description = "Очень хорошо кладется на все дела любой сложности и срочности. Самый распространенный предмет в быту."
    
    constructor(item) {
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
        this.type = "debuff"
        this.subtype = "addition"
        this.effect = {
            descriptions: ["прибавляет к размеру хуя цели 5см"],
            alert: "",
            title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня. Если у цели уже есть активный предмет, то болт его заменит собой. Но цель так же может использовать предмет, чтобы избавиться от болта.\n\n"
        }
        this.icon = "boltCommon.png"
        this.effectInfo = {
            option1: 5
        }
        
        return this
    }
    
    uncommon() {
        this.rarity = "Uncommon"
        this.type = "debuff"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает следующий хуй цели на 2"],
            alert: "",
            title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня. Если у цели уже есть активный предмет, то болт его заменит собой. Но цель так же может использовать предмет, чтобы избавиться от болта.\n\n"
        }
        this.icon = "boltUncommon.png"
        this.effectInfo = {
            option1: 2
        }
        
        return this
    }
    
    rare() {
        this.rarity = "Rare"
        this.type = "debuff"
        this.subtype = "addition"
        this.effect = {
            descriptions: ["[current size] + 5"],
            alert: "",
            title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня.\n\n"
        }
        this.icon = "boltRare.png"
        this.effectInfo = {
            option1: 5,
            v: 2
        }
        
        return this
    }
    
    legendary() {
        this.rarity = "Legendary"
        this.type = "debuff"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["[current size] * 5"],
            alert: "",
            title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня.\n\n"
        }
        this.icon = "boltLegendary.png"
        this.effectInfo = {
            option1: 5,
            v: 2
        }
        
        return this
    }
    
    useItem(size) {
        if (this.subtype === 'addition') {
            return size + this.effectInfo.option1
        }
        if (this.subtype === 'multiply') {
            return (size * this.effectInfo.option1).toFixed(3)
        }
    }
}