/* -------------------- BEGINS DECLARING GLOBAL CONSTANTS AND VARIABLES -------------------- */
/* ---------- declares the different views/screens to turn them on and off ---------- */
const startQuizScreenEl = document.getElementById("start-quiz-screen");
const quizScreenEl = document.getElementById("quiz-screen");
const resultScreenEl = document.getElementById("result-screen");
const allDoneScreenEl = document.getElementById("all-done-screen");
const highScoresScreenEl = document.getElementById("high-scores-screen");

/* ---------- declares cosntants to point to the different html elements and buttons needed for this project ---------- */
const headerEl = document.getElementById("header");
const viewHighScoresEl = document.getElementById("view-high-scores");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-quiz-btn");
const goBackBtn = document.getElementById("go-back-btn");
const clearHighScoresBtn = document.getElementById("clear-high-scores-btn");
const questionEl = document.getElementById("question");
const answersListEl = document.getElementById("answers-list");
const resultEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");
const highScoreFormEl = document.getElementById("high-score-form");
const initialsEl = document.getElementById("initials");
const highScoresListEl = document.getElementById("high-scores-list");

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

/* ---------- declares global variables ---------- */
// declares timer for quiz
var timeLeft;

// tracks current question number
var questionNumber = 0;

// tracks number of anwer choices for current question
var answerChoicesCount;

// keeps score
var score = 0;

// declares an array to store the high score list in local storage, if any
var highScoresLS = [];
/* -------------------- ENDS DECLARING GLOBAL CONSTANTS AND VARIABLES -------------------- */

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
  // writes the final score
  finalScoreEl.textContent = "Your final score is " + score + ".";
}

// displays high scores screen
function displayHighScores() {
  headerEl.style.visibility = "hidden";
  startQuizScreenEl.style.display = "none";
  quizScreenEl.style.display = "none";
  allDoneScreenEl.style.display = "none";
  highScoresScreenEl.style.display = "initial";
  // calls function to get and display updated high score from localStorage
  getHighScores();
}

// displays start quiz screen and turns off high scores screen
// (responds to "Go back" button in high scores screen)
function displayStartQuiz() {
  headerEl.style.visibility = "visible";
  highScoresScreenEl.style.display = "none";
  startQuizScreenEl.style.display = "initial";
}
/* -------------------- ENDS DISPLAYS -------------------- */

/* -------------------- BEGINS APP METHODS -------------------- */
/* ----- Declares a function to reset score, quiz (question number) & timer, and display quiz screen ----- */
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
  timeLeft = 15; // CHANGE TO 75

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

  // clears the previous answer-choices list
  answersListEl.textContent = "";

  // writes new question
  questionEl.innerHTML = mcq[questionNumber].q;

  // finds the number of possible answers to the new question
  answerChoicesCount = mcq[questionNumber].a.length;

  // writes answer choices for the question
  for (let i = 0; i < answerChoicesCount; i++) {
    const answerChoiceEl = document.createElement("li");
    answerChoiceEl.textContent = mcq[questionNumber].a[i];
    answersListEl.appendChild(answerChoiceEl);
    answerChoiceEl.addEventListener("click", result);
  }
}

/* ----- checks result of each answer ----- */
function result() {
  // removes event listeners to avoid multiple answers to same question during displaying of result
  for (let i = 0; i < answerChoicesCount; i++) {
    answersListEl.childNodes[i].removeEventListener("click", result);
  }

  // highlights chosen answer element
  event.target.style.backgroundColor = "#bd60e7";

  // gets text content of chosen answer
  var chosenAnswer = event.target.textContent;

  // identifies correct answer from list of answer choices
  var correctAnswer = mcq[questionNumber].c;

  // checks result of chosenAnswer vs correctAnswer
  if (chosenAnswer === correctAnswer) {
    resultEl.textContent = "Correct!";
    // in case answer is correct, score is increased by 10 points
    score += 10;
  } else {
    resultEl.textContent = "Incorrect!";
    // in case answer is incorrect, time left is reduced by 10 seconds
    timeLeft -= 10;
  }

  // calls function to turn on display of result of answer (correct or incorrect)
  displayResult();

  // calls function to check whether to continue to the quiz, or if this was the last question -> end the quiz
  checkQuizEnd();
}

/* ----- displays the result for 2 seconds, then checks whether to move to next question or if questions list is finished ----- */
function checkQuizEnd() {
  questionNumber++;

  // if there are more questions on the list, then it displays the next question
  if (questionNumber < mcq.length) {
    setTimeout(function () {
      nextQuestion();
    }, 2000);
    // if questions are finished, then it ends quiz
  } else {
    setTimeout(function () {
      // goes to all done screen
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
  // this field is set to `required` meaning that it will not save if field is left empty
  var initials = initialsEl.value;

  // stores high score as an object
  var highScore = {
    initialsKey: initials,
    scoreKey: score,
  };

  // //gets existing high score list from local storage, if any
  highScoresLS = JSON.parse(localStorage.getItem("highScores"));
  // checks if list is empty, if yes, then it becomes the current score only
  // also checks if the score is more than zero, otherwise it is not considered a high score
  if (!highScoresLS && score > 0) {
    highScoresLS = [highScore];
    // if the list is empty, but the current score is zero, then it is not a high score, and nothing is recorded
  } else if (!highScoresLS && score === 0) {
    // otherwise, if the list has content, then it adds the current score to it
  } else {
    // NEED TO CALL FUNCTION TO SORT HIGH SCORES
    // AT THE MOMENT THIS JUST ADD THE CURRENT SCORE TO THE LIST OF HIGH SCORES
    highScoresLS.unshift(highScore);
  }

  // updates the high scores list in local storage after adding the current score to it
  localStorage.setItem("highScores", JSON.stringify(highScoresLS));

  // calls function to display the high scores
  displayHighScores();
}

/* ---------- gets initials and high scores from local storage ---------- */
function getHighScores() {
  // resets high score elements
  highScoresListEl.textContent = "";

  // gets update of high scores from localStorage
  highScoresLS = JSON.parse(localStorage.getItem("highScores"));

  // creates html elements for each high score (only 5 high scores are displayed)
  for (let i = 0; i < 5; i++) {
    var highScoresListItemEl = document.createElement("li");
    if (highScoresLS !== null && i < highScoresLS.length) {
      highScoresListItemEl.textContent =
        highScoresLS[i].initialsKey + " - " + highScoresLS[i].scoreKey;
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
