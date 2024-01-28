var player1State = 0;
var player2State = 0;

document.addEventListener("DOMContentLoaded",function() {
	initialPlayerLoad();
});

//
// CLICK HANDLING
//

//Runs Player 1 when clicked
document.getElementById("player-1-button").addEventListener("click", togglePlayer1);
//Runs Player 2 when clicked
document.getElementById("player-2-button").addEventListener("click", togglePlayer2);


//Shows the initial song upon the player load
function initialPlayerLoad() {
	P1Stream  = document.getElementById('Station1Audio');
	P2Stream  = document.getElementById('Station2Audio');
	UpdatePlayer1Song();
	UpdatePlayer2Song();
	var timerID = setInterval(function () { UpdatePlayer1Song() }, 10000);
	var timerID = setInterval(function () { UpdatePlayer2Song() }, 10000);
	updateP1State(1);
	updateP2State(0);
}

//Updates the song in player 1
function UpdatePlayer1Song() {		
	var songAndArtist = "";
	fetch("https://thesummit.fm/playlist-app/getP1CurrentSong.php")
	 .then(response => response.json())
			.then(data => {
			
			// Handle the returned JSON data
			// Assume that 'data' is the array from the JSON response
			if (data != null) {
				songAndArtist = data.toString();	
				document.getElementById("player-1-song-title").innerText = songAndArtist;	
			}
			else {}
			})
			.catch(error => {
				// Handle errors
				// Handle errors
				console.error(error);
			});
	
}


//Updates the song in player 2
function UpdatePlayer2Song() {
	var songAndArtist = "";
	fetch("https://thesummit.fm/playlist-app/getP2CurrentSong.php")
	 .then(response => response.json())
			.then(data => {
			
			// Handle the returned JSON data
			// Assume that 'data' is the array from the JSON response
			if (data != null) {
				songAndArtist = data.toString();	
				document.getElementById("player-2-song-title").innerText = songAndArtist;	
			}
			else {}
			})
			.catch(error => {
				// Handle errors
				console.error(error);
			});
	
}

//
// START AND STOP PLAYING
//

//UPDATE HANDLER for updating the state of the P1 player
function updateP1State(newState) {
	//If we want to turn the player on
	if (newState == 2) {
		//If the player is totally off, then turn it on
		if (player1State == 0) {
			turnOnPlayer1();
			P1Stream.play();
		}
		//If the player is current paused, then unpause it
		else if (player1State == 1) {
			unpausePlayer1();
			P1Stream.play();
		}
		//If the player currently running, then turn it off
		else {}
	}
	//If we want to  pause the player
	else if(newState == 1) {
		//If the player is totally off, then turn it on and immediately pause it
		if (player1State == 0) {
			turnOnPlayer1();
			pausePlayer1();
		}
		//If the player is current paused, then do nothing
		else if (player1State == 1) {}
		//If the player currently running, then turn it off
		else {
			pausePlayer1();
			P1Stream.pause();
		}
	}
	//If we want to turn off the player
	else {
		//If the player is totally off, then do nothing
		if (player1State == 0) {}
		//If the player is current paused, then unpause it and turn it off
		else if (player1State == 1) {
			unpausePlayer1();
			turnOffPlayer1();
			P1Stream.pause();
		}
		//If the player currently running, then turn it off
		else {
			turnOffPlayer1();
			P1Stream.pause();
		}
	}
}

//UPDATE HANDLER for handing the state of the P2 player
function updateP2State(newState) {
	//If we want to turn the player on
	if (newState == 2) {
		//If the player is totally off, then turn it on
		if (player2State == 0) {
			turnOnPlayer2();
			P2Stream.play();
		}
		//If the player is current paused, then unpause it
		else if (player2State == 1) {
			unpausePlayer2();
			P2Stream.play();
		}
		//If the player currently running, then turn it off
		else {}
	}
	//If we want to  pause the player
	else if(newState == 1) {
		//If the player is totally off, then turn it on and immediately pause it
		if (player2State == 0) {
			turnOnPlayer2();
			pausePlayer2();
		}
		//If the player is current paused, then do nothing
		else if (player2State == 1) {}
		//If the player currently running, then turn it off
		else {
			pausePlayer2();
			P2Stream.pause();
		}
	}
	//If we want to turn off the player
	else {
		//If the player is totally off, then do nothing
		if (player2State == 0) {}
		//If the player is current paused, then unpause it and turn it off
		else if (player2State == 1) {
			unpausePlayer2();
			turnOffPlayer2();
			P2Stream.pause();
		}
		//If the player currently running, then turn it off
		else {
			turnOffPlayer2();
			P2Stream.pause();
		}
	}
}

