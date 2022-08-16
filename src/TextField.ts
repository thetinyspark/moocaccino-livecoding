import { CanvasUtils, DisplayObject, Texture, TextureData } from "@thetinyspark/moocaccino-barista";

export default class TextField extends DisplayObject{
    private _context:CanvasRenderingContext2D;

    constructor(width:number = 100, height:number = 100){ 
        super(); 

        const data = CanvasUtils.create();
        this.width = data.width = width;
        this.height = data.height = height;
        this.texture = new Texture(
            "textfield_texture", 
            new TextureData(data), 
            0, 
            0, 
            data.width, 
            data.height
        );
        this.texture.data.isDynamic= true;
        this._context = (this.texture.source as HTMLCanvasElement).getContext("2d");
    }

    public setText(
        text:string, 
        color:string ="black", 
        font:string ="12px Arial", 
        textAlign:"left"|"center"|"right"|"start"|"end" = "left",
        offsetX:number = 0,
        backgroundColor:string ="rgba(0,0,0,0)", 
    ):void{
        const context = this._context;
        context.save();

        context.clearRect(0,0,this.width, this.height);

        context.beginPath();
        context.fillStyle = backgroundColor;
        context.fillRect(0,0,this.width, this.height);
        context.fill();
        context.closePath();

        context.beginPath();
        context.fillStyle = color; 
        context.font = font;
        context.textAlign = textAlign;
        context.fillText( text, offsetX, Math.round(this.height / 2));
        context.fill();
        context.closePath();

        context.restore();
    }

}