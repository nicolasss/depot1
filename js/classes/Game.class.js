/***********************************************************************************/
/*********************************** GAME CLASS  ***********************************/
/***********************************************************************************/
function Game(){
	this.difficulty = '';
	this.player = null;
	this.dragon = null;
	this.map = null;
	this.gameState = STATE_LAUNCH;	
}

/*
-->number, etat de jeu.
STATE_LAUNCH = 1;
STATE_END    = 2;
STATE_FIGHT  = 3;
STATE_PLAY   = 4; 
Changement état du jeu.
*/
Game.prototype.changeGameState = function(gameState){
	switch(gameState){
		case STATE_LAUNCH: 
			this.gameState = gameState;
			this.launch();
			break;
		case STATE_PLAY: 
			this.gameState = gameState;
			this.startGame();
			break;
		case STATE_FIGHT: 
			this.gameState = gameState;
			this.startFight();
			break;
		case STATE_END: 
			this.gameState = gameState;
			this.endGame();
			break;
	}
}

/*
Initialisation des données de jeux.
*/
Game.prototype.launch = function()
{
	var playerNickName = $('input[name="nickName"]').val(),
		playerClasse = $('select option:selected').val(),
		gameDifficulty = $('input[name="difficulty"]:checked').attr('title');

	this.gameState = STATE_LAUNCH; //case try again, END --> LAUNCH
	
	this.difficulty = gameDifficulty;

	this.player = new Player();
	this.player.classe = playerClasse;
	switch(playerClasse){
		case "paladin": //armor bonus
			this.player.life += 30;
			break;
		case "wizard": //damage bonus
			this.player.life += 20;
			break;
		case "thief": //life bonus
			this.player.life += 10;
			break;
	}
	this.player.nickName = playerNickName;

	this.dragon = new Dragon();
	switch(gameDifficulty){
		case "easy":
			this.dragon.life -= 10;
			this.dragon.damage -= 5;
			break;
		case "hard": 
			this.dragon.life += 10;
			this.dragon.damage += 5;
			break;
	}

	this.map = new Map();

	this.changeGameState(STATE_PLAY);
}

/*
Commence jeux. Affichage carte. Change game state.
*/
Game.prototype.startGame = function(){
	$(document).bind("keydown", this.makeAMove.bind(this));
	$("form").hide();

	$("table").html(this.map.generateMap());
	$("table").show();
}

Game.prototype.makeAMove = function(event){
	if(event.which == 37){ //left key
		this.moveLeft();
	}
	if(event.which == 38){//up key
		this.moveUp();
	}
	if(event.which == 39){//right key
		this.moveRight();
	}
	if(event.which == 40){//down key
		this.moveDown();
	}

	$("table").html('');
    $("table").html(this.map.generateMap());
}

Game.prototype.moveUp = function() {
    var newX = this.player.x,
    	newY = this.player.y-1,
    	newPositionValue = this.map.map[newY][newX]; //représentation inversé de matrice

    if(newY >= 0){//in the map
    	if(newPositionValue == 0){ //case empty => deplacement
    		this.changeMapValues(newX, newY);
	    }
	    else if(newPositionValue == 3){//treasure => change property player
	    	this.changeMapValues(newX, newY);
	    	this.treasure();
	    }
	    else if(newPositionValue == 4){//dragon => start fight
	    	this.changeMapValues(newX, newY);
	    	this.changeGameState(STATE_FIGHT);
	    }
    }
    else{
    	console.log("impossible move");
    }
}

Game.prototype.moveDown = function() {
    var newX = this.player.x,
    	newY = this.player.y+1,
    	newPositionValue = this.map.map[newY][newX];

    if(newY < this.map.map.length){
    	if(newPositionValue == 0){ //case empty
    		this.changeMapValues(newX, newY);
	    }
	    else if(newPositionValue == 3){//treasure
	    	this.changeMapValues(newX, newY);
	    	this.treasure();
	    }
	    else if(newPositionValue == 4){//dragon
	    	this.changeMapValues(newX, newY);
	    	this.changeGameState(STATE_FIGHT);
	    }
    }
    else{
    	console.log("impossible move");
    }
}

Game.prototype.moveLeft = function() {
    var newX = this.player.x-1,
    	newY = this.player.y,
    	newPositionValue = this.map.map[newY][newX];

    if(newX >= 0){
    	if(newPositionValue == 0){ //case empty
    		this.changeMapValues(newX, newY);
	    }
	    else if(newPositionValue == 3){//treasure
	    	this.changeMapValues(newX, newY);
	    	this.treasure();
	    }
	    else if(newPositionValue == 4){//dragon
	    	this.changeMapValues(newX, newY);
	    	this.changeGameState(STATE_FIGHT);
	    }
    }
    else{
    	console.log("impossible move");
    }
}

