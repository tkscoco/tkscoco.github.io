// declaration/initialisation goes here
const home = document.querySelector("#home");
const dos = document.querySelector("#dos");
const donts = document.querySelector("#donts");
const headerButtons = document.querySelector("#headerButtons");

// progress bar
const prgCat = document.querySelector("#progressCat");
const prgFill = document.querySelector("#progressFillPctg"); 
const prgText = document.querySelector("#progressPctg");
var prgCatX = 0;

// everything here is for quiz
const gameDialogue = document.querySelector("#gameDialogue"); // innerHTML for questions are in gameDialogue
const gameQuiz = document.querySelector("#gameQuiz"); // gameQuiz is used to change questions
const scorebox = document.querySelector("#scorebox");
const ansButton = document.querySelector("#submitAns");
const timer = document.querySelector("#timer");
const gameCharacter = document.querySelector("#gameCharacter");
const cat = document.getElementById("cat");
let correctAudio = new Audio("audio/yippee.mp3");
let incorrectAudio = new Audio("audio/incorrect.mp3");
let questionCount = 0;
let score = 0;
var userAns;
let qnNum = 0;
var timeElapsed; // id for interval so i can clear it when i reset timer
let correctAns = ['1','3','2','2','4'];
let ansRespList = ["Text is typically aligned to the left side so as to improve readability!",
					"Contrasting colours stand out more, which can help your audience to visually catch your points better!",
					"Yellow text is very hard to see on a white background, which is why it is generally discouraged!",
					"Transitions may make your slides look unprofessional... so use them minimally.",
					"One line would do, short and simple."
					];
let qnList = ["Which direction would be the best practice for text alignment?",
			"What is something you should do when designing your slides?",
			"What colours are not recommended for background and text?",
			"Why are transitions generally discouraged in slides?",
			"What is the maximum length your heading should be?"];
let opt1List = ["Left",
			"PUT EVERYTHING IN CAPS!!!",
			"Light Blue & Dark Blue",
			"People dont like fun :(",
			"Four lines"];
let opt2List = ["Centre",
			"Add tons of animations!!!", 
			"Yellow & White", 
			"They look unprofessional", 
			"Three lines"];
let opt3List = ["Right",
			"Use contrasting colours!!!", 
			"Black & White", 
			"because I'm too cool", 
			"Two lines"];
let opt4List = ["Justified",
			"Use Comic Sans!!!", 
			"Light Green & Black", 
			"My slides look too clean", 
			"One line"];
			
// fullscreen
const btnFS=document.querySelector("#btnFS");
const btnWS=document.querySelector("#btnWS");

// loading up functions

// function to hide all (main) pages
function hideAll(){ 
	home.style.display = "none";
	dos.style.display = "none";
	donts.style.display = "none";
}

function timedOut(){
	incorrectAudio.play();
	setCat(2);
	gameQuiz.style.display = "none";
	gameDialogue.innerHTML = "Time's up! You didnt give an answer... Anyways, the right answer was Option " + correctAns[qnNum] + ". " + ansRespList[qnNum] + " Your score is now: " + score+"! Click on this box to continue!";
	scorebox.innerHTML = "Score: " + score;
	questionCount++;
	gameQuiz.style.display = "none";
	qnNum++;
}

function countdownTimer(){
    let time = 10; // 10s timer
    if (timeElapsed) {
        clearInterval(timeElapsed); // clears id for timeElapsed if it still exists (resets timer)
    }
    function update(){
        timer.innerHTML = "Timer: " + time; // changes timer on screen
        if (time === 0){
            timedOut(); 
            clearInterval(timeElapsed);
            timeElapsed = null; 
            return;
        }
        time--;
    }

    update(); // removes initial delay
    timeElapsed = setInterval(update, 1000); // time goes down every 1s
}

function questionChange(){
		if (qnNum < qnList.length) {
			document.querySelector('label[for="option1"]').innerHTML = opt1List[qnNum];
			document.querySelector('label[for="option2"]').innerHTML = opt2List[qnNum];
			document.querySelector('label[for="option3"]').innerHTML = opt3List[qnNum];
			document.querySelector('label[for="option4"]').innerHTML = opt4List[qnNum];
		}}
		
function setCat(state){
    cat.classList.remove("cat-1","cat-2","cat-3");
    cat.classList.add("cat-" + state);
}

function updateProgress(){
    let total = qnList.length; // total = total question count
    let progress = ((qnNum+1) / total) * 100; // qnNum + 1 cause its always like one off since i used it for array index

    prgFill.style.width = progress + "%";
    prgText.innerHTML = progress + "%";

    let barWidth = document.querySelector("#progressBar").offsetWidth;
    let catWidth = prgCat.offsetWidth;

    prgCatX = (progress / 100) * ((barWidth - catWidth) * 1.1);

    prgCat.style.left = prgCatX + "px";
}

