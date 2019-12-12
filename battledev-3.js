/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/




// on trie les demandes en fonction de la date de démarrage
// dans l'ordre croissant, cette fonction de tri permet de comparer 
// deux éléments qui représentent chacun une demande d'ingénieur. 
function sortAsk( ask1, ask2 ){
    if( ask1.start < ask2.start ){
        return -1;
    }
    else{
        return 1;
    }
}

// on construit des objets qui représent les "demandes d'ingénieur"
// à partir des données contenues dans "dataAsk"
function buildAsk(numAsk, dataAsk){
    // on déclare un tableau
    let asks = []; 

    // on cherche à créer "numAsk" demandes d'ingénieur
    for ( let i = 0; i < numAsk; i++ ){

        // on récupère les données contenues à la ligne numéro "i" dans dataAsk
        // puis on crée un tableau à partir de cette dernière. 
        // La ligne est découpée en plusieurs morceaux en fonction d'un séparateur 
        // ici il s'agit du caractère " " (espace vide). 
        // Pour plus de détails concernant la fonctionnalité "split" consultez: 
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/split
        let tab = dataAsk[i].split(" ");

        // on crée un nouvel objet représentant une demande d'ingénieur
        // qui possède une date de départ et une date de fin, puis
        // on pousse cette demande dans le tableau de demandes
        asks.push( 
            {
                start: parseInt(tab[0]), 
                end: parseInt(tab[1])
            }
        )
    }

    // on retourne le tableau de demandes
    return asks;
}

// on construit des objets qui représent les câbles 
function buildCables(numCables){

    // on crée un tableau de câbles
    let cables = []; 

    // on crée autant de câbles que précisé dans "numCables"
    for( let i = 0; i < numCables; i++ ){
        // un câble est représenté par un identifiant (id)
        // et une date de fin d'exploitation (end)
        // par défaut, tous les câbles sont disponibles au temps t = 0
        cables.push(
            {
                id: i + 1,
                end: 0
            }
        );
    }

    // on retourne le tableau de câbles
    return cables;
}

// fonction permettant de retrouver un câble libre au temps "time"
// parmi les câbles contenus dans "cables"
function getFreeCableAt( cables, time ){
    // pour tous les câbles
    for( let i = 0; i < cables.length; i++ ){
        // si la date de fin d'utilisation du câble en cours est inférieur à time
        // alors le câble est considéré comme libre
        if( cables[i].end <= time ){
            // on retourne donc le câble en question
            return cables[i];
        }
    }
    // si on arrive ici, c'est qu'aucun câble n'est disponible
    return null;
}

function ContestResponse(){

    // on récupère les données contenues dans la première ligne
    // il s'agit des données de configuration
    let first = input.shift();
    // on découpe les infos séparées par un espace vide
    // à l'aide de split
    let config = first.split(" ");

    // on récupère le nombre de câbles puis le nombre de demandes
    const numCables = parseInt(config[0]);
    const numAsk = parseInt(config[1]);
    // on construit les tableaux de câbles et de demandes d'ingénieurs
    const cables = buildCables(numCables);
    const ask =  buildAsk(numAsk, input);

    // on crée un tableau représentant la sortie demandée
    let output = [];

    // on trie les demandes de la plus ancienne à la pus "futuriste"
    ask.sort(sortAsk);

    // pour chaque demande ...
    for( let i = 0; i < ask.length; i++ ){
        // on essaie de trouver un câble libre au moment où l'ingénieur
        // fait sa demande
        let freecable = getFreeCableAt( cables, ask[i].start );

        // si aucun câble n'a été trouvé
        if( freecable == null ){
            // alors c'est impossible de remplir la demande
            // on renvoie la valeur "pas possible" et on arrête 
            // notre programme, fin de l'exercice
            console.log("pas possible");
            return;
        }
        else{
            // sinon on reporte la date de fin d'exploitation du câble
            // le cable sera de nouveau libre lorsque l'ingénieur aura fini 
            // de s'en servir
            freecable.end = ask[i].end;
            // on pousse l'id du câble en cours dans le tableau de sortie
            output.push( freecable.id );
        }
    }

    // on affiche l'ensemble des identifiants de câbles séparés par un espace vide
	console.log(output.join(" "));
}


/**
 * Le code situé plus bas ne doit pas être collé dans l'interface de la battledev
 * Il n'est nécessaire que dans le contexte d'un test sous node.js ( ce que j'ai fait ).
 * 
 * Il vous suffit donc de ne pas copier le code ci-dessus lorsque vous soumettez 
 * votre solution.
 */

 // jeu de données fictif
var input = [
    "5 15", 

    "0 120", 
    "5 120",
    "2 120",
    "40 50",
    "10 50",
    "30 50",
    "30 87",
    "30 58",
    "30 60",
    "30 70",
    "30 80",
    "110 120",
    "110 119",
    "110 118",
    "110 117"
];

// on lance le script nous-même
ContestResponse();
