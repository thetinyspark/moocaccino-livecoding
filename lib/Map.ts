import { Maze } from "./maze/maze";
import { Node } from "./pathfinding/Node";

export class Map {
    public rows: number;
    public cols: number;
    public startRow: number;
    public startCol: number;
    public endRow: number;
    public endCol: number;
    private data: Node[][] = [];


    public reset(
        rows: number,
        cols: number,
        startRow: number,
        startCol: number
    ):void {
        this.rows = rows;
        this.cols = cols;
        this.startRow = startRow;
        this.startCol = startCol;

        this.endRow = Math.floor(Math.random() * (this.rows - 2));
        this.endCol = Math.floor(Math.random() * (this.cols - 2));

        const isDirty: boolean = Math.random() > 0.1;
        this.data = new Maze().doMazeRecursive(
            this.rows,
            this.cols,
            this.startRow,
            this.startCol,
            this.endRow,
            this.endCol,
            isDirty
        );

        this.getStartNode().isStartNode = true;
        this.getEndNode().isEndNode = true;

    }


    public getData(): Node[][] {
        return this.data;
    }

    public getStartNode(): Node | null {
        if (this.data[this.startRow])
            return this.data[this.startRow][this.startCol] || null;
        else
            return null;
    }

    public getEndNode(): Node | null {
        if (this.data[this.endRow])
            return this.data[this.endRow][this.endCol] || null;
        else
            return null;
    }

    private cloneNodes(): Node[][] {
        const copy: Node[][] = this.data.map(
            (row: Node[]) => {
                return row.map(
                    (node: Node) => {
                        return node.clone();
                    }
                )
            }
        );

        return copy;
    }

    public clone(): Map {
        const map: Map = new Map();
        map.rows = this.rows;
        map.cols = this.cols;
        map.startRow = this.startRow;
        map.startCol = this.startCol;
        map.endRow = this.endRow;
        map.endCol = this.endCol; 
        map.data = this.cloneNodes();
        return map;
    }
}