function resetProgress(){
	prgFill.style.width = "0%";
	prgText.innerHTML = "0%";
	prgCat.style.left = "0px";
	prgCatX = 0;
}


// essentially the "main" of the code

//event delegation (rewrote the page switching function)
headerButtons.addEventListener("click", function(pgs){
	if (!pgs.target.classList.contains("header-button")){
		return;
	} // above checks if i clicked empty space so i dont break code or it will kaboom and i cry
	hideAll();
	if (pgs.target.id === "homeBtn"){
        home.style.display = "flex";
    }
    else if (pgs.target.id === "dosBtn"){
        dos.style.display = "flex";
    }
    else if (pgs.target.id === "dontsBtn"){
        donts.style.display = "flex";
    }
});

hideAll();
gameQuiz.style.display = "none";
home.style.display = "flex";

// fullscreen
btnFS.addEventListener("click",function(){
	if (document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} 
	else if (document.documentElement.mozRequestFullScreen) { // Firefox
		document.documentElement.mozRequestFullScreen();
	} 
	else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
		document.documentElement.webkitRequestFullscreen();
	} 
	else if (document.documentElement.msRequestFullscreen) { // IE/Edge
		document.documentElement.msRequestFullscreen();
	}
});
btnWS.addEventListener("click",function(){
	if (document.exitFullscreen) {
		document.exitFullscreen();
	}
	else if (document.mozCancelFullScreen) { // Firefox
		document.mozCancelFullScreen();
	}
	else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
		document.webkitExitFullscreen();
	} 
	else if (document.msExitFullscreen) { // IE/Edge
		document.msExitFullscreen();
	}
});

// code for minigame
setCat(2);
gameDialogue.addEventListener('click', function(){
	if (qnNum < qnList.length){ // if question is in the list then timer starts
		countdownTimer();
	}
	// changes question displayed
	gameDialogue.innerHTML = qnList[qnNum];
	setCat(2); // css sprite changing
	if (qnNum < 5){
		switch (questionCount){
		case 0:
			questionCount++;
			gameQuiz.style.display = "block"; // makes options visible
			break;
		default: 
			gameQuiz.style.display = "block";
			questionChange();
			break;
		}
	}
	else if (qnNum == qnList.length){ // you reached the end of the question array... hooray??
		gameDialogue.innerHTML = "You have completed the quiz! Your final score is: " + score + "! Click here to play again!";
		setCat(3);
		correctAudio.play();
		qnNum++;
	}
	else if (qnNum > qnList.length){ // if it goes out of array index then i force reset
		gameDialogue.innerHTML = "A little trivia to see how much you know about slides designing!<br>"+
					"Click anywhere in this box to start!<br> At any point in time, click on the cat to quit!";
		qnNum = 0;
		questionCount = 0;
		score = 0;
		resetProgress();
		scorebox.innerHTML = "Score: 0";
		questionChange();
	}
	console.log(questionCount);
	console.log(qnNum);
});

// click button to submit answer
ansButton.addEventListener('click', function(){
	updateProgress();
	clearInterval(timeElapsed);
	userAns = document.querySelector("input[name = 'question']:checked").value; // checks for which option was chosen
		// condition: correct answer +  no timeout
	if (userAns == correctAns[qnNum]){
			correctAudio.play(); 
			setCat(3);
			score++;
			gameDialogue.innerHTML = "Correct! " + ansRespList[qnNum] + " Your score is now: " + score+"! Click on this box to continue!";
		}
		// condition: wrong answer + no timeout
		if (userAns != correctAns[qnNum]){
			incorrectAudio.play();
			setCat(1);
			gameDialogue.innerHTML = "Almost there... but your answer was wrong... The correct answer was Option "+ correctAns[qnNum] + ". " + ansRespList[qnNum] + " Your score is now: " + score+"! Click on this box to continue!";
		}
		scorebox.innerHTML = "Score: " + score;
		questionCount++;
		gameQuiz.style.display = "none"; // hides the options (radio) again
		qnNum++;
});

gameCharacter.addEventListener("click", function(){
	gameQuiz.style.display = "none";
	clearInterval(timeElapsed);
	timeElapsed = null;
	resetProgress();
	gameDialogue.innerHTML = qnList[qnNum];
	setCat(2);
	gameDialogue.innerHTML = "A little trivia to see how much you know about slides designing!<br>"+
					"Click anywhere in this box to start! <br> At any point in time, click on the cat to quit!";
		qnNum = 0;
		questionCount = 0;
		score = 0;
		scorebox.innerHTML = "Score: 0";
		questionChange();
});

