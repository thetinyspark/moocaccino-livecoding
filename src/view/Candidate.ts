import { DisplayObject, DisplayObjectContainer, IDisplayObject } from "@thetinyspark/moocaccino-barista";
import GraphicManager from "../GraphicManager";
import CandidateData from "../model/schema/CandidateData";
import TextField from "./TextField";

export default class Candidate extends DisplayObjectContainer{
    private _data:{id:number, name:string, picture:string}
    private _picture:IDisplayObject;
    private _name:TextField;

    constructor(data:{id:number, name:string, picture:string}){
        super();
        this._data = data;
        this._init();
    }

    private _init(){
        const data = this._data;
        this._picture = DisplayObject.createFromTexture( GraphicManager.getInstance().getTextureById(data.picture) );
        this._name = new TextField(this._picture.width, 30);
        this._name.setText(data.name, "white", "20px Arial center", "rgba(0,0,0,0.8)", "center");

        this.addChild(this._picture);
        this.addChild(this._name);

        this._name.y = this._picture.height - this._name.height;
    }

    public getId():number{
        return this._data.id;
    }

    updateInfo(data:CandidateData){
        this._name.setText(data.name +" score:"+data.score, "white", "20px Arial center", "rgba(0,0,0,0.8)", "center");
        this.opacity = data.alive ? 1 : 0.05;
    }
}