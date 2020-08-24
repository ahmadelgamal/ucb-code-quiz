// Declaring the array of questions and answers
var questionsList = [
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

// Declaring the different elements and buttons needed for this project
var headerEl = document.getElementById("header");
var viewHighScoresEl = document.getElementById("view-high-scores");
var timerEl = document.getElementById("timer");
var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start-quiz-btn");
var goBackBtn = document.getElementById("go-back-btn");
var clearHighScoresBtn = document.getElementById("clear-ghigh-scores-btn");
var questionsListEl = document.getElementById("questions-list");
var answersListEl = document.getElementById("answers-list");
var finalScoreEl = document.getElementById("final-score");

// Function to keep score
var score = 0;

function scoreUpdate () {
  // if (... === questionsList[i].c) {
    score++;
    finalScoreEl.textContent = score;
    console.log(score);
  // }
};

// Display questions and answers list
for (var i = 0; i < questionsList.length; i++) {
  questionsListEl.innerHTML = questionsList[i].q;
  answersListEl.innerHTML = questionsList[i].a;
  answersListEl.addEventListener("click", scoreUpdate);
  // return i;
}

// Declaring the different view to turn them on and off
var startQuizScreen = document.getElementById("start-quiz-screen");
var quizScreen = document.getElementById("quiz-screen");
var allDoneScreen = document.getElementById("all-done-screen");
var highScoresScreen = document.getElementById("high-scores-screen");

// Identifying the different buttons/elements to be clicked
viewHighScoresEl.onclick = highScores;
startBtn.onclick = countdown;
goBackBtn.onclick = goBack;

// The High Scores screen
function highScores() {
  headerEl.style.visibility = "hidden";
  startQuizScreen.style.display = "none";
  quizScreen.style.display = "none";
  allDoneScreen.style.display = "none";
  highScoresScreen.style.display = "initial";
}

// The go back button in the High Scores screen
function goBack() {
  headerEl.style.visibility = "visible";
  highScoresScreen.style.display = "none";
  startQuizScreen.style.display = "initial";
}

// Timer that counts down from 75 seconds
function countdown() {
  // Turn off start quiz screen and turn on quiz screen
  startQuizScreen.style.display = "none";
  quizScreen.style.display = "initial";

  var timeLeft = 5; // change to 75

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "0";
      clearInterval(timeInterval);
      // END TEST
      allDone();
    }
  }, 1000);
}

// End of test
function allDone() {
  headerEl.style.visibility = "visible";
  startQuizScreen.style.display = "none";
  quizScreen.style.display = "none";
  highScoresScreen.style.display = "none";
  allDoneScreen.style.display = "initial";
}
