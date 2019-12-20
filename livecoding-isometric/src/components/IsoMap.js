import { IsoTile } from "./IsoTile.js";

class IsoMap {

    constructor() { }

    reset(element, mapdata, tileWidth = 64, tileHeight = 32) {
        this.element = element;
        this.children = [];
        this.data = mapdata;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.createTiles();
    }


    /**
     * retourne les coordonnées x et y d'une tuile située à row et col
     * @param {number} row 
     * @param {number} col 
     * @param {number} cellW 
     * @param {number} cellH 
     */
    isoToScreen(row, col, cellW, cellH) {
        let x = (col - row) * (cellW * 0.5);
        let y = (col + row) * (cellH * 0.5);
        let pt = { x: x, y: y };

        return pt;
    }


    /**
     * sort tiles by their theoric depth (distance to the camera)
     * @param {IsoTile} tileA 
     * @param {IsoTile} tileB 
     */
    sortTiles(tileA, tileB) {

        const xa = tileA.x + ( this.tileWidth / 2 );
        const ya = tileA.y + ( this.tileHeight / 2 );

        const xb = tileB.x + ( this.tileWidth / 2 );
        const yb = tileB.y + ( this.tileHeight / 2 );

        const distX = ( xa < xb ) ?  xb - xa : xa - xb;
        const distY = ( ya < yb ) ? yb - ya : ya - yb;

        
        // if tiles are crossing
        if ( distX < this.tileWidth && distY < this.tileHeight / 2) {
            if (tileA.z != tileB.z) {
                return (tileA.z < tileB.z) ? -1 : 1;
            }
            else {
                return (tileA.y < tileB.y) ? -1 : 1;
            }
        } 
        else {
            return (tileA.y < tileB.y) ? -1 : 1;
        }
    }

    getChildByName(name) {
        const results = this.children.filter((tile) => tile.id === name);
        return (results.length > 0) ? results[0] : null;
    }

    getChildren() {
        return this.children;
    }

    addChild(tile) {
        this.children.push(tile);
        this.element.appendChild(tile.getElement());
    }

    removeChild(tile) {
        this.children.splice(this.children.indexOf(tile), 1);
        this.element.removeChild(tile);
    }

    applyOffset(){
        const maxRows = this.data.length; 
        const offsetX = this.isoToScreen(maxRows - 1, 0, this.tileWidth, this.tileHeight).x;
        this.element.style.left = Math.abs(offsetX)+"px";
    }

    createTiles() {

        let tile = null;
        let coords = null;
        const maxRows = this.data.length; 
        const maxCols = ( maxRows == 0 ) ? 0 : this.data[0].length;
        const offsetX = this.isoToScreen(maxRows - 1, 0, this.tileWidth, this.tileHeight).x;


        for (let i = 0; i < maxCols; i++) {
            for (let j = 0; j < maxCols; j++) {

                coords = this.isoToScreen(i, j, this.tileWidth, this.tileHeight);

                // new Tile 
                tile = new IsoTile(
                    "tile_" + i + "_" + j, // id
                    this.data[i][j]  // texture alias
                );

                tile.x = coords.x;
                tile.y = coords.y;

                this.children.push(tile);
                this.element.appendChild(tile.getElement());

            }
        }

        this.render();
    }

    getElement() {
        return this.element;
    }

    render() {
        this.children.sort((a, b) => this.sortTiles(a, b));
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].render(i);
        }
    }

}

export { IsoMap }