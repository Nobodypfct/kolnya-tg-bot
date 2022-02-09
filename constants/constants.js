// pdf file token with description
const descriptionDocumentToken = 'BQACAgIAAxkBAAIO-mID5Oc2zahpITGj1vzZ_dFvEpnlAAL3EgACf6sYSF5SArc6Tp9yIwQ'; 

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