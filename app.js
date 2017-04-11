var questionElement = document.getElementById("question"),
answerElement = document.getElementById("answer"),
QAArray, 
questionIndex = 0;

window.onload = function () {
//document. = function () {
    console.log("document ready");
    init();
}

function init() {
document.body.addEventListener('click', handleBodyClick);
    QAArray = [
{ "question":"What is the minimum height you can fly over a special conservation area?", "answer":" You should fly no lower than 2000ft AGL over a special conservation are indicated by the blue dots bounded by a solid blue line on a sectional. <img src='http://www.djinnius.com/fav.ico'>"},
{ "question":"What does a star in the runway layout mean?", "answer":" A star indicates a rotating beacon is in operation from sunset to sunrise."},
{ "question":"What do points around a runway mean?", "answer":" Tick marks indicate that fuel is available and the field is attended during normal working hours. "},
{ "question":"[How are controlled airports denoted on a VFR sectional(hint think color)]?", "answer":"Controlled airports are colored blue. Uncontrolled are colore magenta. Surprisingly, KSGH is uncontrolled. "},
{ "question":"What does a square in the lower right corner of a nav aid tell you?", "answer":"The square in the bottom right corner indicates that the weather service HIWAS is transmitte over the VORTAC frequency."},
{ "question":"What does an underlined frequency indicate?", "answer":" The underline indicates that there is no voice capability on this frequency and only the Morse code identifier is audibly transmitted. "}
    ];
//    QAArray = all;//SectionB;//shuffle(SectionA);

    questionElement.innerHTML = QAArray[questionIndex].question;
    answerElement.innerHTML = QAArray[questionIndex].answer;
    updateStatrx();
    timedQuestion();
}

/*
questionElement.addEventListener("click", function() {
//    console.log("q clicked");
    answerElement.classList.toggle('hidden');
});
*/

//place card back in stack or "discard" 
/*nextQuestionElement.addEventListener("click", function() {

});*/

handleBodyClick = function(e) {
    var t = e.target,
    random;
    console.log(t.className);
    if (t.className === "next" || 
	( t.className.indexOf("answer") > -1 &&
	  t.className.indexOf("answer-container") === -1 &&
	  t.className.indexOf("hidden") === -1) ) {
	console.log("next");
	changeCards(questionIndex+1);
    }  
    if (t.className === "previous") {
	console.log("prev");
	changeCards(questionIndex-1);
    }  
    if (t.className === "randomize") {
	console.log("rndmze");
	QAArray = shuffle(QAArray);
    } 
    if (t.className === "random") {
	console.log("random");
	random = questionIndex;
	//ensure that we actually change and don't simply get the same card again.
	while (random === questionIndex) {
	    console.log('getting random number');
	    random = Math.floor(Math.random() * QAArray.length );
	}
	console.log(random);
	changeCards(random);
    } 
    if (t.className.indexOf("question") > -1 || 
//	t.className.indexOf("answer") > -1 &&
	t.className.indexOf("answer-container") > -1 ) {
	console.log("qa");
	answerElement.classList.toggle('hidden');
    } 
    if (t.className.indexOf("ideas") > -1 ) {
	console.log("id");
	answerElement.classList.toggle('hidden');
    } 
    if (t.className === "remove" ) {
	removeFlashcard();
    }
//    console.log(t.className.indexOf("question")  );

};

function removeFlashcard() {
    QAArray.splice(questionIndex,1);
    changeCards(questionIndex);
}

function changeCards(index) {
    if (index >= QAArray.length) {
	index = 0
    } else if ( index < 0 ) {
	index = QAArray.length -1;
    }

    if (QAArray.length > 0) {
    questionIndex = index;
    console.log(questionIndex+" "+QAArray.length);
    questionElement.innerHTML = QAArray[questionIndex].question;
    //ensure the answer is always hidden when we get a new question.
    answerElement.classList.add('hidden');    
    answerElement.innerHTML = QAArray[questionIndex].answer;
    } else {
    questionElement.innerHTML = "You've mastered all the questions. There are no more questions. Please start over.";
	questionElement.classList.add('finished');
    }
    updateStatrx();
};

function shuffle(array) {
//http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
    var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

    // And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
    }

    return array;
}

function updateStatrx() {
    document.querySelector(".statrx").innerHTML = "Question "+(questionIndex+1) + " of "+ QAArray.length+"."; 
}



var realAnswerId, reevalAutoChangeCardsId;

function killTimedQuestion() {
    //prevent further execution
    window.clearTimeout(revealAnswerId);
    window.clearTimeout(revealAutoChangeCardsId);
}
function timedQuestion() {
    var doublet = QAArray[questionIndex],
	question = doublet.question,
	answer = doublet.answer;
    
    questionTime = computeTimeScore(question)*500;
    answerTime = computeTimeScore(answer)*500;


    ///after the question timner is up, reveal the answer
    revealAnswerId =  setTimeout(revealAnswer, questionTime);
    //after the answer timer i sup, reveal the next question and perform the next calculation
    revealAutoChangeCardsId = setTimeout(autoChangeCards, questionTime+answerTime);
//handle there being no more questions. Meh just let it loop.
}

function autoChangeCards() {
    //hack to get around SetTimeout limitations
    changeCards(questionIndex+1);
    timedQuestion();
}
function revealAnswer() {
    answerElement.classList.remove('hidden');
}

function computeTimeScore(string) {
    var split = string.split(' '),
	timeScore = 0,
	stringLength,
	coutner;

    for (counter = 0 ; counter < split.length; counter++) {
	stringLength = split[counter].length;
	if( stringLength < 5 ) {
	    timeScore +=1;
	} else if ( stringLength < 10 ) {
	    timeScore += 1.25;
	} else if ( stringLength < 20 ) {
	    timeScore += 1.333;
	} else {
	    timeScore += 1.5;
	}
    }
    return timeScore;
}
