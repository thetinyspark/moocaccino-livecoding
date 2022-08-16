import { Animation, DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";

export default class Character extends DisplayObjectContainer{
    private _animations:Animation[] = [];

    constructor(){
        super();
        this._animations = [];
    }

    public setAnimations(animations:Animation[]):void{
        this._animations = animations;
    }

    public setCurrentAnimation(name:string):void{
        const last = this.getCurrentAnimation();
        const found = this._animations.find( (a:Animation) => a.name === name ) || null;
        if( found === null )
            return;

        if( last !== undefined && last !== null)
            last.stop();
            
        this.removeChildren(); 
        this.addChild(found); 
        found.goToFrame(0); 
        found.play();
        found.loop = false;
    }

    public getCurrentAnimation():Animation{
        return this.getChildren()[0] as Animation; 
    }
}