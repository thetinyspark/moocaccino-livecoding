const UNVISITED = 8;
const WALL = 1;
const VISITED = 0;
const NO_CELL = 999;
import {Node} from "../pathfinding/Node";

export class Maze{


    
    public createGrid(m, n) {
    
        let grid = [];
    
        for (let i = 0; i < m; i++) {
    
            let row = [];
    
            for (let j = 0; j < n; j++) {
                if (i % 2 == 0 || j % 2 == 0) {
                    row.push(WALL);
                }
                else {
                    row.push(UNVISITED)
                }
            }
    
            grid.push(row);
        }
    
    
        return grid;
    }
    
    public addroom(grid, row, col, width, height) {
        for (let i = row; i <= row + height; i++) {
            for (let j = col; j <= col + width; j++) {
                grid[i][j] = VISITED;
            }
        }
    }
    
    public rmaze(grid, row, col, path) {
    
        const sides = [
            [row, col - 2, row, col - 1],
            [row, col + 2, row, col + 1],
            [row - 2, col, row - 1, col],
            [row + 2, col, row + 1, col]
        ];
    
        grid[row][col] = VISITED;
    
        let start = (Math.random() * sides.length) >> 0;
    
        for (let i = 0; i < sides.length; i++) {
    
            let row1 = sides[start][0];
            let col1 = sides[start][1];
    
            let row2 = sides[start][2];
            let col2 = sides[start][3];
    
    
            if (grid[row1] != undefined && grid[row1][col1] != undefined && grid[row1][col1] == UNVISITED) {
    
                grid[row2][col2] = VISITED;
                path.push([row, col]);
                this.rmaze(grid, row1, col1, path);
                return;
            }
    
            start++;
            if (start >= sides.length) {
                start = 0;
            }
        }
    
        if (path.length > 0) {
            let coords = path.pop();
            this.rmaze(grid, coords[0], coords[1], path);
        }
    }
    
    public dirty(grid) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == WALL) {
                    if (
                        grid[i - 1] != undefined &&
                        grid[i + 1] != undefined &&
                        grid[i - 1][j] == VISITED &&
                        grid[i + 1][j] == VISITED &&
                        Math.random() > 0.8
                    ) {
                        grid[i][j] = VISITED;
                    }
                    else if (
                        grid[i][j - 1] == VISITED &&
                        grid[i][j + 1] == VISITED &&
                        Math.random() > 0.8
                    ) {
                        grid[i][j] = VISITED;
                    }
                }
            }
        }
    }
    
    public doMazeRecursive(
        m:number,
        n:number,  
        startRow:number = 1, 
        startCol:number = 1, 
        endRow:number = 1, 
        endCol:number = 1,
        isDirty:boolean = false
    ){
        let grid = this.createGrid(m, n);
        this.rmaze(grid, startRow, startCol, []);
    
        if( isDirty ){
            this.dirty(grid);
        }

        grid[endRow][endCol] = 0;
    
        return this.convert(grid);
    }
    
    private convert(grid:number[][]):Node[][]{
        const graphe:Node[][] = [];

        grid.forEach(
            (row, i) => {
                graphe.push([]);
                row.forEach(
                    (value, j) => {
                        const node = new Node();
                        if (value == 1) {
                            node.walkable = false;
                        }
                        else{
                            node.walkable = true;
                        }
        
                        node.row = i;
                        node.col = j;
                        graphe[i][j] = node;
                    }
                );
            }
        );

        return graphe;
    }
    
    
}
