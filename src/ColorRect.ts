import { CanvasUtils, DisplayObject, Texture, TextureData } from "@thetinyspark/moocaccino-barista";

export default class ColorRect extends DisplayObject{

    constructor(width:number = 100, height:number = 100, color:string ="black"){ 
        super(); 

        const data = CanvasUtils.create();
        this.width = data.width = width;
        this.height = data.height = height;
        CanvasUtils.fillRect(data, color, 0, 0, width, height );
        this.texture = new Texture(
            "color_texture", 
            new TextureData(data), 
            0, 
            0, 
            data.width, 
            data.height
        );
    }

}