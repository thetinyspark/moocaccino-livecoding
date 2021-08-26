import { Node } from "../pathfinding/Node";
export declare class Maze {
    createGrid(m: any, n: any): any[];
    addroom(grid: any, row: any, col: any, width: any, height: any): void;
    rmaze(grid: any, row: any, col: any, path: any): void;
    dirty(grid: any): void;
    doMazeRecursive(m: number, n: number, startRow?: number, startCol?: number, endRow?: number, endCol?: number, isDirty?: boolean): Node[][];
    private convert;
}
