/* -------------------- BEGINS DECLARING GLOBAL VARIABLES -------------------- */
/* ---------- declares the different views/screens to turn them on and off ---------- */
var startQuizScreenEl = document.getElementById("start-quiz-screen");
var quizScreenEl = document.getElementById("quiz-screen");
var resultScreenEl = document.getElementById("result-screen");
var allDoneScreenEl = document.getElementById("all-done-screen");
var highScoresScreenEl = document.getElementById("high-scores-screen");

/* ---------- declares variables to represent the different html elements and buttons needed for this project ---------- */
var headerEl = document.getElementById("header");
var viewHighScoresEl = document.getElementById("view-high-scores");
var timerEl = document.getElementById("timer");
var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start-quiz-btn");
var goBackBtn = document.getElementById("go-back-btn");
var clearHighScoresBtn = document.getElementById("clear-high-scores-btn");
var questionEl = document.getElementById("question");
var answersListEl = document.getElementById("answers-list");
var resultEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");
var highScoreFormEl = document.getElementById("high-score-form");
var initialsEl = document.getElementById("initials");
var initialsBtn = document.getElementById("initials-btn");
var missingInitialsEl = document.getElementById("missing-initials");
var highScoresListEl = document.getElementById("high-scores-list");

// declares the array of multiple choice questions (objects): q: questions, a: answers and c: correct answers
const mcq = [
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

/* ---------- other declarations ---------- */
// declares timer for quiz
var timeLeft;

// tracks current question number
var questionNumber = 0;

// keeps score
var score = 0;

// stores high scores
var highScoresLS = [];
/* -------------------- ENDS DECLARING GLOBAL VARIABLES -------------------- */

/* -------------------- BEGINS DISPLAYS -------------------- */
// turns off start quiz screen and turns on quiz screen
function displayQuiz() {
  startQuizScreenEl.style.display = "none";
  quizScreenEl.style.display = "initial";
}

// displays result for each question after answer
function displayResult() {
  resultScreenEl.style.display = "initial";
}

// hides result for each question before answer
function hideResult() {
  resultScreenEl.style.display = "none";
}

// displays all done screen
function displayAllDone() {
  headerEl.style.visibility = "visible";
  startQuizScreenEl.style.display = "none";
  quizScreenEl.style.display = "none";
  highScoresScreenEl.style.display = "none";
  allDoneScreenEl.style.display = "initial";
}

// displays high scores screen
function displayHighScores() {
  headerEl.style.visibility = "hidden";
  startQuizScreenEl.style.display = "none";
  quizScreenEl.style.display = "none";
  allDoneScreenEl.style.display = "none";
  highScoresScreenEl.style.display = "initial";
  getHighScores();
}

// displays start quiz screen and turns off high scores screen
// (responds to "Go Back" button in high scores screen)
function displayStartQuiz() {
  headerEl.style.visibility = "visible";
  highScoresScreenEl.style.display = "none";
  startQuizScreenEl.style.display = "initial";
}
/* -------------------- ENDS DISPLAYS -------------------- */

/* -------------------- BEGINS APP METHODS -------------------- */
/* ----- Declares a function to reset score and quiz and display quiz screen ----- */
function startQuizHandler() {
  // resets score to 0
  score = 0;
  // resets quiz to first question
  questionNumber = 0;

  displayQuiz();
  countdown();
  nextQuestion();
}

/* ----- quiz timer for 75 seconds ----- */
function countdown() {
  // Time for quiz in seconds
  timeLeft = 20; // change to 75

  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "0";
      clearInterval(timeInterval);
      // ends quiz when time is up
      displayAllDone();
    }
    // timer interval in milliseconds
  }, 1000);
}

/* ----- displays questions and answer choices ----- */
function nextQuestion() {
  // hides the result of the previous question until a choice is made for the current question
  hideResult();

  // writes new question
  questionEl.innerHTML = mcq[questionNumber].q;

  // clears the previous answer-choices list
  answersListEl.textContent = "";

  // finds the number of possible answers to the current question
  var answerChoicesCount = mcq[questionNumber].a.length;

  // writes answer choices for the question
  for (var i = 0; i < answerChoicesCount; i++) {
    var answerChoiceEl = document.createElement("li");
    answerChoiceEl.textContent = mcq[questionNumber].a[i];
    answersListEl.appendChild(answerChoiceEl);
    answerChoiceEl.addEventListener("click", result);
  }
}