///
/// HANDLES TOGGLING WHEN CLICKING A BUTTON
///


//Starts playing on player 1 and pauses player 2, if playing
function togglePlayer1() {
	//Won't run if already in the process of an animation
	if (!isPlayer1Animating()) {
		//If the player is current off or paused, then update it's state to be on
		if(player1State == 0 || player1State == 1) {
			updateP1State(2);
			updateP2State(0);
		}
		//If the player is currently on, then pause it
		else{
			updateP1State(1);
		}
	}
	else {
		console.log("Stop clicking so fast");
	}
}


//Starts playing on player 2 and pauses player 1, if playing
function togglePlayer2() {
	//Won't run if already in the process of an animation
	if(!isPlayer2Animating()) {
		//If the player is current off or paused, then update it's state to be on
		if(player2State == 0 || player2State == 1) {
			updateP2State(2);
			updateP1State(0);
		}
		//If the player is currently on, then pause it
		else{
			updateP2State(1);
		}	
	}
	else {
		console.log("Stop clicking so fast");
	}
}

//
//ANIMATION LOCKOUT to eliminate clicking too fast
//

function isPlayer1Animating() {
		if (document.getElementById("player-1-play").classList.contains("fade-in")  || document.getElementById("player-1-play").classList.contains("fade-out")){
			return true;
		}
		else if (document.getElementById("player-1-icon-play").classList.contains("fade-in") || document.getElementById("player-1-icon-pause").classList.contains("fade-in")) {
			return true;
		}
		else if (document.getElementById("player-1-text").classList.contains("slide-text-left-in") || document.getElementById("player-1-text").classList.contains("slide-text-left-out")) {
			return true;
		}
		else  {
			return false;
		}
}

function isPlayer2Animating() {
		if (document.getElementById("player-2-play").classList.contains("fade-in")  || document.getElementById("player-2-play").classList.contains("fade-out")){
			return true;
		}
		else if (document.getElementById("player-2-icon-play").classList.contains("fade-in") || document.getElementById("player-2-icon-pause").classList.contains("fade-in")) {
			return true;
		}
		else if (document.getElementById("player-2-text").classList.contains("slide-text-right-in") || document.getElementById("player-2-text").classList.contains("slide-text-right-out")) {
			return true;
		}
		else  {
			return false;
		}
}

//
// Player Functions
//

function toggleP1Stream() {
	if (P1Stream.paused) {
        P1Stream.play();
    } 
    else {
        P1Stream.pause();
    }  
}

//Starts the animation to startPlayer1
function turnOnPlayer1() {
	player1State = 2;
	
	
 
	
	//Animations
	document.getElementById("player-1-button").style.paddingLeft = "10px";
	document.getElementById("player-1-play").style.display = "flex";
	document.getElementById("player-1-play").classList.add("fade-in");
	document.getElementById("player-1-text").style.display = "flex";
	document.getElementById("player-1-text").classList.add("slide-text-left-in");
	document.getElementById("player-1-station-1").innerText = "You're Listening To";
	
}

//Starts the animation to startPlayer1
function turnOffPlayer1() {
	player1State = 0;

        P1Stream.pause();

	//Animations
	document.getElementById("player-1-play").classList.add("fade-out");
	document.getElementById("player-1-text").classList.add("slide-text-left-out");
	document.getElementById("player-1-button").style.paddingLeft = "15px";
	document.getElementById("player-1-station-1").innerText = "Listen To";
}

//Starts the animation to startPlayer1
function turnOnPlayer2() {
	player2State = 2;
	
	//Animations
	
	document.getElementById("player-2-button").style.paddingRight = "10px";
	document.getElementById("player-2-play").style.display = "flex";
	document.getElementById("player-2-play").classList.add("fade-in");
	document.getElementById("player-2-text").style.display = "flex";
	document.getElementById("player-2-text").classList.add("slide-text-right-in");
	document.getElementById("player-2-station-1").innerText = "You're Listening To";
}

//Starts the animation to startPlayer1
function turnOffPlayer2() {
	player2State = 0;
	
	//Animations
	document.getElementById("player-2-play").classList.add("fade-out");
	document.getElementById("player-2-text").classList.add("slide-text-right-out");
	document.getElementById("player-2-button").style.paddingRight = "15px";
	document.getElementById("player-2-station-1").innerText = "Listen To";
	
}

function pausePlayer1() {
	player1State = 1;
	
	//Animations
	document.getElementById("player-1-icon-play").classList.add("fade-out");
	document.getElementById("player-1-icon-pause").style.display = "flex";
	document.getElementById("player-1-icon-pause").classList.add("fade-in");
}

