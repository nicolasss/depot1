/*******************************************************************************************/
/********************************** FONCTIONS UTILITAIRES **********************************/
/*******************************************************************************************/

function validFormulaire(){
	var playerNickName = $('input[name="nickName"]').val();

	if (playerNickName != ""){
		return true;
	}
	else{
		window.alert("Enter a nickname");
		return false;
	}
}

function onGameStart()
{
    var dragonSlayerGame;
    dragonSlayerGame = new Game();
    
    if(validFormulaire()){
    	dragonSlayerGame.launch();
    }
}