import { IsoMap } from "./src/components/IsoMap.js";

/**
 * don't forget to change the css width 
 * in the .tile class
 * 
 * 256 = the natural width of the isometric base 
 * 248 = the natural height of the isometric base
 * ( you can see it in assets/isometric_base.png)
 */
const baseWidth = 256;
const baseHeight = 148;
const baseRatio = baseWidth / baseHeight;
const baseTileWidth = 64;
const baseTileHeight = Math.round(baseTileWidth / baseRatio);


const realHeight = 295 / 4;
const realWidth = 256 / 4;
const offsetX = (baseTileWidth - realWidth) / 2;
const offsetY = (baseTileHeight - realHeight);


// map data
const map = [
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"],
    ["iso1", "iso2", "iso3","iso4", "iso5", "iso6","iso7", "iso8", "iso9"]
];

// the map itself
const mymap = new IsoMap();

// usefull for sinusoidal
let time = 0; 
let max = 180;

// a sinusoidal function
function sinusoidal( time, period ){
    time = time % period;
    const angle = ( time / period ) * 360;
    return Math.cos( angle * Math.PI / 180 );
}

// drawing routine function
function draw() {
    // manipulate the middle of the map7
    const mid = mymap.getChildByName("tile_1_1");
    mid.z += sinusoidal(time++, max);

    // render the map
    mymap.render();

    // when the browser is ready, relaunch the draw function again
    window.requestAnimationFrame(draw);
}

// bootstraper
function start() {

    // init thea map
    mymap.reset(
        document.querySelector("#mapcontainer"),
        map,
        baseTileWidth,
        baseTileHeight
    );

    /**
     * Applies offsetX && offsetY to tiles which 
     * are taller than the base
     */
    const tiles = mymap.getChildren();

    tiles.map(
        (tile) => {
            tile.offsetX = offsetX;
            tile.offsetY = offsetY;
            tile.z = parseInt(Math.random() * 20);
        }
    );

    // center the tiles on the map container
    mymap.applyOffset();
    // launch the drawing routine
    draw();
}


start();