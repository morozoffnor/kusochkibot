export class Minimizer300 {
    common(createdBy = 0) {
        return {
            name: "Уменьшатор 3000",
            description: "фуфелшмерц мне похурейтед",
            rarity: "Common",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["умножает размер хуя на 0.5"],
                alert: "",
                title: ""
            },
            icon: "scissorsCommon.png",
            multiplier: 0.5
            
        }
    }
    
    uncommon(createdBy = 0) {
        return {
            name: "Уменьшатор 3000",
            description: "фуфелшмерц мне похурейтед",
            rarity: "Uncommon",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["умножает размер хуя на 0.4"],
                alert: "",
                title: ""
            },
            icon: "scissorsUncommon.png",
            multiplier: 0.4
            
        }
    }
    
    rare(createdBy = 0) {
        return {
            name: "Уменьшатор 3000",
            description: "фуфелшмерц мне похурейтед",
            rarity: "Rare",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["умножает размер хуя на 0.3"],
                alert: "",
                title: ""
            },
            icon: "scissorsRare.png",
            multiplier: 0.3
            
        }
    }
    
    legendary(createdBy = 0) {
        return {
            name: "Уменьшатор 3000",
            description: "фуфелшмерц мне похурейтед",
            rarity: "Legendary",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["умножает размер хуя на 0.2"],
                alert: "",
                title: ""
            },
            icon: "scissorsLegendary.png",
            multiplier: 0.2
            
        }
    }
    
    async useItem(item, size) {
        return (size * item.multiplier).toFixed(3)
    }
    
}