Game.prototype.moveRight = function() {
    var newX = this.player.x+1,
    	newY = this.player.y,
    	newPositionValue = this.map.map[newY][newX];

    if(newX < this.map.map[this.player.x].length){
    	if(newPositionValue == 0){ //case empty
    		this.changeMapValues(newX, newY);
	    }
	    else if(newPositionValue == 3){//treasure
	    	this.changeMapValues(newX, newY);
	    	this.treasure();
	    }
	    else if(newPositionValue == 4){//dragon
	    	this.changeMapValues(newX, newY);
	    	//unbind keydaown listenners
			$(document).unbind("keydown");
	    	this.changeGameState(STATE_FIGHT);
	    }
    }
    else{
    	console.log("impossible move");
    }
}

Game.prototype.changeMapValues = function(newX, newY){
	var previousX = this.player.x,
		previousY = this.player.y;
		previousPositionValue = this.map.map[previousY][previousX];
		newPositionValue = this.map.map[newY][newX];

	this.map.map[previousY][previousX] = 0; //la case devient vide
	this.map.map[newY][newX] = 5; //nouvelle case occupé par le joueur

	this.player.x = newX;
	this.player.y = newY;

	$("table").html('');
    $("table").html(this.map.generateMap());
}

Game.prototype.startFight = function(){

	$("aside").show();

	$("#lifePlayer").html('Life : ' + this.player.life);
	$("#lifeDragon").html('Life : ' + this.dragon.life);
	$("textarea").html("Shit! A wild dragon appears (space bar to start fighting).\n-------------\n");

	//Random start 
	var tour = Math.round(Math.random());
	if(tour == 0){ // Player commence
		this.player.attackTurn = 1;
	}
	else if (tour == 1){ // Dragon commence
		this.dragon.attackTurn = 1;
	}

	$(document).bind("keydown", this.fightNextTour.bind(this));
}

Game.prototype.fightNextTour = function(event){
	// space bar event
	if(event.which == 32){

		var msg = $("textarea").html();
		
		if(this.player.attackTurn == 1){
			this.player.attack(this.dragon);
			msg += "Player infliged " + this.player.damage + " to Dragon" + 
					"\n-------------\n";
		}
		else if(this.dragon.attackTurn == 1)
		{
			this.dragon.attack(this.player);
			msg += "Dragon infliged " + this.dragon.damage + " to Player" + 
					"\n-------------\n";
		}
		$("textarea").html(msg);
		$("#lifePlayer").html('Life : ' + this.player.life);
		$("#lifeDragon").html('Life : ' + this.dragon.life);
		

		if(this.player.life <= 0 || this.dragon.life <= 0){
			$(document).unbind("keydown");
			this.changeGameState(STATE_END);
		}
	}
}

Game.prototype.endGame = function(){
	console.log("endGame");

	if(this.player.life > 0){
		window.alert("Well done, you killed that fucking dragon!\nTry again?");
		console.log("player win");
	}
	else{
		window.alert("You lost, dragon was too strong :-(\nTry again?");
		window.alert("You lost, dragon was too strong :-(\nTry again?");
			console.log("dragon win");
	}
}

/*
Tresure = Armor/damage bonus. 
*/
Game.prototype.treasure = function(){
	var bonus = parseInt((Math.random() * 10));

	switch(bonus){
		//Damage bonus
		case 0: //wood stick
			console.log("Congratulation, you found a wood stick (+3 damage)");
			$("#playerEquipment").html("Damage bonus: Wood stick (+3)");
			this.player.damage += 3;
			break;
		case 1: //ward
			console.log("Congratulation, you found a ward (+6 damage)");
			$("#playerEquipment").html("Damage bonus: ward (+6)");
			this.player.damage += 6;
			break;
		case 2: //bow
			console.log("Congratulation, you found a bow (+9 damage)");
			$("#playerEquipment").html("Damage bonus: Bow (+9)");
			this.player.damage += 9;
			break;
		case 3: //sword
			console.log("Congratulation, you found a sword (+12 damage)");
			$("#playerEquipment").html("Damage bonus: Sword (+12)");
			this.player.damage += 12;
			break;
		case 4: //axe
			console.log("Congratulation, you found an axe (+15 damage)");
			$("#playerEquipment").html("Damage bonus: Axe (+15)");
			this.player.damage += 15;
			break;
		//Armor bonus
		case 5: // Leather jacket
			console.log("Congratulation, you found a leather jacket (5% damage reduction)");
			$("#playerEquipment").html("Armor bonus: Leather jacket (-5% damage)");
			this.player.armor = 0.95;
			break;
		case 6: //bronze armor
			console.log("Congratulation, you found a bronze armor (10% damage reduction)");
			$("#playerEquipment").html("Armor bonus: Bronze armor (-10% damage)");
			this.player.armor = 0.9;
			break;
		case 7: //iron armor
			console.log("Congratulation, you found an iron armor (15% damage reduction)");
			$("#playerEquipment").html("Armor bonus: Iron armor (-15% damage)");
			this.player.armor = 0.85;
			break;
		case 8: //steele armor
			console.log("Congratulation, you found a steel armor (20% damage reduction)");
			$("#playerEquipment").html("Armor bonus: Steel armor (-20% damage)");
			this.player.armor = 0.8;
			break;
		case 9: //diamond armor
			console.log("Congratulation, you found a diamond armor (25% damage reduction)");
			$("#playerEquipment").html("Armor bonus: Diamond armor (-25% damage)");
			this.player.armor = 0.75;
			break;
	}
}