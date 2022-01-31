// pdf file token with description
const descriptionDocumentToken = 'BQACAgIAAxkBAANkYfgn7kJVj2NzxDoR4fbqNpBT_b4AAgsYAAJ-N8FLO_WhEZm7XzgjBA'; 

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