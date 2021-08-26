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
            rmaze(grid, row1, col1, path);
            return;
        }

        start++;
        if (start >= sides.length) {
            start = 0;
        }
    }

    if (path.length > 0) {
        let coords = path.pop();
        rmaze(grid, coords[0], coords[1], path);
    }
}

let grid = createGrid(m, n);
rmaze(grid, 1, 1, []);
console.log(grid);