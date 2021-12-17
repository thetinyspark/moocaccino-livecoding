const path = [];
const UNVISITED = 8;
const WALL = 1;
const VISITED = 0;
const NO_CELL = 999;

class MazeGenerator{

    constructor(){
        this.reset(1,1,1,1);
    }

    reset(numRows, numCols, startRow, startCol){
        this.grid = this.createGrid(numRows, numCols);
        this.path = [];
        this.currentRow = startRow; 
        this.currentCol = startCol;
    }

    getGrid(){
        return this.grid;
    }

    createGrid(m, n) {

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

    step(){
        const grid = this.grid;
        const path = this.path;
        const row = this.currentRow;
        const col = this.currentCol;

        const sides = [
            [row, col - 2, row, col - 1], // case non visitée(bleue) directement à gauche de la case de départ
            [row, col + 2, row, col + 1],// case non visitée(bleue) directement à droite de la case de départ
            [row - 2, col, row - 1, col],// case non visitée(bleue) directement au dessus de la case de départ
            [row + 2, col, row + 1, col]// case non visitée(bleue) directement en dessous de la case de départ
        ];
    
        // on passe notre case courante à visited (blanche)
        grid[row][col] = VISITED;
    
        // on récupère les voisins vers lesquels on peut aller
        const availablesNeighbours = sides.filter( 
            (side)=>{
                // on récupère les coordonnées dans la grille de notre case visée
                let row1 = side[0];
                let col1 = side[1];
                return (grid[row1] != undefined && grid[row1][col1] != undefined && grid[row1][col1] == UNVISITED)
            }
        );
    
        if( availablesNeighbours.length > 0 ){
            // on récupère un voisin au hasard
            const index = Math.round( Math.random() * (availablesNeighbours.length-1) )
            const side = availablesNeighbours[index];
            let row1 = side[0];
            let col1 = side[1];
    
            // Ainsi que celles du mur qui nous en sépare
            let row2 = side[2];
            let col2 = side[3];
    
            // alors on fait en sorte de passer notre mur à VISITED
            // on casse le mur en fait
            grid[row2][col2] = VISITED;
    
            // on ajoute nos coordonnées de départ au chemin 
            // qui nous a mené jusqu'à la nouvelle case
            path.push([row, col]);
    
            // on spécifie notre prochain point de départ
            this.currentRow = row1;
            this.currentCol = col1;
            return;
        }
        else if(path.length > 0 ){
            // si aucune case adjacente n'est intéréssante, alors on remonte le chemin
            // à rebours et on tente de "creuser" à partir d'une des cases précédentes
            // on retire le dernier élément du chemin
            let coords = path.pop();

            // on spécifie notre prochain point de départ
            this.currentRow = coords[0];
            this.currentCol = coords[1];
            return;
        }
        else{    
            // C'est fini
            this.currentRow = null;
            this.currentCol = null;
            return;
        }
    }

    isFinished(){
        return this.currentRow === null && this.currentCol === null;
    }

    finish(){
        while( !this.isFinished() ){
            this.step();
        }
    }

    finishWithDelay(ms, callback){
        this.step();
        if( !this.isFinished()){
            setTimeout( 
                ()=>{ 
                    this.finishWithDelay(ms, callback); 
                    callback();
                }, 
                ms
            );
        }
    }
}

class MazeRenderer{
    gridToTable(grid){
        
    }
    
    render(grid, selectedRow, selectedCol){
        const content = grid.map( 
            (row, rowIndex)=>{
                const cells = row.map(
                    (cell, cellIndex)=>{
                        let result = "";
                        switch(cell){
                            case WALL: result = "wall"; break;
                            case UNVISITED: result = "unvisited"; break;
                            case VISITED: result = "visited"; break;
                            case NO_CELL: result = "nocell"; break;
                        }

                        if( cellIndex === selectedCol && selectedRow === rowIndex ){
                            result += " selected";
                        }

                        return `<td class="${result}"></td>`;
                    }
                ); 
    
                return `<tr>${cells.join("")}</tr>`;
            }
        );
    
        document.getElementById("maze").innerHTML = content.join("");
    }
}

const generator = new MazeGenerator();
const renderer = new MazeRenderer();

function newMaze(){
    const numRows = parseInt(document.getElementById("numRows").value);
    const numCols = parseInt(document.getElementById("numCols").value);
    generator.reset(numRows, numCols, 1, 1);
    renderer.render(generator.getGrid());
}

function next(){
    generator.step();
    renderer.render(generator.getGrid(), generator.currentRow, generator.currentCol);
}

function finalizeMaze(){
    generator.finish();
    renderer.render(generator.getGrid(),  generator.currentRow, generator.currentCol);
}

function finalizeMazeWithDelay(){
    generator.finishWithDelay(
        50, 
        ()=>{
            renderer.render(generator.getGrid(),  generator.currentRow, generator.currentCol);
        }
    );
}

window.onload = function(){
    newMaze();
    finalizeMaze();
}