import {BaseItem} from "./BaseItem.mjs";

export class Monolith extends BaseItem{
    
    name = "Монолит"
    description = "Группировка, скорее напоминающая религиозную секту. Её члены верят, что в Центре Зоны покоится эволюционный кристалл — Монолит — неземного происхождения. Большинство сталкеров презирают адептов «Монолита», считая их «помешанными». Со времени своего образования группа препятствует продвижению сталкеров к Центру Зоны, мотивируя это недобрыми намерениями последних в отношении Монолита. По слухам, у монолитовцев есть крупная база где-то ближе к Центру Зоны, но точного её расположения не знает никто, кроме самих членов группировки."
    
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
            descriptions: ["умножает размер хуя на 0.7"],
            alert: "",
            title: ""
        }
        this.icon = "monolithCommon.png"
        this.effectInfo = {
            option1: 0.7,
        }
        
        return this
    }
    
    uncommon() {
        this.rarity = "Uncommon"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.5"],
            alert: "",
            title: ""
        }
        this.icon = "monolithUncommon.png"
        this.effectInfo = {
            option1: 0.5,
        }
        
        return this
    }
    
    rare() {
        this.rarity = "Rare"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.3"],
            alert: "",
            title: "Срабатывает на рандомную цель, которая уже сегодня замеряла хуй"
        }
        this.icon = "monolithRare.png"
        this.multiplier = 0.3
        this.effectInfo = {
            option1: 0.3,
            randomize: true
        }
        
        return this
    }
    
    legendary() {
        this.rarity = "Legendary"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["умножает размер хуя на 0.1"],
            alert: "",
            title: "Срабатывает на рандомную цель, которая уже сегодня замеряла хуй"
        }
        this.icon = "monolithLegendary.png"
        this.multiplier = 0.1
        this.effectInfo = {
            option1: 0.1,
            randomize: true
        }
        
        return this
    }
    
    async activateItem(size) {
        return (size * this.effectInfo.option1).toFixed(3)
    }
    
}