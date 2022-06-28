import { DisplayObject, Grid2D } from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";

export default class Cell extends DisplayObject{

    public nextState:boolean        = false;
    private _living: boolean        = false;
    private _nextState:boolean      = false;
    private _size:number            = 0;
    private _row:number             = 0;
    private _col:number             = 0;
    private _neighbours:Cell[]      = [];

    constructor(size:number){
        super();
        this._size = size;
        this._setLiving(false);
    }


    public get living(): boolean {
        return this._living;
    }
    
    public set living(value: boolean) {
        if( value !== this._living )
            this._setLiving(value);
    }

    private _setLiving(value:boolean){
        this._living = value;
        const texname:string = value ? "alife" : "dead";
        this.texture = GraphicManager.getInstance().getTextureById(texname);
        this.width = this.height = this._size;
    }

    compute(grid:Grid2D<Cell>){

        // cache neighbours to optimize performances
        if( this._neighbours.length === 0 ){
            const neighbours = grid.getNeighbours(this._row,this._col);
            const keys  = Object.keys(neighbours);
            this._neighbours = keys .map( (key)=> key === "center" ? null : neighbours[key] )
                                    .filter( cell => cell !== null );
        }

        // number of neighbours alive
        const alive = this._neighbours.filter( (cell) => cell.living );
        const count =  alive.length;

        if( this.living ){
            
            // survive if it has 2 or 3 neighbours
            if( count < 2 || count > 3 )
                this._nextState = false;
            else
                this._nextState = true;
        }
        else{
            // birth if it has 3 neighbours
            if( count === 3 )
                this._nextState = true;
            else
                this._nextState = false;
        }
    }

    apply(){
        this.living = this._nextState;
    }

    init(row:number,col:number){
        this._row = row;
        this._col = col;
        this.x = col * this._size;
        this.y = row * this._size;
        this.living = false;
    }
}