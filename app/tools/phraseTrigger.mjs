
const phrases = {
    chilin: {
        triggers: ['бин чилин', 'бин чилинг'],
        answers: ['бин чилинг', 'бин чилин']
    },
    ponti: {
        triggers: ['понты', 'понт', 'понтов', 'понтовать', 'понтовал', 'понтуюсь'],
        answers: ['точно понты', 'точно понт', 'понты', 'отвечаю понты']
    
    },
    ksta: {
        triggers: [' кста '],
        answers: ['ну вот и че, дохуя времени сэкономил? че сложно было полностью написать слово "кстати"?']
    }
}

// maybe add some ai magic here and there
// https://huggingface.co/rakepants/ruDialoGPT-medium-finetuned-toxic?not-for-all-audiences=true

export async function textTriggersHandler(ctx) {
    let text = ctx.message.text.toLowerCase()
    let phraseType = ''
    
    for (const key of Object.keys(phrases)) {
        const val = phrases[key]['triggers'];
        
        if (val.some(v => text.includes(v))) {
            phraseType = key
        }
    }
    
    switch (phraseType) {
        case 'chilin': {
            await ctx.reply(getRandomAnswer(phraseType), {reply_to_message_id: ctx.message.message_id})
            break
        }
        case 'ponti': {
            await ctx.reply(getRandomAnswer(phraseType), {reply_to_message_id: ctx.message.message_id})
            break
        }
        case 'ksta': {
            await ctx.reply(getRandomAnswer(phraseType), {reply_to_message_id: ctx.message.message_id})
            break
        }
        default: {
            break
        }
    }
    
}

function getRandomAnswer(phraseType) {
    let answers = phrases[phraseType]['answers']
    return answers[Math.floor(Math.random() * answers.length)]
}