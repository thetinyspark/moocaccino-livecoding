import { getTexture } from "../util/textures.js";

class IsoTile{

    /**
     * Creates a new IsoTile instance
     * @param {string} id a unique identifier for your tile
     * @param {string} tex the texture alias 
     */
    constructor(id, tex){
        this.x = 0; 
        this.y = 0;
        this.z = 0;
        this.row = 0; 
        this.col = 0;
        
        this.offsetX = 0;
        this.offsetY = 0;

        this.element = document.createElement("img");
        this.element.setAttribute("class", "tile");
        this.id = this.element.id = id;

        this.setTexture(tex);
    }

    getElement(){
        return this.element;
    }

    setTexture(texture){
        this.tex = texture; 
        this.element.src = getTexture(this.tex);
    }

    render(depth){
        let x = this.x - this.offsetX;
        let y = this.y - this.offsetY - this.z;

        this.element.style.zIndex = depth;
        this.element.style.top = y+"px";
        this.element.style.left = x+"px";
    }

}

export {IsoTile};