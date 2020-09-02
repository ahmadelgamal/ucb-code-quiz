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
var initialsEl = document.getElementById("initials");
var initialsBtn = document.getElementById("initials-btn");
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
// assigns a new user id for each user, to be used for local storage
var userCounter = 0;

// Time for quiz in seconds
var timeLeft = 10; // change to 75

// tracks current question number
var questionNumber = 0;

// keeps score
var score = 0;

// stores high scores
var highScoresArray = [];
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
function startQuiz() {
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

  var answerChoicesCount = mcq[questionNumber].a.length;

  // writes answer choices for the question
  for (var i = 0; i < answerChoicesCount; i++) {
    var answerChoiceEl = document.createElement("li");
    answerChoiceEl.textContent = mcq[questionNumber].a[i];
    answerChoiceEl.addEventListener("click", result);
    answersListEl.appendChild(answerChoiceEl);
  }
}

/* ----- displays result and updates & displays score ----- */
function result() {
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
    }, 2000); //END TEST
    timeLeft = 0;
  }
}
/* -------------------- ENDS APP METHODS -------------------- */

/* -------------------- BEGINS LOCALSTORAGE -------------------- */
/* ---------- sets initials and score to local storage ---------- */
function setScore() {
  // gets initials from text input field
  var initials = initialsEl.value;

  // store initials and score in an array
  var highScore = [initials, score];
  
  //get existing high score list from local storage, if any
  var highScoresLS = JSON.parse(localStorage.getItem("highScores"));

  // if there is an existing high score list in local storage
  if (highScoresLS) {
    for (var i = 0; i < 5; i++) {
      // insert the current initials and score into the list of high scores
      if (score >= highScoresLS[i]) {
        highScoresLS.splice(highScoresLS[i], 0, highScore);
      }
    }
  } else {
    localStorage.setItem("highScores", JSON.stringify(highScore));
  }

  // var highScoreLine = initials + " - " + score;

  // highScoresArray[userCounter] = [userCounter, highScoreLine];

  // // assigns new user id for next user
  // userCounter++;

  // // highScoresSorting();

  // displayHighScores();
  // getHighScores();
}

/* ---------- gets initials and high scores from local storage ---------- */
function getHighScores() {
  // Clear previous high scores list to reorganize by highest score
  // highScoresListEl.textContent = "";

  // Get high scores from localStorage
  for (var i = 0; i < localStorage.highScores.length && i < 5; i++) {
    var highScore = document.createElement("li");
    var retreivehighScores = JSON.parse(localStorage.getItem("highScores"));
    highScore.textContent = retreivehighScores[i];
    console.log(retrievehighScores[i]);
    highScoresListEl.appendChild(highScore);
  }
}

/* ---------- clears high scores in local storage ---------- */
function clearHighScore() {
  localStorage.removeItem("highScores");
}
/* -------------------- ENDS LOCALSTORAGE -------------------- */

/* -------------------- BEGINS EVENT HANDLERS -------------------- */
// calls function to start quiz
startBtn.onclick = startQuiz;

// calls function to display next question in quiz
questionEl.onclick = nextQuestion;

// triggers saving initials and score
initialsBtn.onclick = setScore;

// displays high scores screen
viewHighScoresEl.onclick = displayHighScores;

// triggers clearing high scores list
clearHighScoresBtn.onclick = clearHighScore;

// button in high scores screen, goes back to start quiz screen
goBackBtn.onclick = displayStartQuiz;
/* -------------------- ENDS EVENT HANDLERS -------------------- */
