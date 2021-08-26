import { Node } from "./Node";
export declare class FastFinder {
    private opened;
    private closed;
    findPath(graphe: Node[][], startNode: Node, endNode: Node): Node[];
    addToCloseList(param_node: any): void;
    addToOpenList(param_node: any): void;
    getNeighbours(node: any, graphe: any): Node[];
    isOnOpenList(param_node: any): boolean;
    isOnCloseList(param_node: any): boolean;
}
