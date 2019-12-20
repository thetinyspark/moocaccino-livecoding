const texturesTable = {
    jasm: "./assets/jasmine.png"
}; 

function initTextures(){

    let url = "";
    let num = "";
    for( let i = 0; i <= 50; i++ ){
        num = ( i < 10 ) ? "0" + i : i;
        url = "./assets/isometric_00" + num + ".png";
        texturesTable["iso"+i] = url;
    }
}

function getTexture(alias){
    return texturesTable[alias];
}

initTextures();

export {getTexture};