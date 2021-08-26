export declare const NEUTRAL = 0;
export declare const OPENED = 100;
export declare const CLOSED = 200;
export declare const RETAINED = 300;
export declare const NODE_DISTANCE_VALUE = 10;
export declare class Node {
    g: number;
    h: number;
    f: number;
    col: number;
    row: number;
    isStartNode: boolean;
    isEndNode: boolean;
    walkable: boolean;
    parent: Node;
    state: number;
    toString(): string;
    clone(): Node;
}
