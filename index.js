
class PixelateFilter{
    constructor(){
        this._canvas = document.createElement("canvas"); 
        this._context = this._canvas.getContext("2d");
    }

    pixelate(source, destination, factor){
        const context = this._context; 
        const destContext = destination.getContext("2d"); 

        this._canvas.width = destination.width;
        this._canvas.height = destination.height;
        context.save();
        context.clearRect(0,0,this._canvas.width, this._canvas.height); 
        context.scale(1/factor, 1/factor); 
        context.drawImage(source, 0, 0);
        context.restore();

        destContext.save();
        destContext.scale(factor, factor);
        destContext.drawImage(this._canvas, 0, 0);
        destContext.restore();
    }
}

const filter = new PixelateFilter();
var factor = 1;

function tick(){
    const canvas    = document.querySelector("#game");
    const context   = canvas.getContext("2d");
    const source    = document.getElementById("perso");
    context.clearRect(0,0,canvas.width, canvas.height); 


    const period = Math.abs( Math.sin( factor * Math.PI / 180) * 30 ); 
    factor++; 

    filter.pixelate(source, canvas, period);

    window.requestAnimationFrame(tick);
}

window.addEventListener(
    "load", 
    ()=>{
        const canvas    = document.querySelector("#game");
        const width     = window.innerWidth;
        const height    = window.innerHeight;
        canvas.width    = width; 
        canvas.height   = height;
        tick();
    }
)

