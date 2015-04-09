/***********************************************************************************/
/********************************** CLASSE JOUEUR **********************************/
/***********************************************************************************/

/*
Trésor, armure OU épée
Classe joueur: Paladin, wizard, thief
*/

function Player(){
	this.nickName = "";
	this.classe = "";
	this.life = 100; 
	this.damage = 10; //initial damage (hand) 
	this.armor = 1; //initial damage reduction = 0%
	this.x = 2; //position initial player
	this.y = 8;
	this.attackTurn = 0;
}

Player.prototype.attack = function(thingsAttacked){
	thingsAttacked.life = Math.max(0, thingsAttacked.life - this.damage);
	this.attackTurn = 0;
  	thingsAttacked.attackTurn = 1;
}
