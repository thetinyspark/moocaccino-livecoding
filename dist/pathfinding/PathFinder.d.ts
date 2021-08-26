import { Log } from "./Log";
import { Node } from "./Node";
export declare class PathFinder {
    private opened;
    private closed;
    private _graphe;
    private _start;
    private _end;
    private _logs;
    step(): boolean;
    findPath(param_graphe: any, param_start: any, param_end: any): {
        logs: Log[];
        solution: Node[];
    };
    addToCloseList(param_node: any): void;
    addToOpenList(param_node: any): void;
    getNeighbours(node: any, graphe: any): Node[];
    isOnOpenList(param_node: any): boolean;
    isOnCloseList(param_node: any): boolean;
}
