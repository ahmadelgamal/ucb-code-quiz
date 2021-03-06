# 04 Web APIs: Code Quiz

As you proceed in your career as a web developer, you will probably be asked to complete a coding assessment, which is typically a combination of multiple-choice questions and interactive challenges. Build a timed code quiz with multiple-choice questions. This app will run in the browser and feature dynamically updated HTML and CSS powered by your JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

## Deployment URL
https://ahmadelgamal.github.io/ucb-code-quiz/

## User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

The following animation demonstrates the application functionality:

![code quiz](./assets/images/04-web-apis-homework-demo.gif)

## Comments and Modifications to Specs

- If a score is zero then it will not be recorded to the high scores list.
- Page 13 of the demo.gif (see below) shows the result ("_Wrong!_") still showing after final score is announced. I decided to hide the result on this screen because it was already displayed on the quiz screen and there is no need to keep it on the all done screen.
  ![page 13 of demo](./assets/images/demo-page-13.jpg)
- Page 15 of the demo.gif (see below) shows only one line of high scores. I decided to print out 5 lines, even if they are empty. This way if there is no score on the list it still prints out an empty list instead of no list at all. Also, I decided to limit the high scores to these 5 lines only, because it makes sense to have a limit.
  ![page 15 of demo](./assets/images/demo-page-15.jpg)
  Please note that I can easily cancel the comments and modifications above, if required.
