var wins = 0;
var lives = 7;
var pastGuess = [];
var spaceHolder = "" ;

var LordRings = [
		"Legolas", "Frodo Baggins", "Gandalf", "Boromir",
		"Gimli", "Saruman", "Gollum","Bilbo Baggins",
		"Aragorn", "Pippin", "Arwen", "Lord Elrond", "Merry",
		"Treebeard", "Smeagol", "Sauron", "Witch-King of Angmar",
		"Samwise", "Galadriel","Lady of the Wood",

		"Fly you fools","My Precious","You shall not pass",
		"Fellowship of the Ring","A wizard is never late",
		"Second Breakfast","Eye of Sauron", "One ring to rule them all",

		"To the keep", "One does not simply walk into Mordor", 
		"You have my sword","You have my bow", "You have my axe",
]

function checkRepeat(letter) {
	for (var i = 0; i <= pastGuess.length; i++){
			if (letter == pastGuess[i]) {
					return true;
			}
	}
};

var theWord = LordRings[Math.floor(Math.random() * 33)];

function printWord() {
	for (var n = 0; n < theWord.length; n++) {
		if (/[a-zA-Z]/.test(theWord[n])){
			spaceHolder += "_" ;
		} else {
			spaceHolder += "\u00A0";
		}
	}
	document.getElementById("word").innerHTML= spaceHolder;
	document.getElementById("hangman").src = "assets/images/Hangman-7.png";
};

function resetWord (){
		theWord = LordRings[Math.floor(Math.random() * 33)];
		pastGuess = [];
		spaceHolder = "" ;
		lives = 7;
		document.getElementById("lives").innerHTML= lives + " Errors";
		document.getElementById("lastGuess").innerHTML="Your last guess was: <br>";
		document.getElementById("pastGuess").innerHTML="You've already used these! <br>" + pastGuess;
};

function checkGuess(letter) {
		var correct = 0;
		for (var n=0; n < theWord.length; n++) {
				if (letter == theWord[n].toUpperCase()){
						spaceHolder = spaceHolder.substr(0,n) + theWord[n] + spaceHolder.substr(n+1);
						correct++;
				}
		}
		document.getElementById("word").innerHTML= spaceHolder;
		if (correct > 0) {return true};
};

function checkSpaceHolder (letter) {
		for (var n = 0; n < theWord.length; n++) {
				if (letter == spaceHolder[n]){
						return true;
				}
		}
};

function checkWin(){
		for(var n = 0; n < spaceHolder.length; n++){
				if (spaceHolder.includes("_") != true){
						wins++;
						document.getElementById("wins").innerHTML= "Wins: "+ wins;
						document.getElementById("directions").innerHTML= "You won!";
						document.getElementById("hangman").src = "assets/images/win.gif";
						resetWord();
						setTimeout(printWord, 3000);
				}
		}
};

function updateLives(){
		lives--;
		if (lives < 1) {
				document.getElementById("directions").innterHTML="You lost! Hit a key for your next round!";
				document.getElementById("hangman").src ="assets/images/lose.gif";
				resetWord();
				setTimeout(printWord, 3000);

		} else {
			document.getElementById("directions").innerHTML= "Nope! Try again!";
			document.getElementById("lives").innerHTML= lives + " Errors";
			document.getElementById("hangman").src= "assets/images/Hangman-" + lives + ".png";
		}
};

window.onload = printWord;

document.onkeyup = function(event) {
		var guess = String.fromCharCode(event.keyCode).toUpperCase();

		if (!/[A-Z]/.test(guess)) {
				document.getElementById("directions").innerHTML= "Select an alpha key.";
		}

		else if (checkRepeat(guess)){
				document.getElementById("directions").innerHTML= "You guessed that already! Try again.";
		}

		else if (checkSpaceHolder(guess)) {
			document.getElementById("directions").innerHTML="You got that one right already!";
		}

		else if (checkGuess(guess)) {
				document.getElementById("directions").innerHTML= "You got one!";
				checkWin();
		}

		else {
				document.getElementById("directions").innerHTML= "Nope! Try again!";
				document.getElementById("lastGuess").innerHTML= "Your last guess was: <br>" + guess.toUpperCase() ;
				pastGuess.push(guess);
				document.getElementById("pastGuess").innerHTML= "You've already used these! <br>" + pastGuess;
				updateLives();
		}

}



