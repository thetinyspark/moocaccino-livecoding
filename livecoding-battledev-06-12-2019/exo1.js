/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/

 /**
  * 
{
    name: 'Eagle', 
    stickLength: 100
}
  */

var input = [
    '3', 
    'Eagle 120', 
    'Richard 600', 
    'Virginie 1000'
];

function getLoser( walkers ){

    // on init une variable "min" qui contiendra le plus petit bout de bois
    let min = 0;
    // la variable index stocke la position du marcheur qui possède le plus petit bout de bois
    let index = 0;

    // si le tableau de marcheurs est vide alors on retourne null
    if( walkers.length === 0 ){
        return null;
    }

    // pour l'instant le bout de bois le plus petit est celui 
    // du premier marcheur
    min = walkers[0].len;
    index = 0;

    // je boucle sur l'ensemble des marcheurs
    for( let i = 1; i < walkers.length; i++ ){
        // le marcheur en cours
        let current = walkers[i];

        // si la longueur du bâton du randonneur courant ( celui qui se trouve  en position )
        // i dans le tableau est inférieure à celle déjà enregistrée alors ...
        if( current.len < min ){
            // on actualise la valeur de min et on lui donne celle du bâton 
            // du randonneur actuel
            min = current.len;

            // et on actualise la position du randonneur ayant la plus petite longueur 
            // de bâton ( on la stocke dans index)
            index = i;
        }
    }

    // une fois que j'ai bouclé sur l'ensemble des bouts de bois 
    // je me retrouve avec la valeur du bout de bois le plus petit
    // ... et également la position du marcheur qui possède le plus petit
    // bout de bois au sein du tableau de marcheurs

    return walkers[index];

}

function ContestResponse(){

    // on retire le premier élément du tableau et on le convertit en entier 
    // afin de le stocker dans la variable "max"
    let max = parseInt(input.shift());

    // on déclare un tableau contenant des randonneurs
    // au départ, ce tableau est vide
    let walkers = [];

    // on va boucler sur l'ensemble des éléments restants 
    for( let i = 0; i < max; i++){

        // on crée un tableau à l'aide de la méthode split des objets de type string
        let splitted = input[i].split(" ");
        walkers.push( 
            {
                name: splitted[0], 
                len: parseInt(splitted[1])
            }
        );
    }

    let loser = getLoser(walkers);
    console.log(loser.name);
}

ContestResponse();