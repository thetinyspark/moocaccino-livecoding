import { NODE_DISTANCE_VALUE, Node, CLOSED, OPENED } from "./Node";

export class FastFinder {
    private opened: Node[] = [];
    private closed: Node[] = [];


    public findPath(graphe:Node[][], startNode:Node, endNode:Node): Node[] {
        // on crée les listes fermées et les listes ouvertes
        this.opened = new Array();
        this.closed = new Array();

        // - Ajout du node de départ à la liste ouverte.

        this.addToOpenList(startNode);


        //  stopper la boucle si la liste ouverte est vide
        let hasNextStep: boolean = true;
        while (hasNextStep) {
            // a. Récupération du node avec le plus petit F contenu dans la liste ouverte. 
            // On le nommera CURRENT.
            this.opened.sort((a, b) => a.f < b.f ? -1 : 1);
            const currentNode = this.opened[0];

            //  stopper la méthode si on ajoute le noeud d'arrivée à la liste fermée
            if (this.opened.length > 0 && currentNode === endNode) {
                hasNextStep = false;
                break;
            }

            // b. Basculer CURRENT dans la liste fermée.
            this.addToCloseList(currentNode);

            //  récupération des voisins de CURRENT
            let neighbours = this.getNeighbours(currentNode, graphe);
            let maxi = neighbours.length;

            // Pour chacun des nodes adjacents à CURRENT appliquer la méthode suivante:
            for (let i = 0; i < maxi; ++i) {
                const node = neighbours[i];

                //Si le node est un obstacle ou est dans la liste fermée ignorez-le et passer à l'analyse d'un autre node.
                if (this.isOnCloseList(node) || node.walkable === false)
                    continue;

                const opened: boolean = this.isOnOpenList(node);

                /* on calcule le nouveau g */
                const newG = currentNode.g + NODE_DISTANCE_VALUE;

                /*on calcule le nouveau h */
                const newH = (Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)) * NODE_DISTANCE_VALUE;

                /*on calcule le nouveau F*/
                const newF = newH + newG;
                if (
                    (opened && newG < node.g) ||
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
                    if (!opened) {
                        this.addToOpenList(node);
                    }
                }

            }

        }

        // on finalise notre algo
        const finalPath = [];

        // on est sorti de la liste, on a deux solutions, soit la liste ouverte est vide dans ces cas là il 
        // n'y a pas de solutions et on retourne un finalPath vide
        // soit il y a au moins un élément dans la liste ouverte et on peut reconstruire le chemin à rebours.
        if (this.opened.length > 0) {
            // Soit on construit le chemin à rebours;
            let lastNode: Node = endNode;

            while (lastNode != startNode) {
                finalPath.unshift(lastNode);
                lastNode = lastNode.parent;
            }
        }
        //on retourne nos résultats
        return finalPath;
    }

    public addToCloseList(param_node) {

        const index = this.opened.indexOf(param_node);
        if (index > -1)
            this.opened.splice(index, 1);

        this.closed.push(param_node);
        param_node.state = CLOSED;
    }

    public addToOpenList(param_node) {

        const index = this.closed.indexOf(param_node);
        if (index > -1)
            this.closed.splice(index, 1);

        this.opened.push(param_node);
        param_node.state = OPENED;
    }

    public getNeighbours(node, graphe): Node[] {
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