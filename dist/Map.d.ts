import { Node } from "./pathfinding/Node";
export declare class Map {
    rows: number;
    cols: number;
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
    private data;
    reset(rows: number, cols: number, startRow: number, startCol: number): void;
    getData(): Node[][];
    getStartNode(): Node | null;
    getEndNode(): Node | null;
    private cloneNodes;
    clone(): Map;
}
