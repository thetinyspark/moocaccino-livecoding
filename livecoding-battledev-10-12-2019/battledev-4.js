/*******
 * Read input from STDIN
 * Use: console.log()  to output your result.
 * Use: console.error() to output debug information into STDERR
 * ***/

/**
 * 
 * poudres et épices on nous donne : € / kg + quantité totale
 * pierres précieuses on nous donne :€ et poids ATTENTION le poids et le prix sont indivisibles 
 * (on ne peut pas couper une pierre précieuse)
 */


var input = [
    "2 2 100",
    "600 40",
    "1000 50",
    "20 40",
    "15 80"
];



function parseLine(str) {
    const tab = str.split(" ").map(
        (current) => {
            return parseInt(current);
        }
    );

    return tab;
}

function sortTreasures(a, b) {
    if (a.goldPerGram > b.goldPerGram) {
        return -1;
    }
    else if(a.goldPerGram == b.goldPerGram ){
        return ( a.quantity > b.quantity ) ? -1 : 1;
    }
    else {
        return 1;
    }
}

function getTreasures(input, numJewels, numSpices) {

    const treasures = [];
    let current = null;

    for (let i = 0; i < numJewels; i++) {

        current = parseLine(input[i]);
        price = current[0];
        quantity = current[1];
        goldPerGram = price / quantity;

        treasures.push(
            {
                id: treasures.length,
                type: "jewel-" + i,
                price: price,
                quantity: quantity,
                goldPerGram: goldPerGram
            }
        );
    }

    for (let i = numJewels; i < numJewels + numSpices; i++) {

        current = parseLine(input[i]);
        quantity = current[1];
        goldPerGram = current[0];
        price = goldPerGram * quantity;

        for (let j = 0; j < quantity; j++) {

            treasures.push(
                {
                    id: treasures.length,
                    type: "spice",
                    price: goldPerGram, 
                    quantity: 1,
                    goldPerGram: current[0]
                }
            );

        }

    }

    return treasures;
}

function ContestResponse() {
    const configTab = parseLine(input.shift());
    const numJewels = configTab[0];
    const numSpices = configTab[1];
    const treasures = getTreasures(input, numJewels, numSpices);
    let allowedWeight = configTab[2];
    let result = 0;

    treasures.sort(sortTreasures);
}

ContestResponse();
