// pdf file token with description
const descriptionDocumentToken = 'BQACAgIAAxkBAAI0q2LqkweAjurnUgaajitEaIy8dOEzAAKLHQACfCtQS5OZxaQQ1ZrMKQQ'; // description file_id

const welcomeMessage = `Привет, друг👋🏼 
Здесь ты можешь:
✅ Узнать информацию о курсе
✅ Посмотреть отзывы от наших учеников`;

const errorMessage = 'Я тебя не понимаю, попробуй ещё раз';

const commonEndMessage = `Задать вопросы или записаться на курс 👉🏼 @hvatiit_maks`;

const chooseMessage = `Пожалуйста, выберите один из вариантов:`

const yearOfReviews = {
    reviewsFrom2020: '2020_data',
    reviewsFrom2021: '2021_data'
}

const firstScreenKeyboardText = {
    description: 'Информация о курсе',
    reviews: 'Отзывы учеников'
}

module.exports = { yearOfReviews, firstScreenKeyboardText, descriptionDocumentToken, welcomeMessage, errorMessage, commonEndMessage, chooseMessage };