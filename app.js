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
    QAArray = shuffle(SectionA);

    questionElement.innerHTML = QAArray[questionIndex].question;
    answerElement.innerHTML = QAArray[questionIndex].answer;
    updateStatrx();
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
	random = Math.floor(Math.random() * QAArray.length );
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