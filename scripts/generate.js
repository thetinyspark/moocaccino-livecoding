const fs = require("fs")
const output = [];
for( let i = 0; i < 40; i++){
    output.push(
        {
            id: i, 
            choices:[
                {id:2, note:3},
                {id:1, note:2},
                {id:3, note:1},
            ]
        }
    );
}
fs.writeFileSync("./output.json", JSON.stringify(output));