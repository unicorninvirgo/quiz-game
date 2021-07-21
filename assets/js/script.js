var messageEl = document.getElementById("message");
var answerEl  = document.getElementById("answer");
var buttonStartEl = document.getElementById("btn-start");
var choiceListEl = document.querySelector("ul");
var captureScoreEl = document.getElementById("capture-score");
var scoreToggleEl = document.getElementById("score-message-toggle");
var counterDisplayEl = document.getElementById("counter-display")
var displayScoreEl = document.getElementById("display-score");
var userInitialForm = document.querySelector("form");
var userClearScoreEl = document.getElementById("counter-display");
var tableScoreEl = document.getElementById("table-scores");
var choicesSecEl = document.getElementById("choices");
var clearScoreEl = document.getElementById("clear-score");

//hide results
captureScoreEl.style.display = "none";
displayScoreEl.style.display = "none";

var questions = [
    {
        question:"What is Javascript?",
        choices:["database","language","fruit","language"],
        answer:'database'
    },
    {
        question:"How are values assigned to variables in Javascript?",
        choices:["+","-","=",">"],
        answer:"="
    },
    {
        question:"True of False: Arrays and objects can hold other arrays and objects",
        choices:["true","false"],
        answer:"true"
    },
    {
        question:"A data value that appears directly in a program",
        choices:["array","function","literal","number"],
        answer:"literal"
    }
];


var timerInterval;
var counter = questions.length;
var secondsLeft = 20;
var userInitials;
var index = 0;

//save scores from history
let savedScores = JSON.parse(localStorage.getItem("scoreHistory"));

if(savedScores == null)
{
    savedScores = [];
}


//start the game
function startGame(){

    //hide button start
    buttonStartEl.style.display = "none";

    //start the timer
    startTimer();

    //displayQuiz options
    displayQuestionAndChoices();
};

//function to display questions and choices
function displayQuestionAndChoices(){

   //clear choice list
   clearChoices();
   
    var arrChoices = questions[index].choices;

    //display question
    messageEl.textContent = questions[index].question;
    for(i=0; i < arrChoices.length; i++)
    {
        var choiceList = document.createElement('li');
        choiceList.innerHTML = arrChoices[i];
        choiceListEl.appendChild(choiceList);
    }
    
    answerEl.innerHTML = "";
};

//clear choices presented to screen
function clearChoices(){
    var children = choiceListEl.children;
    
    if(choiceListEl.hasChildNodes())
    {for(i = children.length - 1; i >= 0; i--)
        {
            choiceListEl.removeChild(choiceListEl.lastElementChild);
        }
    }
};

function checkAnswer(answer){

    //validate user choice
    if(answer == questions[index].answer)
    {
        answerEl.innerHTML = "CORRECT";
    }
    else{

        answerEl.innerHTML = "WRONG CHOICE"
        secondsLeft = secondsLeft - 5;
    }

    //increment counter
    index++;
    
    //go to next questions
    if(index < counter && secondsLeft > 0)
    {
        //slight lag before moving to next questions
        setTimeout(displayQuestionAndChoices,1000,index);
    }
    else{
        saveScore();
        endGame();
        //return;
    }
};

function endGame(){

    clearInterval(timerInterval);
    messageEl.innerHTML = "GAME OVER";
    choicesSecEl.innerHTML = `Your final score is ${20 - secondsLeft}`;
    captureScoreEl.style.display = "inline";
    answerEl.style.display = "none";
}


//start countedoown on timer
function startTimer(){

        timerInterval = setInterval(function(){

        secondsLeft--;

        if((secondsLeft >= 0) && (index != counter))
        {
            counterDisplayEl.innerHTML = secondsLeft;
        }
        else
        {
            endGame();
            //return;
        }
    },2000);

};

//display scores
function displayScores(){

    for(i = 0; i < savedScores.length; i++)
    {
        var histTableRow = document.createElement('tr');
        var histTableData = document.createElement('td');

        histTableData.innerHTML = savedScores[i].userInitial + " - " + savedScores[i].userScore;
        tableScoreEl.appendChild(histTableRow);
        tableScoreEl.appendChild(histTableData);
    }

};


//save score to location storage
function saveScore(){

    var userScore = {
        userInitial: document.querySelector("#user-initials").value.trim(),
        userScore: (secondsLeft + 1)
    };
    
    savedScores.push(userScore);
    localStorage.setItem("scoreHistory",JSON.stringify(savedScores));
    captureScoreEl.style.display = "none";
  
}


function clearScore(event){
    //prevent default action
    event.preventDefault();

    //clear out local storage
    localStorage.clear();
    return;
};

function createEventListeners(){
    //listen for event to start game
    buttonStartEl.addEventListener("click",startGame);

    //capture events of user selection
    choicesSecEl.addEventListener("click",function(event){
        var answer = event.target.textContent;
        //userSelect.userCurrentAnswer = answer;
        checkAnswer(answer);
    });

    userInitialForm.addEventListener("submit",saveScore);

    clearScoreEl.addEventListener("click",clearScore);

}


//listen for event to display score
scoreToggleEl.addEventListener("click",function(event){
    event.preventDefault();

    var action = event.target.textContent;

    if(action == "View Scores")
    {
        displayScoreEl.style.display = "inline";
        scoreToggleEl.textContent = "Hide Scores";
        displayScores();
    }
    else
    {
        displayScoreEl.style.display = "none";
        scoreToggleEl.textContent = "View Scores";
    }
    
});

//function to initiate game
function init(){

    createEventListeners();

    //display text
    messageEl.setAttribute("style","font-size:28px;");
    messageEl.textContent = "Are you ready to test your Javascript knowledge?  Click the button to get started.";
}

 
//initialize game start
init();