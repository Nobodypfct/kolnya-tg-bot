// pdf file token with description
const descriptionDocumentToken = 'BQACAgIAAxkBAAMkYd8xOGqRBl_vorkBjZYLpglPHhIAAo8UAAI5NfhKWRQxlxhxjv0jBA'; 

const welcomeMessage = `Привет, друг👋🏼 
Здесь ты можешь:
✅ узнать информацию о курсе
✅ посмотреть отзывы от наших учеников`;

const errorMessage = 'Я тебя не понимаю, попробуй ещё раз';

const yearOfReviews = {
    reviewsFrom2020: '2020_data',
    reviewsFrom2021: '2021_data'
}

const firstScreenKeyboardText = {
    description: 'Узнать подробности об обучении',
    reviews: 'Отзывы учеников'
}

module.exports = { yearOfReviews, firstScreenKeyboardText, descriptionDocumentToken, welcomeMessage, errorMessage };