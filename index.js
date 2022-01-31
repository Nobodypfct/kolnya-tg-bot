const TelegramApi = require('node-telegram-bot-api'); 
const { yearOfReviews, firstScreenKeyboardText, descriptionDocumentToken, welcomeMessage, errorMessage } = require('./constants/constants');
const { reviews2020 } = require('./constants/reviewsData2020');
const { reviews2021 } = require('./constants/reviewsData2021');

const token = '5121108812:AAFHWX6dUkS-06yvTcJcw0XqWA97f-aNB7c';

const bot = new TelegramApi(token, { polling: true })

// bot.setMyCommands([
//     {command: '/start', description: 'Начальное приветствие'}, 
//     {command: '/info', description: 'Получить какую-нибудь инфо'}
// ])

const firstScreenKeyboard = [
    [{text: firstScreenKeyboardText.description, callback_data: '1'}],
    [{text: firstScreenKeyboardText.reviews, callback_data: '2'}],
]

const firstScreenBtnOptions = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        keyboard: firstScreenKeyboard,
    }) 
}

const reviewsKeyboard = [
    [{text: '2020', callback_data: yearOfReviews.reviewsFrom2020}],
    [{text: '2021', callback_data: yearOfReviews.reviewsFrom2021}],
    [{text: 'Назад', callback_data: 'Back'}]
]

const reviewsBtnOptions = {
    reply_markup: JSON.stringify({
        resize_keyboard: true,
        keyboard: reviewsKeyboard,
    })
}

bot.on('message', async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    // commands
    if (text === '/start') {
        // await bot.sendSticker
        return bot.sendMessage(chatId, welcomeMessage, firstScreenBtnOptions)
    }
    if (text === '/info') {
        // return bot.sendSticker
        return bot.sendMessage(chatId, 'Что-то на тестовом', firstScreenBtnOptions)
    }

    // click on first screen btns
    switch (text) {
        case firstScreenKeyboardText.description:
            return bot.sendDocument(chatId, descriptionDocumentToken)
        case firstScreenKeyboardText.reviews:
            return bot.sendMessage(chatId, 'Пожалуйста, выберите один из вариантов:', reviewsBtnOptions)
        default:
            break;
    }

    // click on reviews btns
    switch (text) {
        case '2020':
            return reviews2020.forEach(async i => {
                await bot.sendVideo(chatId, i.file_id, { caption: i.caption, reply_markup: reviewsBtnOptions })    
            })
        case '2021':
            return reviews2021.forEach(async i => {
                await bot.sendVideo(chatId, i.file_id, { caption: i.caption, reply_markup: reviewsBtnOptions })    
            })
        
        case 'Назад': 
            return bot.sendMessage(chatId, 'Пожалуйста, выберите один из вариантов:', firstScreenBtnOptions)
        default:
            break;
    }
    console.log('msg', msg, msg.text)

    // if the user sent another message
    return bot.sendMessage(chatId, errorMessage)
})