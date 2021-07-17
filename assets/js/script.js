var messageEl = document.getElementById("message");
var timerEl  = document.getElementById("timer");
var choicesEl = document.getElementById("choices").children[0];
var buttonStartEl = document.getElementById("btn-start");
var buttonStopEl = document.getElementById("btn-stop");
var choiceListEl = document.querySelector("ul");
var captureScoreEl = document.getElementById("capture-score");
var scoreToggleEl = document.getElementById("score-message-toggle");
var counterDisplayEl = document.getElementById("counter-display")
var displayScoreEl = document.getElementById("scores");
var userInitialForm = document.querySelector("form");
var userClearScoreEl = document.getElementById("counter-display");
var tableScoreEl = document.getElementById("table-scores");


//hide results
captureScoreEl.style.display = "none";
displayScoreEl.style.display = "none";

var questions = [
    {question:"What is Javascript?",choices:["database","car","fruit","language"],answer:1},
    {question:"What is a parameter?",choices:["database","car","fruit","language"],answer:1}
];

var timerInterval;
var counter = 2; //questions.length;
var secondsLeft = 20;
var userInitials;

//save scores from history
let savedScores = JSON.parse(localStorage.getItem("scoreHistory"));

if(savedScores == null)
{
    savedScores = [];
}


//display the quiz context
function displayQuiz(){

    while(counter > 0)
    {
        var ind = 0;
        displayQuestionAndChoices(ind);
    }

};

function displayQuestionAndChoices(ind){

    var arrChoices = questions[ind].choices;

    messageEl.textContent = questions[ind].question;
    for(i=0; i < arrChoices.length; i++)
    {
        var choiceList = document.createElement('li');
        choiceList.innerHTML = arrChoices[i];
        choiceListEl.appendChild(choiceList);
    }

}

function startGame(){
   startTimer();
   displayQuiz();
}

function startTimer(){

     timerInterval = setInterval(function(){

        secondsLeft--;

        if(secondsLeft >= 0)
        {
            //displayQuiz();
            counterDisplayEl.textContent = secondsLeft;
        }
        else if(secondsLeft === 0)
        {
            clearInterval(timerInterval);
        }


    },2000);

}

function displayScores(){

    for(i = 0; i < savedScores.length; i++)

    displayScoreEl.innerHTML = savedScores[0].userInitial;

};


//save score when prompted
function saveScore(event){
    
    event.preventDefault();

    var userScore = {
        userInitial: document.querySelector("#user-initials").value.trim(),
        userScore: secondsLeft
    };
    
    savedScores.push(userScore);
    localStorage.setItem("scoreHistory",JSON.stringify(savedScores));
}

userInitialForm.addEventListener("submit",saveScore);

function clearScore(){

}

function calculateResults(){

}


//listen for event to start game
buttonStartEl.addEventListener("click",function(){
    startGame();
});

//listen for event to stop game
buttonStopEl.addEventListener("click",function(){
    clearInterval(timerInterval);
    return;
});

//listen for event to stop game
userClearScoreEl.addEventListener("click",function(){
    localStorage.clear();
    return;
});


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
    //display text
    messageEl.setAttribute("style","font-size:28px;");
    messageEl.textContent = "Are you ready to test your Javascript knowledge?  Click the button to get started.";
}

 
//initialize game start
init();