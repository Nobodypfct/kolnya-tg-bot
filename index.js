const TelegramApi = require('node-telegram-bot-api'); 
const http = require('http');
const { yearOfReviews, firstScreenKeyboardText, descriptionDocumentToken, welcomeMessage, errorMessage } = require('./constants/constants');
const { reviews2020 } = require('./constants/reviewsData2020');
const { reviews2021 } = require('./constants/reviewsData2021');

const token = '5121108812:AAFHWX6dUkS-06yvTcJcw0XqWA97f-aNB7c';

const port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });

server.listen(port, () => {
    console.log("App is running on port " + port);
});

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

    // click on first screen btns
    switch (text) {
        case firstScreenKeyboardText.description:
            await bot.sendDocument(chatId, descriptionDocumentToken)
            await bot.sendMessage(chatId, 'Задать вопросы или записаться на курс 👉🏼 @hvatiit_maks', firstScreenBtnOptions)
            break;
        case firstScreenKeyboardText.reviews:
            return bot.sendMessage(chatId, 'Пожалуйста, выберите один из вариантов:', reviewsBtnOptions)
        default:
            break;
    }

    const functionThatReturnsAPromise = async i => { //a function that returns a promise
        await bot.sendVideo(chatId, i.file_id, { caption: i.caption, reply_markup: reviewsBtnOptions })
        return Promise.resolve('ok')
    }

    const doSomethingAsync = async item => {
        return functionThatReturnsAPromise(item)
    }

    const sendReviews = async (list) => {
        return Promise.all(list.map(item => doSomethingAsync(item)))
    }

    // const sendReviews = async (array) => {
    //     await array.forEach(async i => {
    //         bot.sendVideo(chatId, i.file_id, { caption: i.caption, reply_markup: reviewsBtnOptions })
    //     })
    // }

    // click on reviews btns
    switch (text) {
        case 'Задать вопросы или записаться на курс 👉🏼 @hvatiit_maks':
            return;
        case '2020':
            sendReviews(reviews2020).then(data => {
                bot.sendMessage(chatId, 'Задать вопросы или записаться на курс 👉🏼 @hvatiit_maks', reviewsBtnOptions)
            })
            break;
        case '2021':
            sendReviews(reviews2021).then(data => {
                bot.sendMessage(chatId, 'Задать вопросы или записаться на курс 👉🏼 @hvatiit_maks', reviewsBtnOptions)
            })
            bot.sendMessage(chatId, 'Задать вопросы или записаться на курс 👉🏼 @hvatiit_maks', reviewsBtnOptions)      
            break;  
        case 'Назад': 
            return bot.sendMessage(chatId, 'Пожалуйста, выберите один из вариантов:', firstScreenBtnOptions)
        default:
            break;
    }
    console.log('msg', msg, msg.text)

    // if the user sent another message
    return bot.sendMessage(chatId, errorMessage)
})