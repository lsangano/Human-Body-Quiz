var backStatus = quizBody.dataset.status;
var bodyEl = document.body;
var scriptEl = document.querySelector("script");
var containerEl = document.querySelector(".container-fluid");

var questionNum = document.querySelector("#question-number");
var questionEL = document.querySelector("#question");
var answerEl = document.querySelector('#answer-container');

var score = 0;
var currentQuestion = 0;

var minutesDisplay = document.querySelector("#minutes");
var secondsDisplay = document.querySelector("#seconds");

var totalSeconds = 60;
var secondsElapsed = 0;
var interval;

var answerChoice;
var correctAnswer;

var initials;
var prevInit;
var prevScores;

var questions = [
    
        {
            "question":"What is the heaviest organ in the human body?",
            "choices": ["skin", "kidney", "liver", "heart"],
            "correct":"skin"
        },
        {
            "question":"How many bones are there in an adult human body?",
            "choices": ["78 bones", "152 bones", "188 bones", "206 bones"],
            "correct":"206 bones"
    },
    {
        "question":"Where in the body is the smallest bone found?",
            "choices": ["foot", "ear", "hand", "mouth"],
            "correct":"ear"
    },
    {
        "question":"What is the heaviest organ in the human body?",
        "choices": ["55%", "66%", "75%", "80%"],
        "correct":"66%"
    },
    {
        "question":"At what rate does an average human being sneeze?",
        "choices": ["50 miles per hour", "70 miles per hour", "85 miles per hour", "100 miles per hour"],
        "correct":"100 miles per hour"
    }
];

// QUIZ FUNCTIONALITY

function renderQuestion() {
    var activeQuestion = questions[currentQuestion];

    questionNum.textContent = `Question ${currentQuestion +1} of ${question.length}`;
    questionEL.textContent = activeQuestion["question"];

    for (var i = 0; i < activeQuestion.choices.length; i++) {
        if(currentQuestion === 0) {
            var newBut = document.createElement("button");

            newBut.classList.add("answer", "btn", "btn-choice", "col-md-12");
            newBut.setAttribute("id", `answer-${i}`)
            newBut.textContent = activeQuestion.choices[i];
            answerEl.append(newBut);
        } else {
            answerEl.children[i].textContent = activeQuestion.choices[i];

        }
    }  
}

function nextQuestion() {
    if (currentQuestion < questions.length-1) {
        currentQuestion++;
        renderQuestion();
    } else {
        gameOver();
    } 
}

function checkAnswer() {
    if (correctAnswer !== answerChoice) {
        totalSeconds -=5;
        alert(`oops - wrong answer. The correct answer is ${correctAnswer}.`);
    } else {
        score++;
        alert("correct - Nice Job");
    }
    nextQuestion();
}