function unpausePlayer1() {
	player1State = 2;
	
	//Animations
	document.getElementById("player-1-icon-pause").classList.add("fade-out");
	document.getElementById("player-1-icon-play").style.display = "flex";
	document.getElementById("player-1-icon-play").classList.add("fade-in");
}

function pausePlayer2() {
	player2State = 1;
	
	//Animations
	document.getElementById("player-2-icon-play").classList.add("fade-out");
	document.getElementById("player-2-icon-pause").style.display = "flex";
	document.getElementById("player-2-icon-pause").classList.add("fade-in");
}

function unpausePlayer2() {
	player2State = 2;
	
	//Animations
	document.getElementById("player-2-icon-pause").classList.add("fade-out");
	document.getElementById("player-2-icon-play").style.display = "flex";
	document.getElementById("player-2-icon-play").classList.add("fade-in");
}


//
// Animation listeners
// Adds event listeners to animated parts of the player and removes the animated class when the animation completes
//

document.getElementById("player-1-play").addEventListener("animationend", function() {
	if (document.getElementById("player-1-play").classList.contains("fade-in")) {
			document.getElementById("player-1-play").classList.remove("fade-in");
		}
	else if (document.getElementById("player-1-play").classList.contains("fade-out")){
		document.getElementById("player-1-play").classList.remove("fade-out");
		document.getElementById("player-1-play").style.display = "none";
	}
}, false);

document.getElementById("player-1-icon-pause").addEventListener("animationend", function() {
	if (document.getElementById("player-1-icon-pause").classList.contains("fade-in")) {
		document.getElementById("player-1-icon-pause").classList.remove("fade-in");
	}
	else if (document.getElementById("player-1-icon-pause").classList.contains("fade-out")){
		
		document.getElementById("player-1-icon-pause").classList.remove("fade-out");
		document.getElementById("player-1-icon-pause").style.display = "none";
	}
}, false);

document.getElementById("player-1-icon-play").addEventListener("animationend", function() {
	if (document.getElementById("player-1-icon-play").classList.contains("fade-in")) {
			document.getElementById("player-1-icon-play").classList.remove("fade-in");
		}
	else if (document.getElementById("player-1-icon-play").classList.contains("fade-out")){
		
		document.getElementById("player-1-icon-play").classList.remove("fade-out");
		document.getElementById("player-1-icon-play").style.display = "none";
	}
}, false);

document.getElementById("player-2-play").addEventListener("animationend", function() {
	if (document.getElementById("player-2-play").classList.contains("fade-in")) {
			document.getElementById("player-2-play").classList.remove("fade-in");
		}
	else  if (document.getElementById("player-2-play").classList.contains("fade-out")) {
		document.getElementById("player-2-play").classList.remove("fade-out");
		document.getElementById("player-2-play").style.display = "none";
	}
}, false);

document.getElementById("player-2-icon-pause").addEventListener("animationend", function() {
	if (document.getElementById("player-2-icon-pause").classList.contains("fade-in")) {
		document.getElementById("player-2-icon-pause").classList.remove("fade-in");
	}
	else if (document.getElementById("player-2-icon-pause").classList.contains("fade-out")){
		document.getElementById("player-2-icon-pause").classList.remove("fade-out");
		document.getElementById("player-2-icon-pause").style.display = "none";
	}
}, false);

document.getElementById("player-2-icon-play").addEventListener("animationend", function() {
	if (document.getElementById("player-2-icon-play").classList.contains("fade-in")) {
			document.getElementById("player-2-icon-play").classList.remove("fade-in");
		}
	else if (document.getElementById("player-2-icon-play").classList.contains("fade-out")){
		document.getElementById("player-2-icon-play").classList.remove("fade-out");
		document.getElementById("player-2-icon-play").style.display = "none";
	}
}, false);

document.getElementById("player-1-text").addEventListener("animationend", function() {
	if (document.getElementById("player-1-text").classList.contains("slide-text-left-in")) {
			document.getElementById("player-1-text").classList.remove("slide-text-left-in");
		}
	else if (document.getElementById("player-1-text").classList.contains("slide-text-left-out")){
		document.getElementById("player-1-text").classList.remove("slide-text-left-out");
		document.getElementById("player-1-text").style.display = "none";
	}
}, false);

document.getElementById("player-2-text").addEventListener("animationend", function() {
	if (document.getElementById("player-2-text").classList.contains("slide-text-right-in")) {
			console.log("Slide right in");
			document.getElementById("player-2-text").classList.remove("slide-text-right-in");
		}
	else if (document.getElementById("player-2-text").classList.contains("slide-text-right-out")){
		document.getElementById("player-2-text").classList.remove("slide-text-right-out");
		document.getElementById("player-2-text").style.display = "none";
	}
}, false);
