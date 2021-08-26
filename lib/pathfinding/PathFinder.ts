import { Log, LogType } from "./Log";
import { NODE_DISTANCE_VALUE, Node } from "./Node";

export class PathFinder {


    private opened: Node[] = [];
    private closed: Node[] = [];
    private _graphe: Node[][] = [];
    private _start: Node = null;
    private _end: Node = null;
    private _logs:Log[] = [];

    public step() {

        // a. Récupération du node avec le plus petit F contenu dans la liste ouverte. 
        // On le nommera CURRENT.
        this.opened.sort((a, b) => a.f < b.f ? -1 : 1);
        const currentNode = this.opened[0];
        this._logs.push( {type:LogType.SET_CURRENT_NODE, target: currentNode });

        //  stopper la méthode si on ajoute le noeud d'arrivée à la liste fermée
        if (this.opened.length > 0 && currentNode === this._end) {
            this._logs.push( {type:LogType.COMPLETE, target: currentNode });
            return false;
        }

        // b. Basculer CURRENT dans la liste fermée.
        this.addToCloseList(currentNode);

        //  récupération des voisins de CURRENT
        let neighbours = this.getNeighbours(currentNode, this._graphe);
        let maxi = neighbours.length;

        // Pour chacun des nodes adjacents à CURRENT appliquer la méthode suivante:
        for (let i = 0; i < maxi; ++i) {
            const node = neighbours[i];

            //Si le node est un obstacle ou est dans la liste fermée ignorez-le et passer à l'analyse d'un autre node.
            if (this.isOnCloseList(node) || node.walkable === false)
                continue;

            const opened:boolean = this.isOnOpenList(node);

            /* on calcule le nouveau g */
            const newG = currentNode.g + NODE_DISTANCE_VALUE;

            /*on calcule le nouveau h */
            const newH = (Math.abs(this._end.row - node.row) + Math.abs(this._end.col - node.col)) * NODE_DISTANCE_VALUE;

            /*on calcule le nouveau F*/
            const newF = newH + newG;
            if ( 
                ( opened && newG < node.g ) ||
                !opened
            ) {
                //Si le node est déjà dans la liste ouverte, recalculez son G, s'il est inférieur à l'ancien, 
                //faites de CURRENT  son parent(P) et recalculez et enregistrez ses propriétés F et H.

                //Si le node n'est pas dans la liste ouverte, ajoutez-le à la dite liste et faites de CURRENT son parent(P). 
                //Calculez et enregistrez ses propriétés F, G et H.
       
                node.parent = currentNode;
                node.g = newG;
                node.h = newH;
                node.f = newF;
                this._logs.push( {type:LogType.RECALC_VALUES, target: node, parent: currentNode });
                if( !opened ){
                    this.addToOpenList(node);
                }
            }

        }

        return true;
    }

    public findPath(param_graphe, param_start, param_end): {logs: Log[], solution:Node[]} {
        // on crée les listes fermées et les listes ouvertes
        this.opened = new Array();
        this.closed = new Array();
        this._start = param_start;
        this._end = param_end;
        this._graphe = param_graphe;

        // - Ajout du node de départ à la liste ouverte.

        this.addToOpenList(this._start);


        //  stopper la boucle si la liste ouverte est vide
        let hasNextStep: boolean = true ;
        while( hasNextStep ){
            hasNextStep = this.step();
        }

        // on finalise notre algo
        const finalPath = [];

        // on est sorti de la liste, on a deux solutions, soit la liste ouverte est vide dans ces cas là il 
        // n'y a pas de solutions et on retourne un finalPath vide
        // soit il y a au moins un élément dans la liste ouverte et on peut reconstruire le chemin à rebours.
        if (this.opened.length > 0) {
            // Soit on construit le chemin à rebours;
            let lastNode: Node = this._end;

            while (lastNode != this._start) {
                finalPath.unshift(lastNode);
                lastNode = lastNode.parent;
            }
        }
        //on retourne nos résultats
        return {
            logs: this._logs,
            solution: finalPath
        };
    }

    public addToCloseList(param_node) {

        const index = this.opened.indexOf(param_node);
        if (index > -1)
            this.opened.splice(index, 1);

        this.closed.push(param_node);
        param_node.state = 200;
        this._logs.push( {type:LogType.ADD_TO_CLOSE_LIST, target: param_node });
    }

    public addToOpenList(param_node) {

        const index = this.closed.indexOf(param_node);
        if (index > -1)
            this.closed.splice(index, 1);

        this.opened.push(param_node);
        param_node.state = 100;
        this._logs.push( {type:LogType.ADD_TO_OPEN_LIST, target: param_node });
    }

    public getNeighbours(node, graphe):Node[] {
        const row = node.row;
        const col = node.col;
        const indices = [[row, col + 1], [row, col - 1], [row - 1, col], [row + 1, col]];
        const results = [];

        indices.forEach(
            (coords) => {
                const r = coords[0];
                const c = coords[1];
                if (graphe[r] && graphe[r][c]) {
                    results.push(graphe[r][c]);
                }
            }
        );

        return results;
    }

    public isOnOpenList(param_node) {
        return this.opened.indexOf(param_node) > -1;
    }

    public isOnCloseList(param_node) {
        return this.closed.indexOf(param_node) > -1;
    }


}