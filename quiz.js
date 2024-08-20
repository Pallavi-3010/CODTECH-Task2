/* quiz.js*/

const quizData = [
    {
        question: "What is the capital of France?",
        a: "Berlin",
        b: "Madrid",
        c: "Paris",
        d: "Lisbon",
        correct: "c"
    },
    {
        question: "Who is the CEO of Tesla?",
        a: "Bill Gates",
        b: "Elon Musk",
        c: "Jeff Bezos",
        d: "Steve Jobs",
        correct: "b"
    },
    {
        question: "What is the largest ocean on Earth?",
        a: "Atlantic Ocean",
        b: "Indian Ocean",
        c: "Arctic Ocean",
        d: "Pacific Ocean",
        correct: "d"
    },
    {
        question: "In which year did the Titanic sink?",
        a: "1912",
        b: "1920",
        c: "1898",
        d: "1916",
        correct: "a"
    },
    {
        question: "Which planet is known as the Red Planet?",
        a: "Earth",
        b: "Mars",
        c: "Jupiter",
        d: "Saturn",
        correct: "b"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const submitButton = document.getElementById('submit');
const scoreElement = document.getElementById('score');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const feedbackElement = document.getElementById('feedback');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    choicesElement.innerHTML = '';

    for (let option in currentQuestion) {
        if (option !== 'question' && option !== 'correct') {
            const li = document.createElement('li');
            li.innerHTML = <input type="radio" name="answer" value="${option}"> ${currentQuestion[option]};
            choicesElement.appendChild(li);
        }
    }
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) return;  // Do nothing if no option is selected

    const answer = selectedOption.value;

    if (answer === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    scoreElement.innerText = ${score} out of ${quizData.length};

    let feedback;
    if (score === quizData.length) {
        feedback = "Excellent! You got a perfect score!";
    } else if (score >= quizData.length * 0.7) {
        feedback = "Great job! You did really well.";
    } else if (score >= quizData.length * 0.4) {
        feedback = "Not bad, but there's room for improvement.";
    } else {
        feedback = "Better luck next time. Keep practicing!";
    }

    feedbackElement.innerText = feedback;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    loadQuestion();
}

window.onload = loadQuestion;
