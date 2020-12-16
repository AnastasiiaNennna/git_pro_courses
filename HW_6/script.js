'use strict'

const PROMPT_QUESTION = 'prompt';
const CONFIRM_QUESTION = 'confirm';

const questionnaire = [
    {
        type: PROMPT_QUESTION,
        question: 'Сколько будет 2+2?',
        answer: '4',   
    },
    {
        type: CONFIRM_QUESTION,
        question: 'Солнце встает на востоке?',
        answer: false
    },
    {
        type: PROMPT_QUESTION,
        question: 'Сколько будет 5 / 0?',
        answer: 'infinity',    
    },
    {
        type: PROMPT_QUESTION,
        question: 'Какого цвета небо?',
        answer: 'голубого',   
    },
    {
        type: PROMPT_QUESTION,
        question: 'Как правильный ответ на главный вопрос жизни, вселенной и всего такого.' ,
        answer: '42',    
    },
];

const userAnswers = getAnswers();

const userPoints = calcPoints();

showResults(userPoints);

function getAnswers() {
    return questionnaire.map((questions) => combineAnswers(questions));
};

function combineAnswers(questions) {
    let answers;
    if (questions.type === PROMPT_QUESTION){
        answers = prompt(questions.question)
    } else {
        answers = confirm(questions.question)
    };
    return answers;
};

function calcPoints() {
    let correctAnswers = getCorrectAnswers();
    let result = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
        if (userAnswers[i] === correctAnswers[i]) {
            result += 10;
        } else { 
            result += 0;
        };
    };
    return result;
};

function getCorrectAnswers() {
    return questionnaire.map(({ answer }) => answer);
};

function showResults(points) {
    alert(`Поздравляю! Твой результат: ${points} баллов`);
};
