import { Animation, DisplayObjectContainer, GameNode, Grid2D, IDisplayObject, Maze2D, MazeNodeType, PathFinder2D } from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";

export default class Ghost extends DisplayObjectContainer{

    private _anim:Animation|null = null;
    private _color:"red"|"cyan"|"pink"|"orange" = "red";
    private _path:GameNode[] = [];
    public targetX:number = 0;
    public targetY:number = 0;

    constructor(color:"red"|"cyan"|"pink"|"orange"){
        super();
        this._color = color;
    }   

    goDirection(direction:"left"|"top"|"bottom"|"right"){
        this.removeChildren(); 
        this._anim = GraphicManager.getInstance().getGhostAnimation(this._color, direction);
        this._anim.width = 32;
        this._anim.height = 32;
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

    travel(maze:Maze2D, target:IDisplayObject){
 
        const targetCoords = {row: Math.round(target.y / 32), col: Math.round(target.x / 32)};
        const myCoords = {row: Math.round(this.y / 32), col: Math.round(this.x / 32)};
        const pathfinder = new PathFinder2D();
        const nums = maze.getData().map( 
            (row, rowIndex)=>{
                return row.map( 
                    (col, colIndex)=>{
                        return col.state.type === MazeNodeType.FREE ? 0 : 1;
                    }
                )
            }
        );
        const graphe = pathfinder.createGraphe( Grid2D.from(nums), 0);
        const path = pathfinder.findPath(
            graphe, 
            graphe.getAt(myCoords.row, myCoords.col),
            graphe.getAt(targetCoords.row, targetCoords.col),
        );
        

        if( path.length > 0 ){
            path.shift();
            const firstNode = path.shift();
            const x = firstNode.state.col * 32;
            const y = firstNode.state.row * 32;
            this.targetX = x;
            this.targetY = y;
        }
    }

    move(){
        this.x += (this.targetX - this.x) * 0.1;
        this.y += (this.targetY - this.y) * 0.1;
    }
}