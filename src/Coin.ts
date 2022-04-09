import { DisplayObject, DisplayObjectContainer, Geometry, IDisplayObject } from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";

export default class Coin extends DisplayObjectContainer{

    private _anim:IDisplayObject|null = null;
    private _hitbox:IDisplayObject|null = null;

    constructor(){
        super();
        this._anim = DisplayObject.createFromTexture( 
            GraphicManager.getInstance().getTextureById("coin")
        ); 

        this.addChild(this._anim);
        this._anim.width = 16;
        this._anim.height = 16;
        this.width = this._anim.width = 16;
        this.height = this._anim.height = 16;

        this._hitbox = DisplayObject.createFromTexture(GraphicManager.getInstance().getRed());
    }  

    displayHitbox(){
        if( this.parent !== null ){
            this.parent.addChild(this._hitbox);
            const box = Geometry.getHitbox(this);
            this._hitbox.x = box.topLeft.x;
            this._hitbox.y = box.topLeft.y;
            this._hitbox.width = 16;
            this._hitbox.height = 16;
        }

    }

    
}