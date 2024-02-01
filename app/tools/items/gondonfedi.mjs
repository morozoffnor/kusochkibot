import {BaseItem} from "./BaseItem.mjs";

export class Gondonfedi extends BaseItem {
    
    name = "Гондон Феди"
    description = "Легенда изгнанного Высшими Богами Кусков Виталия гласит, что в далеком 2014 году, один из основателей Кусков, Федя, решил изучить запретное для него по меркам того времени и возраста в котором он пребывал, искусство сексуальных практик высшего уровня. Надев резиновую броню, предназначенную для ношения лишь во время совершения коитуса, он ощутил невероятнейший прилив сил и сексуальной энергии, что решил для себя носить его в течение суток.\n" +
      "\n\n" +
      "Никто не знает достоверность данной истории, но известно лишь одно: данная легенда трактовалась Старейшинами Кусков вплоть до изгнания провинившегося Виталия. Кто знает, возможно это все была клевета, которую он вынашивал в своем больном разуме?"
    
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
            descriptions: ["[lowest ever] * 5"],
            alert: "",
            title: ""
        }
        this.icon = "condomCommon.png"
        this.multiplier = 5
        
        return this
    }
    
    uncommon() {
        this.rarity = "Uncommon"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["[lowest ever] * 3"],
            alert: "",
            title: ""
        }
        this.icon = "condomUncommon.png"
        this.multiplier = 3
        
        return this
    }
    
    rare() {
        this.rarity = "Rare"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["[lowest ever] * 2"],
            alert: "",
            title: ""
        }
        this.icon = "condomRare.png"
        this.multiplier = 2
        
        return this
    }
    
    legendary() {
        this.rarity = "Legendary"
        this.type = "math"
        this.subtype = "multiply"
        this.effect = {
            descriptions: ["[lowest ever]"],
            alert: "",
            title: ""
        }
        this.icon = "condomLegendary.png"
        this.multiplier = 1
        
        return this
    }
    
    useItem(user) {
        return (user.cockStats.lowestSize * this.multiplier).toFixed(3)
    }
}