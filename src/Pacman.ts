import { Animation, DisplayObject, DisplayObjectContainer, Geometry, IDisplayObject } from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";

export default class Pacman extends DisplayObjectContainer{

    private _anim:Animation|null = null;
    private _direction:"left"|"top"|"bottom"|"right"|"none" = "none";
    private _hitbox:IDisplayObject|null = null;
    public speed:number = 3;

    goDirection(direction:"left"|"top"|"bottom"|"right"|"none"){


        this._direction = direction;

        if( this._direction === "none")
            return;

        this.removeChildren(); 
        if( this._hitbox !== null && this._hitbox.parent !== null ){
            this._hitbox.parent.removeChild(this._hitbox);
        }

        this._anim = GraphicManager.getInstance().getPacmanAnimation(this._direction);
        this._anim.width = 24;
        this._anim.height = 24;
        this.width = this._anim.width;
        this.height = this._anim.height;

        
        this._hitbox = DisplayObject.createFromTexture(GraphicManager.getInstance().getBlue());
        
        this.addChild(this._anim);
        this.resume();
    }

    pause(){
        if( this._anim === null )
            return;

        this._anim.stop();
    }

    resume(){
        if( this._anim === null )
            return;

        this._anim.goToFrame(0);
        this._anim.play();
    }

    move(){
        
        if( this._direction === "left"){
            this.x-=this.speed;
        }
        else if( this._direction === "right"){
            this.x+=this.speed;
        }
        else if( this._direction === "top"){
            this.y-=this.speed;
        }
        else if( this._direction ==="bottom"){
            this.y+=this.speed;
        }
    }

    goBack(){
        const myCoords = {row: Math.round(this.y / 32), col: Math.round(this.x / 32)};
        this.x = (myCoords.col * 32) + 4;
        this.y = (myCoords.row * 32) + 4;
    }

    displayHitbox(){
        if( this.parent !== null ){
            if( !this.parent.contains(this._hitbox))
                this.parent.addChild(this._hitbox);
                
            const box = Geometry.getHitbox(this);
            this._hitbox.x = box.topLeft.x;
            this._hitbox.y = box.topLeft.y;
            this._hitbox.width = 16;
            this._hitbox.height = 16;
        }

    }
}