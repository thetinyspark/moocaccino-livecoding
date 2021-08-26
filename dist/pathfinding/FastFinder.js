"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastFinder = void 0;
var Node_1 = require("./Node");
var FastFinder = /** @class */ (function () {
    function FastFinder() {
        this.opened = [];
        this.closed = [];
    }
    FastFinder.prototype.findPath = function (graphe, startNode, endNode) {
        // on crée les listes fermées et les listes ouvertes
        this.opened = new Array();
        this.closed = new Array();
        // - Ajout du node de départ à la liste ouverte.
        this.addToOpenList(startNode);
        //  stopper la boucle si la liste ouverte est vide
        var hasNextStep = true;
        while (hasNextStep) {
            // a. Récupération du node avec le plus petit F contenu dans la liste ouverte. 
            // On le nommera CURRENT.
            this.opened.sort(function (a, b) { return a.f < b.f ? -1 : 1; });
            var currentNode = this.opened[0];
            //  stopper la méthode si on ajoute le noeud d'arrivée à la liste fermée
            if (this.opened.length > 0 && currentNode === endNode) {
                hasNextStep = false;
                break;
            }
            // b. Basculer CURRENT dans la liste fermée.
            this.addToCloseList(currentNode);
            //  récupération des voisins de CURRENT
            var neighbours = this.getNeighbours(currentNode, graphe);
            var maxi = neighbours.length;
            // Pour chacun des nodes adjacents à CURRENT appliquer la méthode suivante:
            for (var i = 0; i < maxi; ++i) {
                var node = neighbours[i];
                //Si le node est un obstacle ou est dans la liste fermée ignorez-le et passer à l'analyse d'un autre node.
                if (this.isOnCloseList(node) || node.walkable === false)
                    continue;
                var opened = this.isOnOpenList(node);
                /* on calcule le nouveau g */
                var newG = currentNode.g + Node_1.NODE_DISTANCE_VALUE;
                /*on calcule le nouveau h */
                var newH = (Math.abs(endNode.row - node.row) + Math.abs(endNode.col - node.col)) * Node_1.NODE_DISTANCE_VALUE;
                /*on calcule le nouveau F*/
                var newF = newH + newG;
                if ((opened && newG < node.g) ||
                    !opened) {
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
        var finalPath = [];
        // on est sorti de la liste, on a deux solutions, soit la liste ouverte est vide dans ces cas là il 
        // n'y a pas de solutions et on retourne un finalPath vide
        // soit il y a au moins un élément dans la liste ouverte et on peut reconstruire le chemin à rebours.
        if (this.opened.length > 0) {
            // Soit on construit le chemin à rebours;
            var lastNode = endNode;
            while (lastNode != startNode) {
                finalPath.unshift(lastNode);
                lastNode = lastNode.parent;
            }
        }
        //on retourne nos résultats
        return finalPath;
    };
    FastFinder.prototype.addToCloseList = function (param_node) {
        var index = this.opened.indexOf(param_node);
        if (index > -1)
            this.opened.splice(index, 1);
        this.closed.push(param_node);
        param_node.state = Node_1.CLOSED;
    };
    FastFinder.prototype.addToOpenList = function (param_node) {
        var index = this.closed.indexOf(param_node);
        if (index > -1)
            this.closed.splice(index, 1);
        this.opened.push(param_node);
        param_node.state = Node_1.OPENED;
    };
    FastFinder.prototype.getNeighbours = function (node, graphe) {
        var row = node.row;
        var col = node.col;
        var indices = [[row, col + 1], [row, col - 1], [row - 1, col], [row + 1, col]];
        var results = [];
        indices.forEach(function (coords) {
            var r = coords[0];
            var c = coords[1];
            if (graphe[r] && graphe[r][c]) {
                results.push(graphe[r][c]);
            }
        });
        return results;
    };
    FastFinder.prototype.isOnOpenList = function (param_node) {
        return this.opened.indexOf(param_node) > -1;
    };
    FastFinder.prototype.isOnCloseList = function (param_node) {
        return this.closed.indexOf(param_node) > -1;
    };
    return FastFinder;
}());
exports.FastFinder = FastFinder;
