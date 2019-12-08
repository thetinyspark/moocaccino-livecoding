/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/

var input = [
    '1000', 
    '80', 
    '10', 
    '500'
];

function getSmallest(input){
    let min = parseFloat(input[0]);
    for( let i = 1; i < input.length; i++ ){
        min = ( parseFloat(input[i]) < min ) ? parseFloat( input[i]) : min;
    }

    return min;
}

function ContestResponse(){
    let smallest = getSmallest(input); 
    let result = 0;

    for( let i = 0; i < input.length; i++ ){
        result += parseFloat(input[i]) - smallest;
    }

    console.log( parseInt(result) );
}

ContestResponse();