const mainScreen = document.getElementById('main-screen')
const quizScreen = document.getElementById('quiz-screen')
const resultScreen = document.getElementById('result-screen')
const numberScreen = document.getElementById('number-screen')

const questionCounter = document.getElementById('q-counter')
const currentNumber = document.getElementById('current-number')
const allNumber = document.getElementById('all-number')

const mainStartButton = document.getElementById('main-start-button')
const mainChangeButton = document.getElementById('main-change-button')
const resultReturnButton = document.getElementById('result-return-button')
const numberReturnButton = document.getElementById('number-return-button')
const quizNextButton = document.getElementById('quiz-next-button')
const quizFinishButton = document.getElementById('quiz-finish-button')

const resultAllNumber = document.getElementById('result-all-number')
const resultNumber = document.getElementById('result-number')

const quizAllNumber = document.getElementById('all-number')
const quizCurrentNumber = document.getElementById('current-number')

const inputNumber = document.getElementById('input-number')
const buttonNumber = document.getElementById('button-number')
const qNumber = document.getElementById('qnumber')
const infoNumber = document.getElementById('info-text')

const option1 = document.getElementById('option1')
const option2 = document.getElementById('option2')
const option3 = document.getElementById('option3')
const option4 = document.getElementById('option4')
const answer1 = document.getElementById('answer1')
const answer2 = document.getElementById('answer2')
const answer3 = document.getElementById('answer3')
const answer4 = document.getElementById('answer4')
const questionText = document.getElementById('question-text')
const errorText = document.getElementById('error-text')

const logo = document.getElementById('logo')

let numberOfQuestions = 5
let totalResult = 0
let currentAnswer = ''
let correctAnswer = ''
let currentQuestion = 1
let questionId = 0
let isError = false

mainStartButton.addEventListener('click', event => {
    event.preventDefault()
    showQuizScreen()
})

mainChangeButton.addEventListener('click', event => {
    event.preventDefault()
    showNumberScreen()
})

resultReturnButton.addEventListener('click', event => {
    event.preventDefault()
    showMainScreen()
})

logo.addEventListener('click', event => {
    event.preventDefault()
    showMainScreen()
})

numberReturnButton.addEventListener('click', event => {
    event.preventDefault()
    showMainScreen()
})

quizNextButton.addEventListener('click', event => {
    event.preventDefault()
    showNextQuestion()
})

quizFinishButton.addEventListener('click', event => {
    event.preventDefault()
    checkAnswer()
    showResultScreen()
})

buttonNumber.addEventListener('click', event => {
    event.preventDefault()
    if ((Number(inputNumber.value) > 0) && (Number(inputNumber.value) < 101)) {
        infoNumber.classList.remove('error-state')
        inputNumber.classList.remove('error-state')
        numberOfQuestions = Number(inputNumber.value)
        qNumber.innerHTML = numberOfQuestions
        inputNumber.value = ''
    } else {
        infoNumber.classList.add('error-state')
        inputNumber.classList.add('error-state')
    }
    
    
})

function showMainScreen() {
    quizScreen.classList.add('hidden')
    numberScreen.classList.add('hidden')
    resultScreen.classList.add('hidden')
    questionCounter.classList.add('hidden')
    mainScreen.classList.remove('hidden')
    errorText.classList.add('hidden')

    totalResult = 0
    currentAnswer = ''
    currentQuestion = 1
    questionId = ''
    isError = false
}

function showNumberScreen() {
    quizScreen.classList.add('hidden')
    mainScreen.classList.add('hidden')
    resultScreen.classList.add('hidden')
    questionCounter.classList.add('hidden')
    numberScreen.classList.remove('hidden')
    qNumber.innerHTML = numberOfQuestions
}

function showResultScreen() {
    quizScreen.classList.add('hidden')
    numberScreen.classList.add('hidden')
    mainScreen.classList.add('hidden')
    questionCounter.classList.add('hidden')
    resultScreen.classList.remove('hidden')
    resultAllNumber.innerHTML = numberOfQuestions
    resultNumber.innerHTML = totalResult
}

function showQuizScreen() {
    resultScreen.classList.add('hidden')
    numberScreen.classList.add('hidden')
    mainScreen.classList.add('hidden')
    quizScreen.classList.remove('hidden')
    questionCounter.classList.remove('hidden')
    allNumber.innerHTML = numberOfQuestions
    currentNumber.innerHTML = currentQuestion
    quizNextButton.classList.remove('hidden')
    quizFinishButton.classList.add('hidden')
    showQuestion()
}

function showNextQuestion() {
    checkAnswer()
    if (!isError) {
        currentQuestion = Number(currentQuestion) + 1
        currentNumber.innerHTML = currentQuestion
        if (Number(currentQuestion) === Number(numberOfQuestions)) {
            quizNextButton.classList.add('hidden')
            quizFinishButton.classList.remove('hidden')
        }
    showQuestion()
    }  
}

function checkAnswer() {
    errorText.classList.add('hidden')
    isError = false
    if (option1.checked == true) {
        currentAnswer = 'a'
    } else if (option2.checked == true) {
        currentAnswer = 'b'
    } else if (option3.checked == true) {
        currentAnswer = 'c'
    } else if (option4.checked == true){
        currentAnswer = 'd'
    } else {
        errorText.classList.remove('hidden')
        isError = true
    }
    if (!isError) {
        if (currentAnswer === correctAnswer) {
            totalResult = totalResult + 1
        }
    }
}

function showQuestion() {
    option1.checked = false
    option2.checked = false
    option3.checked = false
    option4.checked = false

    questionId = Math.floor(Math.random()*(51))

    let jsonFile = `data/list.json`
    fetch(jsonFile)
    .then((response) => response.json()) 
    .then((data) => {
        questionText.innerHTML = data.result[questionId].question
        answer1.innerHTML = data.result[questionId].a
        answer2.innerHTML = data.result[questionId].b
        answer3.innerHTML = data.result[questionId].c
        answer4.innerHTML = data.result[questionId].d
        correctAnswer = data.result[questionId].correct
      })

}