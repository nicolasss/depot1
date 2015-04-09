/***********************************************************************************/
/*********************************** CLASSE DRAGON *********************************/
/***********************************************************************************/

function Dragon(){
	this.life = 150;
	this.damage = 15;
	this.attackTurn = 0;
}

Dragon.prototype.attack = function(thingsAttacked){
	thingsAttacked.life = Math.max(0, thingsAttacked.life - (this.damage * thingsAttacked.armor));
	this.attackTurn = 0;
	thingsAttacked.attackTurn = 1;
}