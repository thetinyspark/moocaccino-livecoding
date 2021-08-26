import { AssetsManager } from "../assets/AssetsManager";
import { CELL_SIZE, FLOOR_KEY, WALL_KEY } from "../config/Config";
import { Node, OPENED, CLOSED, RETAINED } from "../pathfinding/Node";
import { IDisplayable } from "./IDisplayable";

export class NodeView implements IDisplayable {

    private _model: Node = null;
    public texture = null;
    public row: number = 0;
    public col: number = 0;

    public setModel(node: Node): void {
        this._model = node;
        const manager: AssetsManager = AssetsManager.getInstance();
        this.row = this._model.row;
        this.col = this._model.col;

        if (this._model.walkable)
            this.texture = manager.getAssetByKey(FLOOR_KEY).data;
        else
            this.texture = manager.getAssetByKey(WALL_KEY).data;

    }

    public getModel(): Node {
        return this._model;
    }

    private drawInfo(context: CanvasRenderingContext2D) {
        if (
            this._model.walkable &&
            (this._model.state === OPENED || this._model.state === CLOSED)
        ) {
            context.save();
            context.globalAlpha = 1;
            context.beginPath();
            context.fillStyle = "black";
            context.font = "1rem Arial";
            context.fillText("f: " + this._model.f, 10, 15, CELL_SIZE);
            context.fillText("h: " + this._model.h, 10, 30, CELL_SIZE);
            context.fillText("g: " + this._model.g, 10, 45, CELL_SIZE);
            context.fill();
            context.closePath();
            context.restore();
        }
    }

    private drawState(context: CanvasRenderingContext2D) {

        const validStates:number[] = [CLOSED, RETAINED, OPENED];
        if (!this._model.walkable || validStates.indexOf(this._model.state) === -1)
            return;

        context.save();
        context.globalAlpha = 0.5;
        context.beginPath();

        if (this._model.state === CLOSED)
            context.fillStyle = "red";
        else if (this._model.state === OPENED)
            context.fillStyle = "rgba(255,255,255,1)";
        else if (this._model.state === RETAINED)
            context.fillStyle = "rgba(50,255,125,1)";

        context.fillRect(0, 0, CELL_SIZE, CELL_SIZE);
        context.fill();
        context.closePath();
        context.restore();

    }

    public render(context: CanvasRenderingContext2D) {
        if (this._model === null || this.texture === null)
            return;

        context.save();
        context.translate(this._model.row * CELL_SIZE, this._model.col * CELL_SIZE);
        context.drawImage(this.texture, 0, 0, CELL_SIZE, CELL_SIZE);
        this.drawState(context);
        this.drawInfo(context);

        context.restore();
    }
}