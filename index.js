const TelegramApi = require('node-telegram-bot-api'); 
const http = require('http');

const { yearOfReviews, firstScreenKeyboardText, descriptionDocumentToken, welcomeMessage, errorMessage, commonEndMessage, chooseMessage } = require('./constants/constants');
const { reviews2020 } = require('./constants/reviewsData2020');
const { reviews2021 } = require('./constants/reviewsData2021');

const token = '5121108812:AAFHWX6dUkS-06yvTcJcw0XqWA97f-aNB7c'; // kolnya_school_bot
// const token = '5123162187:AAHondwdhh8e7YAx_-2c-7YrJPAezk4mwI8'; //test bot

const port = process.env.PORT || 8000;

const server = http.createServer(async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });

server.listen(port, () => {
    console.log("App is running on port " + port);
});

const bot = new TelegramApi(token, { polling: true })

bot.setMyCommands([
    {command: '/start', description: 'Старт'}, 
])

// buttons for first screen
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

// buttons for reviews
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
        return bot.sendMessage(chatId, welcomeMessage, firstScreenBtnOptions)
    }

    // click on first screen btns
    switch (text) {
        case firstScreenKeyboardText.description:
            await bot.sendDocument(chatId, descriptionDocumentToken)
            return bot.sendMessage(chatId, commonEndMessage, firstScreenBtnOptions)
            
        case firstScreenKeyboardText.reviews:
            return bot.sendMessage(chatId, chooseMessage, reviewsBtnOptions)
        default:
            break;
    }

    const sendReviews = (list) => {
        // TODO: figure out in asynchrony and send reviews in sequential order
        return Promise.all(list.map(async item => {
            await bot.sendVideo(chatId, item.file_id, { caption: item.caption, reply_markup: reviewsBtnOptions })
        }))
    }

    // click on reviews btns
    switch (text) {
        case '2020':
            return sendReviews(reviews2020).then(() => {
                return bot.sendMessage(chatId, commonEndMessage, reviewsBtnOptions)
            })
        case '2021':
            return sendReviews(reviews2021).then(() => {
                return bot.sendMessage(chatId, commonEndMessage, reviewsBtnOptions)
            })      
        case 'Назад': 
            return bot.sendMessage(chatId, chooseMessage, firstScreenBtnOptions)
        default:
            break;
    }

    // if the user sent another (unknown) message
    return bot.sendMessage(chatId, errorMessage)
})