import { CHEST_KEY, HEROE_KEY } from "../config/Config";
import { AssetsManager } from "../assets/AssetsManager";
import { Map } from "../Map";
import { Node } from "../pathfinding/Node";
import { Actor } from "./Actor";
import { IDisplayable } from "./IDisplayable";
import { NodeView } from "./NodeView";

export class Renderer {

    private map: Map = null;
    private children: IDisplayable[] = [];
    private canvas: HTMLCanvasElement = null;
    private _heroe:Actor = null;
    private _chest:Actor = null;

    constructor(){
        this._heroe = new Actor();
        this._chest = new Actor();
    }

    public reset(canvas:HTMLCanvasElement, map: Map) {
        this.map        = map;
        this.canvas     = canvas;
        this.children   = [];

        const graphe: Node[][] = this.map.getData();
        for (let i: number = 0; i < graphe.length; i++) {

            const row: Node[] = graphe[i];

            for (let j = 0; j < row.length; j++) {
                const node = row[j];
                const view: NodeView = new NodeView();
                view.setModel(node);
                this.children.push(view);
            }
        }

        this._chest.row = this.map.getEndNode().row;
        this._chest.col = this.map.getEndNode().col;

        this._heroe.row = this.map.getStartNode().row;
        this._heroe.col = this.map.getStartNode().col;

        this._heroe.texture = AssetsManager.getInstance().getAssetByKey(HEROE_KEY).data;
        this._chest.texture = AssetsManager.getInstance().getAssetByKey(CHEST_KEY).data;

        this.children.push(this._chest,this._heroe);

    }

    public render(): void {
        if( this.canvas === null )
            return; 
            
        const context: CanvasRenderingContext2D = this.canvas.getContext("2d");
        for (let i: number = 0; i < this.children.length; i++) {
            this.children[i].render(context);
        }

        window.requestAnimationFrame(() => this.render());
    }

    public getHeroe():Actor{
        return this._heroe;
    }

    public getChest():Actor{
        return this._chest;
    }

    public getFloorByCoords(row:number, col:number):NodeView{
        const found:NodeView = this.children.find( 
            (value:IDisplayable) => {
                return( 
                    value instanceof NodeView && 
                    value.row === row && 
                    value.col === col
                );
            }
        ) as NodeView;

        return found;
    }

}