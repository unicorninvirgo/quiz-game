var messageEl = document.getElementById("message");
var timerEl  = document.getElementById("timer");
var buttonStartEl = document.getElementById("btn-start");
var buttonStopEl = document.getElementById("btn-stop");
var choiceListEl = document.querySelector("ul");
var captureScoreEl = document.getElementById("capture-score");
var scoreToggleEl = document.getElementById("score-message-toggle");
var counterDisplayEl = document.getElementById("counter-display")
var displayScoreEl = document.getElementById("display-score");
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

 
        var ind = 0;
        displayQuestionAndChoices(ind,calculateResults(ind));


};

function displayQuestionAndChoices(ind,callback){

    var arrChoices = questions[ind].choices;

    messageEl.textContent = questions[ind].question;
    for(i=0; i < arrChoices.length; i++)
    {
        var choiceList = document.createElement('li');
        choiceList.innerHTML = arrChoices[i];
        choiceListEl.appendChild(choiceList);
    }

    //console.log(questions[ind].answer);
    callback(questions[ind].answer);

};

function calculateResults(answer){

    console.log(answer);
    choiceListEl.addEventListener("click",function(event){
        console.log(event.target);
    });

}


//start the game
function startGame(){

    //start the timer
   startTimer();

   //displayQuiz options
  displayQuiz();
}

function startTimer(){

     timerInterval = setInterval(function(){

     secondsLeft--;

        if(secondsLeft >= 0)
        {
            counterDisplayEl.innerHTML = secondsLeft;
        }
        else if(secondsLeft === 0)
        {
            clearInterval(timerInterval);
            return;
        }
    },2000);

}

function displayScores(){

    for(i = 0; i < savedScores.length; i++)
    {
        var histTableRow = document.createElement('tr');
        var histTableData1 = document.createElement('td');
        var histTableData2 = document.createElement('td');

        histTableData1.innerHTML = savedScores[i].userInitial;
        histTableData2.innerHTML = savedScores[i].userScore;
        tableScoreEl.appendChild(histTableRow);
        tableScoreEl.appendChild(histTableData1).appendChild(histTableData2);
    }

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

function clearScore(event){
    //prevent default action
    event.preventDefault();

    localStorage.clear();
    return;
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
userClearScoreEl.addEventListener("click",clearScore);

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