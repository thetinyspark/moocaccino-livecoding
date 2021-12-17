const path = [];
const UNVISITED = 8;
const WALL = 1;
const VISITED = 0;
const NO_CELL = 999;

function createGrid(m, n) {

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

function rmaze(grid, row, col, path) {

    const sides = [
        [row, col - 2, row, col - 1], // case non visitée(bleue) directement à gauche de la case de départ
        [row, col + 2, row, col + 1],// case non visitée(bleue) directement à droite de la case de départ
        [row - 2, col, row - 1, col],// case non visitée(bleue) directement au dessus de la case de départ
        [row + 2, col, row + 1, col]// case non visitée(bleue) directement en dessous de la case de départ
    ];

    // on passe notre case courante à visited (blanche)
    grid[row][col] = VISITED;

    // on choisit une case parmi les 4 cases adjacentes au hasard    
    let start = (Math.random() * sides.length) >> 0;

    // on boucle sur toutes les cases en commençant par celle choisie au hasard
    for (let i = 0; i < sides.length; i++) {

        // on récupère les coordonnées dans la grille 
        // de notre case visée
        let row1 = sides[start][0];
        let col1 = sides[start][1];

        // Ainsi que celles du mur qui nous en sépare
        let row2 = sides[start][2];
        let col2 = sides[start][3];

        // si la case visée existe et n'a pas été visitée au préalable
        if (grid[row1] != undefined && grid[row1][col1] != undefined && grid[row1][col1] == UNVISITED) {

            // alors on fait en sorte de passer notre mur à VISITED
            // on casse le mur en fait
            grid[row2][col2] = VISITED;

            // on ajoute nos coordonnées de départ au chemin 
            // qui nous a mené jusqu'à la nouvelle case
            path.push([row, col]);

            // on rappelle notre fonction en spécifiant comme point 
            // de départ, notre nouvelle case qui est maintenant atteignable
            rmaze(grid, row1, col1, path);
            
            return;
        }

        // si la case n'existe pas, alors on boucle sur les autres cases adjacentes
        start++;
        if (start >= sides.length) {
            start = 0;
        }
    }

    // si aucune case adjacente n'est intéréssante, alors on remonte le chemin
    // à rebours et on tente de "creuser" à partir d'une des cases précédentes
    if (path.length > 0) {
        // on retire le dernier élément du chemin
        let coords = path.pop();

        // et on essaie de creuser à partir de cette case
        rmaze(grid, coords[0], coords[1], path);
    }

}

function gridToTable(grid){
    const content = grid.map( 
        (row)=>{
            const cells = row.map(
                (cell)=>{
                    switch(cell){
                        case WALL: return `<td class="wall"></td>`;
                        case UNVISITED: return `<td class="unvisited"></td>`;
                        case VISITED: return `<td class="visited"></td>`;
                        case NO_CELL: return `<td class="nocell"></td>`;
                    }
                }
            ); 

            return `<tr>${cells.join("")}</tr>`;
        }
    );

    return content.join("");
}

function render(grid){
    const tableContent = gridToTable(grid);
    document.getElementById("maze").innerHTML = tableContent;
}

function makeHole(grid, startRow, startCol, endRow, endCol){
    for( let i = startRow; i < endRow; i++ ){

        if( i >= grid.length)
            continue;

        for( let j = startCol; j < endCol; j++ ){

            if( j >= grid[i].length)
                continue;

            grid[i][j] = VISITED;
        }
    }
}

function wallBreaker(grid, cap){
    grid.forEach( 
        (row,rowIndex)=>{
            row.forEach(
                (cell,cellIndex)=>{
                    if( cell === WALL ){
                        const rand = Math.random();
                        if( rand >= cap )
                            grid[rowIndex][cellIndex] = VISITED;
                    }
                }
            )
        }
    )
}

function main(){
    const numRows = parseInt(document.getElementById("numRows").value);
    const numCols = parseInt(document.getElementById("numCols").value);
    let grid = createGrid(numRows, numCols);
    rmaze(grid, 1, 1, []);

    for( let i = 0; i < 30; i++ ){
        const startRow = parseInt(Math.random() * (numRows - 6)) + 1;
        const startCol = parseInt(Math.random() * (numRows - 6)) + 1;
        
        makeHole(grid, startRow, startCol, startRow + 4, startCol + 4);
    }
    // wallBreaker(grid, 0.9);

    render(grid);
}





