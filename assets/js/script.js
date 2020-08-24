// Declaring the array of q: questions, a: answers and c: correct answers
const questionsList = [
  {
    q: "Commonly used data types DO Not Include:",
    a: ["strings", "booleans", "alerts", "numbers"],
    c: "alerts",
  },
  {
    q: "The condition in an if / else statement is enclosed with ________.",
    a: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    c: "parenthesis",
  },
  {
    q: "Arrays in JavaScript can be used to store _______.",
    a: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    c: "all of the above",
  },
  {
    q:
      "String values must be enclosed within _______ when being assigned to variables.",
    a: ["commas", "curly brackets", "quotes", "parenthesis"],
    c: "quotes",
  },
  {
    q:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    c: "console.log",
  },
];

// Declaring variables to represent the different HTML elements and buttons needed for this project
var headerEl = document.getElementById("header");
var viewHighScoresEl = document.getElementById("view-high-scores");
var timerEl = document.getElementById("timer");
var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start-quiz-btn");
var goBackBtn = document.getElementById("go-back-btn");
var clearHighScoresBtn = document.getElementById("clear-high-scores-btn");
var questionsListEl = document.getElementById("questions-list");
var answersListEl = document.getElementById("answers-list");
var resultEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");

// Button calls function to start quiz
startBtn.onclick = startQuiz;

// Declare variables to keep score and track question numbers
var score = 0;
var questionNumber = 0;
// Calls function to reset score and quiz and display quiz screen
function startQuiz() {
  score = 0; // Resets score to 0
  questionNumber = 0; // Resets quiz to first question
  displayQuiz();
  countdown();
  nextQuestion();
}

// Set and display questions and answers
function nextQuestion() {
  hideResult();
  questionsListEl.innerHTML = questionsList[questionNumber].q;
  answersListEl.innerHTML = questionsList[questionNumber].a;
  answersListEl.addEventListener("click", result);
}

// Event to display next question in quiz
questionsListEl.onclick = nextQuestion;

// Function to display result and update and display score
function result() {
  resultEl.textContent = "Correct!"; // Need to change code to check if answer is correct
  displayResult();
  finalScoreEl.textContent = "Your final score is " + score + ".";
  questionNumber++;
  if (questionNumber < questionsList.length) {
    setTimeout(function () {
      nextQuestion();
    }, 2000);
  } else {
    setTimeout(function () {
      displayAllDone();
    }, 2000); //END TEST
  }
}

// Declaring the different views/screens to turn them on and off
var startQuizScreen = document.getElementById("start-quiz-screen");
var quizScreen = document.getElementById("quiz-screen");
var resultScreen = document.getElementById("result-screen");
var allDoneScreen = document.getElementById("all-done-screen");
var highScoresScreen = document.getElementById("high-scores-screen");

// Turn off start quiz screen and turn on quiz screen
function displayQuiz() {
  startQuizScreen.style.display = "none";
  quizScreen.style.display = "initial";
}

// Display result for each question after answer
function displayResult() {
  resultScreen.style.display = "initial";
}

// Hide result for each question before answer
function hideResult() {
  resultScreen.style.display = "none";
}

// Timer that counts down from 75 seconds
function countdown() {
  var timeLeft = 20; // change to 75

  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "0";
      clearInterval(timeInterval);
      displayAllDone(); // END TEST
    }
  }, 1000); // Timer interval in milliseconds
}

// End of test
function displayAllDone() {
  headerEl.style.visibility = "visible";
  startQuizScreen.style.display = "none";
  quizScreen.style.display = "none";
  highScoresScreen.style.display = "none";
  allDoneScreen.style.display = "initial";
}

// Event to display high scores screen
viewHighScoresEl.onclick = displayHighScores;

// Display High Scores screen
function displayHighScores() {
  headerEl.style.visibility = "hidden";
  startQuizScreen.style.display = "none";
  quizScreen.style.display = "none";
  allDoneScreen.style.display = "none";
  highScoresScreen.style.display = "initial";
}

// Button from high scores screen to go back to start quiz screen
goBackBtn.onclick = displayGoBack;

// The go back button in the High Scores screen
function displayGoBack() {
  headerEl.style.visibility = "visible";
  highScoresScreen.style.display = "none";
  startQuizScreen.style.display = "initial";
}