function getPreviousScore() {
    var scoreData = JSON.parse(localStorage.getItem("scoreData"));

    if (scoreData) {
        if (scoreData.previousInitials) {
            prevInit.textContent = "Previous Score: " + scoreData.previousInitials;
    }
    if (scoreData.previousScore) {
        prevScore.textContent = scoreData.previousScore;
    }
  } else {
    prevInit.textContent = "Previous Score: ";
  } 
}

 function setPreviousScore() {
     localStorage.setItem(
         "scoreData",
         JSON.stringify({
             previousInitials: initials.value.trim(),
             previousScores: score
         })
     );
 }    

 function gameOver() {
     clearInterval(interval);
     containerEl.remove();

     // MODAL BUTTON ELEMENTS
     var newCont = document.createElement("main");
     newCont.classList.add("container-fluid");
     bodyEl.insertBefore(newCont,scriptEl);

     var scoreDiv = document.createElement("div");
     scoreDiv.classList.add("row");
     newCont.appendChild(scoreDiv);

     var finalScore = document.createElement("h2");
     var space1 = document.createElement("div");
     space1.classList.add("col-md-4");

     var finalText = document.createElement("h2");
     finalText.classList.add("col-md-4");
     finalScore.classList.add("col-md-4");
     finalText.textContent = "GAME OVER"
     finalScore.textContent = `Final Score: ${score}`;
     
    scoreDiv.appendChild(finalText);
    scoreDiv.appendChild(space1);
    scoreDiv.appendChild(finalScore);

    var prevDic = document.createElement("div");
    prevDic.classList.add("row")

    newCont.appendChild(prevDiv);

    var space2 = document.createElement("div")
    space2.classList.add("col-md-4");

    prevInit = document.createElement("h3");
    prevScores = document.createElement("h3");
    prevInit.classList.add("col-md-6");
    prevScores.classList.add("col-md-2");

    prevDiv.appendChild(prevInit);
    prevDiv.appendChild(space2);
    prevDiv.appendChild(prevScores);

    getPreviousScore();

    var buttonDiv = document.createElement("div");
    buttonDiv.classList.add("row")
    newCont.append(buttonDiv);

    var buttonEL = document.createElement("button");
    buttonEL.setAttribute("type", "button");
    buttonEL.classList.add("btn", "btn-success", "col-md-12");
    buttonEL.setAttribute("href", "");
    buttonEL.textContent = "submit Score";

    buttonDiv.appendChild(buttonEL);

    buttonDiv.addEventListener("click", getPreviousScore);
    buttonDiv.addEventListener("click", function() {
        buttonDiv.remove()
    
    var initDiv = document.createElement("div");
    initDiv.classList.add("row");
    newCont.append(initDiv);

    var space3 = document.createElement("div");
    var space4 = document.createElement("div");
    space3.classList.add("col-md-1");
    space4.classList.add("col-md-1");

    initials = document.createElement("input");
    initials.classList.add("col-md-1");
    initials.setAttribute("type", "text");
    initials.setAttribute("id", "name");
    initials.setAttribute("name", "user-initials");
    initials.setAttribute("minlength", "1");
    initials.setAttribute("maxlength", "3");
    initials.setAttribute("placeholder", "Input Initial");

    initDiv.appendChild(space3);
    initDiv.appendChild(initials);
    initDiv.appendChild(space4);

    initials.addEventListener("keyup", setPreviousScore);
    initials.addEventListener("change", setPreviousScore);

    var reloadDiv = document.createElement("div");
    reloadDiv.classList.add(row);
    newCont.append(reloadDiv);

    var space5 = document.createElement("div");
    var space6 = document.createElement("div");
    space5.classList.add("col-md-1");
    space6.classList.add("col-md-1");

    var linkEl = document.createElement("a");
    linkEl.setAttribute("href", "./index.html");
    linkEl.classList.add("col-mid-10");

    var reloadBut = document.createElement("button");
    reloadBut.classList.add("btn-success", "col-md-10")
    reloadBut.setAttribute("type", "button");
    reloadBut.textContent = "Replay";

    reloadDiv.appendChild(space5);
    reloadDiv.appendChild(linkEl);
    linkEl.appendChild(reloadBut);
    reloadDiv.appendChild(space6);
    });

 }
 
 
function quizBackground() {
    var color1 = "#1137e2e3"
    var color2 = "#bad3ef"

    if (backStatus == "home") {
        document.body.style.background = color1;
        document.body.style.color = color2;
    } if (backStatus == "quiz") {
        document.body.style.background = color2;
        document.body.style.color = color1;
    };
}

function startQuiz() {
    renderQuestion()
    startTimer();
}

// CALL FUNCTIONS

quizBackground();
startQuiz();

//TIMER FUNCTIONALITY

function setMinutes() {
    var secondsLeft = totalSeconds - secondsElapsed;
    var minutesLeft = Math.floor(secondsLeft/60);
    var formattedMinutes;
  
    if (minutesLeft < 10) {
      formattedMinutes = "0" + minutesLeft;
    } else {
      formattedMinutes = minutesLeft;
    }
    return formattedMinutes;
  }
  
  function setSeconds() {
    var secondsLeft = (totalSeconds - secondsElapsed) % 60;
    var formattedSeconds;
  
    if (secondsLeft < 10) {
      formattedSeconds = "0" + secondsLeft;
    } else {
      formattedSeconds = secondsLeft;
    }
    return formattedSeconds;
  }
  
  function renderTime() {
    minutesDisplay.textContent = setMinutes();
    secondsDisplay.textContent = setSeconds();
  
    if (secondsElapsed >= totalSeconds) {
        gameOver();
    }
  }
  
  function startTimer() {
    if (totalSeconds > 0) {
      interval = setInterval(function () {
        secondsElapsed++;
        renderTime();
      }, 1000)
    }
  }

//   EVENT LISTENER
answerEl.addEventListener("click", function(event) {   
    answerChoice = event.target.textContent
    correctAnswer = questions[currentQuestion]["correct"];
    
    checkAnswer(answerChoice, correctAnswer);
})