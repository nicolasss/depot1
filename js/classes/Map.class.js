/***********************************************************************************/
/************************************ CLASSE MAP ***********************************/
/***********************************************************************************/

/*
 * La carte est un tableau à deux dimensions, la valeur stockée représente le
 * type de bloc à cet emplacement sur la carte.
 *
 * Les types de blocs sont définis dans le fichier dragon-slayer-data.js.
 *
 * On peut voir cette carte comme une une représentation "vue du dessus" du jeu.
 */

// Carte du jeu à stocker dans une propriété de la classe.
/*
MAP_EMPTY    = 0;
MAP_WALL     = 1;
MAP_WATER    = 2;
MAP_TREASURE = 3;
MAP_DRAGON   = 4;
MAP_PLAYER   = 5;
*/

 function Map(){
    this.map = [
        [ 1,  1,  1,  1,  1,  0,  1,  1,  1,  1 ],
        [ 1,  0,  1,  1,  0,  0,  0,  0,  3,  1 ],
        [ 1,  1,  1,  0,  0,  0,  1,  0,  1,  1 ],
        [ 1,  4,  0,  0,  0,  0,  0,  0,  0,  1 ],
        [ 1,  1,  1,  0,  0,  0,  0,  1,  0,  1 ],
        [ 1,  0,  0,  0,  0,  0,  0,  1,  0,  1 ],
        [ 1,  0,  0,  1,  1,  1,  0,  1,  0,  1 ],
        [ 2,  0,  0,  0,  1,  0,  0,  1,  0,  1 ],
        [ 2,  2,  5,  0,  0,  0,  0,  1,  2,  2 ],
        [ 2,  2,  1,  1,  1,  1,  1,  1,  1,  1 ]
    ];
 }

 Map.prototype.generateMap = function(){
    var mapString = '';

    for (var i = 0; i < this.map.length; i++) {
        mapString += "<tr>";
        for (var j = 0; j < this.map[i].length; j++) {
            //console.log(this.map[i][j]);
                switch(this.map[i][j]){
                    case 0: 
                        mapString += '<td class="empty"></td>';
                        break;
                    case 1:
                        mapString += '<td class="wall"></td>';
                        break;
                    case 2:
                        mapString += '<td class="water"></td>';
                        break;
                    case 3:
                        mapString += '<td class="treasure"></td>';
                        break;
                    case 4:
                        mapString += '<td class="dragon"></td>';
                        break;
                    case 5: //position player
                        mapString += '<td class="positionPlayer"></td>';
                        break;
                }
        }
        mapString += "</tr>";
    }
    return mapString;
 }
