import {Telegraf} from "telegraf";

export const createInline = async (ctx) => {
    let newArr = [];
    if (true) {
        newArr[0] = {
            type: 'article',
            id: 0,
            title: 'У кого меньше',
            description: 'у того больше',
            input_message_content: {message_text: 1}
        };
    } else {
        newArr[0] = {
            type: 'article',
            id: 1,
            title: 'Твой хуй на кулдауне',
            description: 'бедняга',
            input_message_content: '{message_text: "Мой хуй на кулдауне, а я его всё ещё дрюкаю"}'
        };
    }
    console.log('klsdfgj')
    return ctx.answerInlineQuery(newArr, {cache_time: 0});
}