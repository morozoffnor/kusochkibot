export class Bolt {
    common() {
        return {
            name: "Болтище",
            description: "Очень хорошо кладется на все дела любой сложности и срочности. Самый распространенный предмет в быту.",
            rarity: "Common",
            type: "debuff",
            subtype: "addition",
            effect: {
                descriptions: ["прибавляет к размеру хуя цели 5см"],
                alert: "",
                title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня. Если у цели уже есть активный предмет, то болт его заменит собой. Но цель так же может использовать предмет, чтобы избавиться от болта.\n\n"
            },
            icon: "boltCommon.png",
            effectInfo: {
                option1: 5,
            }
            
        }
    }
    
    uncommon() {
        return {
            name: "Болтище",
            description: "Очень хорошо кладется на все дела любой сложности и срочности. Самый распространенный предмет в быту.",
            rarity: "Uncommon",
            type: "debuff",
            subtype: "addition",
            effect: {
                descriptions: ["прибавляет к размеру хуя цели 10см"],
                alert: "",
                title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня. Если у цели уже есть активный предмет, то болт его заменит собой. Но цель так же может использовать предмет, чтобы избавиться от болта.\n\n"
            },
            icon: "boltUncommon.png",
            effectInfo: {
                option1: 10,
            }
            
        }
    }
    
    rare() {
        return {
            name: "Болтище",
            description: "Очень хорошо кладется на все дела любой сложности и срочности. Самый распространенный предмет в быту.",
            rarity: "Rare",
            type: "debuff",
            subtype: "multiply",
            effect: {
                descriptions: ["умножает размер хуя цели на 2"],
                alert: "",
                title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня. Если у цели уже есть активный предмет, то болт его заменит собой. Но цель так же может использовать предмет, чтобы избавиться от болта.\n\n"
            },
            icon: "boltRare.png",
            effectInfo: {
                option1: 2,
            }
            
        }
    }
    
    legendary() {
        return {
            name: "Болтище",
            description: "Очень хорошо кладется на все дела любой сложности и срочности. Самый распространенный предмет в быту.",
            rarity: "Legendary",
            type: "debuff",
            subtype: "multiply",
            effect: {
                descriptions: ["умножает размер хуя цели на 5"],
                alert: "",
                title: "Использовать предмет можно только на тех, кто уже замерял хуй сегодня. Если у цели уже есть активный предмет, то болт его заменит собой. Но цель так же может использовать предмет, чтобы избавиться от болта.\n\n"
            },
            icon: "boltLegendary.png",
            effectInfo: {
                option1: 5,
            }
            
        }
    }
    
    async useItem(item, size) {
        if (item.subtype === 'addition') {
            return size + item.effectInfo.option1
        }
        if (item.subtype === 'multiply') {
            return (size * item.effectInfo.option1).toFixed(3)
        }
    }
    
}