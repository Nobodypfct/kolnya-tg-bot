// pdf file token with description
const descriptionDocumentToken = 'BQACAgIAAxkBAAIYR2JBuF10BGlvKcm8rdEvAaY1pc7_AALtGAACimUJSp3Nt4yjim8PIwQ'; 

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