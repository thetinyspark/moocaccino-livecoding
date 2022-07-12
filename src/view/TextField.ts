import { CanvasUtils, DisplayObject, Texture, TextureData } from "@thetinyspark/moocaccino-barista";

export default class TextField extends DisplayObject{
    private _context:CanvasRenderingContext2D;
    
    constructor(width:number, height:number){
        super();
        this.texture = new Texture(
            "textfield_texture", 
            new TextureData(CanvasUtils.create(width,height)), 
            0, 
            0, 
            width, 
            height
        );
        this.texture.data.isDynamic= true;
        this.width = width;
        this.height = height;
        this._context = (this.texture.source as HTMLCanvasElement).getContext("2d");
    }

    setText(text:string, color:string, font:string, backgroundColor:string, textAlign:CanvasTextAlign = "left"){
        const context = this._context;

        context.clearRect(0,0,this.width,this.height);

        context.save();
        context.beginPath();
        context.fillStyle = backgroundColor; 
        context.fillRect(0,0,this.width, this.height); 
        context.fill();
        context.closePath();

        context.beginPath();
        context.font = font;
        context.textAlign = textAlign;
        context.fillStyle = color; 
        context.fillText( text, Math.round( this.width / 2 ), Math.round(this.height * 0.75));
        context.closePath();

        context.restore(); 
    }
}