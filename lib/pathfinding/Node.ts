export const NEUTRAL = 0;
export const OPENED = 100;
export const CLOSED = 200;
export const RETAINED = 300;
export const NODE_DISTANCE_VALUE = 10;
export class Node {

    public g: number            = 0;
    public h: number            = 0;
    public f: number            = 0;
    public col: number          = 0;
    public row: number          = 0;
    public isStartNode:boolean  = false; 
    public isEndNode:boolean    = false; 

    public walkable: boolean    = true;
    public parent: Node         = null;
    public state: number        = NEUTRAL;


    public toString() {
        return `${this.row}, ${this.col}`;
    }

    public clone(): Node {
        const node: Node = new Node();
        node.g = this.g;
        node.h = this.h;
        node.f = this.f;
        node.col = this.col;
        node.row = this.row;
        node.walkable = this.walkable;
        node.parent = this.parent;
        node.state = this.state;
        node.isStartNode = this.isEndNode; 
        node.isEndNode = this.isEndNode;
        return node;
    }

}
