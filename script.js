const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const quizStartButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-box");
const answerContainer = document.getElementById("options-container");
const curretQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("Total-questions");
const scoreSpan = document.getElementById("score-number");
const finalScoreSpan = document.getElementById("correct-ans");
const restartButton = document.getElementById("restart-quiz");
const progressBar = document.getElementById("progress");
const resultMessage = document.getElementById("result-message");

const quizQuestions = [
  {
    question: "What is the capital of Australia?",
    answer: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbance", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "Who invented the light bulb?",
    answer: [
      { text: "Nikola Tesla", correct: false },
      { text: "Thomas Edison", correct: true },
      { text: "Alexander Graham Bell", correct: false },
      { text: "Albert Einstein", correct: false },
    ],
  },
  {
    question: "Which is the largest ocean on Earth?",
    answer: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "In computing, what does HTTP stand for?",
    answer: [
      { text: "Hyper Text Transfer Protocol", correct: true },
      { text: "High Tech Text Program", correct: false },
      { text: "Hyper Transfer Text Process", correct: false },
      { text: "Home Tool Transfer Protocol", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;

quizStartButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // console.log("The Quiz has started");
  //Reset the VARS
  currentQuestionIndex = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestions();
}
function showQuestions() {
  //reset state
  answerDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  curretQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}
function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    //Check: if there are more questions or the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestions();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const percentage = (score / quizQuestions.length) * 100;
  finalScoreSpan.textContent = score;
  totalQuestionSpan.textContent = quizQuestions.length;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great Job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