/* ----- displays result and updates & displays score ----- */
function result() {
  // finds the number of possible answers to the current question
  var answerChoicesCount = mcq[questionNumber].a.length;

  // removes event listeners to avoid multiple answers to same question during displaying of result
  for (var i = 0; i < answerChoicesCount; i++) {
    answersListEl.childNodes[i].removeEventListener("click", result);
  }

  // highlights chosen answer
  event.target.style.backgroundColor = "#bd60e7";

  //identifies chosen answer
  var chosenAnswer = event.target.textContent;

  // identifies correct answer from list of answer choices
  var correctAnswer = mcq[questionNumber].c;

  if (chosenAnswer === correctAnswer) {
    resultEl.textContent = "Correct!";
    score += 10;
  } else {
    resultEl.textContent = "Incorrect!";
  }

  // updates the final score
  finalScoreEl.textContent = "Your final score is " + score + ".";

  // calls function to turn on display of result of answer (correct or incorrect)
  displayResult();

  // calls function to check whether to continue to the quiz, or if this is the last question -> end the quiz
  checkQuizEnd();
}

/* ----- displays the result for 2 seconds, then checks whether to move to next question or if questions list is finished ----- */
function checkQuizEnd() {
  questionNumber++;

  if (questionNumber < mcq.length) {
    setTimeout(function () {
      nextQuestion();
    }, 2000);
  } else {
    setTimeout(function () {
      displayAllDone();
    }, 2000);
    //ends test
    timeLeft = 0;
  }
}
/* -------------------- ENDS APP METHODS -------------------- */

/* -------------------- BEGINS LOCALSTORAGE -------------------- */
/* ---------- sets initials and score to local storage ---------- */
function setScore() {
  // gets initials from text input field
  if (!initialsEl.value) {
    missingInitialsEl.innerHTML = "Please enter your initials";
  } else {
    var initials = initialsEl.value;
  }

  // stores high score as an object
  var highScore = {
    initials: initials,
    score: score,
  };

  console.log(highScore);

  // //gets existing high score list from local storage, if any
  // highScoresLS = JSON.parse(localStorage.getItem("highScores"));
  // console.log(highScoresLS);

  highScoresLS.push(highScore);
  console.log(highScoresLS);

  localStorage.setItem("highScores", JSON.stringify(highScoresLS));

  // displayHighScores();
  // getHighScores();
}

/* ---------- gets initials and high scores from local storage ---------- */
function getHighScores() {
  // resets high score elements
  highScoresListEl.textContent = "";

  // gets high scores from localStorage
  var highScoresLS = JSON.parse(localStorage.getItem("highScores"));
  console.log(highScoresLS);

  // creates html elements for each high score
  for (var i = 0; i < 5; i++) {
    var highScoresListItemEl = document.createElement("li");
    if (highScoresLS && highScoresLS.length >= i) {
      highScoresListItemEl.textContent = highScoresLS[i];
    } else {
      highScoresListItemEl.textContent = "";
    }
    highScoresListEl.appendChild(highScoresListItemEl);
  }
}

/* ---------- clears high scores in local storage ---------- */
function clearHighScore() {
  localStorage.removeItem("highScores");
  getHighScores();
}
/* -------------------- ENDS LOCALSTORAGE -------------------- */

/* -------------------- BEGINS EVENT HANDLERS -------------------- */
// calls function to start quiz
startBtn.onclick = startQuizHandler;

// calls function to display next question in quiz
questionEl.onclick = nextQuestion;

// triggers saving initials and score
highScoreFormEl.addEventListener("submit", setScore);

// displays high scores screen
viewHighScoresEl.onclick = displayHighScores;

// triggers clearing high scores list
clearHighScoresBtn.onclick = clearHighScore;

// button in high scores screen, goes back to start quiz screen
goBackBtn.onclick = displayStartQuiz;
/* -------------------- ENDS EVENT HANDLERS -------------------- */
