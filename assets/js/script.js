// Declaring the array of objects: q: questions, a: answers and c: correct answers
const mcqList = [
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
var mcqListEl = document.getElementById("questions-list");
var answersListEl = document.getElementById("answers-list");
var resultEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");
var initialsEl = document.getElementById("initials");
var initialsBtn = document.getElementById("initials-btn");
var highScoresListEl = document.getElementById("high-scores-list");

// Button calls function to start quiz
startBtn.onclick = startQuiz;

// Declare variables to keep score and track question numbers
var score = 0;
var questionNumber = 0;
var userId = -1;
// Calls function to reset score and quiz and display quiz screen
function startQuiz() {
  score = 0; // Resets score to 0
  questionNumber = 0; // Resets quiz to first question
  userId++;
  console.log(userId);
  displayQuiz();
  countdown();
  nextQuestion();
}

// Set and display questions and answers
function nextQuestion() {
  hideResult(); //hides the Result of the previous question until a choice is made for the current question

  // Set new Question
  mcqListEl.innerHTML = mcqList[questionNumber].q;

  // Clears the previous answers list
  answersListEl.textContent = "";

  // Sets answer choices for the question
  for (var i = 0; i < mcqList[questionNumber].a.length; i++) {
    var answerChoiceEl = document.createElement("li");
    answerChoiceEl.textContent = mcqList[questionNumber].a[i];
    answersListEl.appendChild(answerChoiceEl);
  }

  answersListEl.addEventListener("click", result);
}

// Event to display next question in quiz
mcqListEl.onclick = nextQuestion;

// Function to display result and update and display score
function result() {
  // Highlights chosen answer
  event.target.style.backgroundColor = "#bd60e7";

  var chosenAnswer = event.target.textContent; //identifies chosen answer
  var correctAnswer = mcqList[questionNumber].c;

  if (chosenAnswer === correctAnswer) {
    resultEl.textContent = "Correct!";
    score += 10;
  } else {
    resultEl.textContent = "Incorrect!";
  }

  // Updates the final score
  finalScoreEl.textContent = "Your final score is " + score + ".";

  displayResult();

  checkQuizEnd();
}

// Checks whether to move to next question or if questions list is finished
// Also displays the result for 3 seconds
function checkQuizEnd() {
  questionNumber++;

  if (questionNumber < mcqList.length) {
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

//  Event to trigger saving initials and score
initialsBtn.onclick = saveScore;

// Function to sort the highest 3 scores
// function highScoresSorting() {
//   var highScoresArray = [0, 0, 0]; // Decalres an array to store high scores
//   if (score >= highScoresArray[0]) {
//     highScoresArray[2] = highScoresArray[1];
//     highScoresArray[1] = highScoresArray[0];
//     highScoresArray[0] = score;
//   } else if (score >= highScoresArray[1]) {
//     highScoresArray[2] = highScoresArray[1];
//     highScoresArray[1] = score;
//   } else if (score >= highScoresArray[2]) {
//     highScoresArray[2] = score;
//   }
//   console.log(highScoresArray);
// }

// Function that saves initials and score to localStorage
var highScoresArray = [];
function saveScore() {
  var initials = initialsEl.value; // Gets initials from text input field

  // localStorage.initials = score;
  // localStorage.score = score;

  highScoresArray[userId] = [{ initials, score }];
  localStorage.setItem("highScores", JSON.stringify(highScoresArray));

  // highScoresSorting();

  displayHighScores();
}

// Function to get initials and high scores from localStorage
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

// Event to trigger clearing high scores list
clearHighScoresBtn.onclick = clearHighScore;

// Function to clear high scores
function clearHighScore() {
  localStorage.removeItem.highScores;
  console.log(localStorage.highScores);
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

// Time for quiz in seconds
var timeLeft = 20; // change to 75
// Timer that counts down from 75 seconds
function countdown() {
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
  getHighScores();
}

// Button from high scores screen to go back to start quiz screen
goBackBtn.onclick = displayGoBack;

// The go back button in the High Scores screen
function displayGoBack() {
  headerEl.style.visibility = "visible";
  highScoresScreen.style.display = "none";
  startQuizScreen.style.display = "initial";
}
