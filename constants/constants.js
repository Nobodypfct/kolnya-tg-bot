// pdf file token with description
const descriptionDocumentToken = 'BQACAgIAAxkBAAIxGWLVpmR4fdLdO38bmP6mmT2EIMXAAAI5IAACPx-xSjbcYe2p-75jKQQ'; //file_id

const welcomeMessage = `Привет, друг👋🏼 
Здесь ты можешь:
✅ Узнать информацию о курсе
✅ Посмотреть отзывы от наших учеников`;

const errorMessage = 'Я тебя не понимаю, попробуй ещё раз';

const yearOfReviews = {
    reviewsFrom2020: '2020_data',
    reviewsFrom2021: '2021_data'
}

const firstScreenKeyboardText = {
    description: 'Информация о курсе',
    reviews: 'Отзывы учеников'
}

module.exports = { yearOfReviews, firstScreenKeyboardText, descriptionDocumentToken, welcomeMessage, errorMessage };