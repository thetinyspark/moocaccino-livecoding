const msg = `
...OO..
.O.O...
O.....O
.O...OO
.......
...O.O.
....O..
`; 

console.log(msg.split("\n").length);
const data = msg.split("\n").map( 
    (row)=>{
        return row.split("").map( 
            (cell)=>{
                return cell === "." ? 0 : 1;
            }
        );
    }
);


console.log(data);