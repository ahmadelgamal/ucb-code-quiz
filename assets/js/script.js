// Declaring the array of q: questions, a: answers and c: correct answers
const questionsList = [
  {
    q: "Commonly used data types DO Not Include:",
    a: "<li>strings</li> <li>booleans</li> <li>alerts</li> <li>numbers</li>",
    c: "alerts",
  },
  {
    q: "The condition in an if / else statement is enclosed with ________.",
    a:
      "<li>quotes</li> <li>curly brackets</li> <li>parenthesis</li> <li>square brackets</li>",
    c: "parenthesis",
  },
  {
    q: "Arrays in JavaScript can be used to store _______.",
    a:
      "<li>numbers and strings</li> <li>other arrays</li> <li>booleans</li> <li>all of the above</li>",
    c: "all of the above",
  },
  {
    q:
      "String values must be enclosed within _______ when being assigned to variables.",
    a:
      "<li>commas</li> <li>curly brackets</li> <li>quotes</li> <li>parenthesis</li>",
    c: "quotes",
  },
  {
    q:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    a:
      "<li>JavaScript</li> <li>terminal/bash</li> <li>for loops</li> <li>console.log</li>",
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
var clearHighScoresBtn = document.getElementById("clear-ghigh-scores-btn");
var questionsListEl = document.getElementById("questions-list");
var answersListEl = document.getElementById("answers-list");
var resultEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");

// Declare variables to keep score and track question numbers
var score = 0;
var questionNumber = 0;

// Button calls function to start quiz
startBtn.onclick = startQuiz;

// Calls function to reset score and quiz and display quiz screen
function startQuiz() {
  score = 0;
  questionNumber = 0;
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
function result () {
  resultEl.textContent = "Correct!";
  displayResult();
  finalScoreEl.textContent = "Your final score is " + score + ".";
  questionNumber++;
  if (questionNumber < questionsList.length) {
    setTimeout(function () { nextQuestion() }, 2000);
  } else {
    setTimeout(function () { displayAllDone() }, 2000); //END TEST
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
