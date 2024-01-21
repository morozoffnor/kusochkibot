export class Gondonfedi {
    common(createdBy)  {
        return {
            name: "Гондон Феди",
            description: "Легенда изгнанного Высшими Богами Кусков Виталия гласит, что в далеком 2014 году, один из основателей Кусков, Федя, решил изучить запретное для него по меркам того времени и возраста в котором он пребывал, искусство сексуальных практик высшего уровня. Надев резиновую броню, предназначенную для ношения лишь во время совершения коитуса, он ощутил невероятнейший прилив сил и сексуальной энергии, что решил для себя носить его в течение суток.\n" +
              "\n\n" +
              "Никто не знает достоверность данной истории, но известно лишь одно: данная легенда трактовалась Старейшинами Кусков вплоть до изгнания провинившегося Виталия. Кто знает, возможно это все была клевета, которую он вынашивал в своем больном разуме?",
            rarity: "Common",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["[lowest ever] * 5"],
                alert: "",
                title: ""
            },
            createdBy: createdBy,
            icon: "condomCommon.png",
            multiplier: 5
            
        }
    }
    
    uncommon(createdBy)  {
        return {
            name: "Гондон Феди",
            description: "Легенда изгнанного Высшими Богами Кусков Виталия гласит, что в далеком 2014 году, один из основателей Кусков, Федя, решил изучить запретное для него по меркам того времени и возраста в котором он пребывал, искусство сексуальных практик высшего уровня. Надев резиновую броню, предназначенную для ношения лишь во время совершения коитуса, он ощутил невероятнейший прилив сил и сексуальной энергии, что решил для себя носить его в течение суток.\n" +
              "\n\n" +
              "Никто не знает достоверность данной истории, но известно лишь одно: данная легенда трактовалась Старейшинами Кусков вплоть до изгнания провинившегося Виталия. Кто знает, возможно это все была клевета, которую он вынашивал в своем больном разуме?",
            rarity: "Uncommon",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["[lowest ever] * 3"],
                alert: "",
                title: ""
            },
            createdBy: createdBy,
            icon: "condomUncommon.png",
            multiplier: 3
            
        }
    }
    
    rare(createdBy)  {
        return {
            name: "Гондон Феди",
            description: "Легенда изгнанного Высшими Богами Кусков Виталия гласит, что в далеком 2014 году, один из основателей Кусков, Федя, решил изучить запретное для него по меркам того времени и возраста в котором он пребывал, искусство сексуальных практик высшего уровня. Надев резиновую броню, предназначенную для ношения лишь во время совершения коитуса, он ощутил невероятнейший прилив сил и сексуальной энергии, что решил для себя носить его в течение суток.\n" +
              "\n\n" +
              "Никто не знает достоверность данной истории, но известно лишь одно: данная легенда трактовалась Старейшинами Кусков вплоть до изгнания провинившегося Виталия. Кто знает, возможно это все была клевета, которую он вынашивал в своем больном разуме?",
            rarity: "Rare",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["[lowest ever] * 2"],
                alert: "",
                title: ""
            },
            createdBy: createdBy,
            icon: "condomRare.png",
            multiplier: 2
            
        }
    }
    
    legendary(createdBy)  {
        return {
            name: "Гондон Феди",
            description: "Легенда изгнанного Высшими Богами Кусков Виталия гласит, что в далеком 2014 году, один из основателей Кусков, Федя, решил изучить запретное для него по меркам того времени и возраста в котором он пребывал, искусство сексуальных практик высшего уровня. Надев резиновую броню, предназначенную для ношения лишь во время совершения коитуса, он ощутил невероятнейший прилив сил и сексуальной энергии, что решил для себя носить его в течение суток.\n" +
              "\n\n" +
              "Никто не знает достоверность данной истории, но известно лишь одно: данная легенда трактовалась Старейшинами Кусков вплоть до изгнания провинившегося Виталия. Кто знает, возможно это все была клевета, которую он вынашивал в своем больном разуме?",
            rarity: "Legendary",
            type: "math",
            subtype: "multiply",
            effect: {
                descriptions: ["[lowest ever]"],
                alert: "",
                title: ""
            },
            createdBy: createdBy,
            icon: "condomLegendary.png",
            multiplier: 1
            
        }
    }
    
    useItem(user, item) {
        return user.cockStats.lowestSize * item.multiplier
    }
}